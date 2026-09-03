import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import PageHero, { accentFor } from '../../components/PageHero.jsx';
import EntityCard from '../../components/EntityCard.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { UsersIcon, MapPinIcon, SearchIcon } from '../../components/icons.jsx';
import { SECTOR_TAXONOMY } from '../../constants.js';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

const PROVINCE_TYPES = ['Province', 'ViceProvince', 'Delegation'];
const PAGE_SIZE = 60;

export default function CommunityDirectory() {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceFilter, setProvinceFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sectorIndex, setSectorIndex] = useState(null);
  const [sectorLoading, setSectorLoading] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      api.get('/org-units?type=Community&limit=3000'),
      ...PROVINCE_TYPES.map((type) => api.get(`/org-units?type=${type}&limit=300`)),
    ]).then(([communityRows, provinceRows, viceProvinceRows, delegationRows]) => {
      if (cancelled) return;
      setCommunities(communityRows);
      setProvinces([...provinceRows, ...viceProvinceRows, ...delegationRows].sort((a, b) => a.name.localeCompare(b.name)));
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!sectorFilter || sectorIndex) return;
    setSectorLoading(true);
    api.get('/org-units?type=Sector&limit=4000').then((rows) => {
      const idx = {};
      for (const inst of rows) {
        if (!inst.parent_id || !inst.institution_subtype) continue;
        if (!idx[inst.parent_id]) idx[inst.parent_id] = new Set();
        idx[inst.parent_id].add(inst.institution_subtype);
      }
      setSectorIndex(idx);
    }).finally(() => setSectorLoading(false));
  }, [sectorFilter, sectorIndex]);

  const countryOptions = useMemo(() => [...new Set(communities.map((c) => c.nation).filter(Boolean))].sort(), [communities]);
  const provincesRepresented = useMemo(() => new Set(communities.map((c) => c.parent_id).filter(Boolean)).size, [communities]);

  const filtered = useMemo(() => {
    return communities.filter((c) => {
      if (provinceFilter && String(c.parent_id) !== provinceFilter) return false;
      if (countryFilter && c.nation !== countryFilter) return false;
      if (sectorFilter && !(sectorIndex?.[c.id]?.has(sectorFilter))) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [communities, provinceFilter, countryFilter, sectorFilter, sectorIndex, search]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [provinceFilter, countryFilter, sectorFilter, search]);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <PublicBackdrop />
      <div className="relative z-10">
        <PublicHeader />

        <PageHero
          eyebrow="Registry"
          title="Community Directory"
          description="Every Community across the global Salesian registry — search by name or narrow down by Province, country and sector type."
          icon={UsersIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.communities}
          stats={!loading ? [
            { value: communities.length.toLocaleString(), label: 'Communities' },
            { value: provincesRepresented, label: 'Provinces' },
            { value: countryOptions.length, label: 'Countries' },
          ] : undefined}
        />

        <main className="w-full px-4 md:px-8 xl:px-12 py-12">
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by community name…"
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            </div>
            <select value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">All Provinces</option>
              {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">All Countries</option>
              {countryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">All Sector Types</option>
              {SECTOR_TAXONOMY.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {loading && <LoadingState label="Loading communities…" />}
          {sectorFilter && sectorLoading && <div className="mb-4 text-xs text-slate-500">Loading sector data…</div>}
          {!loading && filtered.length === 0 && (
            <EmptyState icon={UsersIcon} title="No communities match your filters" message="Try clearing the search or filters above." />
          )}
          {!loading && filtered.length > 0 && (
            <>
              <div className="mb-3 text-xs font-medium text-slate-500">{filtered.length} of {communities.length} communities{filtered.length > visible ? ` — showing first ${visible}` : ''}</div>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.slice(0, visible).map((c, idx) => (
                  <EntityCard
                    key={c.id}
                    to={`/communities/${c.id}`}
                    icon={UsersIcon}
                    gradient={accentFor(idx)}
                    title={c.name}
                    dense
                    meta={(
                      <span className="flex items-center gap-1"><MapPinIcon size={12} /> {c.city || '—'}{c.nation ? `, ${c.nation}` : ''}</span>
                    )}
                  />
                ))}
              </div>
              {filtered.length > visible && (
                <div className="mt-8 text-center">
                  <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-slate-50">
                    Show more
                  </button>
                </div>
              )}
            </>
          )}
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
