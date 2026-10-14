import { parseAmcDate } from './amcSchedule.js';

export const AMC_SOURCES = [
  { name: 'Phase 1', sheet: 'Phase_1_AMC', gid: '0', masterGid: '188756421' },
  { name: 'Phase 2', sheet: 'Phase_2_AMC', gid: '1802154999', masterGid: '253994112' },
  { name: 'MNRE', sheet: 'MNRE_AMC', gid: '1359842976', masterGid: '2134973997' },
];

export function mergeCustomerRoster(rows, visits, source) {
  const columns = source.name === 'Phase 1' ? [0, 1, 4, 2, 5, 6, 7, null]
    : source.name === 'Phase 2' ? [0, 3, 4, 1, 2, 6, 7, null] : [0, 1, 7, 2, 3, 12, 13, 6];
  const fields = ['name', 'consumerNo', 'phone', 'capacity', 'section', 'amcCount', 'lastAmc', 'installationDate'];
  const normalize = value => String(value || '').trim().replace(/\s+/g, ' ').toUpperCase();
  const nameKey = record => `${normalize(record.name)}|${normalize(record.section)}`;
  const used = new Set();
  const seen = new Set();
  const customers = rows.slice(1).flatMap((row, index) => {
    const customer = Object.fromEntries(fields.map((field, i) => [field, columns[i] === null ? '' : String(row[columns[i]] || '').trim()]));
    if (!customer.name && !customer.consumerNo) return [];
    const key = customer.consumerNo || `row-${index + 2}`;
    if (seen.has(key)) return [];
    seen.add(key);
    const candidates = visits.filter(visit => customer.consumerNo ? visit.consumerNo === customer.consumerNo : !visit.consumerNo && nameKey(visit) === nameKey(customer));
    const visit = candidates.length === 1 ? candidates[0] : null;
    if (visit) used.add(visit.id);
    const masterHasHistory = Boolean(customer.lastAmc) || Number(customer.amcCount) > 0;
    const noVisitHistory = !visit && !masterHasHistory;
    return [{ ...customer, ...(visit || {}), name: customer.name || visit?.name, section: customer.section || visit?.section || '', phone: customer.phone,
      installationDate: customer.installationDate, source: source.name,
      id: `${source.masterGid}-${key}`, gid: source.masterGid, row: index + 2,
      amcCount: visit ? visit.amcCount : noVisitHistory ? '0' : customer.amcCount,
      lastAmc: visit ? visit.lastAmc : customer.lastAmc,
      noVisitHistory, status: visit?.status || '',
      historySource: visit ? 'AMC visit log' : masterHasHistory ? 'Full customer sheet' : 'No AMC recorded',
    }];
  });
  return [...customers, ...visits.filter(visit => !used.has(visit.id))];
}

export function aggregateVisits(rows, source) {
  const groups = new Map();
  rows.slice(1).forEach((cells, index) => {
    const row = cells.map(value => String(value || '').trim());
    const mnre = source.name === 'MNRE';
    const shifted = mnre && /^MNRE\s*\//i.test(row[3] || '');
    const name = row[mnre ? 1 : 0] || '';
    const consumerNo = row[mnre ? 2 : 1] || '';
    if (!name && !consumerNo) return;
    const phaseColumnsSwapped = !mnre && /^PHASE\s*(?:[12]|II?)$/i.test(row[3] || '');
    const section = row[mnre ? (shifted ? 4 : 3) : (phaseColumnsSwapped ? 4 : 3)] || '';
    const capacity = row[mnre ? (shifted ? 5 : 4) : 2] || '';
    const rawDate = row[mnre ? 0 : 5] || '';
    const date = parseAmcDate(rawDate);
    const rowNumber = index + 2;
    // Never combine unrelated sites with missing identifiers.
    const key = consumerNo || `unidentified-row-${rowNumber}`;
    let entry = groups.get(key);
    if (!entry) {
      entry = { id: `${source.gid}-${key}`, source: source.name, gid: source.gid, row: rowNumber,
        name, consumerNo, phone: '', section, capacity, lastAmc: '', status: '', dates: new Set(), latest: null, invalid: false, visitRows: [] };
      groups.set(key, entry);
    }
    entry.visitRows.push(rowNumber);
    if (!date) entry.invalid = true;
    else {
      entry.dates.add(date.toISOString().slice(0, 10));
      if (!entry.latest || date >= entry.latest) {
        Object.assign(entry, { latest: date, lastAmc: rawDate, row: rowNumber, name, section, capacity });
      }
    }
  });
  return [...groups.values()].map(({ dates, latest, invalid, ...entry }) => ({
    ...entry,
    amcCount: !entry.consumerNo || invalid ? '' : String(dates.size),
    status: !entry.consumerNo ? 'Missing consumer number — verify visit history' : invalid ? 'Visit date missing or invalid — verify count' : '',
  }));
}
