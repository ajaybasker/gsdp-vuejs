<template>
  <div ref="elRef" :class="wrapperClass" :style="wrapperStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useInView } from '@/composables/useInView.js';

const props = defineProps({
  delay: { type: Number, default: 0 },
  direction: { type: String, default: 'up' }, // up | left | right | scale
  className: { type: String, default: '' },
});

const { elRef, inView } = useInView();

const offsetByDirection = {
  up: 'translateY(16px)',
  left: 'translateX(-24px)',
  right: 'translateX(24px)',
  scale: 'scale(0.96)',
};

const wrapperClass = computed(() => `transition-all duration-700 ease-out ${props.className}`);
const wrapperStyle = computed(() => ({
  opacity: inView.value ? 1 : 0,
  transform: inView.value ? 'none' : offsetByDirection[props.direction] || offsetByDirection.up,
  transitionDelay: `${props.delay}ms`,
}));
</script>
