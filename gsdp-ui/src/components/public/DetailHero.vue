<template>
  <section class="relative overflow-hidden bg-slate-950">
    <img v-if="image" :src="image.url" alt="" aria-hidden class="absolute inset-0 h-full w-full object-cover opacity-40" loading="eager" />
    <div v-else aria-hidden class="pointer-events-none absolute inset-0">
      <div :class="`absolute -top-20 right-10 h-72 w-72 rounded-full bg-gradient-to-br ${gradient} opacity-40 blur-3xl`" />
    </div>
    <div aria-hidden class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
    <div class="relative mx-auto max-w-5xl px-6 py-8 sm:py-10">
      <router-link :to="backTo" class="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white">
        <Icon name="ArrowLeft" :size="12" /> {{ backLabel }}
      </router-link>
      <div class="mt-2.5"><Breadcrumb :trail="breadcrumb" dark /></div>
      <div class="mt-3.5 flex flex-wrap items-center gap-4">
        <div v-if="icon" :class="`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-black/30`">
          <Icon :name="icon" :size="22" />
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-[28px] font-bold tracking-tight text-white">{{ title }}</h1>
            <span v-if="tag" :class="`rounded-full bg-gradient-to-r ${gradient} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`">{{ tag }}</span>
          </div>
          <div v-if="subtitle" class="mt-1 text-sm text-slate-300">{{ subtitle }}</div>
        </div>
      </div>
      <dl v-if="stats && stats.length" class="mt-5 flex flex-wrap gap-3">
        <div v-for="s in stats" :key="s.label" class="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
          <span class="font-bold text-white">{{ s.value }}</span>
          <span class="text-slate-300">{{ s.label }}</span>
        </div>
      </dl>
      <a v-if="image?.credit" :href="image.sourceUrl" target="_blank" rel="noreferrer" class="absolute bottom-2 right-3 text-[10px] text-white/40 hover:text-white/70">
        Photo: {{ image.credit }}
      </a>
    </div>
  </section>
</template>

<script setup>
import Icon from '../icons/Icon.vue';
import Breadcrumb from './Breadcrumb.vue';
import { ACCENTS } from './PageHero.js';

defineProps({
  backTo: { type: [String, Object], required: true },
  backLabel: { type: String, default: '' },
  breadcrumb: { type: Array, default: () => [] },
  icon: { type: String, default: '' },
  gradient: { type: String, default: ACCENTS[0] },
  image: { type: Object, default: null },
  title: { type: String, required: true },
  tag: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  stats: { type: Array, default: null },
});
</script>
