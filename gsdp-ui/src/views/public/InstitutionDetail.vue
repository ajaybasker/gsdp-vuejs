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
      />

      <main class="mx-auto max-w-5xl px-6 py-12">
        <div class="space-y-6">
          <SectionCard title="Activity Details" icon="Building" :gradient="accentFor(0)">
            <dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div><dt class="text-xs text-slate-500">Activity Code</dt><dd class="mt-1 text-sm text-slate-700">{{ institution.activity_code || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Sector Type</dt><dd class="mt-1 text-sm text-slate-700">{{ categoryLabel || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Current Leader</dt><dd class="mt-1 text-sm text-slate-700">{{ institution.current_leader || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Community</dt><dd class="mt-1 text-sm text-slate-700">{{ communityLabel }}</dd></div>
              <div><dt class="text-xs text-slate-500">Province</dt><dd class="mt-1 text-sm text-slate-700">{{ provinceLabel }}</dd></div>
              <div><dt class="text-xs text-slate-500">City</dt><dd class="mt-1 text-sm text-slate-700">{{ institution.city || '—' }}</dd></div>
              <div><dt class="text-xs text-slate-500">Diocese</dt><dd class="mt-1 text-sm text-slate-700">{{ institution.diocese || '—' }}</dd></div>
              <div class="sm:col-span-2 lg:col-span-3"><dt class="text-xs text-slate-500">Address</dt><dd class="mt-1 text-sm text-slate-700 whitespace-pre-line">{{ institution.address || '—' }}</dd></div>
            </dl>
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
