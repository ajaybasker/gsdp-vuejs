import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import { accentFor } from '../../components/PageHero.jsx';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { BuildingIcon, SearchIcon, FilterIcon, MapPinIcon, GlobeIcon, UsersIcon, BookOpenIcon } from '../../components/icons.jsx';
import { SECTOR_TAXONOMY } from '../../constants.js';
import { useInView } from '../../hooks/useInView.js';

const MAX_RESULTS = 60;

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const TYPE_ICONS = {
  School: '🏫', Parish: '⛪', Oratory: '🎯', 'Social Work': '🤝',
  'TVET Center': '🔧', 'Higher Education': '🎓', Company: '🏢',
};

const PASTORAL_CATEGORIES = [
  {
    title: 'School',
    subtype: 'School',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
    desc: 'Salesian schools provide quality education rooted in the Preventive System of Don Bosco — nurturing young people academically, morally, and spiritually at primary and secondary levels.',
  },
  {
    title: 'Higher Education',
    subtype: 'Higher Education',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80',
    desc: 'Salesian universities and colleges offer higher academic formation, combining intellectual excellence with a deep commitment to the human and Christian development of students.',
  },
  {
    title: 'Parishes',
    subtype: 'Parish',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&q=80',
    desc: 'Salesian parishes are vibrant centres of evangelization and community life, integrating liturgy, catechesis, youth ministry, and pastoral care in service of local communities.',
  },
  {
    title: 'Social Work',
    subtype: 'Social Work',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
    desc: 'Salesian social works reach out to the poorest and most marginalized — offering shelters, rehabilitation programmes, child protection services, and community development initiatives.',
  },
  {
    title: 'Oratories & Youth Centres',
    subtype: 'Oratory',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    desc: 'The Oratory is the original Salesian work-form dating back to Don Bosco in 1841 — a welcoming space where young people find recreation, friendship, formation, and accompaniment.',
  },
  {
    title: 'VTC (Vocational Training Centres)',
    subtype: 'TVET Center',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
    desc: 'Salesian vocational and technical centres provide practical skills and professional formation for young people, especially those from disadvantaged backgrounds, empowering them for dignified employment.',
  },
];

