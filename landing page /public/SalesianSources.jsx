import React, { useEffect, useState } from 'react';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';

const BookOpenIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const DownloadIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ArrowLeftIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6"/></svg>;

// Images provided by user
const IMG = {
  img1: 'https://www.salesian.online/wp-content/uploads/2023/02/Copertina.jpg',
  img2: 'https://www.salesian.online/wp-content/uploads/2018/12/bosco-bogani.jpg',
  img3: 'https://www.salesian.online/wp-content/uploads/2022/11/Immagine-2022-11-02-114402.jpg',
  img4: 'https://www.salesian.online/wp-content/uploads/2022/09/Copertina-Santita-di-Don-Bosco.jpg',
  imgCard3: 'https://www.salesian.online/wp-content/uploads/2023/02/mia-carissima.jpg',
  imgCard4: 'https://www.salesian.online/wp-content/uploads/2023/01/quaderni-4-2.png',
};

const SOURCES = [
  {
    id: 1,
    title: 'Memoirs of the Oratory of St. Francis de Sales from 1815 to 1855',
    author: 'Phạm Xuân Uyển SDB',
    institution: 'Don Bosco Study Center',
    publisher: 'Xuân Hiệp',
    language: 'English, Vietnamese',
    era: '1815 - 1855',
    documentType: 'Source',
    salesianFamilyGroup: 'Salesians of Don Bosco (SDB)',
    geography: 'Italy (Turin)',
    tags: ['Youth Ministry', 'Oratory', 'Valdocco'],
    referencePeriod: '1815 – 1855',
    citation: 'John Bosco, Memoirs of the Oratory of St. Francis de Sales from 1815 to 1855 (translated by Dominic Phạm Xuân Uyển SDB), Xuân Hiệp, Saigon 2019.',
    image: IMG.img3,
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/HOI-KY-NGUYEN-XA-MO.pdf',
    tag: 'History',
    date: '18 July 2023',
    description: [
      'Don Bosco was born in 1815 in Becchi. In 1841, he established the Oratory in Turin dedicated to youth, poor children, and young workers migrating from the countryside to the city. In 1846, the Oratory of St. Francis de Sales officially set up its headquarters in Valdocco (Turin, Italy), which became known as the "Valdocco Oratory". The works of the Valdocco Oratory gradually expanded and developed. Later, he founded the Society of St. Francis de Sales (Salesians of Don Bosco) in 1859.',
      'Through these works, Don Bosco recognized the grace of God calling him to a unique mission of serving the young, especially poor and abandoned youth. In everything he did, Don Bosco lived the Gospel of Jesus, deeply accompanied and guided by the Virgin Mary Help of Christians.'
    ],
    index: null
  },
  {
    id: 2,
    title: 'Tuning in to the Heart of God Through His Word',
    author: 'Maria Ko Ha Fong',
    institution: 'Pontifical Salesian University',
    publisher: 'Salesian Editrice',
    language: 'English',
    era: '2007',
    documentType: 'Study / Article',
    salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)',
    geography: 'Global / Holy Land',
    tags: ['Biblical Exegesis', 'Jerusalem Project', 'Ongoing Formation'],
    referencePeriod: '2007',
    citation: 'KH Fong, Tuning in to the Heart of God Through His Word , «Quaderni di spiritualità salesiana», Nuova serie-6, Rome, 2007, 28-41.',
    image: IMG.img1,
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-6.pdf-1.00-30-43.pdf',
    tag: 'Spirituality',
    date: '18 July 2023',
    description: [
      'This article reports the testimony of Sister Maria Ko Ha Fong, a member of the Institute of the Daughters of Mary Help of Christians. Having graduated in Theology with a thesis on the biblical exegesis of the Fathers, she strives to help her fellow nuns grow in their knowledge of the Bible, revitalizing their formation starting from the Word of God. This ongoing formation program called the "Jerusalem Project" began in the Holy Land.'
    ],
    index: [
      '1. From the East to the Biblical World',
      '2. Delving into the Word of Life',
      '3. Bible and Church Tradition',
      '4. The Bible in the Salesian tradition',
      '5. “Jerusalem Project”',
      '6. The Bible in everyday life',
      '7. Obstacles on the path of the Word',
      '8. Bible and educational mission',
      '9. Seek the living Christ',
      '10. The Word inspires life'
    ]
  },
  {
    id: 3,
    title: '"Love gradually burns us to the very corners of our existence". Rosetta Marchese (1922-1984) a life sealed by love',
    author: 'María Esther Posada',
    institution: 'Pontifical Salesian University',
    publisher: 'Salesian Editrice',
    language: 'English',
    era: '1922 - 1984',
    documentType: 'Study / Biography',
    salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)',
    geography: 'Italy (Aosta Valley)',
    tags: ['Mysticism', 'Rosetta Marchese', 'Spiritual Motherhood'],
    referencePeriod: '2005',
    citation: 'ME Posada, «Love gradually burns us to the very corners of our existence». Rosetta Marchese (1922-1984) a life sealed by love , in «Quaderni di spiritualità», Nuova serie-5, Rome, 2005, 95-103.',
    image: IMG.imgCard3,
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-5.pdf-1.0-97-105.pdf',
    tag: 'Spirituality',
    date: '18 July 2023',
    description: [
      'This article presents the historical-spiritual journey of Rosetta Marchese, seventh Superior General of the Families of Mary Help of Christians, as a "theological existence" that allows us to grasp, with the typical realism of a genuinely Salesian vocation, the gradual growth towards a mystical experience.'
    ],
    index: [
      '1. In the Aosta Valley (1922-1938)',
      '2. At the heart of Salesian life (1938-1959)',
      '3. Towards the fullness of spiritual motherhood (1959-1975)',
      '4. On the Roads of the World and on the Road of God (1975-1981)',
      '5. The fulfillment'
    ]
  },
  {
    id: 4,
    title: '“Love and Divinization in Everyday Life. At the School of the Desert Fathers and Spiritual Masters” in “Notebooks of Salesian Spirituality. New Series-5”',
    author: 'Fabio Attard',
    institution: 'Pontifical Salesian University',
    publisher: 'Salesian Editrice',
    language: 'English',
    era: 'Antiquity / Contemporary',
    documentType: 'Study / Article',
    salesianFamilyGroup: 'Salesian Family',
    geography: 'Global',
    tags: ['Desert Fathers', 'Divinization', 'Everyday Spirituality'],
    referencePeriod: '2006',
    citation: 'F. Attard, Love and Divinization in Everyday Life. At the School of the Desert Fathers and Spiritual Masters , in «Quaderni di spiritualità salesiana», Nuova serie-5, Rome, 2006, 50-59.',
    image: IMG.imgCard4,
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/02/QSS-5.pdf-1.0-52-61.pdf',
    tag: 'Spirituality',
    date: '18 July 2023',
    description: [
      'In this article, Attard offers some reflections on the spiritual lives of several "desert" Fathers, each with their own experiences offering significant insights into the spiritual life. This reading sheds light on the inner challenge that, beyond cultural and historical contingencies, continues to forcefully present itself today.'
    ],
    index: [
      '1. Gregory of Nyssa',
      '2. John Cassian',
      '3. Isaac of Nineveh',
      '4. Maximus the Confessor',
      '5. Conclusion'
    ]
  },
  {
    id: 5,
    title: '“‘Receive it with love, Jesus, who loves you so much.’ The Eucharistic dimension of the educational spirituality of St. Maria Domenica Mazzarello”',
    author: 'Piera Cavaglià',
    institution: 'Pontifical Salesian University',
    publisher: 'Salesian Editrice',
    language: 'English, Italian',
    era: '1850 - 2005',
    documentType: 'Study / Article',
    salesianFamilyGroup: 'Daughters of Mary Help of Christians (FMA)',
    geography: 'Italy',
    tags: ['Eucharistic Spirituality', 'Mazzarello', 'Educational Action'],
    referencePeriod: '1850 – 2005',
    citation: 'P. Cavaglià, "Receive it with love, Jesus, who loves you so much." The Eucharistic Dimension of the Educational Spirituality of Saint Maria Domenica Mazzarello, in "Quaderni di spiritualità salesiana," New Series 4, Rome, 2005, pp. 84-98.',
    image: IMG.img2,
    pdfUrl: 'http://www.salesian.online/',
    tag: 'Spirituality',
    date: '18 July 2023',
    description: [
      "In this article, as can be seen from the title “Receive it with love, Jesus who loves you so much,” Maria Domenica Mazzarello's education with respect to the Eucharistic dimension is presented.",
      "The author's intention is precisely to provide a brief but meaningful overview of how the co-founder of the Institute of the Daughters of Mary Help of Christians experienced the Eucharistic dimension within her historical and ecclesial context. This reference offers various educational and self-educational insights on how to respectfully and consciously experience the Eucharistic dimension."
    ],
    index: [
      '1. An environment permeated with Eucharistic spirituality',
      '2. A biographical itinerary marked by the Eucharist',
      '3. An educational action “marked” by the Eucharist',
      '3.1. Vital participation in the Eucharistic celebration',
      '3.2. The certainty of a Presence',
      '4. Even today'
    ]
  },
  {
    id: 6,
    title: 'Luigi Càstano – Holiness of Don Bosco',
    author: 'Luigi Càstano',
    institution: 'Don Bosco Study Center',
    publisher: 'Borla, Rome',
    language: 'English',
    era: '19th Century',
    documentType: 'Scientific Monograph',
    salesianFamilyGroup: 'Salesians of Don Bosco (SDB)',
    geography: 'Italy',
    tags: ['Sanctity', 'Theology', 'Ecclesiastical Policy', 'Don Bosco'],
    referencePeriod: '1988 – 2022',
    citation: 'Luigi Castano, Holiness of Don Bosco, Borla, Rome, 1988.',
    image: IMG.img4,
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2022/09/1988_CastanoL_Santita-di-Don-Bosco.Fine-Readerpdf.pdf',
    tag: 'Holiness',
    date: '18 July 2023',
    description: [
      'A foundational study on the holiness of Don Bosco, examining the spiritual depths and saintly qualities of the founder of the Salesian Congregation. This work traces the origins and expression of Don Bosco\'s sanctity in light of Salesian Theology and History.',
      'The book explores the divine plan for his holiness and his acceptance, diving deeply into his faith, piety, poverty, and humility, while also addressing ancient and modern controversies surrounding his life, ecclesiastical policy, and mission.'
    ],
    index: [
      'Presentation',
      'Part One. Don Bosco: The Saint in the Light of Salesian Theology and History',
      'The reason for these pages',
      'Divine plan for holiness',
      'Don Bosco\'s acceptance',
      'Don Bosco, a man of faith and piety',
      'Characteristics of Don Bosco\'s faith and piety',
      'Don Bosco\'s supernatural hope and his extreme poverty',
      'Supernatural Charity of Don Bosco',
      'Don Bosco\'s profound humility',
      'Conclusion',
      'Part Two: Ancient and Modern Controversies and the Strength of Don Bosco\'s Sanctity',
      'General reputation for sanctity',
      'Ecclesiastical oppositions and disputes',
      'Civil and secularist oppositions',
      'Other attacks',
      'Final judgment of the Church',
      'Modern disputes and reservations',
      'The man and the saint',
      'God\'s gifts to man and to the Holy One',
      'The case of Carlo',
      'Don Bosco: an enigma',
      'Don Bosco\'s priestly ministry',
      'Don Bosco “Reactionary”?',
      'The Italianness of Don Bosco',
      'Social and political variants',
      'Don Bosco\'s ecclesiastical policy',
      'Episcopal appointments',
      'With politicians',
      'Vincenzo Gioberti',
      'Umberto Rattazzi',
      'Count Camillo di Cavour',
      'Joseph Garibaldi',
      'Politicians in Lanzo Torinese',
      'Victor Hugo'
    ]
  },
  {
    id: 7,
    title: 'Paolo Gariglio – “«Chi salirà il monte del Signore? Chi ha mani innocenti e cuore puro». Un’esperienza pastorale diocesana di ispirazione “donboschiana””',
    author: 'Paolo Gariglio',
    institution: 'Pontifical Salesian University',
    publisher: 'Salesian Editrice',
    language: 'Italian',
    era: '2023',
    documentType: 'Good Practice',
    salesianFamilyGroup: 'Salesian Family',
    geography: 'Italy',
    tags: ['Pastoral Experience', 'Youth Pedagogy', 'Witness'],
    referencePeriod: '2023',
    citation: 'Paolo Gariglio, Un’esperienza pastorale diocesana di ispirazione “donboschiana” in “Quaderni di spiritualità salesiana. Nuova serie-4”. Rome, 2023.',
    image: 'https://www.salesian.online/wp-content/uploads/2021/10/q-1.jpg',
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2023/01/QSS-4.pdf-1.0-116-127.pdf',
    tag: 'Spirituality',
    date: '18 July 2023',
    description: [
      'In this article, a diocesan pastoral experience of "Don Bosco" inspiration is reported, according to which young people are educators and witnesses of Jesus for their own peers.',
      'From his experience, Don Paolo Gariglio draws a real youth pedagogy, where young people educated in a Christian way according to a precise methodology become pastors of other young people in turn, building a real bridge between young people and priests and between the priest and God.'
    ],
    index: [
      'Presentation of the Rector Major of the Salesians',
      '1. “When I was nine years old I had a dream”',
      '2. Giovannino',
      '3. His mother',
      '4. Acrobat and juggler',
      '5. I have to study',
      '6. A good teacher',
      '7. Top of the class',
      '8. Here you are, priest',
      '9. Oratory without a home',
      '10. Is Don Bosco crazy?',
      '11. Finally a roof',
      '12. A mother for five hundred children',
      '13. You stole my heart',
      '14. They loved him like that',
      '15. How Don Bosco educated',
      '16. The masterpiece: Domenico Savio',
      '17. Prodigious activity as a writer',
      '18. A four-legged friend',
      '19. He founded the Salesians',
      '20. He founded the Daughters of Mary Help of Christians',
      '21. Distant Lands',
      '22. His collaborators',
      '23. His former students',
      "24. Don Bosco's identity card",
      '25. Everywhere and always a priest',
      '26. Born poor, lived poor',
      '27. In Search of Providence',
      '28. Our Lady of Don Bosco',
      '29. Don Bosco confessor',
      '30. Appointments with Death',
      '31. A day of Don Bosco',
      "32. Don Bosco's Dictionary",
      '33. His death',
      "34. “I'll wait for you all in Heaven”"
    ]
  },
  {
    id: 8,
    title: 'Giovanni Bosco – Societas s. Francisci Salesii',
    author: 'Giovanni Bosco',
    institution: 'Salesians of Don Bosco',
    publisher: 'Salesian Editrice',
    language: 'Latin',
    era: '1841',
    documentType: 'Source',
    salesianFamilyGroup: 'Salesians of Don Bosco (SDB)',
    geography: 'Italy (Turin)',
    tags: ['Foundational Document', 'Societas s. Francisci Salesii'],
    referencePeriod: '1841 – 1874',
    citation: 'Giovanni Bosco, Societas s. Francisci Salesii',
    image: 'https://www.salesian.online/wp-content/uploads/2021/11/congregazione-salesiana-copertina.jpg',
    pdfUrl: 'http://www.salesian.online/wp-content/uploads/2021/11/Bosco_Societas_Francisci_Salesii.pdf',
    tag: 'History',
    date: '18 July 2023',
    description: [
      'Pauperiorum adolescentulorum miserans conditionem sacerdos Ioannes Bosco e Dioecesi Taurinensi, iam ab anno 1841, aliorum Presbyterorum etiam auxilio fretus, illos in unum colligere, Catholicae fidei rudimenta edocere, et temporalibus subsidiis levare instituit.'
    ],
    index: [
      'Origins of this congregation',
      'Thoughts of the Holy Father on this pious society',
      'The Commendation Decree of 1864',
      'Difficulties for sacred Ordinations',
      'Approval of March 1, 1869',
      'Study',
      'The resignations'
    ]
  }
];

