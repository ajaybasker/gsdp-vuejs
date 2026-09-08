<template>
  <div class="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl">
    <!-- Ambient glow behind player -->
    <div class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"></div>

    <!-- Hidden native audio element -->
    <audio
      ref="audioRef"
      :src="currentTrack?.audio_file"
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
      @error="onError"
    ></audio>

    <!-- Main Deck -->
    <div class="relative p-6 sm:p-8">
      <!-- Top Meta Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 text-xs">
        <div class="flex items-center gap-2">
          <span class="flex h-2 w-2 rounded-full bg-amber-400" :class="{ 'animate-ping': isPlaying }"></span>
          <span class="font-mono uppercase tracking-wider text-slate-400">
            {{ tracks.length > 1 ? `Track ${currentIndex + 1} of ${tracks.length}` : 'Audio Archive' }}
          </span>
          <span v-if="currentTrack?.categories" class="rounded-full bg-amber-400/15 px-2.5 py-0.5 font-semibold text-amber-300 border border-amber-400/20">
            {{ currentTrack.categories }}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button
            v-if="tracks.length > 1"
            @click="showPlaylist = !showPlaylist"
            class="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-slate-300 hover:bg-slate-800 transition"
            :class="{ 'bg-slate-800 text-amber-300': showPlaylist }"
          >
            <Icon name="List" :size="14" />
            <span>Playlist ({{ tracks.length }})</span>
          </button>
          <a
            v-if="currentTrack?.audio_file"
            :href="currentTrack.audio_file"
            download
            class="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-200 hover:bg-slate-700 transition"
            title="Download this audio track"
          >
            <Icon name="Download" :size="13" />
            <span>Download MP3</span>
          </a>
        </div>
      </div>

      <!-- Center Deck: Artwork & Track Info -->
      <div class="mt-6 flex flex-col sm:flex-row items-center gap-6">
        <!-- Vinyl / Cover Display -->
        <div class="relative flex-shrink-0 group">
          <div class="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800 shadow-xl">
            <img
              v-if="coverImage"
              :src="coverImage"
              :alt="title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-600/30 to-brand-700/30">
              <Icon name="Headphones" :size="36" class="text-amber-400" />
            </div>
            <!-- Animated Playing Overlay -->
            <div v-if="isPlaying" class="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px]">
              <div class="flex items-end gap-1 h-6">
                <span class="w-1 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite] h-4"></span>
                <span class="w-1 bg-amber-400 rounded-full animate-[bounce_1.1s_infinite] h-6"></span>
                <span class="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite] h-3"></span>
                <span class="w-1 bg-amber-400 rounded-full animate-[bounce_1.3s_infinite] h-5"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Titles -->
        <div class="min-w-0 flex-1 text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <span class="text-xs font-semibold tracking-wider uppercase text-amber-400">
              {{ currentTrack?.categories ? `Salesian ${currentTrack.categories}` : 'Spiritual & Educational Resource' }}
            </span>
          </div>
          <h3 class="mt-1 truncate text-lg sm:text-xl font-bold tracking-tight text-white" :title="currentTrackTitle">
            {{ currentTrackTitle }}
          </h3>
          <p class="mt-1 text-xs sm:text-sm text-slate-400 truncate">
            {{ author || 'Salesian Congregation' }}
          </p>
          <p v-if="currentTrack?.description" class="mt-1.5 text-xs text-slate-300 line-clamp-2">
            {{ currentTrack.description }}
          </p>
        </div>
      </div>

      <!-- Precision Scrubber Bar -->
      <div class="mt-6 space-y-1.5">
        <div
          class="group relative h-3 w-full cursor-pointer rounded-full bg-slate-800/80 transition hover:h-3.5"
          @mousedown="startScrub"
          @touchstart.passive="startScrub"
          ref="progressBarRef"
        >
          <!-- Loaded buffer bar (placeholder) -->
          <div class="absolute inset-y-0 left-0 rounded-full bg-slate-700/50" :style="{ width: `${progressPercent}%` }"></div>
          <!-- Current Played Bar -->
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm"
            :style="{ width: `${progressPercent}%` }"
          ></div>
          <!-- Scrubber Thumb -->
          <div
            class="absolute top-1/2 -mt-2 h-4 w-4 rounded-full border-2 border-slate-900 bg-amber-400 shadow-md transition-transform group-hover:scale-125"
            :style="{ left: `calc(${progressPercent}% - 8px)` }"
          ></div>
        </div>

        <div class="flex items-center justify-between text-[11px] font-mono font-medium text-slate-400 px-0.5">
          <!-- Click the elapsed time to type an exact timestamp to jump to -->
          <button
            v-if="!editingTime"
            type="button"
            @click="startEditTime"
            class="rounded px-1 py-0.5 hover:bg-slate-800 hover:text-amber-300 transition"
            title="Click to enter a specific time"
          >
            {{ formatTime(currentTime) }}
          </button>
          <input
            v-else
            ref="timeInputRef"
            v-model="timeInputValue"
            @keydown.enter="commitEditTime"
            @keydown.esc="cancelEditTime"
            @blur="commitEditTime"
            type="text"
            inputmode="numeric"
            placeholder="mm:ss"
            class="w-16 rounded border border-amber-400/40 bg-slate-800 px-1.5 py-0.5 text-center font-mono text-amber-300 outline-none focus:border-amber-400"
          />
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- Controls Deck -->
      <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
        <!-- Left Sub-controls: Speed -->
        <div class="flex items-center gap-2">
          <button
            @click="cyclePlaybackRate"
            class="rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            title="Playback Speed"
          >
            {{ playbackRate }}x
          </button>
        </div>

        <!-- Center Master Controls -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <!-- Previous Track / Skip 10s back -->
          <button
            @click="skip(-10)"
            class="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition"
            title="Rewind 10 seconds"
          >
            <Icon name="RotateCcw" :size="18" />
          </button>

          <!-- Prev Track (if multiple) -->
          <button
            v-if="tracks.length > 1"
            @click="prevTrack"
            :disabled="currentIndex === 0"
            class="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Previous track"
          >
            <Icon name="SkipBack" :size="18" />
          </button>

          <!-- Primary Play/Pause Button -->
          <button
            @click="togglePlay"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all"
            :title="isPlaying ? 'Pause' : 'Play'"
          >
            <Icon v-if="isPlaying" name="Pause" :size="22" class="fill-current" />
            <Icon v-else name="Play" :size="22" class="fill-current ml-0.5" />
          </button>

          <!-- Next Track (if multiple) -->
          <button
            v-if="tracks.length > 1"
            @click="nextTrack"
            :disabled="currentIndex >= tracks.length - 1"
            class="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Next track"
          >
            <Icon name="SkipForward" :size="18" />
          </button>

          <!-- Skip 30s forward -->
          <button
            @click="skip(30)"
            class="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition"
            title="Fast-forward 30 seconds"
          >
            <Icon name="RotateCw" :size="18" />
          </button>
        </div>

        <!-- Right Sub-controls: Volume -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleMute"
            class="text-slate-400 hover:text-white transition"
            :title="isMuted ? 'Unmute' : 'Mute'"
          >
            <Icon :name="isMuted || volume === 0 ? 'VolumeX' : 'Volume2'" :size="18" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            :value="isMuted ? 0 : volume"
            @input="onVolumeChange"
            class="w-16 sm:w-20 accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Interactive Multi-Track Playlist Drawer -->
    <div v-if="tracks.length > 1 && showPlaylist" class="border-t border-slate-800/80 bg-slate-950/60 p-4 sm:p-6">
      <div class="flex items-center justify-between pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/60">
        <span>Available Audio Recordings</span>
        <span>{{ tracks.length }} Tracks</span>
      </div>

      <div class="mt-3 divide-y divide-slate-800/40">
        <div
          v-for="(track, idx) in tracks"
          :key="'track-' + idx"
          @click="selectTrack(idx)"
          class="group flex items-center justify-between gap-3 p-3 rounded-xl transition cursor-pointer"
          :class="idx === currentIndex ? 'bg-amber-400/10 border border-amber-400/20 text-white' : 'hover:bg-slate-900/80 text-slate-300'"
        >
          <div class="flex items-center gap-3 min-w-0">
            <!-- Track Number or Playing Wave -->
            <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-bold text-slate-400 group-hover:bg-slate-700 group-hover:text-white">
              <span v-if="idx === currentIndex && isPlaying" class="flex items-end gap-0.5 h-3.5">
                <span class="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite] h-2"></span>
                <span class="w-0.5 bg-amber-400 rounded-full animate-[bounce_1.1s_infinite] h-3.5"></span>
                <span class="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite] h-1.5"></span>
              </span>
              <span v-else>{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Track Meta -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="truncate text-sm font-semibold" :class="idx === currentIndex ? 'text-amber-300' : 'text-slate-200'">
                  {{ track.categories ? `Audio — ${track.categories}` : `Track ${idx + 1}` }}
                </p>
                <span v-if="idx === currentIndex" class="rounded-full bg-amber-400/20 px-2 py-0.2 text-[10px] font-bold text-amber-300">
                  {{ isPlaying ? 'Playing' : 'Selected' }}
                </span>
              </div>
              <p class="text-xs text-slate-400 truncate">
                {{ track.description || title }}
              </p>
            </div>
          </div>

          <!-- Direct Track Actions -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <a
              v-if="track.audio_file"
              :href="track.audio_file"
              download
              @click.stop
              class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title="Download track"
            >
              <Icon name="Download" :size="15" />
            </a>
            <button
              class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition"
              title="Play track"
            >
              <Icon :name="idx === currentIndex && isPlaying ? 'Pause' : 'Play'" :size="15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import Icon from '@/components/icons/Icon.vue';

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
    default: () => [],
  },
  coverImage: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Audio Resource',
  },
  author: {
    type: String,
    default: '',
  },
});

