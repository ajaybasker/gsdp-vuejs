<template>
  <router-link
    :to="`/collections/${collection.id}`"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-300 transition-all duration-500"
  >
    <div class="relative h-44 w-full overflow-hidden bg-slate-100">
      <img v-if="collection.coverImage" :src="collection.coverImage" :alt="collection.title" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
      <PlaceholderImage v-else :title="collection.title" class-name="h-full w-full rounded-none" />
      <span v-if="collection.category" class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 shadow-sm">{{ collection.category }}</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h4 class="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">{{ collection.title }}</h4>
      <p v-if="collection.organization" class="mt-1 text-xs font-semibold text-slate-400">{{ collection.organization }}</p>
      <p v-if="collection.description" class="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">{{ collection.description }}</p>
      <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
        <span>{{ collection.totalResources ?? 0 }} resource{{ (collection.totalResources ?? 0) === 1 ? '' : 's' }}</span>
        <span class="text-brand-600">View Collection →</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import PlaceholderImage from './PlaceholderImage.vue';

defineProps({
  collection: { type: Object, required: true },
});
</script>
