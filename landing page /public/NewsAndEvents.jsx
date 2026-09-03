import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import { accentFor } from '../../components/PageHero.jsx';
import { LoadingState, EmptyState } from '../../components/PublicState.jsx';
import { CalendarIcon, MapPinIcon, UsersIcon, BuildingIcon, SearchIcon } from '../../components/icons.jsx';
import { useInView } from '../../hooks/useInView.js';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}


const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d}-${m}-${y.slice(-2)}`;
  }
  return dateStr;
};

const inferEventType = (name) => {
  const n = (name || '').toLowerCase();
  if (n.includes('camp')) return 'Camp';
  if (n.includes('congress')) return 'Congress';
  if (n.includes('drive')) return 'Drive';
  if (n.includes('exhibition')) return 'Exhibition';
  if (n.includes('fair')) return 'Fair';
  if (n.includes('meet')) return 'Meet';
  if (n.includes('retreat')) return 'Retreat';
  if (n.includes('seminar') || n.includes('session')) return 'Seminar / Session';
  if (n.includes('symposium')) return 'Symposium';
  if (n.includes('training')) return 'Training';
  if (n.includes('celebration') || n.includes('feast')) return 'Celebration';
  return 'General Event';
};

export default function NewsAndEvents() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get('/events').then((rows) => {
      if (!cancelled) {
        setEvents(rows.map(r => ({
          ...r,
          activity_type: r.activity_type || inferEventType(r.activity_name)
        })));
      }
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const stats = useMemo(() => {
    if (loading) return undefined;
    const units = new Set(events.map((e) => e.org_unit_name).filter(Boolean)).size;
    const participants = events.reduce((sum, e) => sum + (Number(e.participant_count) || 0), 0);
    return [
      { value: events.length, label: 'Events logged' },
      { value: units, label: 'Reporting units' },
      { value: participants.toLocaleString(), label: 'Participants reached' },
    ];
  }, [loading, events]);

  const eventTypes = useMemo(() => {
    return [...new Set(events.map(e => e.activity_type).filter(Boolean))].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (search && !e.activity_name?.toLowerCase().includes(search.toLowerCase()) && !e.org_unit_name?.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter && e.activity_type !== typeFilter) return false;
      if (dateFilter && e.execution_date !== dateFilter) return false;
      return true;
    });
  }, [events, search, typeFilter, dateFilter]);

  const hasFilter = Boolean(search || typeFilter || dateFilter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <PublicHeader />

      {/* Full-width page header */}
      <div className="w-full bg-brand-950 text-white">
        <div className="w-full px-4 md:px-8 xl:px-12 py-10">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-2">Latest Updates</p>
              <h1 className="text-[28px] font-extrabold mb-2">Events</h1>
              <p className="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
                Activities, formation sessions, and congresses logged across Communities and Provinces — most recent first.
              </p>
            </div>
            {stats && (
              <div className="flex flex-wrap gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                    <div className="text-2xl font-extrabold">{s.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 md:px-8 xl:px-12 py-12">
        
        {/* Filters */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative flex-1 min-w-[220px]">
              <SearchIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events or locations…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-[14px] text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none">
              <option value="">All Event Types</option>
              {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
            
            {hasFilter && (
              <button onClick={() => { setSearch(''); setTypeFilter(''); setDateFilter(''); }}
                className="rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-semibold text-slate-500 hover:bg-slate-50 transition">
                Clear
              </button>
            )}
          </div>
        </Reveal>

        {loading && <LoadingState label="Loading events…" />}
        {!loading && hasFilter && filteredEvents.length === 0 && (
          <EmptyState icon={CalendarIcon} title="No events match your filters" message="Try a different search term or clear the filters." />
        )}

        {!loading && filteredEvents.length > 0 && (
          <>
            {hasFilter && (
              <Reveal>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-700">
                    {filteredEvents.length} match{filteredEvents.length === 1 ? '' : 'es'}
                  </span>
                </div>
              </Reveal>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((e, idx) => (
              <Reveal key={e.id} delay={idx * 40}>
                <div className="group flex flex-col h-full rounded-[20px] border border-slate-200 bg-white shadow-md shadow-brand-900/5 overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 hover:-translate-y-1.5 transition-all duration-500">
                  <div className={`h-2 w-full bg-gradient-to-r ${accentFor(idx)}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-block px-2.5 py-1 bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 shadow-sm border border-brand-100/50">
                          {e.activity_type}
                        </span>
                        <h3 className="text-lg font-extrabold text-brand-950 leading-snug flex-1 group-hover:text-brand-700 transition-colors">{e.activity_name}</h3>
                      </div>
                      <div className="text-[11px] font-extrabold text-brand-700 bg-brand-50 border border-brand-100 shadow-sm px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0">{formatDate(e.execution_date)}</div>
                    </div>
                    
                    {e.org_unit_name && (
                      <div className="text-[13px] text-slate-600 font-bold mb-4 flex items-center gap-2">
                        <BuildingIcon size={15} className="text-brand-500" />
                        {e.org_unit_name}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 text-[12px] font-bold text-slate-500 mb-5">
                      {e.venue && (
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-sm">
                          <MapPinIcon size={13} className="text-slate-400" /> {e.venue}
                        </span>
                      )}
                      {e.participant_count != null && (
                        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-lg px-2.5 py-1 shadow-sm">
                          <UsersIcon size={13} /> {e.participant_count} participants
                        </span>
                      )}
                    </div>
                    
                    {e.activity_report && (
                      <p className="mt-auto bg-slate-50/80 rounded-xl p-4 text-[15px] font-medium leading-relaxed text-slate-700 border border-slate-100 line-clamp-3">
                        {e.activity_report}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </>
        )}
      </main>
      <PublicFooter />
    </div>
  );
}
