<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <PublicHeader />

    <div class="w-full bg-brand-950 text-white">
      <div class="w-full px-4 md:px-8 xl:px-12 py-10">
        <div class="w-full">
          <p class="text-xs font-bold tracking-widest uppercase text-brand-400 mb-2">Knowledge &amp; Resources</p>
          <h1 class="text-[28px] font-extrabold mb-2">Salesian Knowledge Hub</h1>
          <p class="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
            Explore the centralized digital repository of Salesian heritage, formation, and multimedia resources from across the Congregation.
          </p>
        </div>
      </div>
    </div>

    <main class="w-full px-4 md:px-8 xl:px-12 py-16">
      <div>
        <div class="text-center max-w-3xl mx-auto mb-10">
          <h2 class="text-[28px] font-extrabold text-brand-950">Digital Resource Repository</h2>
          <p class="mt-3 text-[15px] text-slate-500">Search published archives, books, and multimedia from across the Salesian family.</p>
        </div>

        <Reveal>
          <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div class="relative w-full lg:flex-1">
                <Icon name="Search" :size="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input v-model="search" placeholder="Search by title, author, category, description…" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-[14px] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap gap-3 w-full lg:w-auto min-w-0">
                <select v-model="resourceTypeFilter" class="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] font-medium text-slate-600 focus:border-brand-500 focus:outline-none">
                  <option value="">All Resource Types</option>
                  <option v-for="t in resourceTypes" :key="t.name" :value="t.name">{{ t.resource_type_name }}</option>
                </select>
                <select v-model="categoryFilter" class="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] font-medium text-slate-600 focus:border-brand-500 focus:outline-none">
                  <option value="">All Categories</option>
                  <option v-for="c in categories" :key="c.name" :value="c.name">{{ c.category_name }}</option>
                </select>
                <button v-if="hasFilter" @click="clearAll" class="w-full sm:col-span-2 lg:w-auto rounded-xl border border-slate-200 px-4 py-3.5 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">Clear Filters</button>
              </div>
            </div>
          </div>
        </Reveal>

        <div v-if="tagFilter || authorFilter" class="mb-6 flex flex-wrap items-center gap-2">
          <span v-if="tagFilter" class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-800 border border-brand-200">
            Tag: #{{ tagFilter }}
            <button @click="tagFilter = ''" class="text-brand-500 hover:text-brand-800 leading-none" aria-label="Remove tag filter">✕</button>
          </span>
          <span v-if="authorFilter" class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-800 border border-brand-200">
            Author: {{ authorFilter }}
            <button @click="authorFilter = ''" class="text-brand-500 hover:text-brand-800 leading-none" aria-label="Remove author filter">✕</button>
          </span>
        </div>

        <LoadingState v-if="loading" label="Searching the repository…" />
        <EmptyState
          v-else-if="filteredAssets.length === 0"
          icon="Archive"
          title="No published resources found"
          :message="search ? `No matches for “${search}”. Try a shorter or differently spelled term, or clear a filter.` : 'Try a different search term, or clear a filter.'"
        />
        <template v-else>
          <Reveal>
            <div v-if="isFuzzy" class="mb-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
              <Icon name="Search" :size="15" class="mt-0.5 shrink-0" />
              <span>No exact match for “{{ search }}” — showing the closest related resources instead.</span>
            </div>
          </Reveal>
          <Reveal>
            <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p class="text-[14px] font-bold text-slate-700">{{ filteredAssets.length }} published resource{{ filteredAssets.length === 1 ? '' : 's' }}</p>
              <button v-if="hasFilter" @click="clearAll" class="text-[13px] font-semibold text-brand-600 hover:text-brand-800">Clear filters</button>
            </div>
          </Reveal>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal v-for="(a, idx) in filteredAssets" :key="a.name" :delay="idx * 25">
              <router-link :to="`/assets/${a.name}`" class="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img v-if="a.cover_image" :src="a.cover_image" :alt="a.title" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div v-else :class="`flex h-full w-full items-center justify-center bg-gradient-to-br ${accentFor(idx)}`">
                    <Icon name="BookOpen" :size="36" class="text-white/90" />
                  </div>
                  <span class="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-slate-600 max-w-[85%] truncate">{{ resourceTypeLabel(a.resource_type) }}</span>
                </div>
                <div class="flex flex-1 flex-col gap-2 p-6 min-w-0">
                  <h3 class="text-[16px] font-bold text-brand-950 leading-snug group-hover:text-brand-700 transition-colors break-words">{{ a.title }}</h3>
                  <p class="text-[13px] text-slate-400 font-medium truncate w-full">
                    <template v-if="a.author?.length">
                      <span
                        v-for="(name, i) in a.author"
                        :key="name"
                        @click.stop.prevent="filterByAuthor(name)"
                        class="hover:text-brand-700 hover:underline"
                        >{{ name }}<span v-if="i < a.author.length - 1">, </span></span
                      >
                    </template>
                    <template v-else>Unknown origin</template>
                  </p>
                  <div class="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    <span v-if="a.category" class="text-[11px] font-semibold text-brand-600 truncate">{{ a.category }}</span>
                    <span v-if="a.publication_date" class="text-[11px] text-slate-400">· {{ a.publication_date }}</span>
                  </div>
                </div>
              </router-link>
            </Reveal>
          </div>
        </template>
      </div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import Reveal from '@/components/public/Reveal.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { accentFor } from '@/components/public/PageHero.js';
import { listAssets, listCategories, listResourceTypes } from '@/api/repository.js';
import { formatResourceTypeBadge } from '@/utils/resourceType.js';

const route = useRoute();
const loading = ref(true);
const assets = ref([]);
const isFuzzy = ref(false);
const resourceTypes = ref([]);
const categories = ref([]);
const search = ref(route.query.q || route.query.search || '');
const resourceTypeFilter = ref(route.query.resource_type || '');
const categoryFilter = ref(route.query.category || '');
const tagFilter = ref(route.query.tag || '');
const authorFilter = ref(route.query.author || '');

async function search_() {
  loading.value = true;
  try {
    const res = await listAssets({
      search: search.value || undefined,
      resource_type: resourceTypeFilter.value || undefined,
      category: categoryFilter.value || undefined,
      tag: tagFilter.value || undefined,
      author: authorFilter.value || undefined,
      limit: 60,
    });
    // Backward compatible with a plain-array response in case of an older cached bundle.
    assets.value = Array.isArray(res) ? res : res?.results || [];
    isFuzzy.value = Array.isArray(res) ? false : Boolean(res?.fuzzy);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const [types, cats] = await Promise.all([listResourceTypes(), listCategories()]);
  resourceTypes.value = types;
  categories.value = cats;
  await search_();
});

let debounce = null;
watch(search, () => {
  clearTimeout(debounce);
  debounce = setTimeout(search_, 250);
});
watch([resourceTypeFilter, categoryFilter, tagFilter, authorFilter], search_);

const filteredAssets = computed(() => assets.value);
const hasFilter = computed(() => Boolean(search.value || resourceTypeFilter.value || categoryFilter.value || tagFilter.value || authorFilter.value));

function clearAll() {
  search.value = '';
  resourceTypeFilter.value = '';
  categoryFilter.value = '';
  tagFilter.value = '';
  authorFilter.value = '';
}

function filterByAuthor(name) {
  authorFilter.value = name;
}

function resourceTypeLabel(resourceType) {
  const badge = formatResourceTypeBadge(resourceType);
  const [primary, suffix] = badge.split(' +');
  const label = resourceTypes.value.find((t) => t.name === primary)?.resource_type_name || primary;
  return suffix ? `${label} +${suffix}` : label;
}
</script>
