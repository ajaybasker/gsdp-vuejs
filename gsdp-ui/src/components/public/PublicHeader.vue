<template>
  <header class="sticky top-0 z-50 flex flex-col shadow-sm bg-white">
    <!-- Top Bar -->
    <div class="hidden sm:block bg-brand-950 text-white/90 overflow-y-auto">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1.5 text-xs font-medium tracking-wide sm:px-6 overflow-x-auto">
        <div class="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
          <a v-for="link in TOP_NAV_LINKS" :key="link.label" :href="link.href" :target="link.target"
             :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined" class="transition hover:text-white">
            {{ link.label }}
          </a>
        </div>
        <div class="flex items-center gap-3 sm:gap-4 pl-4 whitespace-nowrap">
          <Icon name="Globe" :size="14" class="text-white/70" />
          <div class="flex items-center gap-2.5">
            <button v-for="lang in LANGUAGES" :key="lang" :class="`transition hover:text-sand-300 ${lang === 'EN' ? 'text-sand-400 font-bold' : 'text-slate-300'}`">
              {{ lang }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <div class="border-b-[4px] border-sand-500 bg-white">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:py-4">
        <router-link to="/" class="flex items-center gap-2 text-brand-950">
          <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
          <span class="text-xl font-extrabold uppercase tracking-wider leading-tight">Salesian<br />Online</span>
        </router-link>

        <nav class="hidden items-center gap-2 lg:flex">
          <div
            v-for="link in MAIN_NAV_LINKS"
            :key="link.label"
            class="relative"
            @mouseenter="link.hasDropdown && (activeDropdown = link.label)"
            @mouseleave="activeDropdown = null"
          >
            <router-link
              :to="link.hasDropdown && link.label === 'Pastoral Works' ? '#' : link.href"
              @click="(e) => { if (link.hasDropdown && link.label === 'Pastoral Works') { e.preventDefault(); activeDropdown = activeDropdown === link.label ? null : link.label; } }"
              :class="[
                'flex items-center gap-1.5 text-base font-bold transition px-4 py-2 rounded-xl cursor-pointer border',
                isActive(link.href) ? 'bg-brand-50 text-brand-900 border-brand-100 shadow-sm' : 'text-slate-600 hover:text-brand-900 hover:bg-slate-50 border-transparent',
              ]"
            >
              <span>{{ link.label }}</span>
              <Icon v-if="link.hasDropdown" name="ChevronDown" :size="14" :class="`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180 text-brand-700' : 'text-slate-400'}`" />
            </router-link>

            <div v-if="link.hasDropdown && activeDropdown === link.label" class="absolute left-0 top-full pt-2">
              <div class="flex flex-col w-56 rounded-xl border border-slate-200 bg-white shadow-xl">
                <template v-for="sublink in sublinksFor(link.label)" :key="sublink.label">
                  <div v-if="sublink.isSubmenu" class="group/nested relative block border-b border-slate-100 last:border-0 first:rounded-t-xl last:rounded-b-xl hover:bg-brand-50">
                    <div class="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition group-hover/nested:text-brand-700 cursor-default">
                      {{ sublink.label }}
                      <Icon name="ChevronLeft" :size="14" class="rotate-180 text-slate-400 group-hover/nested:text-brand-500" />
                    </div>
                    <div class="absolute left-full -top-2 hidden w-64 rounded-xl border border-slate-200 bg-white shadow-xl group-hover/nested:flex flex-col ml-1 z-20">
                      <router-link v-for="item in sublink.items" :key="item.label" :to="item.href" class="block border-b border-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition last:border-0 hover:bg-brand-50 hover:text-brand-700 first:rounded-t-xl last:rounded-b-xl">
                        {{ item.label }}
                      </router-link>
                    </div>
                  </div>
                  <router-link v-else :to="sublink.href" class="block border-b border-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition last:border-0 hover:bg-brand-50 hover:text-brand-700 first:rounded-t-xl last:rounded-b-xl">
                    {{ sublink.label }}
                  </router-link>
                </template>
              </div>
            </div>
          </div>
        </nav>

        <div class="flex items-center gap-4">
          <router-link to="/login" class="hidden rounded-xl border border-brand-800 px-5 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50 hover:shadow-sm sm:block">
            Sign In
          </router-link>
          <div class="relative hidden lg:block z-[100]">
            <form @submit.prevent="handleSearch" class="flex items-center rounded-xl bg-slate-50 px-3 py-1 border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all w-72">
              <Icon name="Search" :size="15" class="text-slate-400 mr-2" />
              <input v-model="searchQuery" type="text" placeholder="Search" class="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400 py-1.5" />
            </form>

            <div v-if="searchQuery.trim().length > 1" class="absolute right-0 top-full mt-2 w-[450px] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] overflow-y-auto">
              <div class="px-4 py-2 bg-brand-50 border-b border-brand-100 text-[11px] font-bold text-brand-700 uppercase tracking-wider flex justify-between items-center">
                <span>Registry Entities</span>
                <span v-if="isSearching" class="text-brand-500 animate-pulse">Searching...</span>
              </div>
              <template v-if="searchResults.length > 0">
                <button
                  v-for="item in searchResults"
                  :key="`${item.type}-${item.name}`"
                  @click="goToResult(item)"
                  class="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition focus:bg-slate-50 focus:outline-none flex flex-col gap-1"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-slate-800">{{ item.canonical_name || item.activity_name }}</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{{ item.type }}</span>
                  </div>
                  <div class="text-xs text-slate-500">{{ item.city || 'Global Registry' }}</div>
                </button>
              </template>
              <div v-else-if="!isSearching" class="px-4 py-4 text-sm text-slate-500 italic">No exact registry matches found.</div>
            </div>
          </div>
          <button @click="mobileTopMenuOpen = !mobileTopMenuOpen; open = false" class="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Toggle top menu">
            <Icon :name="mobileTopMenuOpen ? 'X' : 'MoreVertical'" :size="24" />
          </button>
          <button @click="open = !open; mobileTopMenuOpen = false" class="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Toggle menu">
            <Icon :name="open ? 'X' : 'Menu'" :size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Top Menu -->
      <div v-if="mobileTopMenuOpen" class="border-t border-slate-200 bg-brand-950 px-5 py-5 lg:hidden max-h-[80vh] overflow-y-auto shadow-inner text-white">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-4 font-semibold text-[15px]">
            <a v-for="link in TOP_NAV_LINKS" :key="link.label" :href="link.href" :target="link.target"
               :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined" class="transition hover:text-brand-300">
              {{ link.label }}
            </a>
          </div>
          <div class="h-px bg-white/10" />
          <div class="flex items-center gap-4">
            <Icon name="Globe" :size="20" class="text-white/70" />
            <div class="flex flex-wrap gap-5">
              <button v-for="lang in LANGUAGES" :key="lang" :class="`transition text-[15px] hover:text-sand-300 ${lang === 'EN' ? 'text-sand-400 font-bold' : 'text-slate-300 font-medium'}`">
                {{ lang }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div v-if="open" class="border-t border-slate-200 bg-white px-4 py-4 lg:hidden max-h-[80vh] overflow-y-auto">
        <nav class="flex flex-col gap-2">
          <div v-for="link in MAIN_NAV_LINKS" :key="link.label" class="flex flex-col">
            <router-link
              :to="link.hasDropdown ? '#' : link.href"
              @click="(e) => { if (!link.hasDropdown) open = false; else e.preventDefault(); }"
              :class="`text-base font-semibold px-4 py-2 rounded-lg ${isActive(link.href) ? 'bg-brand-50 text-brand-900' : 'text-slate-700 hover:text-brand-900 hover:bg-slate-50'}`"
            >
              {{ link.label }}
            </router-link>
            <div v-if="link.hasDropdown" class="flex flex-col pl-6 pr-2 mt-1 gap-1 border-l-2 border-slate-100 ml-6">
              <template v-for="sublink in sublinksFor(link.label)" :key="sublink.label">
                <div v-if="sublink.isSubmenu" class="flex flex-col mt-1">
                  <div class="px-4 py-1.5 text-sm font-semibold text-slate-800">{{ sublink.label }}</div>
                  <div class="flex flex-col pl-4 gap-1">
                    <router-link v-for="item in sublink.items" :key="item.label" :to="item.href" @click="open = false" class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-slate-50 rounded-lg">
                      {{ item.label }}
                    </router-link>
                  </div>
                </div>
                <router-link v-else :to="sublink.href" @click="open = false" class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-slate-50 rounded-lg mt-1">
                  {{ sublink.label }}
                </router-link>
              </template>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-3">
            <form @submit.prevent="handleSearch(); open = false" class="flex items-center rounded-xl bg-slate-50 px-3 py-2 border border-slate-200">
              <Icon name="Search" :size="16" class="text-slate-400 mr-2" />
              <input v-model="searchQuery" type="text" placeholder="Search" class="w-full bg-transparent outline-none text-base text-slate-800" />
            </form>
            <router-link to="/login" @click="open = false" class="w-full rounded-xl border border-brand-800 py-2.5 text-center text-sm font-semibold text-brand-800 hover:bg-brand-50 transition">
              Sign In
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Icon from '../icons/Icon.vue';
import { listOrgUnits } from '@/api/registry.js';

const TOP_NAV_LINKS = [
  { href: 'https://www.infoans.org/en/', label: 'ANS News', target: '_blank' },
  { href: 'https://www.cg29.sdb.org/', label: 'GC 29', target: '_blank' },
  { href: '/provinces', label: 'Provinces' },
  { href: 'https://www.sdb.org/', label: 'Salesian Family', target: '_blank' },
];
const LANGUAGES = ['EN', 'IT', 'ES', 'FR', 'PT'];
const MAIN_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sectors', label: 'Pastoral Works', hasDropdown: true },
  { href: '/repository-search', label: 'Knowledge & Resources', hasDropdown: true },
  { href: '/about', label: 'About' },
];
const PASTORAL_LINKS = [
  { label: 'Activities', isSubmenu: true, items: [
    { href: '/sectors?subtype=School', label: 'School' },
    { href: '/sectors?subtype=Higher%20Education', label: 'Higher Education' },
    { href: '/sectors?subtype=Parish', label: 'Parishes' },
    { href: '/sectors?subtype=Social%20Work', label: 'Social Work' },
    { href: '/sectors?subtype=Oratory', label: 'Oratories & Youth Centres' },
    { href: '/sectors?subtype=TVET%20Center', label: 'VTC (Vocational Training Centres)' },
  ] },
  { href: '/continents', label: 'Continents' },
];
const KNOWLEDGE_LINKS = [
  { href: '/repository-search', label: 'Resource Catalogue' },
  { href: '/news-events', label: 'Events' },
  { href: '/spiritual-education', label: 'Spiritual' },
  { href: '/education', label: 'Education' },
  { href: '/salesian-sources', label: 'Salesian Sources' },
  { href: '/official-documents', label: 'Official Documents' },
];
const ABOUT_LINKS = [
  { href: '/about', label: 'Our Mission' },
  { href: '/global-statistics', label: 'Global Statistics' },
];

