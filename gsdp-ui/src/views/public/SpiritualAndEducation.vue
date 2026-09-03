<template>
  <div class="relative min-h-screen bg-white font-sans">
    <PublicHeader />

    <main class="overflow-x-hidden">
      <section class="relative pt-32 pb-32 lg:pt-40 lg:pb-40 bg-brand-950 overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0 z-0" style="background-image: url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1600&auto=format&fit=crop'); background-size: cover; background-position: center; opacity: 0.5;"></div>
        <div class="relative z-10 w-full px-6 md:px-12 lg:px-24 text-center">
          <Reveal direction="scale">
            <div class="max-w-5xl mx-auto p-4">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 text-xs font-bold uppercase tracking-widest text-brand-100 shadow-sm">
                <Icon name="BookOpen" :size="16" /> Core Identity
              </div>
              <h1 class="text-[28px] font-extrabold tracking-tight mb-8 leading-tight text-white drop-shadow-lg break-words">Spiritual Foundations</h1>
              <p class="text-xl md:text-2xl text-brand-50 leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-md">
                Explore the core principles of Salesian spirituality, our educational methodology, and the historical journey of Don Bosco's mission.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section class="w-full">
        <div class="flex flex-col lg:flex-row w-full bg-white">
          <div class="w-full lg:w-1/2 p-6 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-center">
            <Reveal direction="right">
              <h2 class="text-[28px] font-extrabold text-brand-950 mb-8">Salesian Spirituality</h2>
              <p class="text-xl text-slate-600 leading-relaxed mb-8">
                Salesian spirituality is a way of following Christ inspired by Don Bosco and shaped by the spirituality of Saint Francis de Sales. Its central focus is the salvation and integral growth of young people, especially those who are poor and vulnerable.
              </p>
              <div class="bg-brand-50 border-l-4 border-brand-500 p-6 sm:p-8 rounded-r-3xl shadow-sm">
                <h4 class="text-sm font-bold tracking-widest uppercase text-brand-600 mb-3">Core Spiritual Motto</h4>
                <p class="text-3xl font-serif font-medium text-brand-950 italic mb-3">"Da mihi animas, cetera tolle."</p>
                <p class="text-lg text-slate-700 font-medium">"Give me souls, take away the rest."</p>
                <p class="text-sm text-slate-500 mt-4 leading-relaxed">This expresses Don Bosco's total dedication to the good and salvation of young people.</p>
              </div>
            </Reveal>
          </div>
          <div class="hidden lg:block w-full lg:w-1/2 min-h-[500px] relative flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop" alt="Salesian Youth" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div class="w-full bg-slate-50 py-16 sm:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
          <Reveal>
            <div class="text-center max-w-4xl mx-auto mb-16">
              <h3 class="text-[28px] font-extrabold text-brand-950 mb-6">The Preventive System</h3>
              <p class="text-xl text-slate-600 leading-relaxed">
                The Salesian Constitutions describe the Preventive System as a means of carrying out the Salesian educational and pastoral mission, creating an environment marked by family spirit, trust, and dialogue.
              </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
              <div v-for="item in pillars" :key="item.title" class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
                <div :class="`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl font-black mb-8`">{{ item.num }}</div>
                <h4 class="text-2xl font-bold text-slate-800 mb-4">{{ item.title }}</h4>
                <p class="text-lg text-slate-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div class="w-full bg-white py-16 sm:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
          <Reveal>
            <h3 class="text-[28px] font-extrabold text-brand-950 mb-6 text-center">Spiritual Characteristics</h3>
            <p class="text-lg text-slate-600 mb-12 max-w-4xl mx-auto text-center">
              The Salesian approach to holiness is practical and rooted in everyday life. It seeks to help young people grow as good Christians and upright citizens through an integrated human and Christian formation.
            </p>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-7xl mx-auto">
              <div v-for="char in characteristics" :key="char" class="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4 hover:bg-brand-50 transition-colors duration-300">
                <Icon name="Check" :size="20" class="text-brand-500 shrink-0 mt-0.5" />
                <span class="text-base font-bold text-slate-700 leading-snug">{{ char }}</span>
              </div>
            </div>

            <div class="max-w-6xl mx-auto">
              <h3 class="text-[28px] font-extrabold text-brand-950 mb-8">Key Salesian Spiritual References</h3>
              <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden overflow-x-auto">
                <table class="w-full text-left min-w-[500px]">
                  <thead class="bg-slate-900 text-white uppercase tracking-wider text-sm font-bold">
                    <tr>
                      <th class="px-4 sm:px-8 py-4 sm:py-6 w-1/3">Element</th>
                      <th class="px-4 sm:px-8 py-4 sm:py-6">Salesian Meaning</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-base sm:text-lg">
                    <tr v-for="row in references" :key="row.element" class="hover:bg-slate-50 transition-colors">
                      <td class="px-4 sm:px-8 py-4 sm:py-5 font-bold text-brand-900">{{ row.element }}</td>
                      <td class="px-4 sm:px-8 py-4 sm:py-5 text-slate-600" :class="{ italic: row.italic }">{{ row.meaning }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section class="w-full bg-slate-50 py-16 sm:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-slate-200">
        <Reveal>
          <div class="max-w-4xl mx-auto text-center mb-20">
            <h2 class="text-[28px] font-extrabold text-brand-950 mb-8">Salesian Historical Journey</h2>
            <p class="text-xl text-slate-600 leading-relaxed">
              The historical development of the Salesian movement and Congregation through key milestones, from the birth of Don Bosco to the global mission of today.
            </p>
          </div>
        </Reveal>

        <div class="relative max-w-6xl mx-auto px-4 sm:px-0">
          <div class="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-slate-200 md:left-1/2 md:-ml-0.5 rounded-full"></div>
          <div class="space-y-10 sm:space-y-16">
            <Reveal v-for="(item, idx) in timeline" :key="item.title" :direction="idx % 2 === 0 ? 'right' : 'left'">
              <div :class="`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`">
                <div class="hidden md:block w-[45%]"></div>
                <div class="absolute left-6 sm:left-8 md:left-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-600 border-4 sm:border-8 border-slate-50 shadow-md -ml-4 sm:-ml-6 flex items-center justify-center z-10">
                  <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                </div>
                <div class="w-full pl-12 sm:pl-24 md:pl-0 md:w-[45%]">
                  <div :class="`bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-100 transition-transform hover:-translate-y-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`">
                    <span class="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-50 text-brand-700 font-black text-sm sm:text-lg rounded-full mb-3 sm:mb-4">{{ item.year }}</span>
                    <h4 class="text-lg sm:text-2xl font-bold text-brand-950 mb-3 sm:mb-4">{{ item.title }}</h4>
                    <p class="text-sm sm:text-lg text-slate-600 leading-relaxed">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div class="max-w-6xl mx-auto mt-20 sm:mt-32 px-4 sm:px-0">
          <Reveal direction="scale">
            <div class="bg-brand-950 rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-16 lg:p-20 text-white shadow-2xl relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" alt="Global map" class="w-full h-full object-cover mix-blend-screen" />
              </div>
              <div class="relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                <div>
                  <h3 class="text-[28px] font-extrabold mb-4 sm:mb-6">Global Expansion</h3>
                  <p class="text-base sm:text-xl text-brand-100 mb-8 sm:mb-10 leading-relaxed">
                    From Italy and Argentina, the Salesian mission gradually expanded throughout Europe, the Americas, Asia, Africa, and Oceania. Salesians developed educational institutions, technical and vocational training centres, youth centres, parishes, social works, and missionary initiatives.
                  </p>
                  <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-brand-300">Today</h3>
                  <p class="text-base sm:text-lg text-white/80 leading-relaxed">
                    The Salesian mission continues Don Bosco's original commitment to young people through education, evangelization, vocational formation, youth ministry, social development, and missionary service.
                  </p>
                </div>
                <div class="bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/20 text-center flex flex-col items-center justify-center mt-4 lg:mt-0">
                  <div class="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-lg mb-4 sm:mb-8 mx-auto">
                    <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  </div>
                  <h4 class="text-xl sm:text-2xl font-bold text-white mb-2">A Worldwide Mission</h4>
                  <p class="text-sm sm:text-base text-brand-100">Empowering youth globally.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
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

const pillars = [
  { num: '1', title: 'Reason', desc: 'Dialogue, understanding, and respect for the young person.', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { num: '2', title: 'Religion', desc: 'Leading young people toward a relationship with God and a life inspired by the Gospel.', color: 'text-blue-600', bg: 'bg-blue-100' },
  { num: '3', title: 'Loving-Kindness', desc: 'A caring, patient, and active presence among young people.', color: 'text-rose-600', bg: 'bg-rose-100' },
];

const characteristics = [
  'Christ at the centre of life and mission',
  'Service to young people, especially the poorest',
  'Joy and optimism',
  'Daily holiness and faithful fulfilment of duty',
  'Friendship and community life',
  'The Eucharist and sacramental life',
  'Devotion to Mary Help of Christians',
  'A loving and educative presence',
];

const references = [
  { element: 'Founder', meaning: 'Saint John Bosco' },
  { element: 'Spiritual Inspiration', meaning: 'Saint Francis de Sales' },
  { element: 'Motto', meaning: 'Da mihi animas, cetera tolle', italic: true },
  { element: 'Central Focus', meaning: 'Christ and the salvation of souls' },
  { element: 'Priority', meaning: 'Young people, especially the poor' },
  { element: 'Method', meaning: 'Preventive System' },
  { element: 'Three Pillars', meaning: 'Reason, Religion, Loving-Kindness' },
  { element: 'Marian Devotion', meaning: 'Mary Help of Christians' },
  { element: 'Style', meaning: 'Joy, optimism, friendship, and loving presence' },
];

const timeline = [
  { year: '1815', title: 'Birth of Don Bosco', text: "John Bosco was born on 16 August 1815 at Becchi, near Castelnuovo d'Asti in Piedmont, Italy." },
  { year: '1841', title: 'Beginning of the Oratory', text: 'After becoming a priest, Don Bosco began his direct work with young people in Turin. His encounter with the young Bartolomeo Garelli is traditionally associated with the beginning of the Oratory experience that became the foundation of his educational and pastoral mission.' },
  { year: '1846', title: 'Valdocco Oratory', text: 'Don Bosco established his work permanently in the Valdocco area of Turin. The Oratory developed as a welcoming environment for young people and gradually expanded into educational, vocational, religious, and recreational activities.' },
  { year: '1859', title: 'Foundation of the Salesian Society', text: 'On 18 December 1859, Don Bosco formally began the Society of Saint Francis de Sales, which later became known as the Salesians of Don Bosco.' },
  { year: '1862', title: 'First Religious Professions', text: 'The first Salesians made their religious vows, marking an important stage in the development of the new religious community.' },
  { year: '1869', title: 'Pontifical Approval', text: 'The Salesian Society received formal approval from the Holy See in 1869, strengthening its status and enabling its continued development.' },
  { year: '1872', title: 'Foundation of the Salesian Sisters', text: 'Together with Saint Maria Domenica Mazzarello, Don Bosco founded the Institute of the Daughters of Mary Help of Christians, extending the Salesian charism through the education and formation of girls and young women.' },
  { year: '1874', title: 'Approval of the Constitutions', text: 'The Constitutions of the Salesian Society received definitive approval from the Holy See in 1874.' },
  { year: '1875', title: 'First Missionary Expedition', text: 'The first Salesian missionaries were sent to Argentina in 1875. This marked the beginning of the international missionary expansion of the Salesian Congregation.' },
  { year: '1876', title: 'Approval of the Salesian Cooperators', text: "The Holy See approved the Association of Salesian Cooperators, extending Don Bosco's mission to lay people who wished to support and participate in Salesian works." },
  { year: '1877', title: 'First General Chapter and Salesian Bulletin', text: 'The Salesian Congregation held its First General Chapter, and Don Bosco began publishing the Salesian Bulletin, helping spread the Salesian mission and charism.' },
  { year: '1881', title: 'Expansion to Spain', text: "The Salesians established their first presence in Spain, continuing the Congregation's international expansion in Europe." },
  { year: '1888', title: 'Death of Don Bosco', text: 'Saint John Bosco died on 31 January 1888 in Turin. His mission continued under his successors and the growing Salesian Congregation.' },
  { year: '1929', title: 'Beatification of Don Bosco', text: 'Don Bosco was beatified on 2 June 1929, officially recognizing his holiness and influence in the Church.' },
  { year: '1934', title: 'Canonization of Don Bosco', text: 'Pope Pius XI canonized Don Bosco on 1 April 1934, formally declaring him a saint of the Catholic Church.' },
  { year: '1940', title: 'Establishment of the Pontifical Salesian Athenaeum', text: 'The Pontifical Salesian Athenaeum was established in Turin, becoming a major centre for higher education and Salesian academic formation.' },
  { year: '1988', title: "Centenary of Don Bosco's Death", text: "The Salesian Family commemorated the 100th anniversary of Don Bosco's death, renewing attention to his life, educational method, and mission for young people." },
  { year: '2015', title: "Bicentenary of Don Bosco's Birth", text: "The Salesian Family worldwide celebrated the 200th anniversary of Don Bosco's birth, reaffirming the continuing relevance of his charism and mission." },
  { year: '2025', title: '150 Years of Salesian Missions', text: 'The Salesian Family celebrated 150 years since the First Salesian Missionary Expedition, which began on 11 November 1875 and marked the start of the Congregation\'s worldwide missionary expansion.' },
  { year: '2025', title: 'New Rector Major', text: 'During the 29th General Chapter, Fr. Fabio Attard was elected the 11th Successor of Don Bosco, beginning a new chapter in the leadership of the Salesian Congregation.' },
];
</script>
