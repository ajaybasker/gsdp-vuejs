<template>
  <div class="w-full">
    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full" role="img" aria-label="Bar chart">
      <line v-for="g in gridLines" :key="g" x1="0" :x2="width" :y1="yFor(g)" :y2="yFor(g)" stroke="#e2e8f0" stroke-width="1" />
      <g v-for="(d, idx) in data" :key="d.name">
        <rect
          :x="xFor(idx) + barGap / 2" :y="yFor(d.value)"
          :width="barWidth - barGap" :height="Math.max(0, chartHeight - yFor(d.value) + topPad)"
          rx="3" fill="#6366f1"
        />
        <text :x="xFor(idx) + barWidth / 2" :y="height - 6" text-anchor="middle" font-size="10" fill="#64748b">{{ d.name }}</text>
        <text :x="xFor(idx) + barWidth / 2" :y="yFor(d.value) - 4" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="700">{{ d.value }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: { type: Array, required: true }, // [{ name, value }]
});

const width = 640;
const height = 280;
const topPad = 24;
const bottomPad = 34;
const chartHeight = height - topPad - bottomPad;
const barGap = 10;

const maxValue = computed(() => Math.max(1, ...props.data.map((d) => d.value)));
const barWidth = computed(() => (props.data.length ? width / props.data.length : width));

function xFor(idx) {
  return idx * barWidth.value;
}
function yFor(value) {
  return topPad + chartHeight - (value / maxValue.value) * chartHeight;
}

const gridLines = computed(() => {
  const steps = 4;
  const lines = [];
  for (let i = 0; i <= steps; i++) lines.push(Math.round((maxValue.value / steps) * i));
  return lines;
});
</script>
