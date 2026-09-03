import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import PageHero, { SectionCard, accentFor, softFor } from '../../components/PageHero.jsx';
import { LoadingState } from '../../components/PublicState.jsx';
import AnimatedCounter from '../../components/AnimatedCounter.jsx';
import WorldReachMap from '../../components/WorldReachMap.jsx';
import { GlobeIcon, BuildingIcon, UsersIcon, ArchiveIcon, MapPinIcon, TrendingUpIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

export default function GlobalStatistics() {
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

  const heroTitle = loading
    ? 'The Salesian family, in numbers'
    : `${(counts.Sector || 0).toLocaleString()}+ Sectors, globally`;

  const heroStats = !loading ? [
    { value: countryCount, label: 'Countries' },
    { value: counts.Community || 0, label: 'Communities' },
    { value: assetCount, label: 'Published resources' },
  ] : undefined;

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

  return (
    <div className="relative min-h-screen bg-slate-50">
      <PublicBackdrop />
      <div className="relative z-10">
        <PublicHeader />

        <PageHero
          eyebrow="Global Statistics"
          title={heroTitle}
          description="A live snapshot of the registry and repository — every Region, Province, Community and Sector rolled up into one global picture, drawn from the current demo dataset."
          icon={TrendingUpIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.statistics}
          stats={heroStats}
        />

        <main className="w-full px-4 md:px-8 xl:px-12 py-12">
          {loading && <LoadingState label="Loading statistics…" />}

          {!loading && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {primaryTiles.map((t, idx) => {
                  const TileIcon = t.icon;
                  return (
                    <div key={t.label} className={`rounded-2xl border ${softFor(accentFor(idx))} p-6 shadow-sm shadow-slate-900/[0.03] sm:col-span-2`}>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accentFor(idx)} text-white shadow-md shadow-slate-900/10`}>
                        <TileIcon size={20} />
                      </div>
                      <div className="mt-4 text-xs font-medium text-slate-500">{t.label}</div>
                      <div className="mt-1 text-4xl font-bold text-slate-900 sm:text-5xl"><AnimatedCounter value={t.value} /></div>
                    </div>
                  );
                })}
                {secondaryTiles.map((t, idx) => {
                  const TileIcon = t.icon;
                  return (
                    <div key={t.label} className={`rounded-2xl border ${softFor(accentFor(idx + 2))} p-5 shadow-sm shadow-slate-900/[0.02]`}>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${accentFor(idx + 2)} text-white shadow`}>
                        <TileIcon size={16} />
                      </div>
                      <div className="mt-3 text-xs font-medium text-slate-500">{t.label}</div>
                      <div className="mt-1 text-3xl font-bold text-slate-900"><AnimatedCounter value={t.value} /></div>
                    </div>
                  );
                })}
              </div>

              {sectorChart.length > 0 && (
                <SectionCard title="Sectors by Sector Type" icon={ArchiveIcon} gradient={accentFor(1)} className="mt-8">
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">How the Salesian family's Sectors are distributed across ministry sector types, globally.</p>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectorChart} margin={{ top: 4, right: 12, left: -12, bottom: 4 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" height={60} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#e2e8f0' }} />
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </SectionCard>
              )}

              {mapPoints.length > 0 && (
                <SectionCard title="Global Reach" icon={GlobeIcon} gradient={accentFor(2)} className="mt-8">
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">Every mapped Community and Sector location contributing to the registry, globally.</p>
                  <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4 shadow-sm">
                    <WorldReachMap points={mapPoints} />
                  </div>
                </SectionCard>
              )}
            </>
          )}
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
