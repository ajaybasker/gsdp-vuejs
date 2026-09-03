<template>
  <div class="space-y-6">
    <!-- Page Banner -->
    <div class="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 shadow-lg sm:px-10 mb-8">
      <div class="relative z-10">
        <h2 class="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">Generalate · Institutional Registry</h2>
        <h1 class="text-3xl font-extrabold text-white sm:text-4xl">Global Dashboard</h1>
        <p class="mt-4 max-w-2xl text-lg text-slate-300">System-wide registry snapshot across every Province, globally.</p>
      </div>
      <div class="absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-blue-900 to-slate-900"></div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <div class="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Total Provinces</div>
        <div class="text-3xl font-extrabold text-slate-900">93</div>
        <div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
      </div>
      <div class="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Total Communities</div>
        <div class="text-3xl font-extrabold text-slate-900">1,908</div>
        <div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
      </div>
      <div class="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Total Activities</div>
        <div class="text-3xl font-extrabold text-slate-900">3,912</div>
        <div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </div>
      <div class="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Validated Registries</div>
        <div class="text-3xl font-extrabold text-slate-900">1,204</div>
        <div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
      </div>
      <div class="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Overdue / Escalated</div>
        <div class="text-3xl font-extrabold text-slate-900">42</div>
        <div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-5 mt-6">
      <div class="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-base font-bold text-slate-900 mb-1">Registry status distribution</h3>
        <p class="text-xs text-slate-500 mb-4">Count of Institutional Registry submissions by workflow status, across all communities.</p>
        <div class="h-64 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
          Chart Visualization Area (Recharts Replacement)
        </div>
      </div>
      
      <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-base font-bold text-slate-900 mb-1">Recently validated</h3>
        <p class="text-xs text-slate-500 mb-4">Latest communities to reach Validated status.</p>
        <div class="space-y-2">
          <div v-for="i in 5" :key="i" class="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-slate-50 px-3 py-2.5">
            <div class="min-w-0">
              <div class="truncate text-sm font-medium text-slate-800">Community Name {{ i }}</div>
              <div class="truncate text-xs text-slate-500">Province of Example · Validated Just Now</div>
            </div>
            <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">Validated</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalDashboard'
}
</script>
