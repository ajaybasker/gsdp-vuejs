import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import PublicBackdrop from '../../components/PublicBackdrop.jsx';
import DetailHero from '../../components/DetailHero.jsx';
import { SectionCard, accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { UsersIcon, BuildingIcon, CalendarIcon, AwardIcon } from '../../components/icons.jsx';
import { PUBLIC_HERO_IMAGES } from '../../data/repositoryImages.js';

export default function CommunityDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [community, setCommunity] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    Promise.all([
      api.get(`/org-units/${id}`),
      api.get(`/users?org_unit_id=${id}`),
      api.get(`/org-units/${id}/children?type=Sector`),
      api.get(`/events?org_unit_id=${id}`),
    ]).then(([unit, users, kids, evts]) => {
      if (cancelled) return;
      setCommunity(unit);
      setLeaders(users);
      setInstitutions(kids);
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
          <main className="mx-auto max-w-5xl px-6 py-12"><LoadingState label="Loading community…" /></main>
          <PublicFooter />
        </div>
      </div>
    );
  }

  if (notFound || !community) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <PublicBackdrop />
        <div className="relative z-10">
          <PublicHeader />
          <main className="mx-auto max-w-5xl px-6 py-12">
            <EmptyState icon={UsersIcon} title="Community not found" message="This community may have been renamed or removed." />
            <div className="mt-6 text-center"><Link to="/communities" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Community Directory</Link></div>
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
          backTo="/communities"
          backLabel="Community Directory"
          breadcrumb={community.breadcrumb}
          icon={UsersIcon}
          gradient={accentFor(0)}
          image={PUBLIC_HERO_IMAGES.communities}
          title={community.name}
          subtitle={community.city ? `${community.city}${community.nation ? `, ${community.nation}` : ''}` : community.nation || undefined}
          stats={[
            { value: institutions.length, label: 'Sectors' },
            { value: leaders.length, label: 'Leaders' },
            { value: events.length, label: 'Events logged' },
          ]}
        />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="space-y-6">
            <SectionCard title="Overview" icon={BuildingIcon} gradient={accentFor(0)}>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div><dt className="text-xs text-slate-500">Province</dt><dd className="mt-1 text-sm text-slate-700">{community.province?.name ||'—'}</dd></div>
                <div><dt className="text-xs text-slate-500">Country</dt><dd className="mt-1 text-sm text-slate-700">{community.nation ||'—'}</dd></div>
                <div><dt className="text-xs text-slate-500">Sectors</dt><dd className="mt-1 text-sm text-slate-700">{institutions.length}</dd></div>
              </dl>
            </SectionCard>

            <SectionCard title="Leadership" icon={AwardIcon} gradient={accentFor(1)}>
              {leaders.length === 0 ? (
                <div className="mt-3 text-sm text-slate-500">No leadership records are published for this community.</div>
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

            <SectionCard title={`Sectors (${institutions.length})`} icon={BuildingIcon} gradient={accentFor(2)}>
              {institutions.length === 0 ? (
                <EmptyState icon={BuildingIcon} title="No sectors on record" />
              ) : (
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {institutions.map((inst, idx) => (
                    <Link key={inst.id} to={`/sectors/${inst.id}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50">
                      <span>{inst.name}</span>
                      {inst.institution_subtype && <span className={`rounded-full bg-gradient-to-r ${accentFor(idx)} px-2 py-0.5 text-xs font-medium text-white`}>{inst.institution_subtype}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Events" icon={CalendarIcon} gradient={accentFor(3)}>
              {events.length === 0 ? (
                <div className="mt-3 text-sm text-slate-500">No events have been logged for this community yet.</div>
              ) : (
                <div className="mt-4 space-y-3">
                  {events.map((e) => (
                    <div key={e.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{e.activity_name}</div>
                        <div className="text-xs text-slate-400">{e.execution_date}</div>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{e.venue}{e.participant_count ? ` · ${e.participant_count} participants` : ''}</div>
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
