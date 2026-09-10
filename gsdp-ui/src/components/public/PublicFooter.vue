<template>
  <footer class="relative overflow-hidden border-t border-white/10 bg-brand-950 text-slate-300">
    <div aria-hidden class="pointer-events-none absolute inset-0">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
    </div>

    <div class="relative mx-auto max-w-[1400px] px-6 py-16">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3 mb-6">
            <template v-if="footerLogo">
              <img :src="footerLogo" alt="Salesian Online" class="h-10 w-auto max-w-[200px] object-contain" style="filter: brightness(0) invert(1);" />
            </template>
            <template v-else>
              <div class="flex items-center gap-2">
                <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 text-white">
                  <svg class="h-7 w-7" viewBox="0 0 80 80" fill="currentColor" aria-hidden="true">
                    <path d="M39.9 7.2c-3.6 0-7.1 1.5-9.5 4.2l-1.7 1.8c1.4.4 2.7 1.2 3.8 2.3l1.8-1.9c1.4-1.5 3.4-2.3 5.6-2.3 2.1 0 4.2.8 5.6 2.3l1.9 2.1c1.1-1.1 2.4-1.8 3.8-2.2l-1.8-1.9c-2.3-2.7-5.9-4.3-9.5-4.3zm-11.1 12.8c-3.5 0-6.4 2.8-6.4 6.4v9.8c0 2.3 1.2 4.4 3.2 5.6l-1.7 9.8h11.4l.8-4.7h12.2l.8 4.7h11.8l-1.7-9.8c2-1.2 3.2-3.3 3.2-5.6v-9.8c0-3.5-2.9-6.4-6.4-6.4h-1.8v-.2c0-2.8-2.3-5.1-5.1-5.1c-1.3 0-2.5.5-3.5 1.4l-1.7 1.7-1.8-1.7c-1-1-2.2-1.5-3.5-1.5-2.8 0-5.1 2.3-5.1 5.1v.2h-1.8zm18.5 6.2h-15.1v7.3h15.1v-7.3zm-14.8 9.8h14.4v3.8H32.5v-3.8zm-2.2 6.2h18.8v3.7H30.3v-3.7zm25.4-15.9h2.1c2.3 0 4.2 1.9 4.2 4.2v9.8c0 1.2-.6 2.2-1.6 2.8l-4.7 2.8V23.6zm-37.1 0h2.3v18.2l-4.7-2.8c-1-.6-1.6-1.6-1.6-2.8V23.6c0-2.3 1.9-4.2 4.2-4.2zm10.8 8.1c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6zm9.9 0c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6z" />
                  </svg>
                </div>
                <div class="leading-tight">
                  <div class="text-xl font-extrabold uppercase tracking-wider text-white">Salesian</div>
                  <div class="text-xl font-extrabold uppercase tracking-wider text-white -mt-1">Online</div>
                </div>
              </div>
            </template>
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
            <li><router-link to="/news-events" class="hover:text-white transition-colors">News & Updates</router-link></li>
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

<script>
import { getLoginBranding } from '@/api/config.js';

export default {
  data() {
    return {
      footerLogo: '',
      footerIcon: '',
    };
  },
  async mounted() {
    try {
      const branding = await getLoginBranding();
      this.footerLogo = branding?.login_page_logo || '';
      this.footerIcon = branding?.login_page_icon || '';
    } catch {
      this.footerLogo = '';
      this.footerIcon = '';
    }
  },
};
</script>
