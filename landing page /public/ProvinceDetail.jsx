import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import DetailHero from '../../components/DetailHero.jsx';
import { SectionCard, accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { BuildingIcon, UsersIcon, CalendarIcon, AwardIcon, MapPinIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

export default function ProvinceDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [province, setProvince] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    Promise.all([
      api.get(`/org-units/${id}`),
      api.get(`/users?org_unit_id=${id}`),
      api.get(`/org-units/${id}/children?type=Community`),
      api.get(`/events?province_id=${id}`),
    ]).then(([unit, users, kids, evts]) => {
      if (cancelled) return;
      setProvince(unit);
      setLeaders(users);
      setCommunities(kids);
      setEvents(evts);
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
          <main className="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading province…" /></main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  if (notFound || !province) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-5xl px-6 py-12">
            <EmptyState icon={BuildingIcon} title="Province not found" message="This province may have been renamed or removed." />
            <div className="mt-6 text-center"><Link to="/provinces" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Province Directory</Link></div>
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
          backTo="/provinces"
          backLabel="Province Directory"
          breadcrumb={province.breadcrumb}
          icon={BuildingIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.provinces}
          title={province.name}
          tag={province.type}
          stats={[
            { value: communities.length, label: 'Communities' },
            { value: leaders.length, label: 'Leaders' },
            { value: events.length, label: 'Events logged' },
          ]}
        />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="space-y-6">
            <SectionCard title="Profile" icon={BuildingIcon} gradient={accentFor(0)}>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div><dt className="text-xs text-slate-500">Type</dt><dd className="mt-1 text-sm text-slate-700">{province.type}</dd></div>
                <div><dt className="text-xs text-slate-500">Region</dt><dd className="mt-1 text-sm text-slate-700">{province.breadcrumb?.find((b) => b.type ==='Region')?.name ||'—'}</dd></div>
                <div><dt className="text-xs text-slate-500">Communities</dt><dd className="mt-1 text-sm text-slate-700">{communities.length}</dd></div>
              </dl>
            </SectionCard>

            <SectionCard title="Leadership" icon={AwardIcon} gradient={accentFor(1)}>
              {leaders.length === 0 ? (
                <div className="mt-3 text-sm text-slate-500">No leadership records are published for this province.</div>
              ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {leaders.map((u, idx) => (
                    <div key={u.id} className="rounded-xl border border-slate-200 p-3.5">
                      <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${accentFor(idx)} text-xs font-bold text-white`}>{u.person_name?.[0] || '?'}</div>
                      <div className="text-sm font-semibold text-slate-900">{u.person_name}</div>
                      <div className="text-xs text-slate-500">{u.role.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title={`Communities (${communities.length})`} icon={UsersIcon} gradient={accentFor(2)}>
              {communities.length === 0 ? (
                <EmptyState icon={UsersIcon} title="No communities on record" />
              ) : (
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {communities.map((c) => (
                    <Link key={c.id} to={`/communities/${c.id}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50">
                      <span>{c.name}</span>
                      {c.city && <span className="flex items-center gap-1 text-xs text-slate-400"><MapPinIcon size={12} /> {c.city}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Recent Events" icon={CalendarIcon} gradient={accentFor(3)}>
              {events.length === 0 ? (
                <div className="mt-3 text-sm text-slate-500">No events have been logged for this province yet.</div>
              ) : (
                <div className="mt-4 space-y-3">
                  {events.map((e) => (
                    <div key={e.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{e.activity_name}</div>
                        <div className="text-xs text-slate-400">{e.execution_date}</div>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{e.venue} · {e.org_unit_name}</div>
                    </div>
                  ))}
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
