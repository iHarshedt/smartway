export function deliveryDateKey(value) {
  const match = String(value ?? '').trim().match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2}|\d{4})$/);
  if (!match) return null;
  const day = Number(match[1]), month = Number(match[2]);
  const year = Number(match[3]) + (match[3].length === 2 ? 2000 : 0);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return year * 10000 + month * 100 + day;
}

export function deliveredCustomers(records, today = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(today);
  const part = type => Number(parts.find(p => p.type === type).value);
  const cutoff = part('year') * 10000 + part('month') * 100 + part('day');
  return records.filter(customer => {
    const date = deliveryDateKey(customer.deliveryDate);
    return date !== null && date <= cutoff;
  }).sort((a, b) => deliveryDateKey(b.deliveryDate) - deliveryDateKey(a.deliveryDate));
}
