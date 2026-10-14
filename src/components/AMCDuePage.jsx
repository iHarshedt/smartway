import React, { useMemo, useState } from 'react';
import { CalendarClock, ArrowUp, ArrowDown } from 'lucide-react';
import data from '../data/amcData.json';
import { AMC_RULES, indiaToday, scheduleAmc } from '../data/amcSchedule';
import { normalizeSection as sectionKey, summarizeDueSections } from '../data/amcSummary';

const control = 'w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2.5 text-sm text-[var(--app-text-primary)]';
const states = { due: 'Due / Overdue', upcoming: 'Upcoming', review: 'Needs review', completed: 'Completed limit' };
const formatDate = value => value ? value.split('-').reverse().join('/') : '—';
const activeRules = Object.fromEntries(data.sources.map(source => [source.name, AMC_RULES[source.name]]));
const phases = Object.keys(activeRules);

export default function AMCDuePage({ view = 'due', onOpenDue }) {
  const isSummary = view === 'sections';
  const [phase, setPhase] = useState('All');
  const [section, setSection] = useState('All');
  const [query, setQuery] = useState('');
  const [asOf, setAsOf] = useState(indiaToday);
  const [status, setStatus] = useState('due');
  const [page, setPage] = useState(1);
  const [summarySearch, setSummarySearch] = useState('');
  const [totalDueSort, setTotalDueSort] = useState('descending');
  const scheduled = useMemo(() => data.records.map(record => scheduleAmc(record, asOf)), [asOf]);
  const summary = useMemo(() => summarizeDueSections(scheduled, phases)
    .filter(row => row.section.toLowerCase().includes(summarySearch.trim().toLowerCase()))
    .sort((a, b) => (totalDueSort === 'ascending' ? a.total - b.total : b.total - a.total) || a.section.localeCompare(b.section)),
  [scheduled, summarySearch, totalDueSort]);
  const summaryTotals = summary.reduce((total, row) => {
    phases.forEach(name => { total.counts[name] += row.counts[name]; });
    total.total += row.total; total.review += row.review;
    return total;
  }, { counts: Object.fromEntries(phases.map(name => [name, 0])), total: 0, review: 0 });
  const showSection = (name, project) => {
    setSection(name); setPhase(project); setStatus('due'); setQuery(''); setPage(1);
    onOpenDue?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const update = (setter, value) => { setter(value); setPage(1); };
  const sections = useMemo(() => [...new Set(data.records.filter(r => phase === 'All' || r.source === phase).map(r => sectionKey(r.section)))].sort(), [phase]);
  const matching = useMemo(() => scheduled.filter(r =>
    (phase === 'All' || r.source === phase) && (section === 'All' || sectionKey(r.section) === section) &&
    [r.name, r.consumerNo, r.phone, r.section].join(' ').toLowerCase().includes(query.trim().toLowerCase())
  ), [phase, section, query, scheduled]);
  const rows = useMemo(() => matching.filter(r => status === 'all' || r.state === status).sort((a, b) =>
    (a.dueDate || '9999').localeCompare(b.dueDate || '9999') || a.name.localeCompare(b.name)
  ), [matching, status]);
  const pages = Math.max(1, Math.ceil(rows.length / 50));

  return <section className="space-y-5" aria-label={isSummary ? 'AMC section due counts' : 'AMC due search'}>
    {!isSummary && <>
    <div><h2 className="text-2xl font-bold flex items-center gap-2"><CalendarClock className="text-[var(--app-accent)]" />AMC Due</h2><p className="mt-1 text-sm text-[var(--app-text-secondary)]">Find maintenance visits due by section and phase.</p></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{Object.entries(activeRules).map(([name, rule]) => <div key={name} className="p-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]"><p className="font-semibold text-sm">{name}</p><p className="text-sm mt-1 text-[var(--app-text-secondary)]">Every {rule.months} {rule.months === 1 ? 'month' : 'months'}</p><p className="text-xs mt-1 text-[var(--app-text-muted)]">{rule.max ? `Maximum ${rule.max} AMCs` : 'No maximum specified'}</p></div>)}</div>
    <div className="p-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <label className="text-xs space-y-1 block"><span>Phase</span><select aria-label="AMC due phase" className={control} value={phase} onChange={e => { update(setPhase, e.target.value); setSection('All'); }}><option>All</option>{Object.keys(activeRules).map(name => <option key={name}>{name}</option>)}</select></label>
        <label className="text-xs space-y-1 block"><span>Section</span><select aria-label="AMC due section" className={control} value={section} onChange={e => update(setSection, e.target.value)}><option>All</option>{sections.map(name => <option key={name}>{name}</option>)}</select></label>
        <label className="text-xs space-y-1 block"><span>Due as of</span><input aria-label="Due as of" type="date" className={control} value={asOf} onChange={e => update(setAsOf, e.target.value)} /></label>
        <label className="text-xs space-y-1 block"><span>Search customer or section</span><input aria-label="Search due customers" className={control} placeholder="Name, consumer no., phone, section" value={query} onChange={e => update(setQuery, e.target.value)} /></label>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="AMC due status">{Object.entries({ ...states, all: 'All records' }).map(([key, label]) => <button key={key} aria-pressed={status === key} onClick={() => update(setStatus, key)} className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${status === key ? 'bg-[var(--app-accent)] text-white' : 'bg-[var(--app-surface-subtle)] text-[var(--app-text-secondary)]'}`}>{label} ({key === 'all' ? matching.length : matching.filter(r => r.state === key).length})</button>)}</div>
      <p className="text-xs text-[var(--app-text-muted)]">Next due = Last AMC + service interval in calendar months. First AMC uses installation date + interval. Never-visited customers without an installation date are included as first AMC pending, with no overdue duration assigned. Dates use DD/MM/YYYY.</p>
      <p className="text-xs text-[var(--app-text-muted)]">Full customer lists and AMC history imported {new Date(data.importedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}. Counts use distinct visit dates, with customer-sheet history as fallback when no matching visit log exists.</p>
    </div>
    </>}
    {isSummary && <>
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Due counts by section and project</h2>
      <label className="text-xs space-y-1 block sm:max-w-xs"><span>Due as of</span><input aria-label="Section counts due as of" type="date" className={control} value={asOf} onChange={event => update(setAsOf, event.target.value)} /></label>
      <p className="text-xs text-[var(--app-text-muted)]">Full customer lists and AMC history imported {new Date(data.importedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}. Includes customers with no previous AMC visit.</p>
    </div>
    <section aria-label="Section-wise AMC due counts" className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] overflow-hidden">
      <div className="p-4 space-y-2">
        <p className="text-xs text-[var(--app-text-secondary)]">Due or overdue as of {formatDate(asOf)}, including first AMC pending where the installation date is unknown. Each count represents a customer record needing a visit, not missed visits. Click a count to open matching customers in AMC Due.</p>
        <p className="text-xs text-[var(--app-text-muted)]">Needs review is excluded from due totals. Section spelling follows the source sheets; different spellings remain separate.</p>
        <input aria-label="Search sections in due summary" placeholder="Search sections" className={`${control} sm:max-w-sm`} value={summarySearch} onChange={event => setSummarySearch(event.target.value)} />
      </div>
      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-sm whitespace-nowrap" aria-label="Due counts by section and project">
          <thead className="sticky top-0 bg-[var(--app-surface-subtle)] text-xs text-[var(--app-text-secondary)]"><tr><th scope="col" className="px-4 py-3 text-left">Section</th>{phases.map(name => <th scope="col" key={name} className="px-4 py-3 text-right">{name}</th>)}<th scope="col" aria-sort={totalDueSort} className="px-4 py-3 text-right">
            <button type="button" onClick={() => setTotalDueSort(order => order === 'descending' ? 'ascending' : 'descending')} aria-label={`Sort Total due ${totalDueSort === 'descending' ? 'lowest first' : 'highest first'}`} title={totalDueSort === 'descending' ? 'Highest first — click for lowest first' : 'Lowest first — click for highest first'} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--app-border)] px-2 py-1.5 cursor-pointer hover:bg-[var(--app-surface-hover)] focus-visible:outline-2 focus-visible:outline-[var(--app-accent)]">
              Total due {totalDueSort === 'descending' ? <ArrowDown size={14} aria-hidden="true" /> : <ArrowUp size={14} aria-hidden="true" />}
            </button>
          </th><th scope="col" className="px-4 py-3 text-right">Needs review</th></tr></thead>
          <tbody>{summary.map(row => <tr key={row.section} className="border-t border-[var(--app-border)] hover:bg-[var(--app-surface-hover)]">
            <th scope="row" className="px-4 py-3 text-left font-medium">{row.section}</th>
            {phases.map(name => <td key={name} className="px-4 py-3 text-right tabular-nums">{row.counts[name] ? <button aria-label={`Show ${name} due customers in ${row.section}`} className="underline text-[var(--app-accent-text)] cursor-pointer px-2 py-1" onClick={() => showSection(row.section, name)}>{row.counts[name]}</button> : <span className="text-[var(--app-text-muted)]">0</span>}</td>)}
            <td className="px-4 py-3 text-right font-bold tabular-nums">{row.total ? <button aria-label={`Show all due customers in ${row.section}`} className="underline cursor-pointer px-2 py-1" onClick={() => showSection(row.section, 'All')}>{row.total}</button> : 0}</td><td className="px-4 py-3 text-right tabular-nums text-[var(--app-text-secondary)]">{row.review}</td>
          </tr>)}</tbody>
          <tfoot className="sticky bottom-0 bg-[var(--app-surface-subtle)] font-bold"><tr><th scope="row" className="px-4 py-3 text-left">Total ({summary.length} sections)</th>{phases.map(name => <td key={name} className="px-4 py-3 text-right tabular-nums">{summaryTotals.counts[name]}</td>)}<td className="px-4 py-3 text-right tabular-nums">{summaryTotals.total}</td><td className="px-4 py-3 text-right tabular-nums">{summaryTotals.review}</td></tr></tfoot>
        </table>
        {!summary.length && <p className="p-6 text-center text-sm text-[var(--app-text-secondary)]">No sections match your search.</p>}
      </div>
    </section>
    </>}
    {!isSummary && <div id="amc-customer-results" className="scroll-mt-24 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] overflow-hidden">
      <h3 className="p-4 font-bold">Customer details · {phase} · {section} · {states[status] || 'All records'}</h3>
      <div className="overflow-x-auto"><table className="w-full text-sm text-left whitespace-nowrap"><thead className="bg-[var(--app-surface-subtle)] text-xs text-[var(--app-text-secondary)]"><tr>{['Customer / Consumer no.', 'Phase', 'Section', 'Phone', 'Last AMC', 'Next due', 'Completed / Max', 'Status', 'Source'].map(label => <th key={label} className="px-4 py-3">{label}</th>)}</tr></thead>
        <tbody>{rows.slice((page - 1) * 50, page * 50).map(r => <tr key={r.id} className="border-t border-[var(--app-border)] hover:bg-[var(--app-surface-hover)]">
          <td className="px-4 py-3"><p className="font-semibold whitespace-normal min-w-48 max-w-72">{r.name || 'Name not recorded'}</p><p className="text-xs text-[var(--app-text-muted)] mt-1">{r.consumerNo || 'No consumer number'}</p></td>
          <td className="px-4 py-3">{r.source}</td><td className="px-4 py-3">{r.section || 'Not recorded'}</td><td className="px-4 py-3">{r.phone || '—'}</td><td className="px-4 py-3">{r.lastAmc || 'Not recorded'}</td><td className="px-4 py-3 font-semibold">{formatDate(r.dueDate)}</td><td className="px-4 py-3">{r.count ?? 'Unknown'} / {r.rule.max ?? 'No limit'}</td>
          <td className="px-4 py-3"><p className={r.state === 'due' ? 'font-semibold text-[var(--app-accent-text)]' : ''}>{states[r.state]}</p><p className="text-xs text-[var(--app-text-muted)] whitespace-normal max-w-60 mt-1">{r.reason}</p></td><td className="px-4 py-3"><a href={`${data.sourceUrl}#gid=${r.gid}&range=A${r.row}`} target="_blank" rel="noreferrer" className="underline text-[var(--app-accent-text)]">View row</a></td>
        </tr>)}</tbody></table></div>
      {!rows.length && <p className="text-center p-10 text-[var(--app-text-secondary)]">No records match these filters. Choose another status, section, phase or date.</p>}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-[var(--app-border)] text-xs"><span>{rows.length.toLocaleString('en-IN')} records · Page {page} of {pages}</span><div className="flex gap-2"><button className={`${control} disabled:opacity-40`} disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button><button className={`${control} disabled:opacity-40`} disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button></div></div>
    </div>}
  </section>;
}

