import React, { useEffect, useState } from 'react';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';

const BookOpenIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const DownloadIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ArrowLeftIcon = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6"/></svg>;
const DocumentIcon = (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;

// Images provided by user
const IMG = {
  img1: 'https://www.salesian.online/wp-content/uploads/2026/01/CG29-banner-1400x421.jpg',
  img2: 'https://www.salesian.online/wp-content/uploads/2022/09/rinnovamento1970.jpg',
  img3: 'https://www.salesian.online/wp-content/uploads/2022/08/Copertina-Progetto-educativo-nazionale-1995.jpg',
  img4: 'https://www.salesian.online/wp-content/uploads/2022/08/Copertina-In-dialogo-con-il-Signore-.jpg',
  img5: 'https://www.salesian.online/wp-content/uploads/2022/08/Copertina-Necrologio-Salesiano-1951.jpg',
  img6: 'https://www.salesian.online/wp-content/uploads/2022/08/Manuale-Lispettore-salesiano-1987.jpg',
  img7: 'https://www.salesian.online/wp-content/uploads/2022/08/Manuale-Lispettore-salesiano-1987.jpg',
  img8: 'https://www.salesian.online/wp-content/uploads/2022/06/foto-salesian-1-1.jpg'
};

const PUBLICATIONS = [
  {
    id: 1,
    title: 'PASSIONATE ABOUT JESUS CHRIST, DEDICATED TO YOUNG PEOPLE: Living our Salesian vocation faithfully and prophetically',
    author: 'Rector Major Fabio Attard',
    institution: 'General Chapter XXIX',
    referencePeriod: '2025',
    citation: 'Final Document of the 29th General Chapter, in “Acts of the General Council” n. 445 (2025)',
    image: IMG.img1,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/1989_SDB_In_dialogo_con_il_SignoreOCR-Fine-Reader.pdf',
    tag: 'General Chapter',
    description: [
      'Dearest brothers, The Final Document we present to the Congregation today is the fruit of a deeply felt spiritual and community experience. It was an experience that touched the hearts of each member of GC29. This Final Document is the living memory of a journey guided by the Spirit, celebrated in the house of our origins, here at Valdocco, where it all began.',
      'The theme chosen for the Chapter—"Passionate about Jesus Christ, Dedicated to Young People"—was not only the backdrop for our work, but also the fire that animated every discussion and guided every decision.',
      'The Final Document we present is divided into three main sections. The first two—"Animation and Care for the True Life of Each Salesian" and "Together Salesians, Salesian Family, and Lay People with and for Young People"—are structured according to the threefold approach of listening, interpretation, and choice.',
      'The third section contains the twenty-three Chapter resolutions, which represent a courageous and lucid response to the needs of a Congregational governance more consistent with its mission, closer to reality, more agile and transparent.',
      'Even more symbolic is the resolution amending Article 30 of the Constitutions on the Salesian mission, broadening the horizon beyond the first evangelization to explicitly include the "revitalization of faith in countries with a long-standing Christian tradition."',
      'These are pages to meditate on. They are pages that convey the spirit in which GC29 was conducted: a spirit of faith, exploration, fraternity, and love for the mission.',
      'Dearest ones, this Final Document is now entrusted to you, to the communities, the provinces, the laity, and the young people who share Don Bosco\'s dream with us. To be fruitful, it needs to be read, meditated upon, discussed, and internalized.'
    ],
    index: null
  },
  {
    id: 2,
    title: 'Pietro Braido – Renewal of a Faculty of Educational Sciences',
    author: 'Pietro Braido',
    institution: 'Pontifical Salesian University',
    referencePeriod: '1970',
    citation: 'P. Braido, Renewal of a Faculty of Educational Sciences , in «Orientamenti Pedagogici» 17 (1970) 1043-1051.',
    image: IMG.img2,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/OP100_1970.pdfletto.pdf',
    tag: 'Education',
    description: [
      'The following article discusses the new statutes for the Faculty of Educational Sciences at the Pontifical Salesian University of Rome, which came into force on an experimental basis in 1970-71.',
      'These statutes introduce interesting innovations both in terms of governance, which is essentially collegial, with broad student participation at all levels, and in determining the goals, structures, programs, and study plans.'
    ],
    index: [
      'Academic course study plans',
      'I. Academic courses',
      'II. Course duration and academic qualifications',
      'III. Rules on study plans',
      'IV. Study plans according to specialization curricula.'
    ]
  },
  {
    id: 3,
    title: 'National Educational Project. The educational project for schools and professional training of the Salesians of Don Bosco and the Daughters of Mary Help of Christians in Italy.',
    author: 'Sr. B. M. Bianchi, Don G. Fredigotti',
    institution: 'Study Center of the Daughters of Mary Help of Christians',
    referencePeriod: '1960 – 1995',
    citation: 'Sr. B. M. Bianchi, Don G. Fredigotti, National Educational Project. The Educational Project of the School and Vocational Training of the Salesians of Don Bosco and the Daughters of Mary Help of Christians in Italy , Tipografia SGS, Rome, 1995.',
    image: IMG.img3,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/1995_CISI-CII_progetto_educativo_nazionale_scuola_e_fp-Fine-Reader.pdf',
    tag: 'Education',
    description: [
      'The Educational Project, illustrated in this text, is intended to present the national "identity" of the Salesian school at the public level, both ecclesiastical and civil, combining the treasures of Salesian and ecclesial tradition with the achievements of modern human sciences and the most advanced scholastic approaches.'
    ],
    index: [
      'Project structure',
      'Premise',
      '1. The schools and vocational training centers of the Salesians of Don Bosco and the Daughters of Mary Help of Christians in Italy',
      '2. The demand of young people and families',
      '3. The pastoral educational proposal',
      '4. The educational community',
      '5. Teaching and learning processes',
      '6. The school and training environment',
      '7. Training of educators',
      '8. The resources',
      '9. The checks',
      '10. Perspectives',
      'Appendix: For Institute Educational Projects'
    ]
  },
  {
    id: 4,
    title: 'In Dialogue with the Lord. A Guide to the Salesian Community in Prayer',
    author: 'F. Bergamelli, T. Bertone, A. Cuva, E. Dal Covolo, N. Loss, J. Picca, M. Simoncelli, J. Struss, C. Chenis',
    institution: 'SDB General Directorate',
    referencePeriod: '1960 – 1989',
    citation: 'F. Bergamelli, T. Bertone, A. Cuva, E. Dal Covolo, N. Loss, J. Picca, M. Simoncelli, J. Struss, C. Chenis, In Dialogue with the Lord: A Guide to the Salesian Community in Prayer , Elledici Publishing House, Turin, 1989.',
    image: IMG.img4,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/1989_SDB_In_dialogo_con_il_SignoreOCR-Fine-Reader.pdf',
    tag: 'Spirituality',
    description: [
      'The Formation Department has developed a basic prayer guide for the Salesian community. The work was carried out by a team of confreres who offered shared material, from which each Provincial Conference could develop its own manual.',
      'The CISI Formation Sector, based on this proposal and after appropriate adaptations, is publishing this text and presenting it to the Salesians of Italy at the conclusion of the Don Bosco centenary.'
    ],
    index: [
      'Presentation',
      'Introduction',
      'Part One: The Encounter with Christ in Time',
      '1. Let us praise the Lord from dawn to dusk.',
      '2. Let us praise God on the Lord\'s day',
      '3. Let us praise the Lord in the liturgical year',
      'Part Two: The Encounter with Christ in the Sacraments',
      '1. Baptism and Confirmation experienced in religious consecration',
      '2. Eucharist',
      '3. Reconciliation and penance',
      'Part Three: Illness and Return to the Father\'s House',
      '1. Community celebrations for an elderly or sick brother',
      '2. Death reunites us with Christ',
      'Part Four: Mary in the Mystery of Christ and the Church',
      '1. Devotion to the Virgin in the Church and in the Salesian Family',
      '2. Celebrations of the Word',
      '3. The Holy Rosary',
      '4. Prayers to the Virgin',
      'Part Five: The Saints in the Mystery of Christ and the Church',
      '1. Patron Saints',
      '2. Saints close to the Salesian work and tradition',
      '3. Glorified members of the Salesian Family',
      '4. Prayer for the beatification (canonization) of the Servants of God of the Salesian Family',
      'Part Six: Particular Circumstances of Salesian Life',
      '1. Spiritual exercises',
      '2. Monthly and quarterly withdrawals',
      '3. Scrutini',
      '4. Community meetings',
      '5. Family celebrations',
      '6. Annual blessing of the community',
      '7. Installation of the Director',
      '8. The inspection visit and the extraordinary visit',
      '9. For the Inspectorial Chapter',
      'Appendix: Salesian songs'
    ]
  },
  {
    id: 5,
    title: 'Famiglia salesiana in preghiera. Testi per la celebrazione dell’Eucaristia e della Liturgia delle Ore',
    author: 'Manlio Sodi',
    institution: 'Salesian Generalate',
    referencePeriod: '1995',
    citation: 'Manlio Sodi, Famiglia salesiana in preghiera. Testi per la celebrazione dell’Eucaristia e della Liturgia delle Ore, 1995.',
    image: IMG.img5,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/1995_SDB_Famiglia_salesiana_in_preghiera.-Fine-Reader.pdf',
    tag: 'Spirituality',
    description: [
      'The purpose of this volume is to make available the main euchological and scriptural texts, which are used in the various celebrations proper to the Salesian Family.',
      'These texts can help all members of the community — called to live the Gospel in fullness with the style proper to the charism received — to celebrate the marvels of the Lord in His Saints and to prolong their commitment in the liturgy of life.'
    ],
    index: [
      '1. Proper of the Salesian Family',
      '2. Liturgy of the Hours',
      '3. Eucharistic Celebrations',
      '4. Saints and Blesseds of the Salesian Family',
      '5. Commemorations'
    ]
  },
  {
    id: 6,
    title: 'The Salesian Inspector Manual 1987 (L’ispettore salesiano. Un ministero per l’animazione e il governo della comunità ispettoriale)',
    author: 'Egidio Viganò',
    institution: 'SDB General Directorate',
    referencePeriod: '1987',
    citation: 'Egidio Viganò, L’ispettore salesiano. Un ministero per l’animazione e il governo della comunità ispettoriale, Rome, 1987.',
    image: IMG.img6,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/09/1987_DGODB_L_ispettore_salesiano-Fine-Reader.pdf',
    tag: 'Governance',
    description: [
      'This new and reworked Manual responds to the need to motivate and guide the ministry of the Salesian inspector in a clear and defined way at an educational-pastoral level.',
      'As a whole and in its intentions, it invites inspectors to live that "grace of unity" so characteristic of the Salesian spirit. For ease of consultation and practicality of use, "Juridical elements and administrative practices in the governance of the province" has also been included in the Appendix.'
    ],
    index: [
      '1. The Inspector in the Salesian Project',
      '2. Animation and Governance of the Provincial Community',
      '3. Formative Ministry of the Inspector',
      '4. The Inspector and the Local Communities',
      '5. The Inspector and the Salesian Family',
      '6. Juridical Elements and Administrative Practice'
    ]
  },
  {
    id: 7,
    title: '«100 años por Dios y por el mundo». Con motivo de los 100 años del inicio del Instituto de las Voluntarias de Don Bosco',
    author: 'Ángel Fernández Artime',
    institution: 'SDB General Directorate',
    referencePeriod: '2017',
    citation: 'Ángel Fernández Artime, «100 años por Dios y por el mundo», in Acts of the General Council, 2017.',
    image: IMG.img7,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/06/3_PDFsam_Actas_2017_425.ACG_.separata.pdf',
    tag: 'Letters',
    description: [
      'This official letter by the Rector Major commemorates the 100th anniversary of the founding of the Volunteers of Don Bosco (VDB). It reflects on their secular consecration and their enduring mission in the world.',
      'The document provides precise guidelines on how to live the VDB identity today, emphasizing the Salesian spirit in everyday secular environments.'
    ],
    index: [
      '1. A look at the origins',
      '2. Raised by the Holy Spirit in the novelty of secular consecration',
      '3. Some precisions on how to live the VDB identity',
      '4. Conclusion and blessing'
    ]
  },
  {
    id: 8,
    title: 'El congreso de los superiores generales sobre la vida consagrada hoy',
    author: 'Egidio Viganò',
    institution: 'SDB General Directorate',
    referencePeriod: '1993',
    citation: 'Egidio Viganò, El congreso de los superiores generales sobre la vida consagrada hoy, in Acts of the General Council, 1994.',
    image: IMG.img8,
    pdfUrl: 'https://www.salesian.online/wp-content/uploads/2022/06/Actas_1994_347.ACG-5-30-Letra-Rector-Mayor-ES-pdf.pdf',
    tag: 'Letters',
    description: [
      'Letter from the Rector Major Egidio Viganò regarding the Congress of Superiors General on consecrated life today.',
      'The document discusses the challenges and prophetic role of religious life in the modern world, as reflected upon during the congress in Rome.'
    ],
    index: [
      '1. Introduction: The Congress of Superiors General',
      '2. The Identity of Consecrated Life Today',
      '3. Prophecy and Mission in the Church',
      '4. Salesian Reflections and Applications',
      '5. Looking Forward'
    ]
  }
];

export default function OfficialDocuments() {
  const [selectedDoc, setSelectedDoc] = useState(null);

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
            <ArrowLeftIcon className="w-6 h-6"/> Back to Official Documents
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
                    download
                    className="flex w-full items-center justify-center gap-2 px-5 py-4 bg-brand-700 text-white font-bold text-sm rounded-xl hover:bg-brand-800 transition-all shadow-sm active:scale-95"
                    title="Download Full PDF"
                  >
                    <DownloadIcon className="w-5 h-5" /> Download PDF
                  </a>
                </div>

                <div className="mt-8 sm:mt-10 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                  <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Author</p>
                     <p className="text-sm font-semibold text-slate-900">{selectedDoc.author}</p>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Institution</p>
                     <p className="text-sm font-semibold text-slate-900">{selectedDoc.institution}</p>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reference Period</p>
                     <p className="text-sm font-semibold text-slate-900">{selectedDoc.referencePeriod}</p>
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
                        <DocumentIcon className="w-5 h-5 text-brand-700"/> Document Index
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
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 px-4 sm:px-6 lg:px-8 border-b border-brand-900 bg-brand-950 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TOPFUDt0tv1znukVem2NFATovJs9MTCdVMH3CcPL7b3sKbyFSjxwtsQ&s=10')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.65
          }}
        />
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-brand-100 mb-8 backdrop-blur-md shadow-sm">
            <DocumentIcon className="w-4 h-4" /> Authoritative Library
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight mb-8 leading-tight text-white drop-shadow-lg break-words">
            Official Documents
          </h1>
          <p className="text-xl md:text-2xl text-brand-50 leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-md">
            Explore the official documents, acts, manuals, and foundational texts of the Salesian Congregation that guide our global mission and spiritual governance.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="flex-1 w-full px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {PUBLICATIONS.map((src) => (
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
                  <p className="text-slate-600 text-base leading-relaxed flex-1 line-clamp-4">{src.description[0]}</p>
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
