import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const CONTINENTS = [
  {
    label: 'Africa',
    icon: '🌍',
    description: 'Salesian presence across Sub-Saharan Africa, North Africa, and Madagascar — among the fastest-growing regions in vocations and new works.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zB0qtcSaMZeyKLY-30wJ8-zNJS-eAXtCAv5Qg3VAcw&s=10',
    href: '/provinces?region=africa',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
  },
  {
    label: 'Asia',
    icon: '🌏',
    description: 'Spanning South Asia, East Asia, and Oceania — with a particularly strong density of provinces across India, the Philippines, Japan, and beyond.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuzeDnxI2uX5d81PG9j7yr6yk5ktxAcWSdYDBnRpR-A&s=10',
    href: '/provinces?region=asia',
    gradient: 'from-red-500 to-rose-600',
    bg: 'from-red-50 to-rose-50',
    border: 'border-red-100',
  },
  {
    label: 'Europe',
    icon: '🏰',
    description: 'The birthplace of the Salesian Congregation — with provinces across Italy, Spain, Portugal, Poland, Germany, the UK, and the Mediterranean region.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhVwQrC0-8ocau_1MNqxI4Wi0A3xJI2gkoHhibzdZWw&s=10',
    href: '/provinces?region=europe',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
  },
  {
    label: 'North America',
    icon: '🗽',
    description: 'Covering the United States, Canada, Mexico, Central America, and the Caribbean — serving diverse youth communities through education and pastoral works.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsGel2q1RpMth-97xE_o_So_7lbicdgpc85R11EsEFA&s=10',
    href: '/provinces?region=north-america',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
  },
  {
    label: 'South America',
    icon: '🌎',
    description: 'Where Don Bosco\'s first missionaries arrived in 1875 — with deep roots in Argentina, Brazil, Chile, Peru, Bolivia, and across the continent.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3myeurAyfPWCxYL67a5D45RutjGXu_C4TjbH9WiWMA&s=10',
    href: '/provinces?region=south-america',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
  },
  {
    label: 'Oceania',
    icon: '🌊',
    description: 'Salesian mission reaching Australia, Papua New Guinea, the Pacific Islands, and surrounding territories — serving indigenous and migrant youth communities.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxHvv9PVeSRyXaXDif2sIgpV7iJ1AXGQqHtm9v3xMfg&s=10',
    href: '/provinces?region=oceania',
    gradient: 'from-cyan-500 to-sky-600',
    bg: 'from-cyan-50 to-sky-50',
    border: 'border-cyan-100',
  },
];

export default function Continents() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <PublicHeader />

      {/* Page Header — compact */}
      <div className="w-full bg-brand-950 text-white py-8 px-4 md:px-8 xl:px-12">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-1">Pastoral Works</p>
        <h1 className="text-[28px] font-extrabold">Continents</h1>
        <p className="text-sm text-slate-300 mt-1">Explore the global reach of Don Bosco's mission across every continent.</p>
      </div>

      <main className="w-full px-4 md:px-8 xl:px-12 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTINENTS.map((continent, idx) => (
            <Reveal key={continent.label} delay={idx * 80}>
              <Link
                to={continent.href}
                className={`group flex flex-col h-full rounded-3xl border ${continent.border} bg-gradient-to-br ${continent.bg} overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Image — full-width cover, no white box */}
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={continent.image}
                    alt={continent.label}
                    className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 pt-4">
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${continent.gradient} text-white px-4 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm mb-3 self-start`}>
                    <span className="text-base">{continent.icon}</span>
                    {continent.label}
                  </div>
                  <p className="text-[14px] leading-relaxed text-slate-600 flex-1">
                    {continent.description}
                  </p>
                  <div className={`mt-5 flex items-center gap-1.5 text-[13px] font-bold bg-gradient-to-r ${continent.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-200`}>
                    Explore Provinces <span>→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
