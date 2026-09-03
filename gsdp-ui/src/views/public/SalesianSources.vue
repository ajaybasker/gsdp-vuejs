<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
    <PublicHeader />

    <template v-if="selectedDoc">
      <div class="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12 w-full flex-1">
        <button @click="selectedDoc = null" class="mb-6 sm:mb-8 inline-flex items-center text-brand-700 hover:text-brand-900 font-bold gap-2 active:scale-95 transition-transform text-lg">
          <Icon name="ArrowLeft" :size="22" /> Back to Sources Directory
        </button>

        <div class="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="flex flex-col xl:flex-row">
            <div class="w-full xl:w-[500px] 2xl:w-[600px] flex-shrink-0 bg-slate-50 xl:border-r border-b xl:border-b-0 border-slate-200 p-8 sm:p-12 flex flex-col items-center xl:items-start">
              <img :src="selectedDoc.image" :alt="selectedDoc.author" class="w-full max-w-md sm:max-w-lg xl:max-w-full rounded-2xl shadow-xl border border-slate-200 object-cover bg-white" />
              <div class="w-full mt-8 sm:mt-10">
                <a :href="selectedDoc.pdfUrl" target="_blank" rel="noopener noreferrer" class="flex w-full items-center justify-center gap-2 px-5 py-4 bg-brand-700 text-white font-bold text-sm rounded-xl hover:bg-brand-800 transition-all shadow-sm active:scale-95">
                  <Icon name="Download" :size="18" /> Download PDF
                </a>
              </div>
              <div class="mt-8 sm:mt-10 w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <h3 class="text-sm font-black text-slate-900 mb-5 border-b border-slate-100 pb-3 uppercase tracking-widest">Resource Metadata</h3>
                <div class="space-y-5">
                  <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Author(s)</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.author }}</p></div>
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Publisher &amp; Institution</p>
                    <p class="text-sm font-semibold text-slate-900 mb-0.5">{{ selectedDoc.publisher }}</p>
                    <p class="text-xs font-medium text-slate-500">{{ selectedDoc.institution }}</p>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Language</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.language }}</p></div>
                    <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Era</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.era }}</p></div>
                  </div>
                  <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Document Type</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.documentType }}</p></div>
                  <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Salesian Family Group</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.salesianFamilyGroup }}</p></div>
                  <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Geography</p><p class="text-sm font-semibold text-slate-900">{{ selectedDoc.geography }}</p></div>
                </div>
              </div>
            </div>

            <div class="flex-1 p-8 sm:p-12 xl:p-16">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full mb-6 sm:mb-8">{{ selectedDoc.tag }}</div>
              <h1 class="text-[28px] font-black text-slate-900 mb-8 sm:mb-10 leading-tight tracking-tight">{{ selectedDoc.title }}</h1>
              <div class="prose prose-slate prose-base sm:prose-lg max-w-none">
                <p v-for="(para, i) in selectedDoc.description" :key="i" class="text-slate-700 leading-relaxed mb-5 sm:mb-6 font-medium text-base sm:text-lg">{{ para }}</p>

                <div v-if="selectedDoc.index" class="mt-10 sm:mt-12 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 flex items-center gap-2"><Icon name="BookOpen" :size="20" class="text-brand-700" /> Document Index</h3>
                  <ul class="space-y-3">
                    <li v-for="(idx, i) in selectedDoc.index" :key="i" class="text-sm sm:text-base font-semibold text-slate-700 flex items-start gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0"></span> {{ idx }}
                    </li>
                  </ul>
                </div>

                <div v-if="selectedDoc.tags?.length" class="mt-10 sm:mt-12">
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Thematic Tags</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="t in selectedDoc.tags" :key="t" class="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-bold rounded-lg border border-brand-100">{{ t }}</span>
                  </div>
                </div>

                <div class="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
                  <h4 class="text-xs sm:text-sm font-black text-slate-900 mb-3 uppercase tracking-widest">Official Citation</h4>
                  <p class="text-sm sm:text-base text-slate-600 italic bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 font-medium break-words">{{ selectedDoc.citation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <section class="relative mt-16 lg:mt-[72px] h-[250px] sm:h-[350px] lg:h-[450px] w-full border-b border-slate-200 bg-slate-100 flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0" style="background-image: url('https://salesians.org/sites/salesians/files/styles/hosted_core_wide_3x1/public/uploads/images/who_we_are_-_website.png?itok=bF-QXEYz'); background-size: cover; background-position: center;"></div>
      </section>

      <section class="flex-1 w-full px-4 sm:px-6 lg:px-12 py-16">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              v-for="tag in tags" :key="tag" @click="selectedFilter = tag"
              :class="`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedFilter === tag ? 'bg-brand-950 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`"
            >{{ tag }}</button>
          </div>
          <div class="text-sm font-bold text-slate-500">{{ filteredSources.length }} Document{{ filteredSources.length !== 1 ? 's' : '' }}</div>
        </div>

        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <div v-for="src in filteredSources" :key="src.id" class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col group">
            <div class="cursor-pointer flex flex-col flex-1" @click="selectedDoc = src">
              <div class="h-72 xl:h-80 bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                <img :src="src.image" :alt="src.author" class="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700" />
                <span class="absolute top-4 left-4 px-4 py-2 bg-brand-700/95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg z-10">{{ src.tag }}</span>
              </div>
              <div class="p-8 flex flex-col flex-1">
                <p class="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4 line-clamp-3 group-hover:text-brand-700 transition-colors">{{ src.title }}</p>
                <p class="text-base sm:text-lg font-bold text-brand-700 mb-2">{{ src.author }}</p>
                <p class="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-bold mb-6">{{ src.institution }}</p>
                <p class="text-slate-600 text-base leading-relaxed flex-1 line-clamp-4 mb-4">{{ src.description[0] }}</p>
                <div class="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                  <span class="text-xs font-bold text-slate-400 flex items-center gap-1.5"><Icon name="Calendar" :size="13" /> {{ src.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import Icon from '@/components/icons/Icon.vue';

const IMG = {
  img1: 'https://www.salesian.online/wp-content/uploads/2023/02/Copertina.jpg',
  img2: 'https://www.salesian.online/wp-content/uploads/2018/12/bosco-bogani.jpg',
  img3: 'https://www.salesian.online/wp-content/uploads/2022/11/Immagine-2022-11-02-114402.jpg',
  img4: 'https://www.salesian.online/wp-content/uploads/2022/09/Copertina-Santita-di-Don-Bosco.jpg',
  imgCard3: 'https://www.salesian.online/wp-content/uploads/2023/02/mia-carissima.jpg',
  imgCard4: 'https://www.salesian.online/wp-content/uploads/2023/01/quaderni-4-2.png',
};

const SOURCES = [
  { id: 1, title: 'Memoirs of the Oratory of St. Francis de Sales from 1815 to 1855', author: 'Phạm Xuân Uyển SDB', institution: 'Don Bosco Study Center', publisher: 'Xuân Hiệp', language: 'English, Vietnamese', era: '1815 - 1855', documentType: 'Source', salesianFamilyGroup: 'Salesians of Don Bosco (SDB)', geography: 'Italy (Turin)', tags: ['Youth Ministry', 'Oratory', 'Valdocco'], citation: 'John Bosco, Memoirs of the Oratory of St. Francis de Sales from 1815 to 1855 (translated by Dominic Phạm Xuân Uyển SDB), Xuân Hiệp, Saigon 2019.', image: IMG.img3, pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/HOI-KY-NGUYEN-XA-MO.pdf', tag: 'History', date: '18 July 2023', description: ['Don Bosco was born in 1815 in Becchi. In 1841, he established the Oratory in Turin dedicated to youth, poor children, and young workers migrating from the countryside to the city. In 1846, the Oratory of St. Francis de Sales officially set up its headquarters in Valdocco (Turin, Italy), which became known as the "Valdocco Oratory". The works of the Valdocco Oratory gradually expanded and developed. Later, he founded the Society of St. Francis de Sales (Salesians of Don Bosco) in 1859.', 'Through these works, Don Bosco recognized the grace of God calling him to a unique mission of serving the young, especially poor and abandoned youth. In everything he did, Don Bosco lived the Gospel of Jesus, deeply accompanied and guided by the Virgin Mary Help of Christians.'], index: null },
  { id: 2, title: 'Tuning in to the Heart of God Through His Word', author: 'Maria Ko Ha Fong', institution: 'Pontifical Salesian University', publisher: 'Salesian Editrice', language: 'English', era: '2007', documentType: 'Study / Article', salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)', geography: 'Global / Holy Land', tags: ['Biblical Exegesis', 'Jerusalem Project', 'Ongoing Formation'], citation: 'KH Fong, Tuning in to the Heart of God Through His Word, «Quaderni di spiritualità salesiana», Nuova serie-6, Rome, 2007, 28-41.', image: IMG.img1, pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-6.pdf-1.00-30-43.pdf', tag: 'Spirituality', date: '18 July 2023', description: ['This article reports the testimony of Sister Maria Ko Ha Fong, a member of the Institute of the Daughters of Mary Help of Christians. Having graduated in Theology with a thesis on the biblical exegesis of the Fathers, she strives to help her fellow nuns grow in their knowledge of the Bible, revitalizing their formation starting from the Word of God. This ongoing formation program called the "Jerusalem Project" began in the Holy Land.'], index: ['1. From the East to the Biblical World', '2. Delving into the Word of Life', '3. Bible and Church Tradition', '4. The Bible in the Salesian tradition', '5. "Jerusalem Project"', '6. The Bible in everyday life', '7. Obstacles on the path of the Word', '8. Bible and educational mission', '9. Seek the living Christ', '10. The Word inspires life'] },
  { id: 3, title: '"Love gradually burns us to the very corners of our existence". Rosetta Marchese (1922-1984) a life sealed by love', author: 'María Esther Posada', institution: 'Pontifical Salesian University', publisher: 'Salesian Editrice', language: 'English', era: '1922 - 1984', documentType: 'Study / Biography', salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)', geography: 'Italy (Aosta Valley)', tags: ['Mysticism', 'Rosetta Marchese', 'Spiritual Motherhood'], citation: 'ME Posada, «Love gradually burns us to the very corners of our existence». Rosetta Marchese (1922-1984) a life sealed by love, in «Quaderni di spiritualità», Nuova serie-5, Rome, 2005, 95-103.', image: IMG.imgCard3, pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-5.pdf-1.0-97-105.pdf', tag: 'Spirituality', date: '18 July 2023', description: ['This article presents the historical-spiritual journey of Rosetta Marchese, seventh Superior General of the Families of Mary Help of Christians, as a "theological existence" that allows us to grasp, with the typical realism of a genuinely Salesian vocation, the gradual growth towards a mystical experience.'], index: ['1. In the Aosta Valley (1922-1938)', '2. At the heart of Salesian life (1938-1959)', '3. Towards the fullness of spiritual motherhood (1959-1975)', '4. On the Roads of the World and on the Road of God (1975-1981)', '5. The fulfillment'] },
  { id: 4, title: '"Love and Divinization in Everyday Life. At the School of the Desert Fathers and Spiritual Masters" in "Notebooks of Salesian Spirituality. New Series-5"', author: 'Fabio Attard', institution: 'Pontifical Salesian University', publisher: 'Salesian Editrice', language: 'English', era: 'Antiquity / Contemporary', documentType: 'Study / Article', salesianFamilyGroup: 'Salesian Family', geography: 'Global', tags: ['Desert Fathers', 'Divinization', 'Everyday Spirituality'], citation: 'F. Attard, Love and Divinization in Everyday Life. At the School of the Desert Fathers and Spiritual Masters, in «Quaderni di spiritualità salesiana», Nuova serie-5, Rome, 2006, 50-59.', image: IMG.imgCard4, pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-5.pdf-1.0-52-61.pdf', tag: 'Spirituality', date: '18 July 2023', description: ['In this article, Attard offers some reflections on the spiritual lives of several "desert" Fathers, each with their own experiences offering significant insights into the spiritual life. This reading sheds light on the inner challenge that, beyond cultural and historical contingencies, continues to forcefully present itself today.'], index: ['1. Gregory of Nyssa', '2. John Cassian', '3. Isaac of Nineveh', '4. Maximus the Confessor', '5. Conclusion'] },
  { id: 5, title: '"\'Receive it with love, Jesus, who loves you so much.\' The Eucharistic dimension of the educational spirituality of St. Maria Domenica Mazzarello"', author: 'Piera Cavaglià', institution: 'Pontifical Salesian University', publisher: 'Salesian Editrice', language: 'English, Italian', era: '1850 - 2005', documentType: 'Study / Article', salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)', geography: 'Italy', tags: ['Eucharistic Spirituality', 'Mazzarello', 'Educational Action'], citation: 'P. Cavaglià, "Receive it with love, Jesus, who loves you so much." The Eucharistic Dimension of the Educational Spirituality of Saint Maria Domenica Mazzarello, in "Quaderni di spiritualità salesiana," New Series 4, Rome, 2005, pp. 84-98.', image: IMG.img2, pdfUrl: 'http://www.salesian.online/', tag: 'Spirituality', date: '18 July 2023', description: ['In this article, as can be seen from the title "Receive it with love, Jesus who loves you so much," Maria Domenica Mazzarello\'s education with respect to the Eucharistic dimension is presented.', "The author's intention is precisely to provide a brief but meaningful overview of how the co-founder of the Institute of the Daughters of Mary Help of Christians experienced the Eucharistic dimension within her historical and ecclesial context. This reference offers various educational and self-educational insights on how to respectfully and consciously experience the Eucharistic dimension."], index: ['1. An environment permeated with Eucharistic spirituality', '2. A biographical itinerary marked by the Eucharist', '3. An educational action "marked" by the Eucharist', '3.1. Vital participation in the Eucharistic celebration', '3.2. The certainty of a Presence', '4. Even today'] },
  { id: 6, title: 'Luigi Càstano – Holiness of Don Bosco', author: 'Luigi Càstano', institution: 'Don Bosco Study Center', publisher: 'Borla, Rome', language: 'English', era: '19th Century', documentType: 'Scientific Monograph', salesianFamilyGroup: 'Salesians of Don Bosco (SDB)', geography: 'Italy', tags: ['Sanctity', 'Theology', 'Ecclesiastical Policy', 'Don Bosco'], citation: 'Luigi Castano, Holiness of Don Bosco, Borla, Rome, 1988.', image: IMG.img4, pdfUrl: 'http://www.salesian.online/wp-content/uploads/2022/09/1988_CastanoL_Santita-di-Don-Bosco.Fine-Readerpdf.pdf', tag: 'Holiness', date: '18 July 2023', description: ["A foundational study on the holiness of Don Bosco, examining the spiritual depths and saintly qualities of the founder of the Salesian Congregation. This work traces the origins and expression of Don Bosco's sanctity in light of Salesian Theology and History.", 'The book explores the divine plan for his holiness and his acceptance, diving deeply into his faith, piety, poverty, and humility, while also addressing ancient and modern controversies surrounding his life, ecclesiastical policy, and mission.'], index: ['Presentation', 'Part One. Don Bosco: The Saint in the Light of Salesian Theology and History', 'The reason for these pages', 'Divine plan for holiness', "Don Bosco's acceptance", 'Don Bosco, a man of faith and piety', "Don Bosco's supernatural hope and his extreme poverty", 'Supernatural Charity of Don Bosco', "Don Bosco's profound humility", 'Conclusion', 'Part Two: Ancient and Modern Controversies and the Strength of Don Bosco\'s Sanctity', 'General reputation for sanctity', 'Ecclesiastical oppositions and disputes', 'Civil and secularist oppositions', 'Other attacks', 'Final judgment of the Church', 'Modern disputes and reservations', 'The man and the saint', "God's gifts to man and to the Holy One", 'The case of Carlo', 'Don Bosco: an enigma', "Don Bosco's priestly ministry", 'Don Bosco "Reactionary"?', 'The Italianness of Don Bosco', 'Social and political variants', "Don Bosco's ecclesiastical policy", 'Episcopal appointments', 'With politicians', 'Vincenzo Gioberti', 'Umberto Rattazzi', 'Count Camillo di Cavour', 'Joseph Garibaldi', 'Politicians in Lanzo Torinese', 'Victor Hugo'] },
  { id: 7, title: 'Paolo Gariglio – Un\'esperienza pastorale diocesana di ispirazione "donboschiana"', author: 'Paolo Gariglio', institution: 'Pontifical Salesian University', publisher: 'Salesian Editrice', language: 'Italian', era: '2023', documentType: 'Good Practice', salesianFamilyGroup: 'Salesian Family', geography: 'Italy', tags: ['Pastoral Experience', 'Youth Pedagogy', 'Witness'], citation: 'Paolo Gariglio, Un\'esperienza pastorale diocesana di ispirazione "donboschiana" in "Quaderni di spiritualità salesiana. Nuova serie-4". Rome, 2023.', image: 'https://www.salesian.online/wp-content/uploads/2021/10/q-1.jpg', pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/01/QSS-4.pdf-1.0-116-127.pdf', tag: 'Spirituality', date: '18 July 2023', description: ['In this article, a diocesan pastoral experience of "Don Bosco" inspiration is reported, according to which young people are educators and witnesses of Jesus for their own peers.', 'From his experience, Don Paolo Gariglio draws a real youth pedagogy, where young people educated in a Christian way according to a precise methodology become pastors of other young people in turn, building a real bridge between young people and priests and between the priest and God.'], index: ['Presentation of the Rector Major of the Salesians', '1. "When I was nine years old I had a dream"', '2. Giovannino', '3. His mother', '4. Acrobat and juggler', '5. I have to study', '6. A good teacher', '7. Top of the class', '8. Here you are, priest', '9. Oratory without a home', '10. Is Don Bosco crazy?', '11. Finally a roof', '12. A mother for five hundred children', '13. You stole my heart', '14. They loved him like that', '15. How Don Bosco educated', '16. The masterpiece: Domenico Savio', '17. Prodigious activity as a writer', '18. A four-legged friend', '19. He founded the Salesians', '20. He founded the Daughters of Mary Help of Christians', '21. Distant Lands', '22. His collaborators', '23. His former students', "24. Don Bosco's identity card", '25. Everywhere and always a priest', '26. Born poor, lived poor', '27. In Search of Providence', '28. Our Lady of Don Bosco', '29. Don Bosco confessor', '30. Appointments with Death', '31. A day of Don Bosco', "32. Don Bosco's Dictionary", '33. His death', '34. "I\'ll wait for you all in Heaven"'] },
  { id: 8, title: 'Giovanni Bosco – Societas s. Francisci Salesii', author: 'Giovanni Bosco', institution: 'Salesians of Don Bosco', publisher: 'Salesian Editrice', language: 'Latin', era: '1841', documentType: 'Source', salesianFamilyGroup: 'Salesians of Don Bosco (SDB)', geography: 'Italy (Turin)', tags: ['Foundational Document', 'Societas s. Francisci Salesii'], citation: 'Giovanni Bosco, Societas s. Francisci Salesii', image: 'https://www.salesian.online/wp-content/uploads/2021/11/congregazione-salesiana-copertina.jpg', pdfUrl: 'http://www.salesian.online/wp-content/uploads/2021/11/Bosco_Societas_Francisci_Salesii.pdf', tag: 'History', date: '18 July 2023', description: ['Pauperiorum adolescentulorum miserans conditionem sacerdos Ioannes Bosco e Dioecesi Taurinensi, iam ab anno 1841, aliorum Presbyterorum etiam auxilio fretus, illos in unum colligere, Catholicae fidei rudimenta edocere, et temporalibus subsidiis levare instituit.'], index: ['Origins of this congregation', 'Thoughts of the Holy Father on this pious society', 'The Commendation Decree of 1864', 'Difficulties for sacred Ordinations', 'Approval of March 1, 1869', 'Study', 'The resignations'] },
];

const selectedDoc = ref(null);
const selectedFilter = ref('All');

const tags = computed(() => ['All', ...new Set(SOURCES.map((s) => s.tag))]);
const filteredSources = computed(() => selectedFilter.value === 'All' ? SOURCES : SOURCES.filter((s) => s.tag === selectedFilter.value));

watch(selectedDoc, () => window.scrollTo(0, 0));
</script>
