<template>
  <div class="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-sm text-slate-500">
    {{ label }}
  </div>
</template>

<script setup>
defineProps({ label: { type: String, default: 'Loading…' } });
</script>
