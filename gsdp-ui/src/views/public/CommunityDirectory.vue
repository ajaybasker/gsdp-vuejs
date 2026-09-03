<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <PageHero
      eyebrow="Registry"
      title="Community Directory"
      description="Every Community across the global Salesian registry — search by name or narrow down by Province, country and sector type."
      icon="Users"
      :stats="!loading ? [
        { value: communities.length.toLocaleString(), label: 'Communities' },
        { value: provincesRepresented, label: 'Provinces' },
        { value: countryOptions.length, label: 'Countries' },
      ] : null"
    />

    <main class="w-full px-4 md:px-8 xl:px-12 py-12">
      <div class="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-white/90 p-4 shadow-sm">
        <div class="relative flex-1 min-w-[200px]">
          <Icon name="Search" :size="15" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input v-model="search" placeholder="Search by community name…"
            class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
        <select v-model="provinceFilter" class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
          <option value="">All Provinces</option>
          <option v-for="p in provinces" :key="p.name" :value="p.name">{{ p.canonical_name }}</option>
        </select>
        <select v-model="countryFilter" class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
          <option value="">All Countries</option>
          <option v-for="c in countryOptions" :key="c.name" :value="c.name">{{ c.country_name }}</option>
        </select>
        <select v-model="sectorFilter" class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
          <option value="">All Sector Types</option>
          <option v-for="s in categories" :key="s.name" :value="s.name">{{ s.category_name }}</option>
        </select>
      </div>

      <LoadingState v-if="loading" label="Loading communities…" />
      <div v-else-if="sectorFilter && sectorLoading" class="mb-4 text-xs text-slate-500">Loading sector data…</div>
      <EmptyState v-else-if="filtered.length === 0" icon="Users" title="No communities match your filters" message="Try clearing the search or filters above." />
      <template v-else>
        <div class="mb-3 text-xs font-medium text-slate-500">
          {{ filtered.length }} of {{ communities.length }} communities{{ filtered.length > visible ? ` — showing first ${visible}` : '' }}
        </div>
        <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <EntityCard v-for="(c, idx) in filtered.slice(0, visible)" :key="c.name" :to="`/communities/${c.name}`" icon="Users" :gradient="accentFor(idx)" :title="c.canonical_name" dense>
            <template #meta>
              <span class="flex items-center gap-1"><Icon name="MapPin" :size="12" /> {{ c.city || '—' }}</span>
            </template>
          </EntityCard>
        </div>
        <div v-if="filtered.length > visible" class="mt-8 text-center">
          <button @click="visible += PAGE_SIZE" class="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-slate-50">
            Show more
          </button>
        </div>
      </template>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import PageHero from '@/components/public/PageHero.vue';
import { accentFor } from '@/components/public/PageHero.js';
import EntityCard from '@/components/public/EntityCard.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { listActivityCategories, listCountries, listOrgUnits } from '@/api/registry.js';

const PAGE_SIZE = 60;

const loading = ref(true);
const communities = ref([]);
const provinces = ref([]);
const countryOptions = ref([]);
const categories = ref([]);
const provinceFilter = ref('');
const countryFilter = ref('');
const sectorFilter = ref('');
const search = ref('');
const visible = ref(PAGE_SIZE);

const sectorIndex = ref(null);
const sectorLoading = ref(false);

onMounted(async () => {
  try {
    const [communityRows, provinceRows, countries, cats] = await Promise.all([
      listOrgUnits({ doctype: 'Community', limit: 3000 }),
      listOrgUnits({ doctype: 'Province', limit: 500 }),
      listCountries(),
      listActivityCategories(),
    ]);
    communities.value = communityRows;
    provinces.value = [...provinceRows].sort((a, b) => a.canonical_name.localeCompare(b.canonical_name));
    countryOptions.value = countries;
    categories.value = cats;
  } finally {
    loading.value = false;
  }
});

watch(sectorFilter, async (val) => {
  if (!val || sectorIndex.value) return;
  sectorLoading.value = true;
  try {
    const activities = await listOrgUnits({ doctype: 'Activity', limit: 4000 });
    const idx = {};
    for (const a of activities) {
      if (!a.community || !a.activity_category) continue;
      if (!idx[a.community]) idx[a.community] = new Set();
      idx[a.community].add(a.activity_category);
    }
    sectorIndex.value = idx;
  } finally {
    sectorLoading.value = false;
  }
});

const provincesRepresented = computed(() => new Set(communities.value.map((c) => c.province).filter(Boolean)).size);

const filtered = computed(() =>
  communities.value.filter((c) => {
    if (provinceFilter.value && c.province !== provinceFilter.value) return false;
    if (countryFilter.value && c.country !== countryFilter.value) return false;
    if (sectorFilter.value && !sectorIndex.value?.[c.name]?.has(sectorFilter.value)) return false;
    if (search.value && !c.canonical_name.toLowerCase().includes(search.value.toLowerCase())) return false;
    return true;
  })
);

watch([provinceFilter, countryFilter, sectorFilter, search], () => { visible.value = PAGE_SIZE; });
</script>
