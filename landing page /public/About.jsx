import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PageHero, { accentFor, SectionCard, softFor } from '../../components/PageHero.jsx';
import { GlobeIcon, BookOpenIcon, LayersIcon, ScaleIcon, UsersIcon, BuildingIcon, ArchiveIcon, MapPinIcon, TrendingUpIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';
import { useInView } from '../../hooks/useInView.js';
import { LoadingState } from '../../components/PublicState.jsx';
import AnimatedCounter from '../../components/AnimatedCounter.jsx';
import WorldReachMap from '../../components/WorldReachMap.jsx';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const HERO_STATS = [
  { value: '14,600+', label: 'Salesians Worldwide' },
  { value: '135+', label: 'Countries' },
  { value: '90', label: 'Provinces' },
  { value: '1,900+', label: 'Communities' },
];

const KEY_FACTS = [
  { icon: '📅', label: 'Founded', value: '18 Dec 1859', sub: 'Valdocco, Turin, Italy' },
  { icon: '👤', label: 'Rector Major', value: 'Fr. Fabio Attard', sub: 'Elected March 2025' },
  { icon: '🏢', label: 'Headquarters', value: 'Rome, Italy', sub: 'Sacro Cuore di Gesù' },
  { icon: '⛪', label: 'Canonized', value: '1934', sub: 'By Pope Pius XI' },
  { icon: '🌐', label: 'Salesian Family', value: '400,000+', sub: '32 affiliated groups' },
];

const REGIONS = [
  { code: 'AFM', name: 'Africa–Madagascar', icon: '🌍', note: 'Fastest-growing in vocations' },
  { code: 'EAO', name: 'East Asia–Oceania', icon: '🌏', note: 'Philippines, Japan, Australia & more' },
  { code: 'INS', name: 'South Asia', icon: '🕌', note: 'Highest province density globally' },
  { code: 'INA', name: 'Interamerica', icon: '🌎', note: 'Mexico, Central America, Caribbean' },
  { code: 'ACS', name: 'South Cone (Cono Sur)', icon: '🏔️', note: 'Argentina, Chile, Peru & more' },
  { code: 'ECN', name: 'Europe Centre–North', icon: '🏰', note: 'UK, Germany, Poland & more' },
  { code: 'EUR', name: 'Europe Mediterranean', icon: '⛪', note: 'Spain, Portugal, Croatia' },
  { code: 'IME', name: 'Italy–Middle East', icon: '🏛️', note: 'Birthplace of the Congregation' },
];

const FAMILY_GROUPS = [
  { name: 'Daughters of Mary Help of Christians (FMA)', icon: '✨', desc: 'Salesian Sisters co-founded by Don Bosco and St. Maria Domenica Mazzarello in 1872. ~11,500 members in 90+ countries.' },
  { name: 'Salesian Cooperators', icon: '🤝', desc: 'Lay members who live the Salesian spirit in the world, collaborating in youth ministry and education.' },
  { name: 'Past Pupils of Don Bosco', icon: '🎓', desc: 'A global association of alumni who were educated in Salesian institutions worldwide.' },
  { name: 'Other Affiliated Groups', icon: '👥', desc: '29 additional religious congregations, associations, and movements sharing the Salesian charism.' },
];

const STRUCTURE_LEVELS = [
  { label: 'Generalate', icon: '🏛️', count: '1', desc: 'Central government in Rome, led by the Rector Major.' },
  { label: 'Region', icon: '🌍', count: '8', desc: 'Continental groupings overseen by Regional Councillors.' },
  { label: 'Province', icon: '🏠', count: '90+', desc: 'Led by a Provincial — the main governing circumscription.' },
  { label: 'Community', icon: '👥', count: '1,900+', desc: 'Local Salesian house; submits annual registry data.' },
  { label: 'Sector', icon: '⚙️', count: '3,900+', desc: 'School, parish, oratory, or social work serving youth.' },
];

const GENERAL_COUNCIL = [
  { role: 'Rector Major', name: 'Fr. Fabio Attard, SDB', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8aKskIg6Z28K6AEpeN5oYS0CJJDVz7PA3TtO3XyJ9r0Pd1hWZJ8Y10GI&s=10', desc: 'Fr. Fabio Attard is the 11th successor of Don Bosco and Rector Major of the Salesians of Don Bosco. He provides global leadership and guides the Congregation in its mission, governance, and service to young people.' },
  { role: 'Vicar of the Rector Major', name: 'Fr. Stefano Martoglio, SDB', photo: 'https://www.infoans.org/media/k2/items/cache/1d45e33a3b01b0ac62537ca51bc78d37_XL.jpg', desc: 'Fr. Stefano Martoglio serves as Vicar of the Rector Major and his principal collaborator in the governance of the Congregation. He supports the Rector Major in coordinating the Salesian mission and religious life worldwide.' },
  { role: 'General Councillor for Formation', name: 'Fr. Silvio Roggia, SDB', photo: 'https://www.donbosco.press/wp-content/uploads/2025/11/Intervista-don-Silvio-ROGGIA_0.1_tn.jpg', desc: 'Fr. Silvio Roggia is responsible for the Formation Sector of the Salesian Congregation. He promotes the initial and ongoing formation of Salesians and supports their spiritual, pastoral, and professional development.' },
  { role: 'General Councillor for Youth Ministry', name: 'Fr. Rafael Bejarano, SDB', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSYnUeBzf0I9VuRZsyRTwUA7LMlmR7kSYe1d5P53z9w&s', desc: 'Fr. Rafael Bejarano leads the Youth Ministry Sector of the Congregation. His work focuses on accompanying young people, especially those experiencing poverty, vulnerability, and social exclusion, through the Salesian Preventive System.' },
  { role: 'General Councillor for Social Communication', name: 'Fr. Fidel Maria Orendain, SDB', photo: 'https://i0.wp.com/www.donbosco.ph/wp-content/uploads/2025/09/Orendain.jpg?fit=640%2C640&ssl=1', desc: 'Fr. Fidel Maria Orendain coordinates Social Communication for the Salesian Congregation worldwide. He promotes effective communication, media engagement, digital presence, and the sharing of the Salesian mission.' },
  { role: 'General Councillor for Missions', name: 'Fr. Jorge Mario Crisafulli, SDB', photo: 'https://www.infoans.org/media/k2/items/cache/1c1ec299329efc52b41ed076889a3867_XL.jpg', desc: 'Fr. Jorge Mario Crisafulli is responsible for the Missions Sector of the Salesian Congregation. With extensive missionary experience, particularly in Africa, he promotes missionary animation, evangelisation, and the development of new Salesian presences.' },
  { role: 'Economer General', name: 'Fr. Gabriel Stawowy, SDB', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRIzTBXgCa4V9ZrqFFaRyiKat-GYLjEXbB9oO-ReO9hav1GnKJMNeTw0&s=10', desc: 'Fr. Gabriel Stawowy oversees the economic administration and financial stewardship of the Salesian Congregation. He supports responsible management of resources and promotes financial sustainability across Salesian institutions and provinces.' },
  { role: 'Secretary General', name: 'Fr. Guido Garino, SDB', photo: 'https://www.infoans.org/media/k2/items/cache/1dd07e761872c96ea4c0ecbd7618cf5c_XL.jpg', desc: 'Fr. Guido Garino serves as Secretary General of the Salesian Congregation, supporting its central governance and administrative processes. His responsibilities include official documentation, institutional records, correspondence, and coordination of General Council matters.' },
];

export default function About() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [countryCount, setCountryCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [beneficiaryTotal, setBeneficiaryTotal] = useState(0);
  const [mapPoints, setMapPoints] = useState([]);
  const [sectorChart, setSectorChart] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      api.get('/org-units/counts'),
      api.get('/org-units?type=Community&limit=3000'),
      api.get('/org-units?type=Sector&limit=4000'),
      api.get('/repository-assets?public=true'),
      api.get('/baselines'),
      api.get('/org-units/map/points'),
    ]).then(([countRows, communities, institutions, assets, baselines, points]) => {
      if (cancelled) return;
      setCounts(countRows);
      setCountryCount(new Set(communities.map((c) => c.nation).filter(Boolean)).size);
      setAssetCount(assets.length);
      setBeneficiaryTotal(baselines.reduce((sum, b) => sum + (Number(b.beneficiaries?.reach) || 0), 0));
      setMapPoints(points);
      const bySector = {};
      for (const inst of institutions) {
        const key = inst.institution_subtype || 'Other';
        bySector[key] = (bySector[key] || 0) + 1;
      }
      setSectorChart(Object.entries(bySector).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value));
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const provinceTotal = useMemo(() => (counts.Province || 0) + (counts.ViceProvince || 0) + (counts.Delegation || 0), [counts]);

  const primaryTiles = [
    { label: 'Sectors', value: counts.Sector || 0, icon: BuildingIcon },
    { label: 'Communities', value: counts.Community || 0, icon: UsersIcon },
  ];
  const secondaryTiles = [
    { label: 'Countries', value: countryCount, icon: MapPinIcon },
    { label: 'Provinces', value: provinceTotal, icon: BuildingIcon },
    { label: 'Published Resources', value: assetCount, icon: ArchiveIcon },
    { label: 'Beneficiaries Reached', value: beneficiaryTotal, icon: TrendingUpIcon },
  ];

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
    <div className="min-h-screen bg-slate-50 font-sans">
      <PublicHeader />


      <main className="w-full px-4 md:px-8 xl:px-12 py-16 space-y-20">


        {/* VISION */}
        <Reveal>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-8 sm:p-12">
            <div className="flex-1 space-y-4">
              <h2 className="font-serif text-[28px] font-black text-brand-600 tracking-tight">Vision</h2>
              <blockquote className="text-xl sm:text-2xl font-extrabold text-brand-950 leading-snug">
                “To empower young people, especially those who are most vulnerable, through education, accompaniment, faith, and opportunities for integral human development, inspired by the Salesian charism of Don Bosco.”
              </blockquote>
            </div>
            <div className="w-full md:w-5/12 shrink-0 rounded-2xl overflow-hidden shadow-md">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEb2_0QoimfLNxtWfIeCZu2ZyrXhuNwlJE-BoVO4p5Gw&s=10" alt="Salesian Vision" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>

        {/* MISSION */}
        <Reveal delay={100}>
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-8 sm:p-12">
            <div className="flex-1 space-y-4">
              <h2 className="font-serif text-[28px] font-black text-brand-600 tracking-tight">Mission</h2>
              <blockquote className="text-xl sm:text-2xl font-extrabold text-brand-950 leading-relaxed">
                “To serve young people through education, evangelization, pastoral care, and social development, creating welcoming communities where every young person can grow in dignity, responsibility, faith, and hope, following the Preventive System of Don Bosco.”
              </blockquote>
            </div>
            <div className="w-full md:w-5/12 shrink-0 rounded-2xl overflow-hidden shadow-md">
              <img src="https://www.donbosco.press/wp-content/uploads/2023/09/154-Spedizione-Missionaria-0_tn.jpg" alt="Salesian Mission" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>

        {/* HISTORY */}
        <Reveal>
          <div className="bg-brand-950 text-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-12 lg:p-16 grid lg:grid-cols-12 gap-12 items-center relative">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
              
              <div className="space-y-6 relative z-10 lg:col-span-7 xl:col-span-8">
                <h2 className="font-serif text-[28px] font-black text-brand-400 tracking-tight">History</h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                  The Salesian Congregation, officially known as the Society of Saint Francis de Sales (Salesians of Don Bosco), was founded by Saint John Bosco (Don Bosco) in Turin, Italy, in 1859. Don Bosco dedicated his life to the education, evangelization, and care of young people, especially those who were poor, abandoned, and vulnerable.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                  Inspired by the spirituality of Saint Francis de Sales, Don Bosco developed the Preventive System, an educational approach based on reason, religion, and loving-kindness. His mission focused on helping young people grow into responsible citizens and committed Christians.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                  Over time, Don Bosco's mission spread beyond Italy. The first Salesian missionaries were sent to Argentina in 1875, marking the beginning of the Congregation's global expansion. Today, the Salesian mission is present across the world through schools, technical and vocational training centres, youth centres, parishes, social development initiatives, and missionary works.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                  The Salesian Congregation continues Don Bosco's mission by educating and evangelizing young people, with particular attention to those who are poor, marginalized, and most in need. Its work is guided by the motto:
                </p>
                <blockquote className="border-l-4 border-amber-500 pl-5 py-2 text-xl font-bold italic text-amber-400">
                  “Da mihi animas, cetera tolle”<br/>
                  <span className="text-base text-amber-200/80 not-italic mt-1 block">“Give me souls, take away the rest.”</span>
                </blockquote>
              </div>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 lg:col-span-5 xl:col-span-4 max-w-md mx-auto w-full">
                <img src="https://salesiansisterswest.org/sites/salesian/files/uploads/images/new_st._fracis_de_sales.jpg" alt="Salesian History" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* GENERAL COUNCIL */}
        <Reveal>
          <div>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Leadership</h2>
              <h3 className="text-[28px] font-extrabold text-brand-950">The General Council</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GENERAL_COUNCIL.map((member, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${accentFor(idx)}`} />
                  <div className="p-8 flex flex-col items-center">
                    <div className="h-36 w-36 rounded-full overflow-hidden mb-5 shadow-inner ring-4 ring-slate-50 group-hover:ring-brand-50 transition-all duration-300">
                      <img src={member.photo} alt={member.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="text-[16px] font-extrabold text-brand-950 mb-1.5">{member.name}</h4>
                    <p className="text-[11px] font-bold text-brand-500 uppercase tracking-widest mb-4">{member.role}</p>
                    <p className="text-[13px] leading-relaxed text-slate-500">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>


      </main>
      <PublicFooter />
    </div>
  );
}


