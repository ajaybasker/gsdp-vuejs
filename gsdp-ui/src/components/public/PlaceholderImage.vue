<template>
  <div v-if="cover && !failed" :class="`relative overflow-hidden rounded-xl bg-slate-100 ${className}`">
    <img
      :src="cover.url"
      :alt="title ? `Cover image for ${title}` : 'Resource cover image'"
      @error="failed = true"
      class="h-full w-full object-cover"
      loading="lazy"
    />
    <span class="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-white">
      <Icon name="Image" :size="11" />
    </span>
  </div>
  <div
    v-else
    role="img"
    :aria-label="title ? `Placeholder cover image for ${title}` : 'Placeholder cover image'"
    :class="`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${gradient} text-white ${className}`"
  >
    <span class="text-lg font-bold tracking-wide opacity-90">{{ initials }}</span>
    <span class="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/25">
      <Icon name="Image" :size="11" />
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Icon from '../icons/Icon.vue';
import { coverImageForAssetType } from '@/data/repositoryImages.js';

const props = defineProps({
  title: { type: String, default: '' },
  assetType: { type: String, default: '' },
  gradient: { type: String, default: 'from-brand-600 to-brand-600' },
  className: { type: String, default: '' },
});

const failed = ref(false);
const cover = computed(() => (props.assetType ? coverImageForAssetType(props.assetType) : null));
const initials = computed(() => {
  const words = (props.title || '').split(/\s+/).filter(Boolean).slice(0, 2);
  return words.map((w) => w[0]?.toUpperCase()).join('') || '—';
});
</script>
