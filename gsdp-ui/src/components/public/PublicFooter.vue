<template>
  <footer class="relative overflow-hidden border-t border-white/10 bg-brand-950 text-slate-300">
    <div aria-hidden class="pointer-events-none absolute inset-0">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-6 py-16">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5 text-brand-950">
              <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
            </div>
            <div>
              <div class="text-white font-extrabold text-lg leading-tight">Salesian Online</div>
              <div class="text-brand-400 text-[11px] font-bold uppercase tracking-wider">Global Salesian Digital Platform</div>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-slate-300 mb-4 pr-4">
            A unified digital platform for discovering and connecting Salesian Provinces, Communities, Institutions, Works, Sectors, and pastoral initiatives across the world.
          </p>
          <p class="text-xs leading-relaxed text-slate-400 pr-4">
            Built around the Salesian mission, people, places, works, and institutional relationships.
          </p>
        </div>

        <div class="lg:col-span-2 sm:col-span-6">
          <h3 class="text-white font-bold mb-4 uppercase tracking-wider text-xs">Explore</h3>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/global-statistics" class="hover:text-white transition-colors">Global Directory</router-link></li>
            <li><router-link to="/provinces" class="hover:text-white transition-colors">Regions</router-link></li>
            <li><router-link to="/provinces" class="hover:text-white transition-colors">Provinces & Inspectorates</router-link></li>
            <li><router-link to="/communities" class="hover:text-white transition-colors">Salesian Communities</router-link></li>
            <li><router-link to="/sectors" class="hover:text-white transition-colors">Institutions & Works</router-link></li>
            <li><router-link to="/sectors" class="hover:text-white transition-colors">Pastoral Sectors</router-link></li>
            <li><router-link to="/continents" class="hover:text-white transition-colors">Continents</router-link></li>
          </ul>
        </div>

        <div class="lg:col-span-2 sm:col-span-6">
          <h3 class="text-white font-bold mb-4 uppercase tracking-wider text-xs">Resources</h3>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/repository-search" class="hover:text-white transition-colors">Salesian Documents</router-link></li>
            <li><router-link to="/official-documents" class="hover:text-white transition-colors">Official Publications</router-link></li>
            <li><router-link to="/news-events" class="hover:text-white transition-colors">News & Updates</router-link></li>
            <li><router-link to="/salesian-sources" class="hover:text-white transition-colors">Salesian Sources</router-link></li>
            <li><router-link to="/about" class="hover:text-white transition-colors">General Council</router-link></li>
            <li><router-link to="/repository-search" class="hover:text-white transition-colors">Research & Knowledge</router-link></li>
          </ul>
        </div>

        <div class="lg:col-span-4 sm:col-span-12 space-y-8">
          <div>
            <h3 class="text-white font-bold mb-4 uppercase tracking-wider text-xs">Official & Governance</h3>
            <div class="text-sm text-slate-300 leading-relaxed mb-3">
              <strong class="block text-white font-medium">Salesian Congregation</strong>
              Generalate — Rome, Italy<br />
              Via della Pisana 1111<br />
              00163 Roma, Italy
            </div>
            <a href="https://www.sdb.org" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors">
              Official Sources <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-xs text-slate-500">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span class="text-slate-300 font-medium">© 2026 Salesian Online</span>
          <span class="hidden sm:inline text-slate-700">|</span>
          <span class="italic">Information is organized from official Salesian sources and institutional records.</span>
        </div>

        <div class="flex flex-wrap items-center gap-4 sm:gap-6">
          <span class="hover:text-white transition-colors cursor-default">Privacy</span>
          <span class="hover:text-white transition-colors cursor-default">Terms</span>
          <span class="hover:text-white transition-colors cursor-default">Data Policy</span>
          <span class="hover:text-white transition-colors cursor-default">Accessibility</span>
          <a href="https://www.sdb.org" target="_blank" rel="noreferrer" class="hover:text-brand-300 text-brand-400 transition-colors font-semibold">Official Sources &rarr;</a>
        </div>
      </div>
    </div>
  </footer>
</template>
