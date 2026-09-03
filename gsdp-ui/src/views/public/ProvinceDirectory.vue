<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <PageHero
      eyebrow="Registry"
      title="Province Directory"
      description="Every Province, Vice-Province and Delegation in the global registry — search by name or filter by Region."
      icon="Building"
      :stats="!loading ? [
        { value: provinces.length, label: 'Total' },
        { value: regions.length, label: 'Regions' },
      ] : null"
    />

    <main class="w-full px-4 md:px-8 xl:px-12 py-12">
      <div class="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-white/90 p-4 shadow-sm">
        <div class="relative flex-1 min-w-[200px]">
          <Icon name="Search" :size="15" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input v-model="search" placeholder="Search by province name…" class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
        <select v-model="regionFilter" class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
          <option value="">All Regions</option>
          <option v-for="r in regions" :key="r.name" :value="r.name">{{ r.canonical_name }}</option>
        </select>
      </div>

      <LoadingState v-if="loading" label="Loading provinces…" />
      <EmptyState v-else-if="filtered.length === 0" icon="Building" title="No provinces match your filters" message="Try clearing the search or filters above." />
      <template v-else>
        <div class="mb-4 text-xs font-medium text-slate-500">{{ filtered.length }} of {{ provinces.length }} provinces</div>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <EntityCard
            v-for="(p, idx) in filtered"
            :key="p.name"
            :to="`/provinces/${p.name}`"
            icon="Building"
            :gradient="accentFor(idx)"
            :title="p.canonical_name"
            :subtitle="regionLabel(p.region)"
          >
            <template #meta>
              <span>{{ p.total_community || 0 }} Communit{{ (p.total_community || 0) === 1 ? 'y' : 'ies' }}</span>
            </template>
          </EntityCard>
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
import PageHero from '@/components/public/PageHero.vue';
import { accentFor } from '@/components/public/PageHero.js';
import EntityCard from '@/components/public/EntityCard.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { listOrgUnits } from '@/api/registry.js';

const loading = ref(true);
const provinces = ref([]);
const regions = ref([]);
const search = ref('');
const regionFilter = ref('');

onMounted(async () => {
  try {
    const [provinceRows, regionRows] = await Promise.all([
      listOrgUnits({ doctype: 'Province', limit: 300 }),
      listOrgUnits({ doctype: 'Region', limit: 50 }),
    ]);
    provinces.value = provinceRows;
    regions.value = regionRows;
  } finally {
    loading.value = false;
  }
});

function regionLabel(regionName) {
  return regions.value.find((r) => r.name === regionName)?.canonical_name || '';
}

const filtered = computed(() => provinces.value.filter((p) => {
  if (regionFilter.value && p.region !== regionFilter.value) return false;
  if (search.value && !p.canonical_name.toLowerCase().includes(search.value.toLowerCase())) return false;
  return true;
}));
</script>