function sublinksFor(label) {
  if (label === 'Pastoral Works') return PASTORAL_LINKS;
  if (label === 'Knowledge & Resources') return KNOWLEDGE_LINKS;
  return ABOUT_LINKS;
}

const route = useRoute();
const router = useRouter();

function isActive(href) {
  if (href === '/') return route.path === '/';
  return route.path === href || route.path.startsWith(`${href}/`);
}

const open = ref(false);
const mobileTopMenuOpen = ref(false);
const activeDropdown = ref(null);
const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
let searchTimer = null;

watch(searchQuery, (q) => {
  clearTimeout(searchTimer);
  const query = q.trim();
  if (query.length < 2) {
    searchResults.value = [];
    return;
  }
  isSearching.value = true;
  searchTimer = setTimeout(async () => {
    try {
      const [provinces, communities, activities] = await Promise.all([
        listOrgUnits({ doctype: 'Province', search: query, limit: 3 }),
        listOrgUnits({ doctype: 'Community', search: query, limit: 3 }),
        listOrgUnits({ doctype: 'Activity', search: query, limit: 3 }),
      ]);
      searchResults.value = [
        ...provinces.map((p) => ({ ...p, type: 'Province' })),
        ...communities.map((c) => ({ ...c, type: 'Community' })),
        ...activities.map((a) => ({ ...a, type: 'Activity' })),
      ].slice(0, 6);
    } finally {
      isSearching.value = false;
    }
  }, 300);
});

