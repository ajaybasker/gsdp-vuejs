<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <main v-if="loading" class="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading collection…" /></main>

    <main v-else-if="notFound || !collection" class="mx-auto max-w-5xl px-6 py-12">
      <EmptyState icon="Archive" title="Collection not found" message="This collection may have been renamed or removed." />
      <div class="mt-6 text-center"><router-link to="/#collections" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Collections</router-link></div>
    </main>

    <template v-else>
      <DetailHero
        back-to="/#collections"
        back-label="Collections"
        icon="Layers"
        :gradient="accentFor(0)"
        :title="collection.collection_name"
        :subtitle="collection.description || ''"
        :stats="[{ value: collection.resources.length, label: 'Resources' }]"
      />

      <main class="mx-auto max-w-6xl px-6 py-12">
        <SectionCard title="Resources in this Collection" icon="Archive" :gradient="accentFor(1)">
          <EmptyState v-if="collection.resources.length === 0" icon="Archive" title="No published resources in this collection yet" />
          <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <router-link
              v-for="(r, idx) in collection.resources" :key="r.name" :to="`/assets/${r.name}`"
              class="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div :class="`h-1 w-full bg-gradient-to-r ${accentFor(idx)}`" />
              <div class="p-5">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ r.resource_type }}</span>
                <h3 class="mt-1 text-[14px] font-bold text-brand-950 leading-snug group-hover:text-brand-700 transition-colors">{{ r.resource_title }}</h3>
                <p v-if="r.author_name" class="mt-2 text-[12px] text-slate-400 font-medium">{{ r.author_name }}</p>
              </div>
            </router-link>
          </div>
        </SectionCard>
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
import { getCollection } from '@/api/repository.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const collection = ref(null);

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    collection.value = await getCollection(id);
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (id) => id && load(id));
</script>
