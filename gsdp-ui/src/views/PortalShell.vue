<template>
  <div class="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
    <aside class="sticky top-0 hidden h-screen w-[260px] flex-shrink-0 flex-col overflow-y-auto bg-[#0b193f] lg:flex border-r border-slate-200 shadow-xl">
      <div class="flex flex-col h-full bg-[#0b193f]">
        <div class="flex-shrink-0 px-6 py-6 border-b border-white/5 flex items-center">
          <router-link to="/" class="block">
            <span class="text-white font-bold text-xl tracking-wider">SALESIAN ONLINE</span>
          </router-link>
        </div>

        <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-none">
          <div>
            <div class="px-3 mb-2 text-[10px] font-bold tracking-widest text-blue-300/60 uppercase">Generalate</div>
            <div class="space-y-1">
              <router-link to="/app/global-dashboard" class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all overflow-hidden bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span class="flex-1 truncate">Global Dashboard</span>
                <span class="absolute right-3 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              </router-link>
              <router-link to="/app/entity-hierarchy" class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all overflow-hidden text-slate-400 hover:bg-white/5 hover:text-slate-200">
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                <span class="flex-1 truncate">Entity Hierarchy</span>
              </router-link>
              <router-link to="/app/global-reports" class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all overflow-hidden text-slate-400 hover:bg-white/5 hover:text-slate-200">
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <span class="flex-1 truncate">Global Reports</span>
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </aside>

    <div class="flex min-h-screen flex-1 flex-col">
      <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div class="flex items-center gap-2 px-4 py-2.5 sm:px-6 h-16">
          <div class="ml-auto flex items-center gap-4">
            <button class="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div class="relative ml-2">
              <button @click="menuOpen = !menuOpen" class="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 hover:bg-slate-50 transition shadow-sm">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white shadow-sm relative">
                  AD
                  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </span>
                <span class="hidden text-left leading-tight sm:block">
                  <span class="block text-[13px] font-bold text-slate-800">Admin User</span>
                  <span class="block text-[11.5px] font-medium text-slate-500 mt-0.5">Generalate Admin</span>
                </span>
                <svg class="w-4 h-4 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="menuOpen" class="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2">
                <button @click="logout" class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] font-semibold text-red-600 hover:bg-red-50">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="mx-auto w-full flex-1 px-4 py-8 sm:px-8 lg:px-10 xl:px-12">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortalShell',
  data() {
    return {
      menuOpen: false
    }
  },
  inject: ['$auth'],
  methods: {
    logout() {
      this.$auth.logout();
      window.location.href = '/login';
    }
  }
}
</script>
