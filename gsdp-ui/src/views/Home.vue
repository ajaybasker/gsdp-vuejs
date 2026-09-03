<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- Top Bar -->
    <div class="bg-[#0f172a] text-white text-xs py-1 px-8 flex justify-between items-center">
      <div class="flex space-x-6">
        <a href="#" class="hover:text-gray-300">ANS News</a>
        <a href="#" class="hover:text-gray-300">GC 29</a>
        <a href="#" class="hover:text-gray-300">Provinces</a>
        <a href="#" class="hover:text-gray-300">Salesian Family</a>
      </div>
      <div class="flex space-x-4 items-center">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
        <div class="flex space-x-2 font-semibold">
          <a href="#" class="text-yellow-500">EN</a>
          <a href="#" class="hover:text-yellow-500">IT</a>
          <a href="#" class="hover:text-yellow-500">ES</a>
          <a href="#" class="hover:text-yellow-500">FR</a>
          <a href="#" class="hover:text-yellow-500">PT</a>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <header class="bg-white border-b border-orange-500 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center space-x-2 text-[#0f172a]">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
            <span class="text-2xl font-bold uppercase tracking-wider leading-tight">Salesian<br/>Online</span>
          </div>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-[#0f172a] font-medium bg-blue-50 px-4 py-2 rounded-full">Home</a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2 flex items-center">Pastoral Works <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2 flex items-center">Knowledge & Resources <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2">About</a>
          </nav>

          <!-- Right Actions -->
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#0f172a] hover:bg-gray-50 transition-colors">Sign In</router-link>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" class="pl-9 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-48" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
      <!-- Orange Bar at bottom of header -->
      <div class="h-1 bg-orange-500 w-full"></div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Image -->
        <div class="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <img :src="heroImg" alt="Salesian Building" class="w-full h-full object-cover" />
        </div>

        <!-- Right Content -->
        <div class="flex flex-col justify-center space-y-6">
          <div>
            <h3 class="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">Institutional Information</h3>
            <h1 class="text-4xl font-extrabold text-[#0f172a] font-serif leading-tight">A Unified Global Network</h1>
          </div>
          
          <p class="text-gray-600 text-lg leading-relaxed">
            Founded in <strong class="text-gray-900">1859</strong> by <strong class="text-gray-900">St. John Bosco</strong> in Turin, Italy, the Salesian congregation has grown to serve youth in ~135 countries worldwide. With headquarters in Rome (Sacro Cuore di Gesù a Castro Pretorio), our global mission continues to expand.
          </p>

          <p class="text-gray-600 text-lg leading-relaxed">
            Under the guidance of the current <strong class="text-gray-900">Rector Major, Fr. Fabio Attard</strong> (since March 2025), the wider Salesian Family includes 32 aligned groups and over 400,000 people globally, supported by this unified digital platform.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div class="text-center">
              <div class="text-3xl font-bold text-[#0f172a] mb-1">~14,600</div>
              <div class="text-xs font-bold text-gray-500 uppercase tracking-wider">Salesians</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#0f172a] mb-1">135</div>
              <div class="text-xs font-bold text-gray-500 uppercase tracking-wider">Countries</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#0f172a] mb-1">93</div>
              <div class="text-xs font-bold text-gray-500 uppercase tracking-wider">Provinces</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#0f172a] mb-1">1,900+</div>
              <div class="text-xs font-bold text-gray-500 uppercase tracking-wider">Communities</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import heroImg from '../assets/hero.png';

export default {
  name: 'Home',
  data() {
    return {
      heroImg
    }
  }
};
</script>
