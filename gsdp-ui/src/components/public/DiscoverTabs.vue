<template>
  <div class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-6">
      <nav class="-mb-px flex gap-8 overflow-x-auto" aria-label="Tabs">
        <template v-for="tab in tabs" :key="tab.name">
          <a
            v-if="tab.external"
            :href="tab.href"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent py-4 text-[14px] font-bold text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors"
          >
            {{ tab.name }}
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <router-link
            v-else
            :to="tab.href"
            :class="[
              'whitespace-nowrap border-b-2 py-4 text-[14px] font-bold transition-colors',
              tab.href === activePath ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
            ]"
          >
            {{ tab.name }}
          </router-link>
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup>
defineProps({ activePath: { type: String, default: '' } });

const tabs = [
  { name: 'Resource Catalogue', href: '/repository-search' },
  { name: 'Events', href: '/news-events' },
  { name: 'Digital Library', href: 'https://donboscosouthasia.org/Catalogue-List?category=all', external: true },
];
</script>
