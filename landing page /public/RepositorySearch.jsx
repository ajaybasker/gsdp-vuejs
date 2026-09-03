import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import { accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { SearchIcon, ImageIcon, VideoIcon, HeadphonesIcon, BookOpenIcon, FileTextIcon, SendIcon, ArchiveIcon, GlobeIcon } from '../../components/icons.jsx';
import { ASSET_TYPES } from '../../constants.js';
import { LANGUAGES, AREAS_OF_REFERENCE } from '../../data/repositoryTaxonomy.js';
import { useInView } from '../../hooks/useInView.js';

const ASSET_ICON = { Book: BookOpenIcon, Research: FileTextIcon, Photo: ImageIcon, Video: VideoIcon, Audio: HeadphonesIcon, 'Press Release': SendIcon, 'Official Publication': ArchiveIcon };
const ASSET_ACCENT_ORDER = ['Book', 'Research', 'Photo', 'Video', 'Audio', 'Press Release', 'Official Publication'];
const TYPE_META = {
  Book: { icon: '📖', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  Research: { icon: '🔬', color: 'bg-violet-50 border-violet-100 text-violet-700' },
  Photo: { icon: '📷', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  Video: { icon: '🎥', color: 'bg-rose-50 border-rose-100 text-rose-700' },
  Audio: { icon: '🎙️', color: 'bg-amber-50 border-amber-100 text-amber-700' },
  'Press Release': { icon: '📰', color: 'bg-sky-50 border-sky-100 text-sky-700' },
  'Official Publication': { icon: '📜', color: 'bg-teal-50 border-teal-100 text-teal-700' },
};

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function RepositorySearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState(searchParams.get('q') || searchParams.get('search') || '');
  const [assetType, setAssetType] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [areaOfReferenceId, setAreaOfReferenceId] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ public: 'true' });
    if (search) params.set('search', search);
    if (assetType) params.set('asset_type', assetType);
    const timer = setTimeout(() => {
      api.get(`/repository-assets?${params.toString()}`).then((rows) => {
        if (!cancelled) setAssets(rows);
      }).finally(() => { if (!cancelled) setLoading(false); });
    }, search ? 250 : 0);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [search, assetType]);

  const filteredAssets = useMemo(() => assets.filter((a) => {
    if (languageId && !(a.languageIds || []).includes(Number(languageId))) return false;
    if (areaOfReferenceId && !(a.areaOfReferenceIds || []).includes(Number(areaOfReferenceId))) return false;
    return true;
  }), [assets, languageId, areaOfReferenceId]);

  const stats = useMemo(() => {
    if (loading) return undefined;
    const types = new Set(filteredAssets.map((a) => a.asset_type).filter(Boolean)).size;
    const origins = new Set(filteredAssets.map((a) => a.org_unit?.name).filter(Boolean)).size;
    return [{ value: filteredAssets.length, label: 'Published resources' }, { value: types, label: 'Resource types' }, { value: origins, label: 'Contributing units' }];
  }, [loading, filteredAssets]);

  const typeCounts = useMemo(() => {
    const c = {};
    for (const a of assets) { const k = a.asset_type || 'Other'; c[k] = (c[k] || 0) + 1; }
    return c;
  }, [assets]);

  const updateFilters = (q, type, lang, area) => {
    setSearch(q); setAssetType(type); setLanguageId(lang); setAreaOfReferenceId(area);
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    setSearchParams(params, { replace: true });
  };

  const hasFilter = Boolean(search || assetType || languageId || areaOfReferenceId);
  const clearAll = () => updateFilters('', '', '', '');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <PublicHeader />

      {/* Full-width page header */}
      <div className="w-full bg-brand-950 text-white">
        <div className="w-full px-4 md:px-8 xl:px-12 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="w-full lg:flex-1">
              <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-2">Knowledge &amp; Resources</p>
              <h1 className="text-[28px] font-extrabold mb-2">Salesian Knowledge Hub</h1>
              <p className="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
                Explore the Congregation's flagship universities, research institutes, publishers, and the centralized digital repository of Salesian heritage and resources.
              </p>
            </div>
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-extrabold">{s.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 md:px-8 xl:px-12 py-16 space-y-16">

        {/* 1. Higher Education */}
        <Reveal>
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-600 to-brand-800" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md text-lg">🎓</div>
                <h2 className="text-xl font-extrabold text-brand-950">Higher Education</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-slate-600 mb-4">
                <strong className="text-brand-950">Università Pontificia Salesiana (UPS)</strong> — the Pontifical Salesian University, Rome. Founded as the <em>Pontificium Athenaeum Salesianum</em> in 1940 and raised to full pontifical university status in 1973.
              </p>
              <p className="text-[15px] leading-relaxed text-slate-600 mb-4">
                Faculties include <strong className="text-brand-900">Education Sciences, Theology, Philosophy, Canon Law, Communication Sciences, and Psychology</strong>. It is the Congregation's flagship institution for training Salesian educators, formators, and scholars worldwide.
              </p>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-[13px] text-slate-600">
                <strong className="text-slate-800">Global Network:</strong> Regional Salesian universities and institutes exist across provinces, e.g., Universidad Don Bosco (El Salvador), Don Bosco Tech Society institutes (India), and various affiliated colleges globally offering degree programs.
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2 & 3. Research + Publishing side-by-side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-extrabold text-brand-950 mb-5 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> Historical Research
              </h3>
              <ul className="space-y-4 mb-4 text-[14px] leading-relaxed text-slate-600">
                <li><strong className="text-brand-900">Istituto Storico Salesiano (ISS)</strong> — Rome. The Congregation's official historical research institute, founded to study and preserve the history of Don Bosco, the Salesian Family, and Salesian pedagogy.</li>
                <li><strong className="text-brand-900">ACSSA (Association of Salesian History Scholars)</strong> — an international association supporting historical research on the Salesian charism across provinces.</li>
                <li><strong className="text-brand-900">Archivio Storico Generale Salesiano (ASC)</strong> — the Congregation's central archive in Rome, preserving Don Bosco's original manuscripts, letters, and founding-era documents.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-extrabold text-brand-950 mb-5 flex items-center gap-2">
                <span className="text-2xl">📚</span> Publishing Houses
              </h3>
              <ul className="space-y-4 mb-4 text-[14px] leading-relaxed text-slate-600">
                <li><strong className="text-brand-900">LAS (Libreria Ateneo Salesiano)</strong> — the academic publishing house of the Pontifical Salesian University in Rome.</li>
                <li><strong className="text-brand-900">Elledici (Editrice Elledici)</strong> — major Italian Salesian publishing house based in Leumann/Turin, producing catechetical, pastoral, and educational materials.</li>
                <li><strong className="text-brand-900">Don Bosco Publications</strong> — regional English-language publishing arms (e.g. Mumbai/Matunga, India) producing Salesian formation and devotional literature.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 4 & 5. Periodicals + News */}
        <Reveal>
          <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-slate-900 p-6 sm:p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📰</span> Periodicals & Journals
                </h3>
                <ul className="space-y-3 text-[14px] leading-relaxed text-slate-300">
                  <li><strong className="text-white">Bollettino Salesiano (Salesian Bulletin)</strong> — founded by Don Bosco in 1877; published today in over two dozen language/regional editions worldwide.</li>
                  <li><strong className="text-white">Ricerche Storiche Salesiane</strong> — peer-reviewed academic history journal published by the ISS since 1982.</li>
                  <li><strong className="text-white">Journal of Salesian Studies</strong> — English-language academic journal from the Institute of Salesian Studies, Berkeley, California.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📡</span> News & Communication
                </h3>
                <p className="text-[14px] leading-relaxed text-slate-300">
                  <strong className="text-white">ANS – Agenzia Info Salesiana</strong> (Salesian Information Agency) is the Congregation's official news service, based in Rome, reporting on Salesian activity across all regions.
                </p>
              </div>
            </div>
          </div>
        </Reveal>


        {/* THE REPOSITORY DIRECTORY */}
        <div className="pt-10 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-[28px] font-extrabold text-brand-950">Digital Resource Repository</h2>
            <p className="mt-3 text-[15px] text-slate-500">Search published archives, books, and multimedia from across the Salesian family.</p>
          </div>

          <Reveal>
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative w-full lg:flex-1">
                  <SearchIcon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={search} onChange={(e) => updateFilters(e.target.value, assetType, languageId, areaOfReferenceId)} placeholder="Search published resources…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-[14px] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap gap-3 w-full lg:w-auto min-w-0">
                  <select value={assetType} onChange={(e) => updateFilters(search, e.target.value, languageId, areaOfReferenceId)} className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] font-medium text-slate-600 focus:border-brand-500 focus:outline-none">
                    <option value="">All Resource Types</option>
                    {ASSET_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={languageId} onChange={(e) => updateFilters(search, assetType, e.target.value, areaOfReferenceId)} className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] font-medium text-slate-600 focus:border-brand-500 focus:outline-none">
                    <option value="">All Languages</option>
                    {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                  <select value={areaOfReferenceId} onChange={(e) => updateFilters(search, assetType, languageId, e.target.value)} className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] font-medium text-slate-600 focus:border-brand-500 focus:outline-none">
                    <option value="">All Areas of Reference</option>
                    {AREAS_OF_REFERENCE.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                  {hasFilter && <button onClick={clearAll} className="w-full sm:col-span-2 lg:w-auto rounded-xl border border-slate-200 px-4 py-3.5 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">Clear Filters</button>}
                </div>
              </div>
            </div>
          </Reveal>

          {!loading && !hasFilter && (
            <Reveal delay={50}>
              <div className="mb-8 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
                {ASSET_TYPES.map((type, idx) => {
                  const meta = TYPE_META[type] || { icon: '📄', color: 'bg-slate-50 border-slate-100 text-slate-600' };
                  return (
                    <button key={type} onClick={() => updateFilters(search, type, languageId, areaOfReferenceId)}
                      className="min-w-0 group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm text-center hover:shadow-lg hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                      <span className="text-2xl">{meta.icon}</span>
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-brand-700 leading-tight text-center break-words w-full">{type}</span>
                      {typeCounts[type] && <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${meta.color}`}>{typeCounts[type]}</span>}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}

          {loading && <LoadingState label="Searching the repository…" />}
          {!loading && filteredAssets.length === 0 && <EmptyState icon={ArchiveIcon} title="No published resources found" message="Try a different search term, or clear a filter." />}

          {!loading && filteredAssets.length > 0 && (
            <>
              <Reveal>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[14px] font-bold text-slate-700">{filteredAssets.length} published resource{filteredAssets.length === 1 ? '' : 's'}</p>
                  {hasFilter && <button onClick={clearAll} className="text-[13px] font-semibold text-brand-600 hover:text-brand-800">Clear filters</button>}
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
                {filteredAssets.map((a, idx) => {
                  const accentIdx = ASSET_ACCENT_ORDER.indexOf(a.asset_type);
                  const gradient = accentFor(accentIdx >= 0 ? accentIdx : 0);
                  const meta = TYPE_META[a.asset_type] || { icon: '📄', color: 'bg-slate-50 border-slate-100 text-slate-600' };
                  return (
                    <Reveal key={a.id} delay={idx * 25}>
                      <Link to={`/assets/${a.id}`}
                        className="group grid h-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all duration-300">
                        <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />
                        <div className="p-5 flex flex-col flex-1 gap-3 min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md text-lg`}>{meta.icon}</div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${meta.color} max-w-full truncate`}>{a.asset_type}</span>
                          </div>
                          <h3 className="text-[14px] font-bold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors break-words">{a.title}</h3>
                          <p className="text-[12px] text-slate-400 font-medium truncate w-full">{a.org_unit?.name || 'Unknown origin'}</p>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