export default function SalesianSources() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const tags = ['All', ...new Set(SOURCES.map(s => s.tag))];
  const filteredSources = selectedFilter === 'All' ? SOURCES : SOURCES.filter(s => s.tag === selectedFilter);

  // Scroll to top when selectedDoc changes
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [selectedDoc]);

  // Document Detail Page Render
  if (selectedDoc) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <PublicHeader />
        
        {/* Top Spacer for fixed header */}
        <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12 w-full flex-1">
          
          <button 
            onClick={() => setSelectedDoc(null)} 
            className="mb-6 sm:mb-8 inline-flex items-center text-brand-700 hover:text-brand-900 font-bold gap-2 active:scale-95 transition-transform text-lg"
          >
            <ArrowLeftIcon className="w-6 h-6"/> Back to Sources Directory
          </button>
          
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex flex-col xl:flex-row">
              
              {/* Image & Actions Sidebar */}
              <div className="w-full xl:w-[500px] 2xl:w-[600px] flex-shrink-0 bg-slate-50 xl:border-r border-b xl:border-b-0 border-slate-200 p-8 sm:p-12 flex flex-col items-center xl:items-start">
                <img 
                  src={selectedDoc.image} 
                  alt={selectedDoc.author} 
                  className="w-full max-w-md sm:max-w-lg xl:max-w-full rounded-2xl shadow-xl border border-slate-200 object-cover bg-white"
                />
                
                <div className="w-full mt-8 sm:mt-10">
                  <a
                    href={selectedDoc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 px-5 py-4 bg-brand-700 text-white font-bold text-sm rounded-xl hover:bg-brand-800 transition-all shadow-sm active:scale-95"
                    title="Download Full PDF"
                  >
                    <DownloadIcon className="w-5 h-5" /> Download PDF
                  </a>
                </div>

                <div className="mt-8 sm:mt-10 w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <h3 className="text-sm font-black text-slate-900 mb-5 border-b border-slate-100 pb-3 uppercase tracking-widest">Resource Metadata</h3>
                  <div className="space-y-5">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Author(s)</p>
                       <p className="text-sm font-semibold text-slate-900">{selectedDoc.author}</p>
                    </div>
                    
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Publisher & Institution</p>
                       <p className="text-sm font-semibold text-slate-900 mb-0.5">{selectedDoc.publisher}</p>
                       <p className="text-xs font-medium text-slate-500">{selectedDoc.institution}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Language</p>
                         <p className="text-sm font-semibold text-slate-900">{selectedDoc.language}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Era</p>
                         <p className="text-sm font-semibold text-slate-900">{selectedDoc.era}</p>
                      </div>
                    </div>

                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Document Type</p>
                       <p className="text-sm font-semibold text-slate-900">{selectedDoc.documentType}</p>
                    </div>

                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Salesian Family Group</p>
                       <p className="text-sm font-semibold text-slate-900">{selectedDoc.salesianFamilyGroup}</p>
                    </div>

                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Geography</p>
                       <p className="text-sm font-semibold text-slate-900">{selectedDoc.geography}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-8 sm:p-12 xl:p-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full mb-6 sm:mb-8">
                  {selectedDoc.tag}
                </div>
                
                <h1 className="text-[28px] font-black text-slate-900 mb-8 sm:mb-10 leading-tight tracking-tight">
                  {selectedDoc.title}
                </h1>
                
                <div className="prose prose-slate prose-base sm:prose-lg max-w-none">
                  {selectedDoc.description.map((para, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed mb-5 sm:mb-6 font-medium text-base sm:text-lg">
                      {para}
                    </p>
                  ))}
                  
                  {selectedDoc.index && (
                    <div className="mt-10 sm:mt-12 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 flex items-center gap-2">
                        <BookOpenIcon className="w-5 h-5 text-brand-700"/> Document Index
                      </h3>
                      <ul className="space-y-3">
                        {selectedDoc.index.map((idx, i) => (
                          <li key={i} className="text-sm sm:text-base font-semibold text-slate-700 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0"></span>
                            {idx}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoc.tags && selectedDoc.tags.length > 0 && (
                    <div className="mt-10 sm:mt-12">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Thematic Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoc.tags.map((t, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-bold rounded-lg border border-brand-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
                     <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-3 uppercase tracking-widest">Official Citation</h4>
                     <p className="text-sm sm:text-base text-slate-600 italic bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 font-medium break-words">
                       {selectedDoc.citation}
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PublicFooter />
      </div>
    );
  }

  // Grid Page Render
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <PublicHeader />

      {/* Hero */}
      <section className="relative mt-16 lg:mt-[72px] h-[250px] sm:h-[350px] lg:h-[450px] w-full border-b border-slate-200 bg-slate-100 flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://salesians.org/sites/salesians/files/styles/hosted_core_wide_3x1/public/uploads/images/who_we_are_-_website.png?itok=bF-QXEYz')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1
          }}
        />
      </section>

      {/* Cards Grid */}
      <section className="flex-1 w-full px-4 sm:px-6 lg:px-12 py-16">
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedFilter === tag ? 'bg-brand-950 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-500">
            {filteredSources.length} Document{filteredSources.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredSources.map((src) => (
            <div key={src.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col group">
              <div 
                className="cursor-pointer flex flex-col flex-1"
                onClick={() => setSelectedDoc(src)}
              >
                {/* Cover image */}
                <div className="h-72 xl:h-80 bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  <img
                    src={src.image}
                    alt={src.author}
                    className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-4 py-2 bg-brand-700/95 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-lg z-10">
                    {src.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4 line-clamp-3 group-hover:text-brand-700 transition-colors">{src.title}</p>
                  <p className="text-base sm:text-lg font-bold text-brand-700 mb-2">{src.author}</p>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-bold mb-6">{src.institution}</p>
                  <p className="text-slate-600 text-base leading-relaxed flex-1 line-clamp-4 mb-4">{src.description[0]}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {src.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
