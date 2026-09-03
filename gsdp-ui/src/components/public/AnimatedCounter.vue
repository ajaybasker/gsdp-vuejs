<template>{{ formatted }}</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  value: { type: Number, default: 0 },
  duration: { type: Number, default: 1200 },
  format: { type: Function, default: (n) => n.toLocaleString() },
});

const display = ref(0);
const formatted = ref(props.format(0));
let frameId = null;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function animate() {
  if (frameId) cancelAnimationFrame(frameId);
  if (!props.value) {
    display.value = 0;
    formatted.value = props.format(0);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / props.duration);
    display.value = Math.round(props.value * easeOut(progress));
    formatted.value = props.format(display.value);
    if (progress < 1) frameId = requestAnimationFrame(tick);
  };
  frameId = requestAnimationFrame(tick);
}

watch(() => props.value, animate, { immediate: true });
onBeforeUnmount(() => frameId && cancelAnimationFrame(frameId));
</script>
