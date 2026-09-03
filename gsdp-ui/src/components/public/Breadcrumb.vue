<template>
  <div v-if="trail && trail.length" :class="`flex flex-wrap items-center gap-1 text-xs ${dark ? 'text-slate-300' : 'text-slate-500'}`">
    <span v-for="(unit, idx) in trail" :key="unit.name || unit.id" class="flex items-center gap-1">
      <span v-if="idx > 0" :class="dark ? 'text-slate-500' : 'text-slate-300'">/</span>
      <span :class="idx === trail.length - 1 ? `font-medium ${dark ? 'text-white' : 'text-slate-700'}` : ''">{{ unit.label || unit.name }}</span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  trail: { type: Array, default: () => [] },
  dark: { type: Boolean, default: false },
});
</script>
