import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeDueSections } from '../src/data/amcSummary.js';

test('section matrix reconciles due records by phase, preserving review and zero-due sections', () => {
  const phases = ['Phase 1', 'Phase 2', 'MNRE'];
  const result = summarizeDueSections([
    { section: ' nilambur ', source: 'Phase 1', state: 'due' },
    { section: 'NILAMBUR', source: 'Phase 2', state: 'due' },
    { section: 'NILAMBUR', source: 'MNRE', state: 'due' },
    { section: 'NILAMBUR', source: 'MNRE', state: 'completed' },
    { section: 'NILAMBUR', source: 'Phase 1', state: 'review' },
    { section: 'Manjeri', source: 'Phase 2', state: 'upcoming' },
    { section: '', source: 'MNRE', state: 'due' },
  ], phases);
  assert.deepEqual(result[0], { section: 'NILAMBUR', counts: { 'Phase 1': 1, 'Phase 2': 1, MNRE: 1 }, total: 3, review: 1 });
  assert.equal(result.find(r => r.section === 'MANJERI').total, 0);
  assert.equal(result.find(r => r.section === 'Section not recorded').total, 1);
  assert.equal(result.reduce((sum, r) => sum + r.total, 0), 4);
  for (const row of result) assert.equal(row.total, Object.values(row.counts).reduce((a, b) => a + b, 0));
});
