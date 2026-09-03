import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import DetailHero from '../../components/DetailHero.jsx';
import { SectionCard, accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { BuildingIcon, UsersIcon, ImageIcon, FileTextIcon, BookOpenIcon, ClockIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

const ASSET_ICON = { Book: BookOpenIcon, Research: FileTextIcon, Photo: ImageIcon, Video: ImageIcon, Audio: ImageIcon, 'Press Release': FileTextIcon, 'Official Publication': BookOpenIcon };

export default function InstitutionDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [institution, setInstitution] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    api.get(`/org-units/${id}`).then(async (unit) => {
      if (cancelled) return;
      setInstitution(unit);
      const community = unit.breadcrumb?.find((b) => b.type === 'Community');
      const [baselines, assetRows] = await Promise.all([
        community ? api.get(`/baselines?community_id=${community.id}`).catch(() => []) : Promise.resolve([]),
        api.get(`/repository-assets?org_unit_id=${id}&public=true`).catch(() => []),
      ]);
      if (cancelled) return;
      setBaseline(baselines[0] || null);
      setAssets(assetRows);
    }).catch(() => { if (!cancelled) setNotFound(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading sector…" /></main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  if (notFound || !institution) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-5xl px-6 py-12">
            <EmptyState icon={BuildingIcon} title="Sector not found" message="This sector may have been renamed or removed." />
            <div className="mt-6 text-center"><Link to="/sectors" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Sector Directory</Link></div>
          </main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50">
      <PublicBackdrop />
      <div className="relative z-10">
        <PublicHeader />

        <DetailHero
          backTo="/sectors"
          backLabel="Sector Directory"
          breadcrumb={institution.breadcrumb}
          icon={BuildingIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.sectors}
          title={institution.name}
          tag={institution.institution_subtype}
          subtitle={institution.city ? `${institution.city}${institution.nation ? `, ${institution.nation}` : ''}` : institution.nation || undefined}
          stats={[
            { value: assets.length, label: 'Gallery items' },
            ...(baseline?.beneficiaries?.reach ? [{ value: Number(baseline.beneficiaries.reach).toLocaleString(), label: 'Beneficiaries reached' }] : []),
          ]}
        />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="space-y-6">
            <SectionCard title="Overview" icon={BuildingIcon} gradient={accentFor(0)}>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div><dt className="text-xs text-slate-500">Sector Type</dt><dd className="mt-1 text-sm text-slate-700">{institution.institution_subtype ||'—'}</dd></div>
                <div><dt className="text-xs text-slate-500">Community</dt><dd className="mt-1 text-sm text-slate-700">{institution.breadcrumb?.find((b) => b.type ==='Community')?.name ||'—'}</dd></div>
                <div><dt className="text-xs text-slate-500">Province</dt><dd className="mt-1 text-sm text-slate-700">{institution.province?.name ||'—'}</dd></div>
              </dl>
            </SectionCard>

            <SectionCard title="Programs" icon={ClockIcon} gradient={accentFor(1)}>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3.5">
                <ClockIcon size={16} className="mt-0.5 flex-shrink-0 text-slate-400" />
                <p className="text-sm leading-relaxed text-slate-500">
                  <span className="font-medium text-slate-600">Coming soon.</span> Program details are maintained by the Community and Province and published here once available.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Beneficiaries" icon={UsersIcon} gradient={accentFor(2)}>
              {baseline?.beneficiaries?.reach ? (
                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-slate-900">{Number(baseline.beneficiaries.reach).toLocaleString()}</div>
                  <div className="text-sm text-slate-500">young people reached ({baseline.beneficiaries.frequency || 'community-reported'})</div>
                </div>
              ) : (
                <div className="mt-3 text-sm text-slate-500">No beneficiary figures have been published for this sector's community yet.</div>
              )}
            </SectionCard>

            <SectionCard title="Gallery" icon={ImageIcon} gradient={accentFor(3)}>
              {assets.length === 0 ? (
                <EmptyState icon={ImageIcon} title="No public repository resources yet" message="Published photos, videos and documents for this sector will appear here." />
              ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {assets.map((a, idx) => {
                    const AssetIcon = ASSET_ICON[a.asset_type] || FileTextIcon;
                    return (
                      <Link key={a.id} to={`/assets/${a.id}`} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50">
                        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentFor(idx)} text-white`}>
                          <AssetIcon size={15} />
                        </span>
                        <span>{a.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Reports" icon={ClockIcon} gradient={accentFor(4)}>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3.5">
                <ClockIcon size={16} className="mt-0.5 flex-shrink-0 text-slate-400" />
                <p className="text-sm leading-relaxed text-slate-500">
                  <span className="font-medium text-slate-600">Not published here.</span> Institutional reports are internal documents reviewed within the Salesian family and are not published on the public portal.
                </p>
              </div>
            </SectionCard>
          </div>
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
