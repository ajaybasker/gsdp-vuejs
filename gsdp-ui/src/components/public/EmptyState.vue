<template>
  <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
    <div class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <Icon :name="icon" :size="20" />
    </div>
    <div class="mt-3 text-sm font-semibold text-slate-700">{{ title }}</div>
    <div v-if="message" class="mt-1 max-w-sm text-sm text-slate-500">{{ message }}</div>
  </div>
</template>

<script setup>
import Icon from '../icons/Icon.vue';

defineProps({
  icon: { type: String, default: 'Inbox' },
  title: { type: String, default: 'Nothing here yet' },
  message: { type: String, default: '' },
});
</script>
