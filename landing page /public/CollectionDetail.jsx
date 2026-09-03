import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';
import { MOCK_COLLECTIONS } from '../../data/collectionsData.js';

// Reusing Icons from CollectionCard
const Icons = {
  Library: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" /></svg>
  ),
  FileText: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
  ),
  Search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  Filter: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
  )
};

export default function CollectionDetail() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = MOCK_COLLECTIONS.find(c => c.id === id);
    if (found) setCollection(found);
  }, [id]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Collection Not Found</h2>
            <Link to="/" className="mt-4 inline-block text-brand-600 hover:underline">Return to Home</Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  // Robust Filter & Search logic
  const filteredRecords = collection.realRecords.filter(r => {
    // 1. Check Search Query
    const searchMatch = !searchQuery || Object.values(r).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Check Active Filter
    const filterMatch = activeFilter === 'All' || Object.values(r).some(val =>
      String(val).toLowerCase().includes(activeFilter.toLowerCase())
    );

    return searchMatch && filterMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <PublicHeader />
      
      {/* HERO HEADER */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0">
          <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-transparent" />
        </div>
        
        <div className="relative w-full px-4 md:px-8 xl:px-12 max-w-[1400px] mx-auto z-10">
          <Link to="/#collections" className="inline-flex items-center gap-2 text-brand-300 hover:text-white font-bold text-sm mb-8 transition-colors group bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm w-fit border border-white/10">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Collections
          </Link>
          <br/>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-800/80 backdrop-blur-md border border-brand-700 mb-6 text-xs font-bold uppercase tracking-wider text-brand-200">
            <Icons.Library className="w-4 h-4" /> {collection.category}
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight mb-6 max-w-4xl">
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {collection.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-brand-400">Organization:</span> <span className="text-white">{collection.organization}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">Sectors:</span> <span className="text-white">{collection.sectors.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">Total Resources:</span> <span className="text-white">{collection.realRecords.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 w-full px-4 md:px-8 xl:px-12 py-12 max-w-[1400px] mx-auto">
        
        {collection.id === 'c5' ? (
          /* CUSTOM LAYOUT: SALESIAN FAMILY RESOURCES */
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sidebar: 32 Recognised Groups */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-brand-950 mb-6 border-b border-slate-100 pb-4">32 Recognised Groups</h3>
                
                <div className="relative border-l-2 border-brand-100 ml-3 space-y-6">
                  {/* Tree nodes */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[1.5px] top-2 w-4 border-t-2 border-brand-100" />
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white shadow-sm" />
                    <span className="text-sm font-bold text-brand-900 block">Salesians of Don Bosco</span>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute -left-[1.5px] top-2 w-4 border-t-2 border-brand-100" />
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white shadow-sm" />
                    <span className="text-sm font-bold text-brand-900 block">Daughters of Mary Help of Christians</span>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute -left-[1.5px] top-2 w-4 border-t-2 border-brand-100" />
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white shadow-sm" />
                    <span className="text-sm font-bold text-brand-900 block">Salesian Cooperators</span>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[1.5px] top-2 w-4 border-t-2 border-brand-100" />
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white shadow-sm" />
                    <span className="text-sm font-bold text-brand-900 block">Association of Mary Help of Christians</span>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[1.5px] top-2 w-4 border-t-2 border-brand-100" />
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white shadow-sm" />
                    <span className="text-sm font-medium text-slate-500 block italic">Other Salesian Family Groups...</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-2">
                  <div className="px-4 py-2 rounded-lg bg-brand-50 text-sm font-bold text-brand-700 cursor-pointer hover:bg-brand-100 transition">Charismatic Identity</div>
                  <div className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Mission</div>
                  <div className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Spirituality</div>
                  <div className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Formation</div>
                  <div className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Animation</div>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:w-2/3 flex flex-col gap-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-brand-950">Resources</h2>
                
                <div className="flex items-center justify-end flex-1 flex-wrap gap-4">
                  <div className="relative w-full max-w-xs">
                    <Icons.Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm"
                    />
                  </div>
                  
                  <div className="flex flex-wrap justify-end gap-2">
                    {collection.filters.map(filter => (
                      <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${activeFilter === filter ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resource Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-6 py-4 w-12 text-center">#</th>
                        <th className="px-6 py-4">Resource Title</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRecords.map((r, i) => (
                        <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                          <td className="px-6 py-4 text-center text-slate-400 font-medium">{i + 1}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-brand-950 group-hover:text-brand-600 transition-colors whitespace-normal max-w-[400px]">
                              {r.title}
                            </div>
                            {r.author && <div className="text-xs text-slate-500 mt-0.5">{r.author}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-bold">
                              {r.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-600">
                            {r.year || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD LAYOUT */
          <div className="flex flex-col gap-10">
            {/* Utility Bar (Filters & Search) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-wrap gap-2 p-2">
                <div className="flex items-center gap-2 px-3 text-slate-400 border-r border-slate-200 mr-2">
                  <Icons.Filter className="w-4 h-4" />
                </div>
                {collection.filters.map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeFilter === filter ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64 px-4 pb-4 md:pb-0 md:pr-4">
                <Icons.Search className="w-4 h-4 absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 md:top-auto md:-translate-y-0 md:mt-2.5" />
                <input 
                  type="text" 
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Tags Cloud Removed */}

            {/* Resource Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-6 py-5 w-12 text-center">#</th>
                      <th className="px-6 py-5">Resource Title</th>
                      <th className="px-6 py-5">Type</th>
                      <th className="px-6 py-5">Author / Institution</th>
                      <th className="px-6 py-5">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                          No resources match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((r, i) => (
                        <tr key={r.id} className="hover:bg-brand-50/50 transition-colors group cursor-pointer">
                          <td className="px-6 py-5 text-center text-slate-400 font-medium">{r.id}</td>
                          <td className="px-6 py-5">
                            <div className="font-bold text-brand-950 group-hover:text-brand-700 transition-colors whitespace-normal max-w-[500px] leading-snug">
                              {r.title}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                              {r.type}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-medium text-slate-700">
                            {r.author || '—'}
                          </td>
                          <td className="px-6 py-5 font-medium text-slate-500">
                            {r.year || '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}
      </section>

      <PublicFooter />
    </div>
  );
}