const audioRef = ref(null);
const progressBarRef = ref(null);
const timeInputRef = ref(null);

const currentIndex = ref(0);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const playbackRate = ref(1);
const showPlaylist = ref(true);
const editingTime = ref(false);
const timeInputValue = ref('');
const isScrubbing = ref(false);

const currentTrack = computed(() => props.tracks[currentIndex.value] || null);
const currentTrackTitle = computed(() => {
  const t = currentTrack.value;
  if (t?.categories) return `${props.title} — ${t.categories}`;
  return props.title;
});

const progressPercent = computed(() => {
  if (!duration.value || duration.value === 0) return 0;
  return Math.min(100, (currentTime.value / duration.value) * 100);
});

function formatTime(secs) {
  if (!secs || isNaN(secs) || secs < 0) return '00:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = audioRef.value.duration || 0;
    audioRef.value.playbackRate = playbackRate.value;
  }
}

function onTimeUpdate() {
  if (!audioRef.value) return;
  currentTime.value = audioRef.value.currentTime || 0;
  // Some browsers/encodings don't fire loadedmetadata with a usable duration
  // until playback starts — keep it in sync so the total time never gets stuck at 00:00.
  const d = audioRef.value.duration;
  if (d && isFinite(d) && d !== duration.value) {
    duration.value = d;
  }
}

