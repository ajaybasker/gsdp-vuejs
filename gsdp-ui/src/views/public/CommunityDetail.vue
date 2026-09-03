<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <main v-if="loading" class="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading community…" /></main>

    <main v-else-if="notFound || !community" class="mx-auto max-w-5xl px-6 py-12">
      <EmptyState icon="Users" title="Community not found" message="This community may have been renamed or removed." />
      <div class="mt-6 text-center"><router-link to="/communities" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Community Directory</router-link></div>
    </main>

    <template v-else>
      <DetailHero
        back-to="/communities"
        back-label="Community Directory"
        :breadcrumb="breadcrumb"
        icon="Users"
        :gradient="accentFor(0)"
        :title="community.canonical_name"
        :subtitle="subtitle"
        :stats="[
          { value: activities.length, label: 'Sectors' },
          { value: events.length, label: 'Events logged' },
        ]"
      />

      <main class="mx-auto max-w-5xl px-6 py-12">
        <div class="space-y-6">
          <SectionCard title="Overview" icon="Building" :gradient="accentFor(0)">
            <dl class="mt-4 grid gap-4 sm:grid-cols-3">
              <div><dt class="text-xs text-slate-500">Province</dt><dd class="mt-1 text-sm text-slate-700">{{ provinceLabel }}</dd></div>
              <div><dt class="text-xs text-slate-500">Country</dt><dd class="mt-1 text-sm text-slate-700">{{ countryLabel }}</dd></div>
              <div><dt class="text-xs text-slate-500">Sectors</dt><dd class="mt-1 text-sm text-slate-700">{{ activities.length }}</dd></div>
            </dl>
          </SectionCard>

          <SectionCard :title="`Sectors (${activities.length})`" icon="Building" :gradient="accentFor(2)">
            <EmptyState v-if="activities.length === 0" icon="Building" title="No sectors on record" />
            <div v-else class="mt-4 grid gap-2.5 sm:grid-cols-2">
              <router-link
                v-for="(a, idx) in activities" :key="a.name" :to="`/sectors/${a.name}`"
                class="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span>{{ a.activity_name }}</span>
                <span v-if="a.activity_category" :class="`rounded-full bg-gradient-to-r ${accentFor(idx)} px-2 py-0.5 text-xs font-medium text-white`">{{ categoryLabel(a.activity_category) }}</span>
              </router-link>
            </div>
          </SectionCard>

          <SectionCard title="Events" icon="Calendar" :gradient="accentFor(3)">
            <div v-if="events.length === 0" class="mt-3 text-sm text-slate-500">No events have been logged for this community yet.</div>
            <div v-else class="mt-4 space-y-3">
              <div v-for="e in events" :key="e.name" class="rounded-xl border border-slate-200 p-4">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <div class="text-sm font-semibold text-slate-900">{{ e.event_name }}</div>
                  <div class="text-xs text-slate-400">{{ e.event_date }}</div>
                </div>
                <div class="mt-1 text-xs text-slate-500">{{ e.venue }}</div>
              </div>
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
import { accentFor } from '@/components/public/PageHero.js';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import { getChildren, getOrgUnit, listActivityCategories, listEvents } from '@/api/registry.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const community = ref(null);
const breadcrumb = ref([]);
const activities = ref([]);
const events = ref([]);
const categoryLabels = ref({});

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    const [{ doc, breadcrumb: trail }, kids, evts] = await Promise.all([
      getOrgUnit('Community', id),
      getChildren('Community', id),
      listEvents({ community: id, limit: 20 }),
    ]);
    community.value = doc;
    breadcrumb.value = trail;
    activities.value = kids;
    events.value = evts;
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  load(route.params.id);
  listActivityCategories().then((rows) => {
    categoryLabels.value = Object.fromEntries(rows.map((r) => [r.name, r.category_name]));
  }).catch(() => {});
});
watch(() => route.params.id, (id) => id && load(id));

const provinceLabel = computed(() => breadcrumb.value.find((b) => b.doctype === 'Province')?.label || '—');
const countryLabel = computed(() => community.value?.country || '—');
const subtitle = computed(() => {
  if (!community.value) return '';
  return community.value.city ? `${community.value.city}${countryLabel.value !== '—' ? `, ${countryLabel.value}` : ''}` : countryLabel.value;
});

function categoryLabel(name) {
  return categoryLabels.value[name] || name;
}
</script>
