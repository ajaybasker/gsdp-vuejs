<template>
  <div class="relative min-h-screen bg-slate-50 font-sans text-slate-900">
    <PublicHeader />

    <!-- Loading State -->
    <main v-if="loading" class="mx-auto max-w-5xl px-6 py-16">
      <LoadingState label="Loading event details…" />
    </main>

    <!-- Not Found State -->
    <main v-else-if="notFound || !event" class="mx-auto max-w-5xl px-6 py-16">
      <EmptyState
        icon="Calendar"
        title="Event not found"
        message="This event may have been removed, renamed, or is currently unavailable."
      />
      <div class="mt-6 text-center">
        <router-link
          to="/news-events"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition"
        >
          <Icon name="ArrowLeft" :size="14" /> Back to Events Directory
        </router-link>
      </div>
    </main>

    <!-- Event Detail Page -->
    <template v-else>
      <DetailHero
        back-to="/news-events"
        back-label="Events"
        :breadcrumb="breadcrumb"
        icon="Calendar"
        :gradient="eventAccent"
        :image="coverImage"
        :title="event.event_name"
        :tag="event.event_type || 'Event'"
        :subtitle="heroSubtitle"
      />

      <!-- Quick Highlights Bar -->
      <div class="relative z-10 w-full px-4 -mt-8 md:px-8 xl:px-12">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date</div>
            <div class="mt-1 flex items-center gap-1.5 truncate text-sm font-bold text-brand-950">
              <Icon name="Calendar" :size="15" class="text-brand-600 shrink-0" />
              <span>{{ formatDisplayDate(event.event_date) || '—' }}</span>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Venue</div>
            <div class="mt-1 flex items-center gap-1.5 truncate text-sm font-bold text-brand-950" :title="event.venue">
              <Icon name="MapPin" :size="15" class="text-brand-600 shrink-0" />
              <span class="truncate">{{ event.venue || '—' }}</span>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Host Community</div>
            <div class="mt-1 flex items-center gap-1.5 truncate text-sm font-bold text-brand-950" :title="event.community_name">
              <Icon name="Building" :size="15" class="text-brand-600 shrink-0" />
              <router-link
                v-if="event.community"
                :to="`/communities/${encodeURIComponent(event.community)}`"
                class="truncate hover:text-brand-600 hover:underline"
              >
                {{ event.community_name || event.community }}
              </router-link>
              <span v-else class="truncate">{{ event.community_name || '—' }}</span>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Participants</div>
            <div class="mt-1 flex items-center gap-1.5 truncate text-sm font-bold text-brand-950">
              <Icon name="Users" :size="15" class="text-brand-600 shrink-0" />
              <span>{{ event.number_of_participants ? Number(event.number_of_participants).toLocaleString() : '—' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Body -->
      <main class="w-full px-4 py-10 md:px-8 xl:px-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          <!-- Left Column: Main Narrative & Details -->
          <article class="space-y-8 lg:col-span-2">
            <!-- Event Cover Image & Header Info -->
            <figure v-if="coverImage?.url" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                :src="coverImage.url"
                :alt="event.event_name"
                class="h-64 w-full object-cover sm:h-80 lg:h-96"
                loading="eager"
              />
              <figcaption class="flex flex-wrap items-center justify-between gap-2 bg-slate-900 px-5 py-2.5 text-xs text-slate-400">
                <span class="font-medium text-slate-200">{{ event.event_name }}</span>
                <span v-if="coverImage.credit" class="text-[11px] text-slate-400">Photo: {{ coverImage.credit }}</span>
              </figcaption>
            </figure>

            <!-- Description & Narrative -->
            <SectionCard title="About This Event" icon="FileText" :gradient="accentFor(0)">
              <div v-if="cleanDescription" class="prose prose-slate max-w-none text-[15px] sm:text-base leading-relaxed text-slate-700">
                <div v-html="formattedDescription" class="event-rich-text space-y-4"></div>
              </div>
              <p v-else class="text-sm italic text-slate-400">No extended description provided for this event.</p>

              <!-- Quick Badges -->
              <div class="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                <span v-if="event.event_type" class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-100">
                  <Icon name="Calendar" :size="13" /> {{ event.event_type }}
                </span>
                <span v-if="event.event_code" class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  Code: {{ event.event_code }}
                </span>
                <span v-if="event.target_activity" class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                  Target: {{ event.target_activity }}
                </span>
              </div>
            </SectionCard>

            <!-- Event Report (if available) -->
            <SectionCard v-if="event.event_report" title="Event Report & Narrative" icon="FileText" :gradient="accentFor(1)">
              <div class="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700">
                <div v-html="event.event_report" class="event-rich-text space-y-3"></div>
              </div>
            </SectionCard>

            <!-- Press & Communication (if available) -->
            <SectionCard v-if="event.press_release || event.press_release_attachment" title="Press & Public Communication" icon="Globe" :gradient="accentFor(2)">
              <div v-if="event.press_release" class="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 mb-4">
                <div v-html="event.press_release" class="event-rich-text space-y-3"></div>
              </div>
              <div v-if="event.press_release_attachment" class="mt-4 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <Icon name="Download" :size="18" />
                  </div>
                  <div class="min-w-0">
                    <div class="truncate text-sm font-semibold text-slate-800">Official Press Release Document</div>
                    <div class="text-xs text-slate-400">Attached communication file</div>
                  </div>
                </div>
                <a
                  :href="event.press_release_attachment"
                  target="_blank"
                  download
                  class="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
                >
                  <Icon name="Download" :size="14" /> Download
                </a>
              </div>
            </SectionCard>

            <!-- Media Attachment Section (if uploaded file exists) -->
            <SectionCard v-if="event.media_attachment" title="Media & Attachments" icon="Image" :gradient="accentFor(3)">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-100">
                    <Icon name="Image" :size="22" />
                  </div>
                  <div class="min-w-0">
                    <div class="truncate text-sm font-bold text-slate-800">Event Media Document</div>
                    <div class="text-xs text-slate-500">Official photos / documents archive</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <a
                    :href="event.media_attachment"
                    target="_blank"
                    rel="noreferrer"
                    class="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    View File
                  </a>
                  <a
                    :href="event.media_attachment"
                    download
                    class="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
                  >
                    <Icon name="Download" :size="14" /> Download
                  </a>
                </div>
              </div>
            </SectionCard>

            <!-- Additional Notes (if available) -->
            <SectionCard v-if="event.notes" title="Additional Notes" icon="FileText" :gradient="accentFor(4)">
              <p class="whitespace-pre-line text-sm leading-relaxed text-slate-600">{{ event.notes }}</p>
            </SectionCard>
          </article>

          <!-- Right Column: Sidebar Meta & Details -->
          <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <!-- Schedule & Date Information -->
            <SectionCard title="Schedule & Timing" icon="Clock" :gradient="accentFor(0)">
              <dl class="mt-3 space-y-3.5 text-sm">
                <div>
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Execution Date</dt>
                  <dd class="mt-1 font-bold text-slate-800 flex items-center gap-2">
                    <Icon name="Calendar" :size="15" class="text-brand-600" />
                    {{ formatDisplayDate(event.event_date) || '—' }}
                  </dd>
                </div>

                <div v-if="event.start_time || event.end_time">
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Timing</dt>
                  <dd class="mt-1 font-medium text-slate-700 flex items-center gap-2">
                    <Icon name="Clock" :size="15" class="text-brand-600" />
                    <span>{{ event.start_time ? formatTime(event.start_time) : '' }}</span>
                    <span v-if="event.start_time && event.end_time"> – </span>
                    <span>{{ event.end_time ? formatTime(event.end_time) : '' }}</span>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Event Code</dt>
                  <dd class="mt-1 font-mono text-xs font-bold text-slate-700">{{ event.event_code || '—' }}</dd>
                </div>

                <div v-if="event.published_by || event.published_on">
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published</dt>
                  <dd class="mt-1 text-xs font-medium text-slate-600">
                    <span v-if="event.published_by">{{ event.published_by }}</span>
                    <span v-if="event.published_by && event.published_on"> · </span>
                    <span v-if="event.published_on">{{ formatDisplayDate(event.published_on) }}</span>
                  </dd>
                </div>
              </dl>
            </SectionCard>

            <!-- Location & Institutional Context -->
            <SectionCard title="Hosting & Location" icon="MapPin" :gradient="accentFor(1)">
              <dl class="mt-3 space-y-4 text-sm">
                <div>
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Designated Venue</dt>
                  <dd class="mt-1 font-bold text-slate-800">{{ event.venue || '—' }}</dd>
                </div>

                <div v-if="event.community">
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Community House</dt>
                  <dd class="mt-1">
                    <router-link
                      :to="`/communities/${encodeURIComponent(event.community)}`"
                      class="font-bold text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1.5"
                    >
                      <Icon name="Building" :size="14" /> {{ event.community_name || event.community }}
                    </router-link>
                    <p v-if="event.community_doc?.city" class="text-xs text-slate-500 mt-0.5">
                      {{ event.community_doc.city }}, {{ event.community_doc.country || '' }}
                    </p>
                  </dd>
                </div>

                <div v-if="event.province">
                  <dt class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salesian Province</dt>
                  <dd class="mt-1">
                    <router-link
                      :to="`/provinces/${encodeURIComponent(event.province)}`"
                      class="font-bold text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1.5"
                    >
                      <Icon name="Globe" :size="14" /> {{ event.province_name || event.province }}
                    </router-link>
                    <p v-if="event.region_name" class="text-xs text-slate-500 mt-0.5">
                      Region: {{ event.region_name }}
                    </p>
                  </dd>
                </div>
              </dl>
            </SectionCard>

            <!-- Participation Statistics -->
            <SectionCard title="Participation Statistics" icon="Users" :gradient="accentFor(2)">
              <div class="mt-3 grid grid-cols-2 gap-3">
                <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                  <div class="text-2xl font-black text-brand-900">{{ Number(event.number_of_participants || 0).toLocaleString() }}</div>
                  <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Participants</div>
                </div>

                <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                  <div class="text-2xl font-black text-brand-900">{{ Number(event.number_of_staff || 0).toLocaleString() }}</div>
                  <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Staff Members</div>
                </div>

                <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                  <div class="text-2xl font-black text-brand-900">{{ Number(event.number_of_volunteers || 0).toLocaleString() }}</div>
                  <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Volunteers</div>
                </div>

                <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                  <div class="text-2xl font-black text-brand-900">{{ Number(event.number_of_animators || 0).toLocaleString() }}</div>
                  <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Animators</div>
                </div>
              </div>
            </SectionCard>

            <!-- Navigation Actions -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <router-link
                to="/news-events"
                class="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-600 bg-brand-50/50 py-3 text-sm font-bold text-brand-700 hover:bg-brand-100 transition shadow-sm"
              >
                <Icon name="ArrowLeft" :size="16" /> Back to All Events
              </router-link>

              <button
                @click="shareEvent"
                class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Icon name="Link" :size="16" /> {{ copied ? 'Link Copied!' : 'Share Event Link' }}
              </button>
            </div>
          </aside>
        </div>

        <!-- Related Events Section -->
        <div v-if="relatedEvents && relatedEvents.length" class="mt-16">
          <SectionCard title="Other Congregational Events" icon="Calendar" :gradient="accentFor(3)">
            <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <router-link
                v-for="(r, idx) in relatedEvents"
                :key="r.name"
                :to="`/news-events/${encodeURIComponent(r.name)}`"
                class="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-300 hover:-translate-y-1 transition-all duration-300"
              >
                <div v-if="coverFor(r)" class="h-36 w-full overflow-hidden bg-slate-900">
                  <img :src="coverFor(r)" :alt="r.event_name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div v-else :class="`h-1.5 w-full bg-gradient-to-r ${accentFor(idx + 1)}`" />
                <div class="p-5 flex flex-col flex-1">
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="inline-block px-2.5 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-brand-100/50">
                      {{ r.event_type || 'Event' }}
                    </span>
                    <span class="text-xs font-semibold text-slate-400">{{ formatDisplayDate(r.event_date) }}</span>
                  </div>

                  <h4 class="text-base font-bold text-brand-950 leading-snug group-hover:text-brand-700 transition-colors mb-2">
                    {{ r.event_name }}
                  </h4>

                  <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span class="truncate">{{ r.venue || r.community_name || 'Salesian Presences' }}</span>
                    <span class="font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">View →</span>
                  </div>
                </div>
              </router-link>
            </div>
          </SectionCard>
        </div>
      </main>
    </template>

    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import DetailHero from '@/components/public/DetailHero.vue';
import SectionCard from '@/components/public/SectionCard.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { accentFor } from '@/components/public/PageHero.js';
import { getEvent } from '@/api/registry.js';
import { DEFAULT_COVER_IMAGE, PUBLIC_HERO_IMAGES } from '@/data/repositoryImages.js';

const EVENT_TYPE_FALLBACK_IMAGES = {
  Retreat: {
    url: 'https://images.unsplash.com/photo-1543157148-f815daaac015?w=1280&q=80',
    credit: 'Unsplash (Spiritual Gathering)',
  },
  Camp: {
    url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=1280&q=80',
    credit: 'Unsplash (Youth Leadership Camp)',
  },
  Congress: {
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1280&q=80',
    credit: 'Unsplash (Assembly & Congress)',
  },
  Feast: {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&q=80',
    credit: 'Unsplash (Community Celebration)',
  },
  Outreach: {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1280&q=80',
    credit: 'Unsplash (Youth Outreach & Social Work)',
  },
};

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const event = ref(null);
const breadcrumb = ref([]);
const relatedEvents = ref([]);
const copied = ref(false);

const eventAccent = computed(() => {
  const t = event.value?.event_type;
  if (t === 'Camp') return accentFor(1);
  if (t === 'Retreat') return accentFor(2);
  if (t === 'Congress') return accentFor(3);
  if (t === 'Feast') return accentFor(4);
  return accentFor(0);
});

const heroSubtitle = computed(() => {
  if (!event.value) return '';
  const parts = [];
  if (event.value.event_date) parts.push(formatDisplayDate(event.value.event_date));
  if (event.value.venue) parts.push(event.value.venue);
  if (event.value.community_name) parts.push(event.value.community_name);
  else if (event.value.province_name) parts.push(event.value.province_name);
  return parts.join(' · ');
});

const coverImage = computed(() => {
  if (event.value?.cover_image) {
    return {
      url: event.value.cover_image,
      credit: '',
    };
  }
  if (event.value?.media_attachment && isImageUrl(event.value.media_attachment)) {
    return {
      url: event.value.media_attachment,
      credit: 'Event Documentation',
    };
  }
  const type = event.value?.event_type;
  if (type && EVENT_TYPE_FALLBACK_IMAGES[type]) {
    return EVENT_TYPE_FALLBACK_IMAGES[type];
  }
  return PUBLIC_HERO_IMAGES.news || DEFAULT_COVER_IMAGE;
});

function isImageUrl(url) {
  if (!url) return false;
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(url);
}

function coverFor(row) {
  if (row?.cover_image) return row.cover_image;
  if (row?.media_attachment && isImageUrl(row.media_attachment)) return row.media_attachment;
  return null;
}

const cleanDescription = computed(() => stripHtml(event.value?.description || ''));

const formattedDescription = computed(() => {
  const desc = event.value?.description || '';
  if (!desc) return '';
  // If description contains HTML tags from Frappe text editor
  if (/<[a-z][\s\S]*>/i.test(desc)) {
    return desc;
  }
  // Otherwise wrap plain text into paragraphs
  return desc
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');
});

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${day} ${months[monthIndex]} ${year}`;
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  try {
    const [h, m] = timeStr.split(':');
    if (h !== undefined && m !== undefined) {
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${m} ${ampm}`;
    }
  } catch {
    // fallback
  }
  return timeStr;
}

function stripHtml(html) {
  if (!html) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  const decoded = textarea.value;
  return decoded.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function load(id) {
  if (!id) return;
  loading.value = true;
  notFound.value = false;
  try {
    const res = await getEvent(id);
    if (!res || !res.doc) {
      notFound.value = true;
      return;
    }
    event.value = res.doc;
    breadcrumb.value = res.breadcrumb || [];
    relatedEvents.value = res.related || [];
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

function shareEvent() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2500);
    });
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (newId) => {
  if (newId) load(newId);
});
</script>

<style scoped>
.event-rich-text :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
}
.event-rich-text :deep(p:last-child) {
  margin-bottom: 0;
}
.event-rich-text :deep(h1),
.event-rich-text :deep(h2),
.event-rich-text :deep(h3) {
  font-weight: 800;
  color: #0b193f;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.event-rich-text :deep(ul),
.event-rich-text :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.event-rich-text :deep(li) {
  margin-bottom: 0.35rem;
}
</style>