function onEnded() {
  if (currentIndex.value < props.tracks.length - 1) {
    nextTrack();
  } else {
    isPlaying.value = false;
    currentTime.value = 0;
  }
}

function onError(err) {
  console.warn('Audio playback error', err);
  isPlaying.value = false;
}

function togglePlay() {
  if (!audioRef.value) return;
  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true;
    }).catch((e) => {
      console.warn('Playback prevented', e);
    });
  }
}

function selectTrack(index) {
  if (index === currentIndex.value) {
    togglePlay();
    return;
  }
  currentIndex.value = index;
  currentTime.value = 0;
  isPlaying.value = true;
  setTimeout(() => {
    if (audioRef.value) {
      audioRef.value.play().catch(() => {
        isPlaying.value = false;
      });
    }
  }, 50);
}

function nextTrack() {
  if (currentIndex.value < props.tracks.length - 1) {
    selectTrack(currentIndex.value + 1);
  }
}

function prevTrack() {
  if (currentIndex.value > 0) {
    selectTrack(currentIndex.value - 1);
  }
}

function skip(seconds) {
  seekTo(currentTime.value + seconds);
}

function seekTo(seconds) {
  if (!audioRef.value || !duration.value) return;
  const clamped = Math.max(0, Math.min(duration.value, seconds));
  audioRef.value.currentTime = clamped;
  currentTime.value = clamped;
}

