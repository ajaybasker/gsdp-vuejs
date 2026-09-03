<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <main v-if="loading" class="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading sector…" /></main>

    <main v-else-if="notFound || !institution" class="mx-auto max-w-5xl px-6 py-12">
      <EmptyState icon="Building" title="Sector not found" message="This sector may have been renamed or removed." />
      <div class="mt-6 text-center"><router-link to="/sectors" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Sector Directory</router-link></div>
    </main>

    <template v-else>
      <DetailHero
        back-to="/sectors"
        back-label="Sector Directory"
        :breadcrumb="breadcrumb"
        icon="Building"
        :gradient="accentFor(0)"
        :title="institution.activity_name"
        :tag="categoryLabel"
        :subtitle="institution.city || ''"
        :stats="[{ value: 0, label: 'Gallery items' }]"
      />

      <main class="mx-auto max-w-5xl px-6 py-12">
        <div class="space-y-6">
          <SectionCard title="Overview" icon="Building" :gradient="accentFor(0)">
            <dl class="mt-4 grid gap-4 sm:grid-cols-3">
              <div><dt class="text-xs text-slate-500">Sector Type</dt><dd class="mt-1 text-sm text-slate-700">{{ categoryLabel || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Community</dt><dd class="mt-1 text-sm text-slate-700">{{ communityLabel }}</dd></div>
              <div><dt class="text-xs text-slate-500">Province</dt><dd class="mt-1 text-sm text-slate-700">{{ provinceLabel }}</dd></div>
            </dl>
          </SectionCard>

          <SectionCard title="Programs" icon="Clock" :gradient="accentFor(1)">
            <div class="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3.5">
              <Icon name="Clock" :size="16" class="mt-0.5 flex-shrink-0 text-slate-400" />
              <p class="text-sm leading-relaxed text-slate-500">
                <span class="font-medium text-slate-600">Coming soon.</span> Program details are maintained by the Community and Province and published here once available.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Gallery" icon="Image" :gradient="accentFor(3)">
            <EmptyState icon="Image" title="No public repository resources yet" message="Published photos, videos and documents for this sector will appear here." />
          </SectionCard>

          <SectionCard title="Reports" icon="Clock" :gradient="accentFor(4)">
            <div class="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3.5">
              <Icon name="Clock" :size="16" class="mt-0.5 flex-shrink-0 text-slate-400" />
              <p class="text-sm leading-relaxed text-slate-500">
                <span class="font-medium text-slate-600">Not published here.</span> Institutional reports are internal documents reviewed within the Salesian family and are not published on the public portal.
              </p>
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
import Icon from '@/components/icons/Icon.vue';
import { getOrgUnit, listActivityCategories } from '@/api/registry.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const institution = ref(null);
const breadcrumb = ref([]);
const categoryLabel = ref('');

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    const [{ doc, breadcrumb: trail }, categories] = await Promise.all([
      getOrgUnit('Activity', id),
      listActivityCategories(),
    ]);
    institution.value = doc;
    breadcrumb.value = trail;
    categoryLabel.value = categories.find((c) => c.name === doc.activity_category)?.category_name || '';
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (id) => id && load(id));

const communityLabel = computed(() => breadcrumb.value.find((b) => b.doctype === 'Community')?.label || '—');
const provinceLabel = computed(() => breadcrumb.value.find((b) => b.doctype === 'Province')?.label || '—');
</script>
