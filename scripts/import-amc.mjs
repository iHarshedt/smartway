import { writeFile } from 'node:fs/promises';
import { AMC_SOURCES as sources, aggregateVisits } from '../src/data/amcImport.js';

const sheetId = '11JYdYFjr-XPUZoQijSzpaCH8N226AVmESBizPFaaX2Y';

function parseCsv(text) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && (c === ',' || c === '\n')) {
      row.push(value.replace(/\r$/, '')); value = '';
      if (c === '\n') { rows.push(row); row = []; }
    } else value += c;
  }
  if (value || row.length) { row.push(value.replace(/\r$/, '')); rows.push(row); }
  return rows;
}

const results = await Promise.all(sources.map(async source => {
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${source.gid}`);
  if (!response.ok) throw new Error(`${source.name}: HTTP ${response.status}`);
  const rows = parseCsv(await response.text());
  const header = rows[0]?.join(',') || '';
  if (source.name === 'Phase 1' ? rows[0]?.some(cell => cell.trim()) : !/DATE/i.test(header)) throw new Error(`${source.name}: Unexpected visit-sheet header`);
  const records = aggregateVisits(rows, source);
  if (!records.length) throw new Error(`${source.name}: No visit records found`);
  console.log(`${source.name}: ${records.length} records`);
  return records;
}));

await writeFile(new URL('../src/data/amcData.json', import.meta.url), JSON.stringify({
  sourceUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`,
  sources,
  importedAt: new Date().toISOString(), records: results.flat(),
}, null, 2) + '\n');