export default function InstitutionDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState([]);

  const subtypeFilter = searchParams.get('subtype') || '';
  const search = searchParams.get('q') || '';

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get('/org-units?type=Sector&limit=4000').then((rows) => {
      if (!cancelled) setInstitutions(rows);
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const scrollToDirectory = () => {
    setTimeout(() => {
      const el = document.getElementById('directory-list');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100; // Account for sticky header
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  useEffect(() => {
    if (searchParams.get('subtype')) {
      scrollToDirectory();
    }
  }, []); // Run only on initial mount to auto-scroll if navigating from Home

  const countryOptions = useMemo(() => [...new Set(institutions.map((i) => i.nation).filter(Boolean))], [institutions]);

  const filtered = useMemo(() => {
    return institutions.filter((i) => {
      if (subtypeFilter && i.institution_subtype !== subtypeFilter) return false;
      if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [institutions, subtypeFilter, search]);

  const hasActiveFilter = Boolean(search || subtypeFilter);
  const results = filtered.slice(0, MAX_RESULTS);

  const typeCounts = useMemo(() => {
    const counts = {};
    for (const inst of institutions) {
      const key = inst.institution_subtype || 'Other';
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [institutions]);

  const updateFilters = (q, subtype) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (subtype) params.set('subtype', subtype);
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans">
      <PublicHeader />

      <main className="w-full px-4 md:px-8 xl:px-12 py-12 space-y-16">

        {/* COMPACT DIRECTORY HEADER */}
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6 sm:gap-8">
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <BuildingIcon size={16} />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-600">Registry</span>
              </div>
              <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-3">Pastoral Works Directory</h1>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-500">
                Guided by Don Bosco's motto "Da mihi animas, cetera tolle", Salesian pastoral work is organized around education and evangelization for young people.
              </p>
            </div>

            {!loading && (
              <div className="flex flex-wrap gap-4">
                {[
                  { value: institutions.length.toLocaleString(), label: 'Sectors' },
                  { value: SECTOR_TAXONOMY.length, label: 'Sector Types' },
                  { value: countryOptions.length, label: 'Countries' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
                    <div className="text-2xl font-extrabold text-brand-900">{s.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 1. Our Pastoral Mission (Categories) */}
        <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md">
                <GlobeIcon size={18} />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-950">Our Pastoral Mission</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-600 mb-8 max-w-4xl">
              Salesian works are traditionally grouped into these core categories, all aimed at serving young people, especially the poor and at risk.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PASTORAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => {
                    updateFilters('', cat.subtype);
                    scrollToDirectory();
                  }}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 flex flex-col items-center text-center cursor-pointer w-full text-left"
                >
                  {/* Circular image — larger, full fill */}
                  <div className="mb-5 h-36 w-36 rounded-full overflow-hidden ring-4 ring-brand-50 shadow-lg group-hover:ring-brand-200 transition-all duration-300 shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[15px] font-bold text-brand-950 mb-2 leading-snug group-hover:text-brand-700">{cat.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-500">{cat.desc}</p>
                  {!loading && typeCounts[cat.subtype] && (
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-extrabold text-brand-700">
                      {typeCounts[cat.subtype].toLocaleString()} records
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search + filter bar — shown directly below cards */}
            <div id="directory-list" className="mt-10 flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="relative w-full sm:flex-1">
                <SearchIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => updateFilters(e.target.value, subtypeFilter)} placeholder="Search by sector name…"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-[14px] text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto min-w-0">
                <select value={subtypeFilter} onChange={(e) => updateFilters(search, e.target.value)}
                  className="w-full sm:w-auto min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none">
                  <option value="">All Sector Types</option>
                  {SECTOR_TAXONOMY.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {hasActiveFilter && (
                  <button onClick={() => updateFilters('', '')}
                    className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results — appear right below filter bar */}
            {loading && <div className="mt-8"><LoadingState label="Loading sectors…" /></div>}

            {!loading && hasActiveFilter && filtered.length === 0 && (
              <div className="mt-8">
                <EmptyState icon={BuildingIcon} title="No sectors match your search" message="Try a different name or clear the sector-type filter." />
              </div>
            )}

            {!loading && hasActiveFilter && filtered.length > 0 && (
              <div className="mt-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-700">
                    {filtered.length} match{filtered.length === 1 ? '' : 'es'}
                    {filtered.length > MAX_RESULTS ? ` — showing first ${MAX_RESULTS}` : ''}
                  </span>
                  <button onClick={() => updateFilters('', '')}
                    className="text-[13px] font-semibold text-brand-600 hover:text-brand-800 transition">
                    Clear filter
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.map((inst, idx) => (
                    <Reveal key={inst.id} delay={idx * 30}>
                      <Link to={`/sectors/${inst.id}`}
                        className="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                        <div className={`h-1 w-full bg-gradient-to-r ${accentFor(idx)}`} />
                        <div className="p-5 flex flex-col flex-1">
                          <div className="mb-3 flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentFor(idx)} text-white shadow-md text-lg`}>
                              {TYPE_ICONS[inst.institution_subtype] || '🏛️'}
                            </div>
                            {inst.institution_subtype && (
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{inst.institution_subtype}</span>
                            )}
                          </div>
                          <h3 className="text-[14px] font-bold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors">{inst.name}</h3>
                          {(inst.city || inst.nation) && (
                            <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
                              <MapPinIcon size={12} />
                              {inst.city}{inst.nation ? `, ${inst.nation}` : ''}
                            </p>
                          )}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>

      </main>
      <PublicFooter />
    </div>
  );
}
