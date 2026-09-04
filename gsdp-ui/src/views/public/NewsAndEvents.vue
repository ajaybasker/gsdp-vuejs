<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <PublicHeader />

    <div class="w-full bg-brand-950 text-white">
      <div class="w-full px-4 md:px-8 xl:px-12 py-10">
        <div class="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-brand-400 mb-2">Latest Updates</p>
            <h1 class="text-[28px] font-extrabold mb-2">Events</h1>
            <p class="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
              Activities, formation sessions, and congresses logged across Communities and Provinces — most recent first.
            </p>
          </div>
          <div v-if="!loading" class="flex flex-wrap gap-4">
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-center">
              <div class="text-2xl font-extrabold">{{ events.length }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Events logged</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-center">
              <div class="text-2xl font-extrabold">{{ reportingUnits }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Reporting units</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-center">
              <div class="text-2xl font-extrabold">{{ totalParticipants.toLocaleString() }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Participants reached</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="w-full px-4 md:px-8 xl:px-12 py-12">
      <Reveal>
        <div class="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="relative flex-1 min-w-[220px]">
            <Icon name="Search" :size="15" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="search" placeholder="Search events or locations…"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-[14px] text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
          </div>
          <select v-model="typeFilter" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none">
            <option value="">All Event Types</option>
            <option v-for="t in eventTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <input v-model="dateFilter" type="date" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
          <button v-if="hasFilter" @click="search = ''; typeFilter = ''; dateFilter = ''" class="rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">Clear</button>
        </div>
      </Reveal>

      <LoadingState v-if="loading" label="Loading events…" />
      <EmptyState v-else-if="hasFilter && filteredEvents.length === 0" icon="Calendar" title="No events match your filters" message="Try a different search term or clear the filters." />
      <template v-else-if="filteredEvents.length > 0">
        <Reveal v-if="hasFilter">
          <div class="mb-5 flex items-center justify-between">
            <span class="text-[13px] font-bold text-slate-700">{{ filteredEvents.length }} match{{ filteredEvents.length === 1 ? '' : 'es' }}</span>
          </div>
        </Reveal>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal v-for="(e, idx) in filteredEvents" :key="e.name" :delay="idx * 40">
            <div class="group flex flex-col h-full rounded-[20px] border border-slate-200 bg-white shadow-md shadow-brand-900/5 overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 hover:-translate-y-1.5 transition-all duration-500">
              <div :class="`h-2 w-full bg-gradient-to-r ${accentFor(idx)}`" />
              <div class="p-6 flex flex-col flex-1">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span class="inline-block px-2.5 py-1 bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 shadow-sm border border-brand-100/50">
                      {{ e.event_type_label }}
                    </span>
                    <h3 class="text-lg font-extrabold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors">{{ e.event_name }}</h3>
                  </div>
                  <div class="text-[11px] font-extrabold text-brand-700 bg-brand-50 border border-brand-100 shadow-sm px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0">{{ formatDate(e.event_date) }}</div>
                </div>

                <div v-if="e.community_name || e.province_name" class="text-[13px] text-slate-600 font-bold mb-4 flex items-center gap-2">
                  <Icon name="Building" :size="15" class="text-brand-500" /> {{ e.community_name || e.province_name }}
                </div>

                <div class="flex flex-wrap gap-2 text-[12px] font-bold text-slate-500 mb-5">
                  <span v-if="e.venue" class="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-sm">
                    <Icon name="MapPin" :size="13" class="text-slate-400" /> {{ e.venue }}
                  </span>
                </div>

                <p v-if="e.description" class="mt-auto bg-slate-50/80 rounded-xl p-4 text-[15px] font-medium leading-relaxed text-slate-700 border border-slate-100 line-clamp-3">
                  {{ stripHtml(e.description) }}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </template>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Reveal from '@/components/public/Reveal.vue';
import Icon from '@/components/icons/Icon.vue';
import { accentFor } from '@/components/public/PageHero.js';
import { listEvents } from '@/api/registry.js';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d}-${m}-${y.slice(-2)}`;
  }
  return dateStr;
}

function stripHtml(html) {
  if (!html) return '';
  // 1. Decode HTML entities (e.g. &lt;div&gt; -> <div>)
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  const decoded = textarea.value;
  // 2. Strip HTML tags from the decoded string
  const text = decoded.replace(/<[^>]*>/g, ' ');
  // 3. Remove extra whitespace
  return text.replace(/\s+/g, ' ').trim();
}

function inferEventType(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('camp')) return 'Camp';
  if (n.includes('congress')) return 'Congress';
  if (n.includes('exhibition')) return 'Exhibition';
  if (n.includes('fair')) return 'Fair';
  if (n.includes('meet')) return 'Meet';
  if (n.includes('retreat')) return 'Retreat';
  if (n.includes('seminar') || n.includes('session')) return 'Seminar / Session';
  if (n.includes('training')) return 'Training';
  if (n.includes('celebration') || n.includes('feast')) return 'Celebration';
  if (n.includes('outreach')) return 'Outreach';
  return 'General Event';
}

const loading = ref(true);
const events = ref([]);
const search = ref('');
const typeFilter = ref('');
const dateFilter = ref('');

onMounted(async () => {
  try {
    const rows = await listEvents({ limit: 100 });
    events.value = rows.map((r) => ({ ...r, event_type_label: inferEventType(r.event_name) }));
  } finally {
    loading.value = false;
  }
});

const reportingUnits = computed(() => new Set(events.value.map((e) => e.community_name || e.province_name).filter(Boolean)).size);
const totalParticipants = computed(() => events.value.reduce((sum, e) => sum + (Number(e.number_of_participants) || 0), 0));
const eventTypes = computed(() => [...new Set(events.value.map((e) => e.event_type_label).filter(Boolean))].sort());

const filteredEvents = computed(() =>
  events.value.filter((e) => {
    if (search.value && !e.event_name?.toLowerCase().includes(search.value.toLowerCase()) && !(e.community_name || '').toLowerCase().includes(search.value.toLowerCase())) return false;
    if (typeFilter.value && e.event_type_label !== typeFilter.value) return false;
    if (dateFilter.value && e.event_date !== dateFilter.value) return false;
    return true;
  })
);

const hasFilter = computed(() => Boolean(search.value || typeFilter.value || dateFilter.value));
</script>
