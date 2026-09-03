import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useInView } from '../../hooks/useInView.js';
import AnimatedCounter from '../../components/AnimatedCounter.jsx';
import WorldReachMap from '../../components/WorldReachMap.jsx';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import CollectionCard from '../../components/CollectionCard.jsx';
import { INSTITUTION_COVER_IMAGE } from '../../data/repositoryImages.js';

import img1 from '../../images/new landing images/5.jpg';
import img2 from '../../images/new landing images/Pasted image (2).png';
import img3 from '../../images/new landing images/Pasted image (3).png';
import img4 from '../../images/new landing images/Pasted image.png';
import img5 from '../../images/new landing images/landing image4.jpeg';
import logoImg from '../../images/logo.png';

const HERO_IMAGES = [img1, img2, img3, img4, img5];

const PLATFORM_FEATURES = [
  { icon: '🏛️', title: 'Institutional Registry', desc: 'Centralized, governed registry for all institutions.' },
  { icon: '🔄', title: 'Governed Workflows', desc: 'Structured review and approval cycles.' },
  { icon: '🛡️', title: 'Compliance & Monitoring', desc: 'Built-in tracking and reporting.' },
  { icon: '📝', title: 'Governed Publication', desc: 'Secure and verified publication of resources.' },
  { icon: '🔍', title: 'Global Search', desc: 'Unified discovery of digital resources.' },
];

const RESOURCE_FEATURES = [
  { icon: '📂', title: 'Document Collections', desc: 'Curated sets of institutional and historical documents.' },
  { icon: '📰', title: 'Publications', desc: 'Official releases, journals, and constitutions.' },
  { icon: '📚', title: 'Digital Archives', desc: 'Historical assets preserving the Salesian heritage.' },
  { icon: '🗺️', title: 'Pastoral Works Maps', desc: 'Interactive geographic visualization of global missions.' },
  { icon: '🤝', title: 'Salesian Network', desc: 'Connecting the global family across 135 countries.' }
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Community Submits', desc: 'Local communities submit information, resources, and updates to the platform.' },
  { num: '02', title: 'Submission Validated', desc: 'Initial validation ensures completeness and accuracy of the submitted data.' },
  { num: '03', title: 'Province Reviews', desc: 'Province coordinators and delegates review and officially validate the content.' },
  { num: '04', title: 'Global Platform', desc: 'Approved information contributes to the globally accessible platform catalog.' },
];

const ROLES = [
  { title: 'Community Coordinator', desc: 'Manages local community data, uploads resources, and ensures accurate representation of the community.' },
  { title: 'Province Coordinator', desc: 'Oversees province-wide data, coordinates with communities, and facilitates the review process.' },
  { title: 'Provincial Delegate', desc: 'Validates and approves submissions from the province, ensuring compliance and accuracy.' },
  { title: 'Generalate Council', desc: 'Has global oversight, manages the authoritative registry, and publishes final resources.' },
];