function goToResult(item) {
  const link = item.type === 'Province' ? `/provinces/${item.name}`
    : item.type === 'Community' ? `/communities/${item.name}`
      : `/sectors/${item.name}`;
  router.push(link);
  searchQuery.value = '';
}

function handleSearch() {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return;
  if (q.includes('school') || q.includes('parish') || q.includes('oratory') || q.includes('pastoral') || q.includes('mission') || q.includes('sector')) {
    let subtype = '';
    if (q.includes('school')) subtype = 'School';
    else if (q.includes('parish')) subtype = 'Parish';
    else if (q.includes('oratory') || q.includes('youth center')) subtype = 'Oratory';
    router.push({ path: '/sectors', query: subtype ? { subtype } : { q: searchQuery.value.trim() } });
  } else if (q.includes('province') || q.includes('region')) {
    router.push('/provinces');
  } else if (q.includes('community')) {
    router.push('/communities');
  } else if (q.includes('news') || q.includes('event')) {
    router.push('/news-events');
  } else if (q.includes('about') || q.includes('history') || q.includes('founder') || q.includes('don bosco')) {
    router.push('/about');
  } else if (q.includes('stat') || q.includes('map')) {
    router.push('/global-statistics');
  } else {
    router.push({ path: '/repository-search', query: { search: searchQuery.value.trim() } });
  }
  searchQuery.value = '';
}
</script>
