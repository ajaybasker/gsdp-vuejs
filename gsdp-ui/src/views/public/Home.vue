<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-900 font-sans">
    <PublicHeader />

    <!-- HERO -->
    <section class="relative bg-brand-950 flex flex-col justify-center h-[75vh] min-h-[500px]">
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="(src, idx) in heroImages"
          :key="idx"
          class="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
          :class="idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <img :src="src" alt="" aria-hidden class="h-full w-full object-cover object-center transition-transform duration-[10000ms] ease-out" :class="idx === heroIndex ? 'scale-100' : 'scale-110'" />
        </div>
        <div class="absolute inset-0 bg-brand-950/30" />
      </div>
    </section>

    <!-- INSTITUTIONAL INFORMATION -->
    <section class="bg-slate-50 relative py-16">
      <div class="w-full px-4 md:px-8 xl:px-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 group">
          <div class="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img :src="INSTITUTION_COVER_IMAGE.url" alt="Global Network" class="h-[500px] w-full object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="lg:pl-8">
          <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Institutional Information</h2>
          <h3 class="text-[28px] font-extrabold text-brand-950 leading-tight mb-6">A Unified Global Network</h3>
          <p class="text-base sm:text-lg leading-relaxed text-slate-600 mb-6">
            Founded in <strong>1859 by St. John Bosco</strong> in Turin, Italy, the Salesian congregation has grown to serve youth in ~135 countries worldwide. With headquarters in Rome (Sacro Cuore di Gesù a Castro Pretorio), our global mission continues to expand.
          </p>
          <p class="text-base sm:text-lg leading-relaxed text-slate-600 mb-8">
            Under the guidance of the current <strong>Rector Major, Fr. Fabio Attard</strong> (since March 2025), the wider Salesian Family includes 32 aligned groups and over 400,000 people globally, supported by this unified digital platform.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div class="text-center">
              <div class="text-3xl font-extrabold text-brand-800">~14,600</div>
              <div class="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Salesians</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-extrabold text-brand-800"><AnimatedCounter :value="counts.regions" /></div>
              <div class="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Regions</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-extrabold text-brand-800"><AnimatedCounter :value="counts.provinces" /></div>
              <div class="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Provinces</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-extrabold text-brand-800"><AnimatedCounter :value="counts.communities" /></div>
              <div class="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Communities</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GLOBAL REACH -->
    <section v-if="mapPoints.length" class="bg-white py-24 border-y border-slate-100">
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-10">
          <div class="max-w-2xl">
            <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Global Reach</h2>
            <h3 class="text-[28px] font-extrabold text-brand-950">Our Presence Around the World</h3>
          </div>
          <router-link to="/global-statistics" class="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
            Pastoral Works Maps <span>&rarr;</span>
          </router-link>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-8">
          <WorldReachMap :points="mapPoints" />
        </div>
      </div>
    </section>

    <!-- SALESIAN COLLECTIONS -->
    <section id="collections" class="bg-slate-50 py-24 border-b border-slate-100 overflow-hidden">
      <div class="w-full px-4 md:px-8 xl:px-12 mb-12">
        <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Curated Knowledge</h2>
        <h3 class="text-[28px] font-extrabold text-brand-950">Salesian Collections</h3>
        <p class="mt-4 text-slate-600 text-lg max-w-2xl">
          Explore curated hubs of resources across Youth Ministry, Formation, Education, and the wider Salesian Family.
        </p>
      </div>
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div v-if="collections.length" class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <CollectionCard v-for="c in collections" :key="c.id" :collection="c" />
        </div>
        <EmptyState v-else icon="Archive" title="No collections published yet" />
      </div>
    </section>

    <!-- MARQUEE FEATURES -->
    <section class="bg-white py-24 border-y border-slate-100 overflow-hidden relative marquee-container">
      <div class="w-full px-4 md:px-8 xl:px-12 mb-16 text-center max-w-3xl mx-auto">
        <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Core Ecosystem</h2>
        <h3 class="text-[28px] font-extrabold text-brand-950">Platform Capabilities</h3>
      </div>
      <div class="flex flex-col gap-6 relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div class="animate-marquee-left gap-6 px-4 flex w-max">
          <div v-for="(f, idx) in [...platformFeatures, ...platformFeatures]" :key="'top-' + idx" class="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-xl text-brand-700 group-hover:scale-110 transition-transform shadow-inner">{{ f.icon }}</div>
              <h4 class="text-base font-bold text-brand-950 leading-tight">{{ f.title }}</h4>
            </div>
            <p class="text-sm leading-relaxed text-slate-500 font-medium">{{ f.desc }}</p>
          </div>
        </div>
        <div class="animate-marquee-right gap-6 px-4 flex w-max">
          <div v-for="(f, idx) in [...resourceFeatures, ...resourceFeatures]" :key="'bot-' + idx" class="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-white shadow-sm p-6 transition-all hover:bg-brand-950 hover:shadow-xl hover:border-brand-900 hover:-translate-y-1 duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-brand-700 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 transition-all shadow-inner">{{ f.icon }}</div>
              <h4 class="text-base font-bold text-brand-950 leading-tight group-hover:text-white transition-colors">{{ f.title }}</h4>
            </div>
            <p class="text-sm leading-relaxed text-slate-500 font-medium group-hover:text-brand-200 transition-colors">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- KNOWLEDGE & RESOURCES -->
    <section class="bg-slate-50 py-24 border-y border-slate-100">
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="max-w-2xl mb-12">
          <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Digital Archives</h2>
          <h3 class="text-[28px] font-extrabold text-brand-950">Knowledge & Resources</h3>
          <p class="mt-4 text-slate-600 text-lg">Access a vast collection of curated digital resources, document collections, publications, and historical materials.</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <router-link v-for="item in knowledgeResources" :key="item.title" :to="item.to" class="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-300 transition-all duration-500">
            <div class="h-64 w-full overflow-hidden bg-slate-100">
              <img :src="item.img" :alt="item.title" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            </div>
            <div class="flex flex-1 flex-col p-6 lg:p-8">
              <h4 class="text-xl font-bold text-brand-950 mb-3 group-hover:text-brand-700 transition-colors">{{ item.title }}</h4>
              <p class="text-base text-slate-600 leading-relaxed flex-1">{{ item.desc }}</p>
              <div class="mt-6 flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-700">
                Explore <span class="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- REGIONS -->
    <section class="bg-white py-24 border-t border-slate-100">
      <div class="w-full px-4 md:px-8 xl:px-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Global Footprint</h2>
          <h3 class="text-[28px] font-extrabold text-brand-950">Salesian Regions of the World</h3>
          <p class="mt-4 text-slate-600 text-lg">The Congregation is organized into 8 geographic regions, spanning 135+ countries across every continent.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="region in regions" :key="region.code" class="group relative h-full flex flex-col rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-300 transition-all duration-500">
            <div :class="`h-2 w-full bg-gradient-to-r ${region.color}`"></div>
            <div class="p-6 lg:p-8 flex flex-col flex-1">
              <div class="flex items-start justify-between mb-6 gap-4">
                <h4 class="text-xl font-extrabold text-brand-950 leading-tight group-hover:text-brand-700 transition-colors">{{ region.name }}</h4>
                <span :class="`shrink-0 text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border ${region.light}`">{{ region.code }}</span>
              </div>
              <p class="text-sm font-bold text-brand-600 mb-4 leading-relaxed">{{ region.highlight }}</p>
              <p class="text-base text-slate-600 leading-relaxed flex-1">{{ region.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <PublicFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import img1 from '@/assets/5.jpg';
import img2 from '@/assets/Pasted image (2).png';
import img3 from '@/assets/Pasted image (3).png';
import img4 from '@/assets/Pasted image.png';
import img5 from '@/assets/landing image4.jpeg';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import WorldReachMap from '@/components/public/WorldReachMap.vue';
import AnimatedCounter from '@/components/public/AnimatedCounter.vue';
import CollectionCard from '@/components/public/CollectionCard.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import { getCounts, getMapPoints } from '@/api/registry.js';
import { listAssets, listCollections } from '@/api/repository.js';
import { INSTITUTION_COVER_IMAGE } from '@/data/repositoryImages.js';

const heroImages = [img1, img2, img3, img4, img5];
const heroIndex = ref(0);
let heroInterval = null;

const counts = ref({ regions: 0, provinces: 0, communities: 0 });
const mapPoints = ref([]);
const collections = ref([]);

onMounted(async () => {
  heroInterval = setInterval(() => { heroIndex.value = (heroIndex.value + 1) % heroImages.length; }, 6000);

  getCounts().then((c) => {
    counts.value = { regions: c.Region, provinces: c.Province, communities: c.Community };
  }).catch(() => {});
  getMapPoints().then((points) => { mapPoints.value = points; }).catch(() => {});

  try {
    const repoCollections = await listCollections();
    const withCounts = await Promise.all(
      repoCollections.slice(0, 6).map(async (c) => {
        const assets = await listAssets({ collection: c.name, limit: 3 }).catch(() => []);
        return {
          id: c.name,
          title: c.collection_name,
          desc: c.description,
          totalResources: assets.length,
        };
      })
    );
    collections.value = withCounts;
  } catch {
    collections.value = [];
  }
});

onUnmounted(() => { if (heroInterval) clearInterval(heroInterval); });

const platformFeatures = [
  { icon: '🏛️', title: 'Institutional Registry', desc: 'Centralized, governed registry for all institutions.' },
  { icon: '🔄', title: 'Governed Workflows', desc: 'Structured review and approval cycles.' },
  { icon: '🛡️', title: 'Compliance & Monitoring', desc: 'Built-in tracking and reporting.' },
  { icon: '📝', title: 'Governed Publication', desc: 'Secure and verified publication of resources.' },
  { icon: '🔍', title: 'Global Search', desc: 'Unified discovery of digital resources.' },
];
const resourceFeatures = [
  { icon: '📂', title: 'Document Collections', desc: 'Curated sets of institutional and historical documents.' },
  { icon: '📰', title: 'Publications', desc: 'Official releases, journals, and constitutions.' },
  { icon: '📚', title: 'Digital Archives', desc: 'Historical assets preserving the Salesian heritage.' },
  { icon: '🗺️', title: 'Pastoral Works Maps', desc: 'Interactive geographic visualization of global missions.' },
  { icon: '🤝', title: 'Salesian Network', desc: 'Connecting the global family across 135 countries.' },
];
const knowledgeResources = [
  { title: 'Document Collections', to: '/repository-search', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=400&fit=crop', desc: 'Curated sets of institutional and historical documents.' },
  { title: 'Official Documents', to: '/official-documents', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', desc: 'Official releases, journals, and constitutions.' },
  { title: 'Salesian Sources', to: '/salesian-sources', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop', desc: 'Historical assets preserving the Salesian heritage.' },
  { title: 'News & Events', to: '/news-events', img: 'https://images.unsplash.com/photo-1516280440502-a279093b1695?w=400&h=400&fit=crop', desc: 'Photographs, events, and community life globally.' },
  { title: 'Global Statistics', to: '/global-statistics', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop', desc: 'Academic and pastoral analytics across the network.' },
];
const regions = [
  { code: 'AFM', name: 'Africa–Madagascar', highlight: 'One of the fastest-growing regions in vocations worldwide.', desc: 'Covers Sub-Saharan Africa and Madagascar, with rapidly expanding communities and youth outreach programs.', color: 'from-amber-500 to-orange-600', light: 'bg-amber-50 border-amber-100 text-amber-700' },
  { code: 'EAO', name: 'East Asia–Oceania', highlight: 'Spanning the Pacific Rim and Southeast Asia.', desc: 'Philippines, Japan, South Korea, China/Hong Kong, Vietnam, Thailand, Australia, Papua New Guinea, Timor-Leste.', color: 'from-sky-500 to-blue-600', light: 'bg-sky-50 border-sky-100 text-sky-700' },
  { code: 'INS', name: 'South Asia', highlight: 'Highest concentration of Salesian provinces globally.', desc: 'India, Sri Lanka, Nepal, Pakistan. India alone leads the world in Salesian vocations and province density.', color: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  { code: 'INA', name: 'Interamerica', highlight: 'Bridging North and South America.', desc: 'Mexico, Central America, and the Caribbean, forming a vital bridge across the Americas for Salesian mission.', color: 'from-rose-500 to-pink-600', light: 'bg-rose-50 border-rose-100 text-rose-700' },
  { code: 'ACS', name: 'South Cone of America', highlight: 'Deep roots in South American culture and education.', desc: 'Argentina, Chile, Uruguay, Paraguay, Bolivia, Peru, Ecuador — known as Cono Sur.', color: 'from-violet-500 to-purple-600', light: 'bg-violet-50 border-violet-100 text-violet-700' },
  { code: 'ECN', name: 'Europe Centre–North', highlight: 'Established provinces across Central and Eastern Europe.', desc: 'UK, Ireland, France, Belgium, Germany, Netherlands, Poland, and Central/Eastern European nations.', color: 'from-indigo-500 to-blue-700', light: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
  { code: 'EUR', name: 'Europe Mediterranean', highlight: 'The heartland of the Salesian charism.', desc: 'Spain, Portugal, Malta, Slovenia, Croatia — Mediterranean provinces with deep historical Salesian heritage.', color: 'from-cyan-500 to-teal-600', light: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
  { code: 'IME', name: 'Italy–Middle East', highlight: 'Birthplace of the Salesian Congregation.', desc: "Italy's provinces, the home of Don Bosco, plus Lebanon, Syria, Egypt, and Israel/Palestine.", color: 'from-blue-700 to-blue-950', light: 'bg-blue-50 border-blue-100 text-blue-700' },
];
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
.animate-marquee-left { animation: scroll-left 40s linear infinite; }
.animate-marquee-right { animation: scroll-right 45s linear infinite; }
.marquee-container:hover .animate-marquee-left,
.marquee-container:hover .animate-marquee-right { animation-play-state: paused; }
</style>
