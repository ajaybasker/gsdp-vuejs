<template>
  <div class="relative min-h-screen bg-slate-50 font-sans">
    <PublicHeader />

    <main class="w-full px-4 md:px-8 xl:px-12 py-12 space-y-16">
      <div class="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
        <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div class="relative flex flex-wrap items-center justify-between gap-6 sm:gap-8">
          <div class="flex-1 min-w-0">
            <div class="mb-2 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Icon name="Building" :size="16" />
              </div>
              <span class="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-600">Registry</span>
            </div>
            <h1 class="text-[28px] font-extrabold tracking-tight text-slate-900 mb-3">Pastoral Works Directory</h1>
            <p class="max-w-2xl text-[15px] leading-relaxed text-slate-500">
              Guided by Don Bosco's motto "Da mihi animas, cetera tolle", Salesian pastoral work is organized around education and evangelization for young people.
            </p>
          </div>
          <div v-if="!loading" class="flex flex-wrap gap-4">
            <div class="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
              <div class="text-2xl font-extrabold text-brand-900">{{ activities.length.toLocaleString() }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Sectors</div>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
              <div class="text-2xl font-extrabold text-brand-900">{{ categories.length }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Sector Types</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md">
            <Icon name="Globe" :size="18" />
          </div>
          <h2 class="text-2xl font-extrabold text-brand-950">Our Pastoral Mission</h2>
        </div>
        <p class="text-[15px] leading-relaxed text-slate-600 mb-8 max-w-4xl">
          Salesian works are traditionally grouped into these core categories, all aimed at serving young people, especially the poor and at risk.
        </p>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="cat in PASTORAL_CATEGORIES" :key="cat.title"
            @click="updateFilters('', cat.subtype)"
            class="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 flex flex-col items-center text-center w-full text-left"
          >
            <div class="mb-5 h-36 w-36 rounded-full overflow-hidden ring-4 ring-brand-50 shadow-lg group-hover:ring-brand-200 transition-all duration-300 shrink-0">
              <img :src="cat.image" :alt="cat.title" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 class="text-[15px] font-bold text-brand-950 mb-2 leading-snug group-hover:text-brand-700">{{ cat.title }}</h3>
            <p class="text-[13px] leading-relaxed text-slate-500">{{ cat.desc }}</p>
            <span v-if="!loading && typeCounts[cat.subtype]" class="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-extrabold text-brand-700">
              {{ typeCounts[cat.subtype].toLocaleString() }} records
            </span>
          </button>
        </div>

        <div id="directory-list" class="mt-10 flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="relative w-full sm:flex-1">
            <Icon name="Search" :size="15" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input :value="search" @input="updateFilters($event.target.value, subtypeFilter)" placeholder="Search by sector name…"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-[14px] text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto min-w-0">
            <select :value="subtypeFilter" @change="updateFilters(search, $event.target.value)"
              class="w-full sm:w-auto min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none">
              <option value="">All Sector Types</option>
              <option v-for="c in categories" :key="c.name" :value="c.name">{{ c.category_name }}</option>
            </select>
            <button v-if="hasActiveFilter" @click="updateFilters('', '')"
              class="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">
              Clear
            </button>
          </div>
        </div>

        <div v-if="loading" class="mt-8"><LoadingState label="Loading sectors…" /></div>
        <div v-else-if="hasActiveFilter && filtered.length === 0" class="mt-8">
          <EmptyState icon="Building" title="No sectors match your search" message="Try a different name or clear the sector-type filter." />
        </div>
        <div v-else-if="hasActiveFilter && filtered.length > 0" class="mt-8">
          <div class="mb-5 flex items-center justify-between">
            <span class="text-[13px] font-bold text-slate-700">
              {{ filtered.length }} match{{ filtered.length === 1 ? '' : 'es' }}{{ filtered.length > MAX_RESULTS ? ` — showing first ${MAX_RESULTS}` : '' }}
            </span>
            <button @click="updateFilters('', '')" class="text-[13px] font-semibold text-brand-600 hover:text-brand-800 transition">Clear filter</button>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Reveal v-for="(inst, idx) in results" :key="inst.name" :delay="idx * 30">
              <router-link :to="`/sectors/${inst.name}`" class="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                <div :class="`h-1 w-full bg-gradient-to-r ${accentFor(idx)}`" />
                <div class="p-5 flex flex-col flex-1">
                  <div class="mb-3 flex items-center gap-3">
                    <div :class="`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentFor(idx)} text-white shadow-md text-lg`">
                      {{ TYPE_ICONS[categoryLabels[inst.activity_category]] || '🏛️' }}
                    </div>
                    <span v-if="inst.activity_category" class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ categoryLabels[inst.activity_category] }}</span>
                  </div>
                  <h3 class="text-[14px] font-bold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors">{{ inst.activity_name }}</h3>
                  <p v-if="inst.city" class="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
                    <Icon name="MapPin" :size="12" /> {{ inst.city }}
                  </p>
                </div>
              </router-link>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import Reveal from '@/components/public/Reveal.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { accentFor } from '@/components/public/PageHero.js';
