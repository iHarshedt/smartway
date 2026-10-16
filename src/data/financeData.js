export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1XSxLClUfJkEOr8q8u1jRV49v1rx8JTKgsQO4X8lYTIY/edit?gid=110086080#gid=110086080';
export const CSV_URL = 'https://docs.google.com/spreadsheets/d/1XSxLClUfJkEOr8q8u1jRV49v1rx8JTKgsQO4X8lYTIY/export?format=csv&gid=110086080';
export const CATEGORY_LABELS = { receipt: 'Customer payment', feasibility: 'KSEB feasibility', agreement: 'Agreement fee', registration: 'Plant registration', structure: 'Structure cost', review: 'Expense · review category' };
export function parseCSV(text) {
  if (/^\s*</.test(text)) throw new Error('The sheet returned a sign-in page. Check read access.');
  let field = '', row = [], quoted = false; const rows = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(field); field = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && text[i + 1] === '\n') i++; row.push(field); rows.push(row); field = ''; row = []; }
    else field += c;
  }
  if (quoted) throw new Error('Unfinished quoted value in sheet data.');
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}
export const number = value => {
  const text = String(value ?? '').replace(/[₹,\s]/g, '');
  return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : null;
};
export function splitPayments(raw) {
  const expression = String(raw ?? '').trim().replace(/^=/, '').replace(/\s/g, '');
  if (!expression) return null;
  // Parse only signed numbers. Never execute spreadsheet formulas or guess reference values.
  if (!/^[+-]?\d+(?:\.\d+)?(?:[+-]\d+(?:\.\d+)?)*$/.test(expression)) return null;
  return expression.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
}
export function registrationFee(capacity) { return Number.isFinite(capacity) && capacity > 0 ? Math.round(Math.ceil(capacity) * 1000 * 1.036 * 100) / 100 : null; }
export function classifyExpense(value, capacity) {
  const amount = Math.abs(value);
  if (amount === 1000) return 'feasibility';
  if (amount === 200 || amount === 400) return 'agreement';
  const fee = registrationFee(capacity);
  if (fee === null) return 'review';
  return Math.abs(amount - fee) < .01 ? 'registration' : 'structure';
}
export function incomingDates(values) {
  return values.flatMap(value => [...String(value).matchAll(/\b(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4}|\d{2})\b/g)].map(match => match[0]));
}
export function parseFinance(text) {
  const rows = parseCSV(text), normal = x => String(x ?? '').replace(/^\uFEFF/, '').trim().toUpperCase().replace(/\s+/g, ' ');
  const start = rows.findIndex(row => row.some(x => normal(x) === 'CUSTOMER NAME'));
  if (start < 0) throw new Error('Finance data is empty or the import is still loading.');
  const headers = rows[start].map(normal);
  // Breakdowns are optional: sheet balances remain usable without transaction detail.
  for (const h of ['CUSTOMER NAME', 'BILL AMOUNT', 'PAID AMOUNT', 'BALANCE AMOUNT']) if (!headers.includes(h)) throw new Error(`Finance sheet is missing ${h}.`);
  const records = rows.slice(start + 1).flatMap((row, index) => {
    const get = h => String(row[headers.indexOf(h)] ?? '').trim();
    const name = get('CUSTOMER NAME'); if (!name || /^(grand\s+)?total\b/i.test(name)) return [];
    const r = { id: `row-${start + index + 2}`, row: start + index + 2, name, consumer: get('CONSUMER NUMBER'), engineer: get('SALES ENGINEER'), capacity: number(get('CAPACITY')), structure: get('STRUCTURE'), bill: number(get('BILL AMOUNT')), net: number(get('PAID AMOUNT')), balance: number(get('BALANCE AMOUNT')), formula: get('PAYMENT BREAKDOWN'), paymentDate: get('PAYMENT DATE'), deliveryDate: get('DELIVERY DATE'), extra: [], issues: [], entries: [] };
    headers.forEach((h, i) => { if ((h === 'DATE' || !h) && row[i]) r.extra.push({ label: h ? `Additional date (column ${i + 1})` : 'Notes', value: row[i] }); });
    for (const [key, label] of [['bill', 'Bill'], ['net', 'Net paid'], ['balance', 'Balance']]) if (r[key] === null) r.issues.push(`${label} missing or invalid`);
    const terms = splitPayments(r.formula);
    r.received = null; r.expenses = null;
    if (terms && r.net !== null && Math.abs(terms.reduce((s, n) => s + n, 0) - r.net) < .01) {
      r.entries = terms.map((value, i) => ({ id: `${r.id}-${i}`, index: i + 1, value, category: value >= 0 ? 'receipt' : classifyExpense(value, r.capacity), accountId: r.id, customer: name }));
      r.received = terms.reduce((s, n) => s + Math.max(0, n), 0);
      r.expenses = terms.reduce((s, n) => s + Math.max(0, -n), 0);
    } else if (r.formula) r.issues.push(terms ? 'Breakdown does not match net paid; refresh the sheet' : 'Breakdown uses an unsupported formula; review in sheet');
    else r.issues.push('Payment breakdown not recorded');
    if (r.bill !== null && r.net !== null && r.balance !== null && Math.abs(r.bill - r.net - r.balance) > .01) r.issues.push('Bill minus net paid differs from sheet balance');
    r.incomingDates = incomingDates([r.paymentDate, ...headers.flatMap((h, i) => h === 'DATE' ? [row[i] || ''] : [])]);
    r.dateMismatch = r.entries.filter(e => e.value > 0).length !== r.incomingDates.length;
    if (r.dateMismatch) r.issues.push('Incoming payment count and recorded date count differ; dates need review');
    if (!r.dateMismatch) {
      let dateIndex = 0;
      r.entries.forEach(entry => { if (entry.value > 0) entry.date = r.incomingDates[dateIndex++]; });
    }
    r.status = r.bill === null || r.balance === null ? 'incomplete' : r.balance < 0 ? 'credit' : r.balance === 0 ? 'settled' : 'outstanding';
    return [r];
  });
  if (!records.length) throw new Error('No customer accounts found in the Finance tab.');
  const counts = new Map(); records.forEach(r => { if (r.consumer) counts.set(r.consumer, (counts.get(r.consumer) || 0) + 1); });
  records.forEach(r => { if (counts.get(r.consumer) > 1) r.issues.push('Consumer number appears on multiple accounts'); });
  return records;
}
export function summarize(rows) {
  return rows.reduce((s, r) => {
    s.bill += r.bill ?? 0; s.net += r.net ?? 0; s.received += r.received ?? 0; s.expenses += r.expenses ?? 0;
    s.outstanding += Math.max(0, r.balance ?? 0); s.credit += r.bill === null ? 0 : Math.max(0, -(r.balance ?? 0));
    s.unresolved += Number(r.received === null); s.review += Number(r.issues.length > 0);
    r.entries.forEach(e => { s.categories[e.category] = (s.categories[e.category] || 0) + Math.abs(e.value); });
    return s;
  }, { bill: 0, net: 0, received: 0, expenses: 0, outstanding: 0, credit: 0, unresolved: 0, review: 0, categories: {} });
}
