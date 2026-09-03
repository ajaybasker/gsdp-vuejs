<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-900 font-sans">
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
          <div class="flex-shrink-0 flex items-center space-x-2 text-[#0f172a]">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
            <span class="text-2xl font-bold uppercase tracking-wider leading-tight">Salesian<br/>Online</span>
          </div>

          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-[#0f172a] font-medium bg-blue-50 px-4 py-2 rounded-full">Home</a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2 flex items-center">Pastoral Works <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2 flex items-center">Knowledge & Resources <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>
            <a href="#" class="text-gray-600 font-medium hover:text-[#0f172a] px-4 py-2">About</a>
          </nav>

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
      <div class="h-1 bg-orange-500 w-full"></div>
    </header>

    <!-- HERO SECTION -->
    <section class="relative bg-[#0f172a] flex flex-col justify-center h-[75vh] min-h-[500px]">
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="(src, idx) in heroImages"
          :key="idx"
          class="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
          :class="idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <img
            :src="src"
            alt=""
            aria-hidden
            class="h-full w-full object-cover object-center opacity-100 transition-transform duration-[10000ms] ease-out"
            :class="idx === heroIndex ? 'scale-100' : 'scale-110'"
          />
        </div>
      </div>
    </section>

    <!-- PLATFORM / INSTITUTIONAL INFORMATION SECTION -->
    <section class="bg-slate-50 relative py-16">
      <div class="w-full px-4 md:px-8 xl:px-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 group">
          <div class="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img :src="institutionCoverImage" alt="Global Network" class="h-[500px] w-full object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="lg:pl-8">
          <h2 class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Institutional Information</h2>
          <h3 class="text-[28px] font-extrabold text-[#0f172a] leading-tight mb-6">
            A Unified Global Network
          </h3>
          <p class="text-base sm:text-lg leading-relaxed text-slate-600 mb-6">
            Founded in <strong>1859 by St. John Bosco</strong> in Turin, Italy, the Salesian congregation has grown to serve youth in ~135 countries worldwide. With headquarters in Rome (Sacro Cuore di Gesù a Castro Pretorio), our global mission continues to expand.
          </p>
          <p class="text-base sm:text-lg leading-relaxed text-slate-600 mb-8">
            Under the guidance of the current <strong>Rector Major, Fr. Fabio Attard</strong> (since March 2025), the wider Salesian Family includes 32 aligned groups and over 400,000 people globally, supported by this unified digital platform.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-3xl font-extrabold text-blue-800 flex justify-center items-baseline">
                <span class="text-2xl mr-0.5">{{ stat.prefix }}</span>
                <span>{{ stat.value }}</span>
                <span class="text-2xl ml-0.5">{{ stat.suffix }}</span>
              </div>
              <div class="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SALESIAN COLLECTIONS SECTION -->
    <section id="collections" class="bg-slate-50 py-24 border-b border-slate-100 overflow-hidden">
      <div class="w-full px-4 md:px-8 xl:px-12 mb-12">
        <div class="flex flex-col items-start md:flex-row md:justify-between md:items-end">
          <div class="max-w-2xl">
            <h2 class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Curated Knowledge</h2>
            <h3 class="text-[28px] font-extrabold text-[#0f172a]">Salesian Collections</h3>
            <p class="mt-4 text-slate-600 text-lg">
              Explore curated hubs of resources across Youth Ministry, Formation, Education, and the wider Salesian Family.
            </p>
          </div>
        </div>
      </div>

      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="collection in mockCollections" :key="collection.id" class="h-full">
            <div class="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 cursor-pointer">
              <div class="h-48 w-full overflow-hidden bg-slate-100">
                <img :src="collection.img" :alt="collection.title" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div class="flex flex-1 flex-col p-6">
                <h4 class="text-xl font-bold text-[#0f172a] mb-2 group-hover:text-blue-700 transition-colors">{{ collection.title }}</h4>
                <p class="text-sm text-slate-600 leading-relaxed flex-1">{{ collection.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE FEATURES SECTION -->
    <section class="bg-white py-24 border-y border-slate-100 overflow-hidden relative marquee-container">
      <div class="w-full px-4 md:px-8 xl:px-12 mb-16 text-center max-w-3xl mx-auto">
        <h2 class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Core Ecosystem</h2>
        <h3 class="text-[28px] font-extrabold text-[#0f172a]">Platform Capabilities</h3>
      </div>

      <div class="flex flex-col gap-6 relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div class="animate-marquee-left gap-6 px-4 flex w-max">
          <div v-for="(f, idx) in [...platformFeatures, ...platformFeatures]" :key="'top-'+idx" class="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 duration-300 cursor-pointer">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700 group-hover:scale-110 transition-transform shadow-inner">
                {{ f.icon }}
              </div>
              <h4 class="text-base font-bold text-[#0f172a] leading-tight">{{ f.title }}</h4>
            </div>
            <p class="text-sm leading-relaxed text-slate-500 font-medium">{{ f.desc }}</p>
          </div>
        </div>

        <div class="animate-marquee-right gap-6 px-4 flex w-max">
          <div v-for="(f, idx) in [...resourceFeatures, ...resourceFeatures]" :key="'bot-'+idx" class="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-white shadow-sm p-6 transition-all hover:bg-[#0f172a] hover:shadow-xl hover:border-blue-900 hover:-translate-y-1 duration-300 cursor-pointer">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-blue-700 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 transition-all shadow-inner">
                {{ f.icon }}
              </div>
              <h4 class="text-base font-bold text-[#0f172a] leading-tight group-hover:text-white transition-colors">{{ f.title }}</h4>
            </div>
            <p class="text-sm leading-relaxed text-slate-500 font-medium group-hover:text-blue-200 transition-colors">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- KNOWLEDGE AND RESOURCES SECTION -->
    <section class="bg-slate-50 py-24 border-y border-slate-100">
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-12">
          <div class="max-w-2xl">
            <h2 class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Digital Archives</h2>
            <h3 class="text-[28px] font-extrabold text-[#0f172a]">Knowledge & Resources</h3>
            <p class="mt-4 text-slate-600 text-lg">
              Access a vast collection of curated digital resources, document collections, publications, and historical materials.
            </p>
          </div>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <div v-for="(item, idx) in knowledgeResources" :key="item.title">
            <div class="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 cursor-pointer">
              <div class="h-64 w-full overflow-hidden bg-slate-100">
                <img :src="item.img" :alt="item.title" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div class="flex flex-1 flex-col p-6 lg:p-8">
                <h4 class="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-blue-700 transition-colors">{{ item.title }}</h4>
                <p class="text-base text-slate-600 leading-relaxed flex-1">{{ item.desc }}</p>
                <div class="mt-6 flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700">
                  Explore Collection <span class="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SALESIAN REGIONS SECTION -->
    <section class="bg-white py-24 border-t border-slate-100">
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Global Footprint</h2>
          <h3 class="text-[28px] font-extrabold text-[#0f172a]">Salesian Regions of the World</h3>
          <p class="mt-4 text-slate-600 text-lg">The Congregation is organized into 8 geographic regions, spanning 135+ countries across every continent.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="region in regions" :key="region.code">
            <div class="group relative h-full flex flex-col rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 cursor-pointer">
              <div :class="`h-2 w-full bg-gradient-to-r ${region.color}`"></div>
              <div class="p-6 lg:p-8 flex flex-col flex-1">
                <div class="flex items-start justify-between mb-6 gap-4">
                  <h4 class="text-xl font-extrabold text-[#0f172a] leading-tight group-hover:text-blue-700 transition-colors">{{ region.name }}</h4>
                  <span :class="`shrink-0 text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border ${region.light}`">{{ region.code }}</span>
                </div>
                <p class="text-sm font-bold text-blue-600 mb-4 leading-relaxed">{{ region.highlight }}</p>
                <p class="text-base text-slate-600 leading-relaxed flex-1">{{ region.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PublicFooter (simple version) -->
    <footer class="bg-[#0f172a] text-white py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div>© 2026 Salesian Online. All rights reserved.</div>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white">Privacy Policy</a>
          <a href="#" class="hover:text-white">Terms of Service</a>
          <a href="#" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import img1 from '../assets/5.jpg';
import img2 from '../assets/Pasted image (2).png';
import img3 from '../assets/Pasted image (3).png';
import img4 from '../assets/Pasted image.png';
import img5 from '../assets/landing image4.jpeg';

export default {
  name: 'Home',
  data() {
    return {
      heroImages: [img1, img2, img3, img4, img5],
      heroIndex: 0,
      heroInterval: null,
      institutionCoverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
      stats: [
        { label: 'Salesians', value: '14,600', prefix: '~', suffix: '' },
        { label: 'Countries', value: '135', prefix: '', suffix: '' },
        { label: 'Provinces', value: '93', prefix: '', suffix: '' },
        { label: 'Communities', value: '1,900', prefix: '', suffix: '+' },
      ],
      mockCollections: [
        { id: 1, title: 'Youth Ministry', desc: 'Resources for youth centers, schools, and parishes.', img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop' },
        { id: 2, title: 'Formation', desc: 'Materials for Salesian formation and spiritual growth.', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop' },
        { id: 3, title: 'Salesian Family', desc: 'Documents and resources for the wider Salesian Family.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop' },
      ],
      platformFeatures: [
        { icon: '🏛️', title: 'Institutional Registry', desc: 'Centralized, governed registry for all institutions.' },
        { icon: '🔄', title: 'Governed Workflows', desc: 'Structured review and approval cycles.' },
        { icon: '🛡️', title: 'Compliance & Monitoring', desc: 'Built-in tracking and reporting.' },
        { icon: '📝', title: 'Governed Publication', desc: 'Secure and verified publication of resources.' },
        { icon: '🔍', title: 'Global Search', desc: 'Unified discovery of digital resources.' },
      ],
      resourceFeatures: [
        { icon: '📂', title: 'Document Collections', desc: 'Curated sets of institutional and historical documents.' },
        { icon: '📰', title: 'Publications', desc: 'Official releases, journals, and constitutions.' },
        { icon: '📚', title: 'Digital Archives', desc: 'Historical assets preserving the Salesian heritage.' },
        { icon: '🗺️', title: 'Pastoral Works Maps', desc: 'Interactive geographic visualization of global missions.' },
        { icon: '🤝', title: 'Salesian Network', desc: 'Connecting the global family across 135 countries.' }
      ],
      knowledgeResources: [
        { title: 'Document Collections', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=400&fit=crop', desc: 'Curated sets of institutional and historical documents. Explore our rich repository of letters, decrees, and foundation texts that shape our history.' },
        { title: 'Publications', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', desc: 'Official releases, journals, and constitutions. Stay updated with the latest Salesian bulletins, guidelines, and international publications.' },
        { title: 'Digital Archives', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop', desc: 'Historical assets preserving the Salesian heritage. Delve into a digitized world of rare manuscripts and primary source materials.' },
        { title: 'Educational Materials', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop', desc: 'Resources supporting schools and technical institutes. Access lesson plans, youth ministry guides, and pedagogical frameworks.' },
        { title: 'Multimedia Assets', img: 'https://images.unsplash.com/photo-1516280440502-a279093b1695?w=400&h=400&fit=crop', desc: 'Photographs, audio recordings, and videos. Browse our visual and audio gallery documenting missions and community life globally.' },
        { title: 'Research & Studies', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop', desc: 'Academic papers and pastoral research documents. Discover theological insights, sociological studies, and in-depth pastoral analyses.' },
      ],
      regions: [
        { code: 'AFM', name: 'Africa–Madagascar', highlight: 'One of the fastest-growing regions in vocations worldwide.', desc: 'Covers Sub-Saharan Africa and Madagascar, with rapidly expanding communities and youth outreach programs.', icon: '🌍', color: 'from-amber-500 to-orange-600', light: 'bg-amber-50 border-amber-100 text-amber-700' },
        { code: 'EAO', name: 'East Asia–Oceania', highlight: 'Spanning the Pacific Rim and Southeast Asia.', desc: 'Philippines, Japan, South Korea, China/Hong Kong, Vietnam, Thailand, Australia, Papua New Guinea, Timor-Leste.', icon: '🌏', color: 'from-sky-500 to-blue-600', light: 'bg-sky-50 border-sky-100 text-sky-700' },
        { code: 'INS', name: 'South Asia', highlight: 'Highest concentration of Salesian provinces globally.', desc: 'India, Sri Lanka, Nepal, Pakistan. India alone leads the world in Salesian vocations and province density.', icon: '🕌', color: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
        { code: 'INA', name: 'Interamerica', highlight: 'Bridging North and South America.', desc: 'Mexico, Central America, and the Caribbean, forming a vital bridge across the Americas for Salesian mission.', icon: '🌎', color: 'from-rose-500 to-pink-600', light: 'bg-rose-50 border-rose-100 text-rose-700' },
        { code: 'ACS', name: 'South Cone of America', highlight: 'Deep roots in South American culture and education.', desc: 'Argentina, Chile, Uruguay, Paraguay, Bolivia, Peru, Ecuador — known as Cono Sur.', icon: '🏔️', color: 'from-violet-500 to-purple-600', light: 'bg-violet-50 border-violet-100 text-violet-700' },
        { code: 'ECN', name: 'Europe Centre–North', highlight: 'Established provinces across Central and Eastern Europe.', desc: 'UK, Ireland, France, Belgium, Germany, Netherlands, Poland, and Central/Eastern European nations.', icon: '🏰', color: 'from-indigo-500 to-blue-700', light: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
        { code: 'EUR', name: 'Europe Mediterranean', highlight: 'The heartland of the Salesian charism.', desc: 'Spain, Portugal, Malta, Slovenia, Croatia — Mediterranean provinces with deep historical Salesian heritage.', icon: '⛪', color: 'from-cyan-500 to-teal-600', light: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
        { code: 'IME', name: 'Italy–Middle East', highlight: 'Birthplace of the Salesian Congregation.', desc: "Italy's provinces, the home of Don Bosco, plus Lebanon, Syria, Egypt, and Israel/Palestine.", icon: '🏛️', color: 'from-blue-700 to-blue-950', light: 'bg-blue-50 border-blue-100 text-blue-700' },
      ]
    }
  },
  mounted() {
    this.heroInterval = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroImages.length;
    }, 6000);
  },
  beforeUnmount() {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }
};
</script>

<style scoped>
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 1rem)); }
}
@keyframes scroll-right {
  0% { transform: translateX(calc(-50% - 1rem)); }
  100% { transform: translateX(0); }
}
.animate-marquee-left {
  animation: scroll-left 40s linear infinite;
}
.animate-marquee-right {
  animation: scroll-right 45s linear infinite;
}
.marquee-container:hover .animate-marquee-left,
.marquee-container:hover .animate-marquee-right {
  animation-play-state: paused;
}
</style>