import { listActivityCategories, listOrgUnits } from '@/api/registry.js';

const MAX_RESULTS = 60;
const TYPE_ICONS = {
  School: '🏫', Parish: '⛪', Oratory: '🎯', 'Social Work': '🤝',
  'TVET Center': '🔧', 'Higher Education': '🎓', Company: '🏢',
};
const PASTORAL_CATEGORIES = [
  { title: 'School', subtype: 'School', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80', desc: "Salesian schools provide quality education rooted in the Preventive System of Don Bosco — nurturing young people academically, morally, and spiritually." },
  { title: 'Higher Education', subtype: 'Higher Education', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', desc: 'Salesian universities and colleges offer higher academic formation, combining intellectual excellence with human and Christian development.' },
  { title: 'Parishes', subtype: 'Parish', image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&q=80', desc: 'Salesian parishes are vibrant centres of evangelization and community life, integrating liturgy, catechesis, and youth ministry.' },
  { title: 'Social Work', subtype: 'Social Work', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', desc: 'Salesian social works reach out to the poorest and most marginalized — shelters, rehabilitation, and community development.' },
  { title: 'Oratories & Youth Centres', subtype: 'Oratory', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', desc: 'The Oratory is the original Salesian work-form dating back to Don Bosco in 1841 — recreation, friendship, and formation.' },
  { title: 'VTC (Vocational Training Centres)', subtype: 'TVET Center', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', desc: 'Salesian vocational and technical centres provide practical skills and professional formation for young people.' },
];

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const activities = ref([]);
const categories = ref([]);
const categoryLabels = ref({});

const search = computed(() => route.query.q || '');
const subtypeFilter = computed(() => route.query.subtype || '');

onMounted(async () => {
  try {
    const [rows, cats] = await Promise.all([
      listOrgUnits({ doctype: 'Activity', limit: 4000 }),
      listActivityCategories(),
    ]);
    activities.value = rows;
    categories.value = cats;
    categoryLabels.value = Object.fromEntries(cats.map((c) => [c.name, c.category_name]));
  } finally {
    loading.value = false;
  }
});

function updateFilters(q, subtype) {
  const query = {};
  if (q) query.q = q;
  if (subtype) query.subtype = subtype;
  router.replace({ path: '/sectors', query });
  setTimeout(() => {
    document.getElementById('directory-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

const filtered = computed(() => activities.value.filter((i) => {
  if (subtypeFilter.value && categoryLabels.value[i.activity_category] !== subtypeFilter.value) return false;
  if (search.value && !i.activity_name.toLowerCase().includes(search.value.toLowerCase())) return false;
  return true;
}));

const hasActiveFilter = computed(() => Boolean(search.value || subtypeFilter.value));
const results = computed(() => filtered.value.slice(0, MAX_RESULTS));

const typeCounts = computed(() => {
  const counts = {};
  for (const inst of activities.value) {
    const key = categoryLabels.value[inst.activity_category] || 'Other';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
});
</script>
