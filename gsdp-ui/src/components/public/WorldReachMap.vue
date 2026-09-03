<template>
  <div ref="elRef" class="relative">
    <svg :viewBox="`0 0 ${WIDTH} ${HEIGHT}`" class="w-full" role="img" aria-label="Global map of Provinces">
      <defs>
        <radialGradient id="reachMapGlow" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stop-color="#eff6ff" stop-opacity="1" />
          <stop offset="100%" stop-color="#dbeafe" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" :width="WIDTH" :height="HEIGHT" fill="url(#reachMapGlow)" />
      <g stroke="#93c5fd" stroke-opacity="0.6" stroke-width="0.75">
        <line v-for="line in graticuleLines" :key="line.key" v-bind="line.attrs" />
      </g>
      <path
        :d="WORLD_LAND_PATH"
        fill="#bfdbfe"
        :fill-opacity="inView ? 1 : 0"
        stroke="#60a5fa"
        :stroke-opacity="inView ? 0.5 : 0"
        stroke-width="0.6"
        style="transition: fill-opacity 1s ease, stroke-opacity 1s ease"
      />
      <rect x="0.5" y="0.5" :width="WIDTH - 1" :height="HEIGHT - 1" fill="none" stroke="#bfdbfe" stroke-opacity="1" />

      <g
        v-for="(p, idx) in points"
        :key="p.province_id"
        :style="{
          transformOrigin: `${project(p.latitude, p.longitude)[0]}px ${project(p.latitude, p.longitude)[1]}px`,
          transform: inView ? 'scale(1)' : 'scale(0)',
          opacity: inView ? 1 : 0,
          transition: `transform 0.5s cubic-bezier(.34,1.56,.64,1) ${Math.min(idx * 14, 900)}ms, opacity 0.4s ease ${Math.min(idx * 14, 900)}ms`,
        }"
        class="cursor-pointer"
        @mouseenter="hovered = idx"
        @mouseleave="hovered = hovered === idx ? null : hovered"
      >
        <circle
          v-if="hovered === idx"
          :cx="project(p.latitude, p.longitude)[0]"
          :cy="project(p.latitude, p.longitude)[1]"
          :r="radiusFor(p.community_count, maxCount) + 5"
          :fill="colorFor(p.region_name)"
          fill-opacity="0.25"
        />
        <circle
          :cx="project(p.latitude, p.longitude)[0]"
          :cy="project(p.latitude, p.longitude)[1]"
          :r="radiusFor(p.community_count, maxCount)"
          :fill="colorFor(p.region_name)"
          fill-opacity="0.85"
          stroke="#ffffff"
          stroke-width="1"
        />
      </g>
    </svg>

    <div
      v-if="hovered !== null && points[hovered]"
      class="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs text-brand-950 shadow-xl"
      :style="{
        left: `${(project(points[hovered].latitude, points[hovered].longitude)[0] / WIDTH) * 100}%`,
        top: `${(project(points[hovered].latitude, points[hovered].longitude)[1] / HEIGHT) * 100}%`,
        marginTop: '-10px',
      }"
    >
      <div class="font-bold text-brand-950">{{ points[hovered].province_name }}</div>
      <div class="text-slate-500 font-medium">{{ points[hovered].region_name }}</div>
      <div class="mt-0.5 text-brand-600 font-semibold">
        {{ points[hovered].community_count }} Communit{{ points[hovered].community_count === 1 ? 'y' : 'ies' }}
      </div>
    </div>

    <div class="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600">
      <span v-for="region in regions" :key="region" class="flex items-center gap-1.5">
        <span class="h-2 w-2 rounded-full" :style="{ background: colorFor(region) }" />
        {{ region }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useInView } from '@/composables/useInView.js';
import { WORLD_LAND_PATH } from '@/data/worldLandPath.js';

const props = defineProps({
  points: { type: Array, default: () => [] },
});

const WIDTH = 960;
const HEIGHT = 480;
const REGION_PALETTE = ['#818cf8', '#f472b6', '#fbbf24', '#34d399', '#38bdf8', '#fb7185', '#a78bfa', '#2dd4bf', '#fb923c'];

const { elRef, inView } = useInView();
const hovered = ref(null);

function project(lat, lng) {
  const x = ((lng + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y];
}

function radiusFor(count, max) {
  const min = 3.5;
  const scaleMax = 11;
  if (max <= 1) return min;
  return min + (scaleMax - min) * Math.sqrt(count / max);
}

const regions = computed(() => [...new Set(props.points.map((p) => p.region_name))].sort());
const maxCount = computed(() => Math.max(1, ...props.points.map((p) => p.community_count)));

function colorFor(region) {
  return REGION_PALETTE[regions.value.indexOf(region) % REGION_PALETTE.length];
}

const graticuleLines = computed(() => {
  const lines = [];
  for (let lng = -180; lng <= 180; lng += 30) {
    const [x] = project(0, lng);
    lines.push({ key: `v${lng}`, attrs: { x1: x, y1: 0, x2: x, y2: HEIGHT } });
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = project(lat, 0);
    lines.push({ key: `h${lat}`, attrs: { x1: 0, y1: y, x2: WIDTH, y2: y } });
  }
  return lines;
});
</script>
