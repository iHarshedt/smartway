export const AMC_RULES = {
  'Phase 1': { months: 1, max: 24 },
  'Phase 2': { months: 3, max: 20 },
  Package: { months: 3, max: 20 },
  MNRE: { months: 6, max: 10 },
};

export function indiaToday() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const get = type => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function parseAmcDate(value) {
  const match = String(value || '').trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : null;
}

export function addCalendarMonths(date, months) {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)).getUTCDate();
  next.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return next;
}

export function scheduleAmc(record, asOf) {
  const rule = AMC_RULES[record.source];
  const rawCount = String(record.amcCount ?? '').trim();
  const count = rawCount !== '' && Number.isInteger(Number(rawCount)) && Number(rawCount) >= 0 ? Number(rawCount) : null;
  const base = { ...record, rule, count, dueDate: null, overdueDays: null };
  if (!rule) return { ...base, state: 'review', reason: 'Unknown phase' };
  if (rule.max !== null && count !== null && count >= rule.max) return { ...base, state: 'completed', reason: 'Maximum AMC count reached' };
  const firstVisit = record.noVisitHistory === true && count === 0;
  const last = parseAmcDate(firstVisit ? record.installationDate : record.lastAmc);
  const reference = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? new Date(`${asOf}T00:00:00Z`) : null;
  if (!reference || Number.isNaN(reference.getTime())) return { ...base, state: 'review', reason: 'Select a valid date' };
  if (firstVisit && !record.installationDate) return { ...base, state: 'due', reason: 'First AMC pending — date unknown (installation date missing)' };
  if (firstVisit && !last) return { ...base, state: 'review', reason: 'Invalid installation date for first AMC' };
  if (!last) return { ...base, state: 'review', reason: record.lastAmc ? 'Invalid Last AMC date' : 'Last AMC not recorded' };
  if (!firstVisit && last > reference) return { ...base, state: 'review', reason: 'Last AMC is after the selected date' };
  const dueDate = addCalendarMonths(last, rule.months).toISOString().slice(0, 10);
  if (rule.max !== null && count === null) return { ...base, dueDate, state: 'review', reason: 'AMC count missing or invalid; limit cannot be checked' };
  const overdueDays = Math.round((reference - new Date(`${dueDate}T00:00:00Z`)) / 86400000);
  return { ...base, dueDate, overdueDays, state: overdueDays >= 0 ? 'due' : 'upcoming', reason: (firstVisit ? 'First AMC: ' : '') + (overdueDays === 0 ? 'Due today' : overdueDays > 0 ? `${overdueDays} days overdue` : `Due in ${-overdueDays} days`) };
}
