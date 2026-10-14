import { parseAmcDate } from './amcSchedule.js';

export const AMC_SOURCES = [
  { name: 'Phase 1', sheet: 'Phase_1_AMC', gid: '0' },
  { name: 'Phase 2', sheet: 'Phase_2_AMC', gid: '1802154999' },
  { name: 'MNRE', sheet: 'MNRE_AMC', gid: '1359842976' },
];

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
