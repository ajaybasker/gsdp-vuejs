<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <PageHero
      eyebrow="Global Statistics"
      :title="heroTitle"
      description="A live snapshot of the registry and repository — every Region, Province, Community and Sector rolled up into one global picture, drawn from the current dataset."
      icon="TrendingUp"
      :stats="heroStats"
    />

    <main class="w-full px-4 md:px-8 xl:px-12 py-12">
      <LoadingState v-if="loading" label="Loading statistics…" />

      <template v-else>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(t, idx) in primaryTiles" :key="t.label" :class="`rounded-2xl border ${softFor(accentFor(idx))} p-6 shadow-sm shadow-slate-900/[0.03] sm:col-span-2`">
            <div :class="`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accentFor(idx)} text-white shadow-md shadow-slate-900/10`">
              <Icon :name="t.icon" :size="20" />
            </div>
            <div class="mt-4 text-xs font-medium text-slate-500">{{ t.label }}</div>
            <div class="mt-1 text-4xl font-bold text-slate-900 sm:text-5xl"><AnimatedCounter :value="t.value" /></div>
          </div>
          <div v-for="(t, idx) in secondaryTiles" :key="t.label" :class="`rounded-2xl border ${softFor(accentFor(idx + 2))} p-5 shadow-sm shadow-slate-900/[0.02]`">
            <div :class="`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${accentFor(idx + 2)} text-white shadow`">
              <Icon :name="t.icon" :size="16" />
            </div>
            <div class="mt-3 text-xs font-medium text-slate-500">{{ t.label }}</div>
            <div class="mt-1 text-3xl font-bold text-slate-900"><AnimatedCounter :value="t.value" /></div>
          </div>
        </div>

        <SectionCard v-if="sectorChart.length" title="Sectors by Sector Type" icon="Archive" :gradient="accentFor(1)" class-name="mt-8">
          <p class="mt-2 text-sm leading-relaxed text-slate-600">How the Salesian family's Sectors are distributed across ministry sector types, globally.</p>
          <div class="mt-4"><SimpleBarChart :data="sectorChart" /></div>
        </SectionCard>

        <SectionCard v-if="mapPoints.length" title="Global Reach" icon="Globe" :gradient="accentFor(2)" class-name="mt-8">
          <p class="mt-2 text-sm leading-relaxed text-slate-600">Every mapped Community location contributing to the registry, globally.</p>
          <div class="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4 shadow-sm">
            <WorldReachMap :points="mapPoints" />
          </div>
        </SectionCard>
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
import SectionCard from '@/components/public/SectionCard.vue';
import { accentFor, softFor } from '@/components/public/PageHero.js';
import LoadingState from '@/components/public/LoadingState.vue';
import AnimatedCounter from '@/components/public/AnimatedCounter.vue';
import WorldReachMap from '@/components/public/WorldReachMap.vue';
import SimpleBarChart from '@/components/public/SimpleBarChart.vue';
import Icon from '@/components/icons/Icon.vue';
import { getCounts, getMapPoints, getSectorCounts, listOrgUnits } from '@/api/registry.js';
import { listAssets, listCategories } from '@/api/repository.js';

const loading = ref(true);
const counts = ref({});
const countryCount = ref(0);
const assetCount = ref(0);
const categoryCount = ref(0);
const mapPoints = ref([]);
const sectorChart = ref([]);

onMounted(async () => {
  try {
    const [countRows, communities, sectorCounts, assets, points, categories] = await Promise.all([
      getCounts(),
      listOrgUnits({ doctype: 'Community', limit: 3000 }),
      getSectorCounts(),
      listAssets({ limit: 500 }),
      getMapPoints(),
      listCategories(),
    ]);
    counts.value = countRows;
    countryCount.value = new Set(communities.map((c) => c.country).filter(Boolean)).size;
    assetCount.value = assets.length;
    categoryCount.value = categories.length;
    mapPoints.value = points;
    sectorChart.value = sectorCounts.map((s) => ({ name: s.category_label, value: s.count }));
  } finally {
    loading.value = false;
  }
});

const heroTitle = computed(() => loading.value ? 'The Salesian family, in numbers' : `${(counts.value.Activity || 0).toLocaleString()}+ Sectors, globally`);

const heroStats = computed(() => loading.value ? null : [
  { value: countryCount.value, label: 'Countries' },
  { value: counts.value.Community || 0, label: 'Communities' },
  { value: assetCount.value, label: 'Published resources' },
]);

const primaryTiles = computed(() => [
  { label: 'Sectors', value: counts.value.Activity || 0, icon: 'Building' },
  { label: 'Communities', value: counts.value.Community || 0, icon: 'Users' },
]);
const secondaryTiles = computed(() => [
  { label: 'Countries', value: countryCount.value, icon: 'MapPin' },
  { label: 'Provinces', value: counts.value.Province || 0, icon: 'Building' },
  { label: 'Published Resources', value: assetCount.value, icon: 'Archive' },
  { label: 'Resource Categories', value: categoryCount.value, icon: 'Layers' },
]);
</script>
