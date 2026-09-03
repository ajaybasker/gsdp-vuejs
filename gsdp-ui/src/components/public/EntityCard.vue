<template>
  <router-link
    :to="to"
    :class="`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5 ${dense ? 'p-4' : 'p-5 lg:p-6'}`"
  >
    <div class="flex items-start justify-between gap-3">
      <div v-if="icon" :class="`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md shadow-slate-900/10 ring-1 ring-white/20`">
        <Icon :name="icon" :size="20" />
      </div>
      <span v-if="tag" class="flex-shrink-0 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-500 uppercase shadow-sm">{{ tag }}</span>
    </div>
    <div class="mt-5">
      <h3 class="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-brand-600 line-clamp-2 transition-colors">{{ title }}</h3>
      <p v-if="subtitle" class="mt-1.5 text-[12.5px] font-medium text-slate-500">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.meta" class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[12px] font-semibold text-slate-400">
      <slot name="meta" />
    </div>
  </router-link>
</template>

<script setup>
import Icon from '../icons/Icon.vue';
import { ACCENTS } from './PageHero.js';

defineProps({
  to: { type: [String, Object], required: true },
  icon: { type: String, default: '' },
  gradient: { type: String, default: ACCENTS[0] },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  tag: { type: String, default: '' },
  dense: { type: Boolean, default: false },
});
</script>
