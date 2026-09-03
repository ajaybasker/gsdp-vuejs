<template>
  <div class="mx-auto max-w-[1400px] px-4 sm:px-6 mt-8 sm:mt-12 mb-8 sm:mb-12">
    <div class="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
      <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
      <div class="relative flex flex-wrap items-center justify-between gap-8">
        <div class="flex-1 min-w-[300px]">
          <div v-if="eyebrow" class="mb-3 flex items-center gap-2">
            <div v-if="icon" class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Icon :name="icon" :size="16" />
            </div>
            <span class="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-600">{{ eyebrow }}</span>
          </div>
          <h1 class="text-[28px] font-extrabold tracking-tight text-slate-900 mb-3">{{ title }}</h1>
          <p v-if="description" class="max-w-2xl text-[15px] leading-relaxed text-slate-500">{{ description }}</p>
          <div v-if="$slots.default" class="mt-6"><slot /></div>
        </div>

        <div v-if="stats && stats.length" class="flex flex-wrap gap-4">
          <div v-for="s in stats" :key="s.label" class="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
            <div class="text-2xl font-extrabold text-brand-900">{{ s.value }}</div>
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '../icons/Icon.vue';
import { ACCENTS } from './PageHero.js';

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  gradient: { type: String, default: ACCENTS[0] },
  stats: { type: Array, default: null },
});
</script>
