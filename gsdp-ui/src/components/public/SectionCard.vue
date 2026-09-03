<template>
  <section :class="`rounded-2xl border ${softFor(gradient)} p-6 shadow-sm shadow-slate-900/[0.03] transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/[0.08] hover:-translate-y-0.5 ${className}`">
    <h2 v-if="title" class="flex items-center gap-3 text-base font-bold text-slate-900 mb-4">
      <span v-if="icon" :class="`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`">
        <Icon :name="icon" :size="16" />
      </span>
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script setup>
import Icon from '../icons/Icon.vue';
import { ACCENTS, softFor } from './PageHero.js';

defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  gradient: { type: String, default: ACCENTS[0] },
  className: { type: String, default: '' },
});
</script>