function fractionFromEvent(e) {
  const point = e.touches?.[0] || e;
  const rect = progressBarRef.value.getBoundingClientRect();
  const x = point.clientX - rect.left;
  return Math.max(0, Math.min(1, x / rect.width));
}

function startScrub(e) {
  if (!progressBarRef.value || !duration.value) return;
  isScrubbing.value = true;
  seekTo(fractionFromEvent(e) * duration.value);
  window.addEventListener('mousemove', onScrubMove);
  window.addEventListener('mouseup', stopScrub);
  window.addEventListener('touchmove', onScrubMove, { passive: false });
  window.addEventListener('touchend', stopScrub);
}

function onScrubMove(e) {
  if (!isScrubbing.value) return;
  e.preventDefault?.();
  seekTo(fractionFromEvent(e) * duration.value);
}

function stopScrub() {
  isScrubbing.value = false;
  window.removeEventListener('mousemove', onScrubMove);
  window.removeEventListener('mouseup', stopScrub);
  window.removeEventListener('touchmove', onScrubMove);
  window.removeEventListener('touchend', stopScrub);
}

// Parses "mm:ss", "h:mm:ss", or a bare number of seconds into total seconds.
function parseTimeInput(value) {
  const parts = value.trim().split(':').map((p) => p.trim());
  if (!parts.length || parts.some((p) => p === '' || isNaN(Number(p)))) return null;
  const nums = parts.map(Number);
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return nums[0] * 60 + nums[1];
  if (nums.length === 3) return nums[0] * 3600 + nums[1] * 60 + nums[2];
  return null;
}

function startEditTime() {
  timeInputValue.value = formatTime(currentTime.value);
  editingTime.value = true;
  nextTick(() => timeInputRef.value?.focus());
}

function commitEditTime() {
  const parsed = parseTimeInput(timeInputValue.value);
  if (parsed !== null) seekTo(parsed);
  editingTime.value = false;
}

function cancelEditTime() {
  editingTime.value = false;
}

function onVolumeChange(e) {
  const val = parseFloat(e.target.value);
  volume.value = val;
  if (audioRef.value) {
    audioRef.value.volume = val;
    isMuted.value = val === 0;
  }
}

function toggleMute() {
  if (!audioRef.value) return;
  isMuted.value = !isMuted.value;
  audioRef.value.muted = isMuted.value;
}

const speeds = [0.75, 1, 1.25, 1.5, 2];
function cyclePlaybackRate() {
  const nextIdx = (speeds.indexOf(playbackRate.value) + 1) % speeds.length;
  playbackRate.value = speeds[nextIdx];
  if (audioRef.value) {
    audioRef.value.playbackRate = playbackRate.value;
  }
}

watch(currentTrack, () => {
  currentTime.value = 0;
  duration.value = 0;
});

onBeforeUnmount(() => {
  if (audioRef.value) {
    audioRef.value.pause();
  }
  stopScrub();
});
</script>
