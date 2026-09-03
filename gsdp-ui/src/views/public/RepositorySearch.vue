<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <PublicHeader />

    <div class="w-full bg-brand-950 text-white">
      <div class="w-full px-4 md:px-8 xl:px-12 py-10">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div class="w-full lg:flex-1">
            <p class="text-xs font-bold tracking-widest uppercase text-brand-400 mb-2">Knowledge &amp; Resources</p>
            <h1 class="text-[28px] font-extrabold mb-2">Salesian Knowledge Hub</h1>
            <p class="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
              Explore the Congregation's flagship universities, research institutes, publishers, and the centralized digital repository of Salesian heritage and resources.
            </p>
          </div>
          <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-center">
              <div class="text-2xl font-extrabold">{{ filteredAssets.length }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Published resources</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-center">
              <div class="text-2xl font-extrabold">{{ resourceTypes.length }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Resource types</div>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-center">
              <div class="text-2xl font-extrabold">{{ categories.length }}</div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="w-full px-4 md:px-8 xl:px-12 py-16 space-y-16">
      <Reveal>
        <div class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div class="h-1.5 w-full bg-gradient-to-r from-brand-600 to-brand-800" />
          <div class="p-8">
            <div class="flex items-center gap-3 mb-5">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md text-lg">🎓</div>
              <h2 class="text-xl font-extrabold text-brand-950">Higher Education</h2>
            </div>
            <p class="text-[15px] leading-relaxed text-slate-600 mb-4">
              <strong class="text-brand-950">Università Pontificia Salesiana (UPS)</strong> — the Pontifical Salesian University, Rome. Founded as the <em>Pontificium Athenaeum Salesianum</em> in 1940 and raised to full pontifical university status in 1973.
            </p>
            <p class="text-[15px] leading-relaxed text-slate-600 mb-4">
              Faculties include <strong class="text-brand-900">Education Sciences, Theology, Philosophy, Canon Law, Communication Sciences, and Psychology</strong>. It is the Congregation's flagship institution for training Salesian educators, formators, and scholars worldwide.
            </p>
            <div class="rounded-xl bg-slate-50 p-4 border border-slate-100 text-[13px] text-slate-600">
              <strong class="text-slate-800">Global Network:</strong> Regional Salesian universities and institutes exist across provinces, e.g., Universidad Don Bosco (El Salvador), Don Bosco Tech Society institutes (India), and various affiliated colleges globally offering degree programs.
            </div>
          </div>
        </div>
      </Reveal>

      <div class="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div class="h-full rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-lg font-extrabold text-brand-950 mb-5 flex items-center gap-2"><span class="text-2xl">🏛️</span> Historical Research</h3>
            <ul class="space-y-4 mb-4 text-[14px] leading-relaxed text-slate-600">
              <li><strong class="text-brand-900">Istituto Storico Salesiano (ISS)</strong> — Rome. The Congregation's official historical research institute, founded to study and preserve the history of Don Bosco, the Salesian Family, and Salesian pedagogy.</li>
              <li><strong class="text-brand-900">ACSSA (Association of Salesian History Scholars)</strong> — an international association supporting historical research on the Salesian charism across provinces.</li>
              <li><strong class="text-brand-900">Archivio Storico Generale Salesiano (ASC)</strong> — the Congregation's central archive in Rome, preserving Don Bosco's original manuscripts, letters, and founding-era documents.</li>
            </ul>
          </div>
        </Reveal>
        <Reveal :delay="100">
          <div class="h-full rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-lg font-extrabold text-brand-950 mb-5 flex items-center gap-2"><span class="text-2xl">📚</span> Publishing Houses</h3>
            <ul class="space-y-4 mb-4 text-[14px] leading-relaxed text-slate-600">
              <li><strong class="text-brand-900">LAS (Libreria Ateneo Salesiano)</strong> — the academic publishing house of the Pontifical Salesian University in Rome.</li>
              <li><strong class="text-brand-900">Elledici (Editrice Elledici)</strong> — major Italian Salesian publishing house based in Leumann/Turin, producing catechetical, pastoral, and educational materials.</li>
              <li><strong class="text-brand-900">Don Bosco Publications</strong> — regional English-language publishing arms (e.g. Mumbai/Matunga, India) producing Salesian formation and devotional literature.</li>
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div class="rounded-2xl bg-gradient-to-br from-brand-950 to-slate-900 p-6 sm:p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div class="relative grid gap-8 lg:grid-cols-2">
            <div>
              <h3 class="text-lg font-extrabold mb-4 flex items-center gap-2"><span class="text-2xl">📰</span> Periodicals &amp; Journals</h3>
              <ul class="space-y-3 text-[14px] leading-relaxed text-slate-300">
                <li><strong class="text-white">Bollettino Salesiano (Salesian Bulletin)</strong> — founded by Don Bosco in 1877; published today in over two dozen language/regional editions worldwide.</li>
                <li><strong class="text-white">Ricerche Storiche Salesiane</strong> — peer-reviewed academic history journal published by the ISS since 1982.</li>
                <li><strong class="text-white">Journal of Salesian Studies</strong> — English-language academic journal from the Institute of Salesian Studies, Berkeley, California.</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-extrabold mb-4 flex items-center gap-2"><span class="text-2xl">📡</span> News &amp; Communication</h3>
              <p class="text-[14px] leading-relaxed text-slate-300">
                <strong class="text-white">ANS – Agenzia Info Salesiana</strong> (Salesian Information Agency) is the Congregation's official news service, based in Rome, reporting on Salesian activity across all regions.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div class="pt-10 border-t border-slate-200">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <h2 class="text-[28px] font-extrabold text-brand-950">Digital Resource Repository</h2>
          <p class="mt-3 text-[15px] text-slate-500">Search published archives, books, and multimedia from across the Salesian family.</p>
        </div>

        <Reveal>
          <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div class="relative w-full lg:flex-1">
                <Icon name="Search" :size="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input v-model="search" placeholder="Search published resources…" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-[14px] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
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

        <LoadingState v-if="loading" label="Searching the repository…" />
        <EmptyState v-else-if="filteredAssets.length === 0" icon="Archive" title="No published resources found" message="Try a different search term, or clear a filter." />
        <template v-else>
          <Reveal>
            <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p class="text-[14px] font-bold text-slate-700">{{ filteredAssets.length }} published resource{{ filteredAssets.length === 1 ? '' : 's' }}</p>
              <button v-if="hasFilter" @click="clearAll" class="text-[13px] font-semibold text-brand-600 hover:text-brand-800">Clear filters</button>
            </div>
          </Reveal>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
            <Reveal v-for="(a, idx) in filteredAssets" :key="a.name" :delay="idx * 25">
              <router-link :to="`/assets/${a.name}`" class="group grid h-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                <div :class="`h-1 w-full bg-gradient-to-r ${accentFor(idx)}`" />
                <div class="p-5 flex flex-col flex-1 gap-3 min-w-0">
                  <div class="flex flex-wrap items-center gap-3">
                    <div :class="`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentFor(idx)} text-white shadow-md`">
                      <Icon name="BookOpen" :size="18" />
                    </div>
                    <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-slate-50 border-slate-100 text-slate-600 max-w-full truncate">{{ resourceTypeLabel(a.resource_type) }}</span>
                  </div>
                  <h3 class="text-[14px] font-bold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors break-words">{{ a.resource_title }}</h3>
                  <p class="text-[12px] text-slate-400 font-medium truncate w-full">{{ a.author_name || 'Unknown origin' }}</p>
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

const route = useRoute();
const loading = ref(true);
const assets = ref([]);
const resourceTypes = ref([]);
const categories = ref([]);
const search = ref(route.query.q || route.query.search || '');
const resourceTypeFilter = ref('');
const categoryFilter = ref('');

async function search_() {
  loading.value = true;
  try {
    assets.value = await listAssets({
      search: search.value || undefined,
      resource_type: resourceTypeFilter.value || undefined,
      category: categoryFilter.value || undefined,
      limit: 60,
    });
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
watch([resourceTypeFilter, categoryFilter], search_);

const filteredAssets = computed(() => assets.value);
const hasFilter = computed(() => Boolean(search.value || resourceTypeFilter.value || categoryFilter.value));

function clearAll() {
  search.value = '';
  resourceTypeFilter.value = '';
  categoryFilter.value = '';
}

function resourceTypeLabel(name) {
  return resourceTypes.value.find((t) => t.name === name)?.resource_type_name || name;
}
</script>
