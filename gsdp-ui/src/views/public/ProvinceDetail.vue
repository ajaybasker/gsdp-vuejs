<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <main v-if="loading" class="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading province…" /></main>

    <main v-else-if="notFound || !province" class="mx-auto max-w-5xl px-6 py-12">
      <EmptyState icon="Building" title="Province not found" message="This province may have been renamed or removed." />
      <div class="mt-6 text-center"><router-link to="/provinces" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Province Directory</router-link></div>
    </main>

    <template v-else>
      <DetailHero
        back-to="/provinces"
        back-label="Province Directory"
        :breadcrumb="breadcrumb"
        icon="Building"
        :gradient="accentFor(0)"
        :title="province.canonical_name"
        tag="Province"
        :stats="[
          { value: communities.length, label: 'Communities' },
          { value: events.length, label: 'Events logged' },
        ]"
      />

      <main class="mx-auto max-w-5xl px-6 py-12">
        <div class="space-y-6">
          <SectionCard title="Profile" icon="Building" :gradient="accentFor(0)">
            <dl class="mt-4 grid gap-4 sm:grid-cols-3">
              <div><dt class="text-xs text-slate-500">Province Code</dt><dd class="mt-1 text-sm text-slate-700">{{ province.province_code }}</dd></div>
              <div><dt class="text-xs text-slate-500">Region</dt><dd class="mt-1 text-sm text-slate-700">{{ regionName || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Communities</dt><dd class="mt-1 text-sm text-slate-700">{{ communities.length }}</dd></div>
            </dl>
          </SectionCard>

          <SectionCard :title="`Communities (${communities.length})`" icon="Users" :gradient="accentFor(2)">
            <EmptyState v-if="communities.length === 0" icon="Users" title="No communities on record" />
            <div v-else class="mt-4 grid gap-2.5 sm:grid-cols-2">
              <router-link
                v-for="c in communities" :key="c.name" :to="`/communities/${c.name}`"
                class="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span>{{ c.canonical_name }}</span>
                <span v-if="c.city" class="flex items-center gap-1 text-xs text-slate-400"><Icon name="MapPin" :size="12" /> {{ c.city }}</span>
              </router-link>
            </div>
          </SectionCard>

          <SectionCard title="Recent Events" icon="Calendar" :gradient="accentFor(3)">
            <div v-if="events.length === 0" class="mt-3 text-sm text-slate-500">No events have been logged for this province yet.</div>
            <div v-else class="mt-4 space-y-3">
              <div v-for="e in events" :key="e.name" class="rounded-xl border border-slate-200 p-4">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <div class="text-sm font-semibold text-slate-900">{{ e.event_name }}</div>
                  <div class="text-xs text-slate-400">{{ e.event_date }}</div>
                </div>
                <div class="mt-1 text-xs text-slate-500">{{ e.venue }} · {{ e.community_name }}</div>
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
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import DetailHero from '@/components/public/DetailHero.vue';
import SectionCard from '@/components/public/SectionCard.vue';
import { accentFor } from '@/components/public/PageHero.js';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { getChildren, getOrgUnit, listEvents } from '@/api/registry.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const province = ref(null);
const breadcrumb = ref([]);
const regionName = ref('');
const communities = ref([]);
const events = ref([]);

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    const [{ doc, breadcrumb: trail }, kids, evts] = await Promise.all([
      getOrgUnit('Province', id),
      getChildren('Province', id),
      listEvents({ province: id, limit: 20 }),
    ]);
    province.value = doc;
    breadcrumb.value = trail;
    regionName.value = trail.find((b) => b.doctype === 'Region')?.label || '';
    communities.value = kids;
    events.value = evts;
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (id) => id && load(id));
</script>
