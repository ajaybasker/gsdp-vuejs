<template>
  <div class="relative min-h-screen bg-white font-sans">
    <PublicHeader />

    <main class="overflow-x-hidden">
      <section class="w-full bg-brand-950 text-white">
        <div class="flex flex-col-reverse lg:flex-row w-full">
          <div class="hidden lg:block w-full lg:w-1/2 min-h-[500px] relative flex-shrink-0">
            <img src="https://www.lackawanna.edu/wp-content/uploads/2024/08/college-students.webp" alt="Salesian Education" class="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div class="w-full lg:w-1/2 p-6 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-center">
            <Reveal direction="left">
              <h2 class="text-[28px] font-extrabold mb-8 text-white">Salesian Education</h2>
              <p class="text-xl text-slate-300 leading-relaxed mb-6">
                Salesian education originates from the educational experience of Don Bosco, who developed his educational work primarily for young people, especially those facing poverty, abandonment, or social disadvantage.
              </p>
              <p class="text-xl text-slate-300 leading-relaxed mb-10">
                The aim of Salesian education is <strong class="text-white">integral formation</strong>—supporting the human, social, moral, professional, and spiritual development of young people.
              </p>
              <div class="bg-brand-900/50 border border-brand-700/50 rounded-3xl p-6 sm:p-10 text-center shadow-xl">
                <h4 class="text-brand-300 font-bold uppercase tracking-widest text-sm mb-4">Educational Vision</h4>
                <p class="text-4xl font-serif font-medium mb-6">"Good Christians and upright citizens."</p>
                <p class="text-white/80 leading-relaxed text-lg">
                  Education should prepare young people not only for employment or academic success, but also for responsible participation in society and the development of their full human potential.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section class="w-full bg-white py-16 sm:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
        <Reveal>
          <div class="max-w-7xl mx-auto">
            <h3 class="text-[28px] font-extrabold text-brand-950 mb-12 text-center">Educational Method &amp; Areas</h3>

            <div class="grid lg:grid-cols-2 gap-16 mb-20">
              <div class="space-y-8">
                <h4 class="text-2xl font-bold text-brand-900">The Preventive System</h4>
                <p class="text-lg text-slate-600">Instead of relying primarily on punishment or repression, the method developed by Don Bosco seeks to:</p>
                <ul class="space-y-6">
                  <li v-for="item in preventiveSystemPoints" :key="item" class="flex items-start gap-4">
                    <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-1">
                      <Icon name="Check" :size="16" class="text-brand-600" />
                    </div>
                    <span class="text-lg text-slate-700">{{ item }}</span>
                  </li>
                </ul>
                <div class="p-6 sm:p-8 bg-slate-50 border-l-4 border-slate-300 rounded-r-2xl italic text-base sm:text-lg text-slate-600">
                  "Don Bosco's Oratory remains the permanent model for Salesian educational and pastoral activity: a home that welcomes, a parish that evangelizes, a school that prepares for life, and a playground where friends meet and enjoy themselves."
                </div>
              </div>

              <div>
                <h4 class="text-2xl font-bold text-brand-900 mb-8">Main Areas of Activity</h4>
                <div class="space-y-4">
                  <div v-for="item in areasOfActivity" :key="item.area" class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="font-extrabold text-brand-900 text-lg w-1/3">{{ item.area }}</div>
                    <div class="text-slate-600 w-2/3">{{ item.purpose }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-brand-50 rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-16 border border-brand-100">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <h3 class="text-[28px] font-extrabold text-brand-950 mb-6">Salesian Higher Education (IUS)</h3>
                <p class="text-xl text-slate-600">
                  A global network of 97 institutions promoting academic collaboration, research, innovation, and social impact while maintaining its connection with the Salesian mission.
                </p>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
                <div v-for="stat in iusStats" :key="stat.label" class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                  <div class="text-3xl sm:text-5xl font-black text-brand-600 mb-1 sm:mb-2">{{ stat.value }}</div>
                  <div class="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest">{{ stat.label }}</div>
                </div>
              </div>

              <div class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center shadow-sm text-sm sm:text-base">
                <span class="font-extrabold text-slate-400 uppercase tracking-widest text-[10px] sm:text-xs w-full sm:w-auto mb-2 sm:mb-0">Core Principles:</span>
                <span class="text-brand-900 font-bold">Reason</span> <span class="text-brand-400">→</span>
                <span class="text-brand-900 font-bold">Religion</span> <span class="text-brand-400">→</span>
                <span class="text-brand-900 font-bold">Loving-Kindness</span> <span class="text-brand-400">→</span>
                <span class="text-brand-900 font-bold">Integral Formation</span> <span class="text-brand-400">→</span>
                <span class="text-brand-600 font-black bg-brand-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mt-2 sm:mt-0 w-full sm:w-auto">Good Christians &amp; Upright Citizens</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import Reveal from '@/components/public/Reveal.vue';
import Icon from '@/components/icons/Icon.vue';

const preventiveSystemPoints = [
  'Prevent harmful situations before they occur.',
  'Build trust between educators and young people.',
  'Encourage personal responsibility.',
  'Create a welcoming and family-like environment.',
  'Maintain an active and friendly presence among young people.',
];

const areasOfActivity = [
  { area: 'School', purpose: 'General education and personal development' },
  { area: 'Higher Education', purpose: 'Academic, professional, research, and social development' },
  { area: 'Parishes', purpose: 'Faith formation, pastoral care, and community building' },
  { area: 'Social Work', purpose: 'Protection, rehabilitation, inclusion, and social development' },
  { area: 'Oratories & Youth Centres', purpose: 'Informal education, faith formation, recreation, and youth development' },
  { area: 'VTC (Vocational Training Centres)', purpose: 'Practical skills and preparation for employment' },
];

const iusStats = [
  { value: '97', label: 'Institutions' },
  { value: '21', label: 'Countries' },
  { value: '160K', label: 'Students' },
  { value: '8.1K', label: 'Professors' },
];
</script>
