import React, { useMemo, useState } from 'react';
import { ExternalLink, Search, Wrench } from 'lucide-react';
import data from '../data/amcData.json';

const sources = ['All', ...data.sources.map(source => source.name)];
const control = 'rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2.5 text-sm text-[var(--app-text-primary)]';

export default function AMCPage() {
  const [source, setSource] = useState('All');
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => data.records.filter(record => {
    const matchesSearch = [record.name, record.consumerNo, record.phone, record.section].join(' ').toLowerCase().includes(query.trim().toLowerCase());
    return (source === 'All' || record.source === source) && matchesSearch &&
      (dateFilter === 'all' || (dateFilter === 'recorded' ? Boolean(record.lastAmc) : !record.lastAmc));
  }), [source, query, dateFilter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 50));
  const recorded = data.records.filter(record => record.lastAmc).length;
  const update = (setter, value) => { setter(value); setPage(1); };

  return (
    <section className="space-y-5" aria-label="AMC management">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2"><Wrench className="w-6 h-6 text-[var(--app-accent)]" /><h2 className="text-2xl font-bold">AMC</h2></div>
          <p className="mt-1 text-sm text-[var(--app-text-secondary)]">Annual maintenance records across your solar projects.</p>
        </div>
        <a href={data.sourceUrl} target="_blank" rel="noreferrer" className={`${control} inline-flex items-center gap-2`}><ExternalLink size={16} />Open Google Sheet</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[['Total records', data.records.length], ['Last AMC recorded', recorded], ['Last AMC missing', data.records.length - recorded]].map(([label, count]) => (
          <div key={label} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5">
            <p className="text-xs text-[var(--app-text-secondary)]">{label}</p><p className="mt-2 text-3xl font-bold">{count.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] overflow-hidden">
        <div className="p-4 border-b border-[var(--app-border)] space-y-4">
          <div className="flex flex-wrap gap-2" aria-label="Source filters">
            {sources.map(name => <button key={name} onClick={() => update(setSource, name)} aria-pressed={source === name}
              className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer ${source === name ? 'bg-[var(--app-accent)] text-white' : 'bg-[var(--app-surface-subtle)] text-[var(--app-text-secondary)]'}`}>
              {name}<span className="ml-2 text-xs opacity-75">{(name === 'All' ? data.records : data.records.filter(r => r.source === name)).length.toLocaleString('en-IN')}</span>
            </button>)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-[var(--app-text-muted)]" />
              <input aria-label="Search AMC customers" placeholder="Search name, consumer number, phone or section" value={query} onChange={e => update(setQuery, e.target.value)} className={`${control} w-full pl-10`} />
            </label>
            <select aria-label="Filter by Last AMC" value={dateFilter} onChange={e => update(setDateFilter, e.target.value)} className={control}>
              <option value="all">All AMC records</option><option value="recorded">Last AMC recorded</option><option value="missing">Last AMC missing</option>
            </select>
          </div>
          <p className="text-xs text-[var(--app-text-muted)]">Full customer lists matched to {data.sources.map(source => source.sheet).join(', ')}. Imported {new Date(data.importedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST. Includes never-visited customers. Last AMC and counts use visit history, with full-sheet history as fallback. Missing consumer numbers remain separate for review.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--app-surface-subtle)] text-xs text-[var(--app-text-secondary)]"><tr>
              {['Customer / Consumer no.', 'Source', 'Phone', 'Capacity', 'Section', 'No. of AMC', 'Last AMC', 'Sheet status', 'Source row'].map(label => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}
            </tr></thead>
            <tbody>{filtered.slice((page - 1) * 50, page * 50).map(record => <tr key={record.id} className="border-t border-[var(--app-border)] hover:bg-[var(--app-surface-hover)]">
              <td className="px-4 py-3"><div className="font-semibold whitespace-normal min-w-48 max-w-72">{record.name || 'Name not recorded'}</div><div className="text-xs mt-1 text-[var(--app-text-muted)]">{record.consumerNo || 'No consumer number'}</div></td>
              <td className="px-4 py-3">{record.source}</td><td className="px-4 py-3">{record.phone || '—'}</td><td className="px-4 py-3">{record.capacity || '—'}</td><td className="px-4 py-3">{record.section || '—'}</td><td className="px-4 py-3">{record.amcCount || '—'}</td>
              <td className={`px-4 py-3 font-semibold ${record.lastAmc ? 'text-[var(--app-accent-text)]' : 'text-[var(--app-text-muted)]'}`}>{record.lastAmc || 'Not recorded'}</td>
              <td className="px-4 py-3">{record.status || '—'}</td><td className="px-4 py-3"><a aria-label={`Open source row for ${record.name}`} href={`${data.sourceUrl}#gid=${record.gid}&range=A${record.row}`} target="_blank" rel="noreferrer" className="text-[var(--app-accent-text)] underline">View row</a></td>
            </tr>)}</tbody>
          </table>
          {!filtered.length && <div className="p-12 text-center text-[var(--app-text-secondary)]">No AMC records match your filters.</div>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-[var(--app-border)] text-xs text-[var(--app-text-secondary)]">
          <span>{filtered.length.toLocaleString('en-IN')} records · Page {page} of {pageCount}</span>
          <div className="flex gap-2"><button className={`${control} disabled:opacity-40 cursor-pointer`} disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button><button className={`${control} disabled:opacity-40 cursor-pointer`} disabled={page === pageCount} onClick={() => setPage(p => p + 1)}>Next</button></div>
        </div>
      </div>
    </section>
  );
}
