import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import PageHero, { accentFor } from '../../components/PageHero.jsx';
import EntityCard from '../../components/EntityCard.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { BuildingIcon, MapPinIcon, SearchIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

const PROVINCE_TYPES = ['Province', 'ViceProvince', 'Delegation'];

export default function ProvinceDirectory() {
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);
  const [communityCounts, setCommunityCounts] = useState({});
  const [countryByProvince, setCountryByProvince] = useState({});
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      ...PROVINCE_TYPES.map((type) => api.get(`/org-units?type=${type}&limit=300`)),
      api.get('/org-units?type=Region&limit=50'),
      api.get('/org-units?type=Community&limit=3000'),
    ]).then(([provinceRows, viceProvinceRows, delegationRows, regionRows, communityRows]) => {
      if (cancelled) return;
      const allProvinces = [...provinceRows, ...viceProvinceRows, ...delegationRows].sort((a, b) => a.name.localeCompare(b.name));
      const counts = {};
      const countries = {};
      for (const c of communityRows) {
        if (!c.parent_id) continue;
        counts[c.parent_id] = (counts[c.parent_id] || 0) + 1;
        if (c.nation && !countries[c.parent_id]) countries[c.parent_id] = c.nation;
      }
      setProvinces(allProvinces);
      setRegions(regionRows);
      setCommunityCounts(counts);
      setCountryByProvince(countries);
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const countryOptions = useMemo(() => [...new Set(Object.values(countryByProvince))].sort(), [countryByProvince]);

  const filtered = useMemo(() => {
    return provinces.filter((p) => {
      if (regionFilter && String(p.parent_id) !== regionFilter) return false;
      if (countryFilter && countryByProvince[p.id] !== countryFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [provinces, regionFilter, countryFilter, search, countryByProvince]);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <PublicBackdrop />
      <div className="relative z-10">
        <PublicHeader />

        <PageHero
          eyebrow="Registry"
          title="Province Directory"
          description="Every Province, Vice-Province and Delegation in the global registry — search by name or filter by Region and country."
          icon={BuildingIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.provinces}
          stats={!loading ? [
            { value: provinces.length, label: 'Total' },
            { value: regions.length, label: 'Regions' },
            { value: countryOptions.length, label: 'Countries' },
          ] : undefined}
        />

        <main className="w-full px-4 md:px-8 xl:px-12 py-12">
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by province name…"
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            </div>
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">All Regions</option>
              {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">All Countries</option>
              {countryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {loading && <LoadingState label="Loading provinces…" />}
          {!loading && filtered.length === 0 && (
            <EmptyState icon={BuildingIcon} title="No provinces match your filters" message="Try clearing the search or filters above." />
          )}
          {!loading && filtered.length > 0 && (
            <>
              <div className="mb-4 text-xs font-medium text-slate-500">{filtered.length} of {provinces.length} provinces</div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((p, idx) => (
                  <EntityCard
                    key={p.id}
                    to={`/provinces/${p.id}`}
                    icon={BuildingIcon}
                    gradient={accentFor(idx)}
                    title={p.name}
                    subtitle={p.type}
                    meta={(
                      <>
                        <span>{communityCounts[p.id] || 0} Communit{(communityCounts[p.id] || 0) === 1 ? 'y' : 'ies'}</span>
                        {countryByProvince[p.id] && (
                          <span className="flex items-center gap-1"><MapPinIcon size={12} /> {countryByProvince[p.id]}</span>
                        )}
                      </>
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
