import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import DetailHero from '../../components/DetailHero.jsx';
import { SectionCard, accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { LockIcon, DownloadIcon, ImageIcon, FileTextIcon, ArchiveIcon, VideoIcon, HeadphonesIcon, BookOpenIcon, LayersIcon, ListIcon, CalendarIcon, GlobeIcon } from '../../components/icons.jsx';
import { labelsForIds, labelById } from '../../data/repositoryTaxonomy.js';
import { coverImageForAssetType } from '../../data/repositoryImages.js';

const ASSET_ICON = { Book: BookOpenIcon, Research: FileTextIcon, Photo: ImageIcon, Video: VideoIcon, Audio: HeadphonesIcon, 'Press Release': FileTextIcon, 'Official Publication': BookOpenIcon };

export default function AssetDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [asset, setAsset] = useState(null);
  const [related, setRelated] = useState([]);
  const [memberOf, setMemberOf] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    api.get(`/repository-assets/${id}`).then(async (a) => {
      if (cancelled) return;
      setAsset(a);
      // Public visitors must never see unpublished/private assets — enforced here in the UI even
      // though the mock API itself does not restrict single-asset lookups by status.
      if (a.status === 'Published') {
        const rows = await api.get(`/repository-assets?public=true&asset_type=${encodeURIComponent(a.asset_type)}`).catch(() => []);
        if (!cancelled) setRelated(rows.filter((r) => r.id !== a.id).slice(0, 4));
        const collections = await api.get(`/collections?asset_id=${a.id}&visibility=Public`).catch(() => []);
        if (!cancelled) setMemberOf(collections);
      }
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
          <main className="mx-auto max-w-4xl px-6 py-12"><LoadingState label="Loading resource…" /></main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  if (notFound || !asset) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-4xl px-6 py-12">
            <EmptyState icon={ArchiveIcon} title="Resource not found" message="This item may have been removed or is no longer available." />
            <div className="mt-6 text-center"><Link to="/repository-search" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Resources</Link></div>
          </main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  if (asset.status !== 'Published') {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-4xl px-6 py-12">
            <EmptyState icon={LockIcon} title="This resource is not publicly available" message="It has not yet been published to the public repository, or has been restricted." />
            <div className="mt-6 text-center"><Link to="/repository-search" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Resources</Link></div>
          </main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  const meta = asset.metadata || {};
  const bodyParagraphs = meta.description?.body || [];
  const contentsItems = (meta.description?.tableOfContents || '').split('\n').map((line) => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  const authors = labelsForIds('authors', asset.authorIds).join(', ') || meta.authorship?.creator;
  const publicationDate = meta.dateAndPlace?.publicationDate || meta.dateAndPlace?.creationDate;
  const cover = coverImageForAssetType(asset.asset_type);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <PublicBackdrop />
      <div className="relative z-10">
        <PublicHeader />

        <DetailHero
          backTo="/repository-search"
          backLabel="Resources"
          breadcrumb={asset.org_unit?.breadcrumb}
          icon={ASSET_ICON[asset.asset_type] || FileTextIcon}
          gradient={accentFor(0)}
          image={cover}
          title={asset.title}
          tag={asset.asset_type}
          subtitle={[authors, asset.org_unit?.name].filter(Boolean).join(' · ') || 'Unknown origin'}
        />

        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <article className="lg:col-span-2">
              <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img src={cover.url} alt={asset.coverImageAlt || asset.title} className="h-64 w-full object-cover sm:h-80" loading="eager" />
                <figcaption className="flex items-center justify-between gap-2 bg-slate-900 px-4 py-2 text-[11px] text-slate-400">
                  <span>{asset.coverImageAlt || asset.title}</span>
                  <a href={cover.sourceUrl} target="_blank" rel="noreferrer" className="flex-shrink-0 hover:text-slate-200">Photo: {cover.credit}</a>
                </figcaption>
              </figure>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                {authors && <span className="flex items-center gap-1"><span className="font-medium text-slate-700">{authors}</span></span>}
                {publicationDate && <span className="flex items-center gap-1"><CalendarIcon size={13} /> {publicationDate}</span>}
                {asset.org_unit?.name && <span className="flex items-center gap-1"><GlobeIcon size={13} /> {asset.org_unit.name}</span>}
              </div>

              {meta.description?.abstract && (
                <p className="mt-4 border-l-2 border-brand-300 pl-4 text-lg font-medium leading-relaxed text-slate-800">
                  {meta.description.abstract}
                </p>
              )}

              {bodyParagraphs.map((p, idx) => (
                <p key={idx} className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{p}</p>
              ))}

              {contentsItems.length > 0 && (
                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ListIcon size={15} className="text-brand-500" /> In this resource</div>
                  <ol className="mt-3 space-y-1.5">
                    {contentsItems.map((item, idx) => (
                      <li key={item} className="flex items-baseline gap-2 text-sm text-slate-600">
                        <span className="text-xs font-semibold text-brand-400">{String(idx + 1).padStart(2, '0')}</span> {item}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {(asset.tagIds || []).length > 0 && (
                <div className="mt-8 flex flex-wrap gap-1.5 border-t border-slate-200 pt-6">
                  {labelsForIds('tags', asset.tagIds, 'label').map((label) => (
                    <span key={label} className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{label}</span>
                  ))}
                </div>
              )}
            </article>

            <div className="space-y-6">
              <SectionCard title="Details" icon={FileTextIcon} gradient={accentFor(0)}>
                <dl className="mt-4 space-y-3 text-sm">
                  <div><dt className="text-xs text-slate-500">Authors</dt><dd className="mt-0.5 text-slate-700">{authors ||'—'}</dd></div>
                  <div><dt className="text-xs text-slate-500">Languages</dt><dd className="mt-0.5 text-slate-700">{labelsForIds('languages', asset.languageIds).join(',') ||'—'}</dd></div>
                  <div><dt className="text-xs text-slate-500">Document type</dt><dd className="mt-0.5 text-slate-700">{labelById('documentTypes', asset.documentTypeId) ||'—'}</dd></div>
                  <div><dt className="text-xs text-slate-500">Area of reference</dt><dd className="mt-0.5 text-slate-700">{labelsForIds('areas', asset.areaOfReferenceIds).join(',') ||'—'}</dd></div>
                  <div><dt className="text-xs text-slate-500">Publication date</dt><dd className="mt-0.5 text-slate-700">{publicationDate ||'—'}</dd></div>
                  {(asset.eraFrom || asset.eraTo) && <div><dt className="text-xs text-slate-500">Era</dt><dd className="mt-0.5 text-slate-700">{asset.eraFrom ??'?'}–{asset.eraTo ??'?'}</dd></div>}
                  {meta.rights?.license && <div><dt className="text-xs text-slate-500">License</dt><dd className="mt-0.5 text-slate-700">{meta.rights.license}</dd></div>}
                </dl>
              </SectionCard>

              <SectionCard title="Downloads" icon={DownloadIcon} gradient={accentFor(2)}>
                <button disabled className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500">
                  <DownloadIcon size={15} /> Download
                </button>
                <p className="mt-2 text-xs text-slate-400">Downloads are disabled in this demo build.</p>
              </SectionCard>

              {memberOf.length > 0 && (
                <SectionCard title="Part of Collection" icon={LayersIcon} gradient={accentFor(4)}>
                  <div className="mt-3 flex flex-col gap-2">
                    {memberOf.map((c) => (
                      <Link key={c.id} to={`/repository/collections/${c.id}`} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50">
                        <LayersIcon size={13} className="flex-shrink-0 text-brand-500" /> {c.title} · position {c.members.find((m) => m.asset.id === asset.id)?.position} of {c.members.length}
                      </Link>
                    ))}
                  </div>
                </SectionCard>
              )}
            </div>
          </div>

          <div className="mt-10">
            <SectionCard title="More Resources Like This" icon={ArchiveIcon} gradient={accentFor(3)}>
              {related.length === 0 ? (
                <div className="mt-3 text-sm text-slate-500">No other published resources of this type yet.</div>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => {
                    const rCover = coverImageForAssetType(r.asset_type);
                    return (
                      <Link key={r.id} to={`/assets/${r.id}`} className="group overflow-hidden rounded-xl border border-slate-200 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                        <div className="h-28 overflow-hidden">
                          <img src={rCover.url} alt="" className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-3">
                          <div className="text-[11px] font-medium text-brand-500">{r.asset_type}</div>
                          <div className="mt-1 text-sm font-semibold text-slate-800 group-hover:text-brand-700">{r.title}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </SectionCard>
          </div>
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