import { MOCK_COLLECTIONS } from '../../data/collectionsData.js';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(18px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [counts, setCounts] = useState({ Region: 9, Province: 93, Community: 1908, Sector: 3912 });
  const [mapPoints, setMapPoints] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    api.get('/org-units/counts').then(setCounts).catch(() => { });
    api.get('/org-units/map/points').then(setMapPoints).catch(() => { });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.hash === '#collections') {
      const el = document.getElementById('collections');
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight');
    if (highlight && typeof window !== 'undefined' && window.find) {
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection) selection.removeAllRanges();
        // window.find(aString, aCaseSensitive, aBackwards, aWrapAround, aWholeWord, aSearchInFrames, aShowDialog);
        window.find(highlight, false, false, true, false, false, false);
      }, 300);
    }
  }, [location.search]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans">
      <PublicHeader />

      {/* HERO SECTION */}
      <section className="relative bg-brand-950 flex flex-col justify-center h-[75vh] min-h-[500px]">
        <div className="absolute inset-0 overflow-hidden">
          {HERO_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className={`h-full w-full object-cover object-center opacity-100 transition-transform duration-[10000ms] ease-out ${idx === heroIndex ? 'scale-100' : 'scale-110'
                  }`}
              />
            </div>
          ))}
          {/* Hero text and overlays have been removed to show images fully without shadows */}
        </div>
      </section>

      {/* PLATFORM / INSTITUTIONAL INFORMATION SECTION */}
      <section className="bg-slate-50 relative py-16">
        <div className="w-full px-4 md:px-8 xl:px-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal delay={100}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/10 group">
              <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={INSTITUTION_COVER_IMAGE.url} alt="Global Network" className="h-[500px] w-full object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={200} className="lg:pl-8">
            <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Institutional Information</h2>
            <h3 className="text-[28px] font-extrabold text-brand-950 leading-tight mb-6">
              A Unified Global Network
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-6">
              Founded in <strong>1859 by St. John Bosco</strong> in Turin, Italy, the Salesian congregation has grown to serve youth in ~135 countries worldwide. With headquarters in Rome (Sacro Cuore di Gesù a Castro Pretorio), our global mission continues to expand.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-8">
              Under the guidance of the current <strong>Rector Major, Fr. Fabio Attard</strong> (since March 2025), the wider Salesian Family includes 32 aligned groups and over 400,000 people globally, supported by this unified digital platform.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              {[
                { label: 'Salesians', value: 14600, prefix: '~' },
                { label: 'Countries', value: 135, prefix: '' },
                { label: 'Provinces', value: 93, prefix: '' },
                { label: 'Communities', value: 1900, suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-brand-800 flex justify-center items-baseline">
                    <span className="text-2xl mr-0.5">{stat.prefix}</span>
                    <AnimatedCounter value={stat.value} />
                    <span className="text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GLOBAL REACH SECTION */}
      {mapPoints.length > 0 && (
        <section className="relative bg-white py-24 border-b border-slate-100 overflow-hidden">
          <div className="relative w-full px-4 md:px-8 xl:px-12">
            <Reveal>
              <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-12">
                <div className="max-w-2xl">
                  <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Global Reach</h2>
                  <h3 className="text-[28px] font-extrabold text-brand-950">Worldwide Presence</h3>
                  <p className="mt-4 text-slate-600 text-lg">
                    Explore our global network of institutions and communities across all continents.
                  </p>
                </div>
                <div className="mt-6 w-full md:w-auto flex flex-col sm:flex-row gap-4">
                  <Link to="/sectors" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-50 px-6 py-3 text-sm font-bold text-brand-700 hover:bg-brand-100 transition border border-brand-200 w-full md:w-auto">
                    Pastoral Works Maps
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 p-2 sm:p-4 shadow-xl shadow-brand-900/5">
                <div className="rounded-2xl overflow-hidden bg-brand-50 relative">
                  <WorldReachMap points={mapPoints} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* SALESIAN COLLECTIONS SECTION */}
      <section id="collections" className="bg-slate-50 py-24 border-b border-slate-100 overflow-hidden">
        <div className="w-full px-4 md:px-8 xl:px-12 mb-12">
          <Reveal>
            <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Curated Knowledge</h2>
                <h3 className="text-[28px] font-extrabold text-brand-950">Salesian Collections</h3>
                <p className="mt-4 text-slate-600 text-lg">
                  Explore curated hubs of resources across Youth Ministry, Formation, Education, and the wider Salesian Family.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="w-full px-4 md:px-8 xl:px-12">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {MOCK_COLLECTIONS.map((collection, idx) => (
              <Reveal key={collection.id} delay={idx * 150} className="h-full">
                <CollectionCard collection={collection} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE FEATURES SECTION */}
      <section className="bg-white py-24 border-y border-slate-100 overflow-hidden relative">
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 1rem)); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(calc(-50% - 1rem)); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: scroll-left 40s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: scroll-right 45s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        `}</style>

        <div className="w-full px-4 md:px-8 xl:px-12 mb-16">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Core Ecosystem</h2>
              <h3 className="text-[28px] font-extrabold text-brand-950">Platform Capabilities</h3>
            </div>
          </Reveal>
        </div>

        <div className="marquee-container flex flex-col gap-6 relative">
          {/* Fading Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Top Marquee (Scrolling Left) */}
          <div className="animate-marquee-left gap-6 px-4">
            {[...PLATFORM_FEATURES, ...PLATFORM_FEATURES].map((f, idx) => (
              <div key={`top-${idx}`} className="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 duration-300 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-xl text-brand-700 group-hover:scale-110 transition-transform shadow-inner">
                    {f.icon}
                  </div>
                  <h4 className="text-base font-bold text-brand-950 leading-tight">{f.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Marquee (Scrolling Right) */}
          <div className="animate-marquee-right gap-6 px-4">
            {[...RESOURCE_FEATURES, ...RESOURCE_FEATURES].map((f, idx) => (
              <div key={`bot-${idx}`} className="w-[85vw] max-w-[340px] flex-shrink-0 group rounded-2xl border border-slate-200 bg-white shadow-sm p-6 transition-all hover:bg-brand-950 hover:shadow-xl hover:border-brand-900 hover:-translate-y-1 duration-300 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-brand-700 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 transition-all shadow-inner">
                    {f.icon}
                  </div>
                  <h4 className="text-base font-bold text-brand-950 leading-tight group-hover:text-white transition-colors">{f.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 font-medium group-hover:text-brand-200 transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* KNOWLEDGE AND RESOURCES SECTION */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="w-full px-4 md:px-8 xl:px-12">
          <Reveal>
            <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Digital Archives</h2>
                <h3 className="text-[28px] font-extrabold text-brand-950">Knowledge & Resources</h3>
                <p className="mt-4 text-slate-600 text-lg">
                  Access a vast collection of curated digital resources, document collections, publications, and historical materials.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {[
              { title: 'Document Collections', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=400&fit=crop', desc: 'Curated sets of institutional and historical documents. Explore our rich repository of letters, decrees, and foundation texts that shape our history.' },
              { title: 'Publications', img: 'https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=', desc: 'Official releases, journals, and constitutions. Stay updated with the latest Salesian bulletins, guidelines, and international publications.' },
              { title: 'Digital Archives', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSNuZY7KeuQ_P0rRRRdHYmAXCpI3CH-SrNwpjwIMulw&s=10', desc: 'Historical assets preserving the Salesian heritage. Delve into a digitized world of rare manuscripts and primary source materials.' },
              { title: 'Educational Materials', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop', desc: 'Resources supporting schools and technical institutes. Access lesson plans, youth ministry guides, and pedagogical frameworks.' },
              { title: 'Multimedia Assets', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6kuydUI3vGoER0Jyh_ugFhuOcTNnxediNlw_2_9w2sA&s=10', desc: 'Photographs, audio recordings, and videos. Browse our visual and audio gallery documenting missions and community life globally.' },
              { title: 'Research & Studies', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop', desc: 'Academic papers and pastoral research documents. Discover theological insights, sociological studies, and in-depth pastoral analyses.' },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-300 transition-all duration-500 cursor-pointer">
                  <div className="h-64 w-full overflow-hidden bg-slate-100">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <h4 className="text-xl font-bold text-brand-950 mb-3 group-hover:text-brand-700 transition-colors">{item.title}</h4>
                    <p className="text-base text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                    <div className="mt-6 flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-700">
                      Explore Collection <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* SALESIAN REGIONS SECTION */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="w-full px-4 md:px-8 xl:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Global Footprint</h2>
              <h3 className="text-[28px] font-extrabold text-brand-950">Salesian Regions of the World</h3>
              <p className="mt-4 text-slate-600 text-lg">The Congregation is organized into 8 geographic regions, spanning 135+ countries across every continent.</p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { code: 'AFM', name: 'Africa\u2013Madagascar', highlight: 'One of the fastest-growing regions in vocations worldwide.', desc: 'Covers Sub-Saharan Africa and Madagascar, with rapidly expanding communities and youth outreach programs.', icon: '🌍', color: 'from-amber-500 to-orange-600', light: 'bg-amber-50 border-amber-100 text-amber-700' },
              { code: 'EAO', name: 'East Asia\u2013Oceania', highlight: 'Spanning the Pacific Rim and Southeast Asia.', desc: 'Philippines, Japan, South Korea, China/Hong Kong, Vietnam, Thailand, Australia, Papua New Guinea, Timor-Leste.', icon: '🌏', color: 'from-sky-500 to-blue-600', light: 'bg-sky-50 border-sky-100 text-sky-700' },
              { code: 'INS', name: 'South Asia', highlight: 'Highest concentration of Salesian provinces globally.', desc: 'India, Sri Lanka, Nepal, Pakistan. India alone leads the world in Salesian vocations and province density.', icon: '🕌', color: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
              { code: 'INA', name: 'Interamerica', highlight: 'Bridging North and South America.', desc: 'Mexico, Central America, and the Caribbean, forming a vital bridge across the Americas for Salesian mission.', icon: '🌎', color: 'from-rose-500 to-pink-600', light: 'bg-rose-50 border-rose-100 text-rose-700' },
              { code: 'ACS', name: 'South Cone of America', highlight: 'Deep roots in South American culture and education.', desc: 'Argentina, Chile, Uruguay, Paraguay, Bolivia, Peru, Ecuador \u2014 known as Cono Sur.', icon: '🏔️', color: 'from-violet-500 to-purple-600', light: 'bg-violet-50 border-violet-100 text-violet-700' },
              { code: 'ECN', name: 'Europe Centre\u2013North', highlight: 'Established provinces across Central and Eastern Europe.', desc: 'UK, Ireland, France, Belgium, Germany, Netherlands, Poland, and Central/Eastern European nations.', icon: '🏰', color: 'from-indigo-500 to-blue-700', light: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
              { code: 'EUR', name: 'Europe Mediterranean', highlight: 'The heartland of the Salesian charism.', desc: 'Spain, Portugal, Malta, Slovenia, Croatia \u2014 Mediterranean provinces with deep historical Salesian heritage.', icon: '⛪', color: 'from-cyan-500 to-teal-600', light: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
              { code: 'IME', name: 'Italy\u2013Middle East', highlight: 'Birthplace of the Salesian Congregation.', desc: "Italy's provinces, the home of Don Bosco, plus Lebanon, Syria, Egypt, and Israel/Palestine.", icon: '🏛️', color: 'from-brand-700 to-brand-950', light: 'bg-brand-50 border-brand-100 text-brand-700' },
            ].map((region, idx) => (
              <Reveal key={region.code} delay={idx * 80}>
                <div className="group relative h-full flex flex-col rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-300 transition-all duration-500 cursor-pointer">
                  <div className={`h-2 w-full bg-gradient-to-r ${region.color}`} />
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-6 gap-4">
                      <h4 className="text-xl font-extrabold text-brand-950 leading-tight group-hover:text-brand-700 transition-colors">{region.name}</h4>
                      <span className={`shrink-0 text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border ${region.light}`}>{region.code}</span>
                    </div>
                    <p className="text-sm font-bold text-brand-600 mb-4 leading-relaxed">{region.highlight}</p>
                    <p className="text-base text-slate-600 leading-relaxed flex-1">{region.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
