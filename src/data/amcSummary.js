export const normalizeSection = value => String(value || '').trim().replace(/\s+/g, ' ').toUpperCase() || 'Section not recorded';

export function summarizeDueSections(records, phases) {
  const sections = new Map();
  for (const record of records) {
    if (!phases.includes(record.source)) continue;
    const section = normalizeSection(record.section);
    if (!sections.has(section)) sections.set(section, { section, counts: Object.fromEntries(phases.map(phase => [phase, 0])), total: 0, review: 0 });
    const summary = sections.get(section);
    if (record.state === 'due') { summary.counts[record.source]++; summary.total++; }
    if (record.state === 'review') summary.review++;
  }
  return [...sections.values()].sort((a, b) => b.total - a.total || a.section.localeCompare(b.section));
}
