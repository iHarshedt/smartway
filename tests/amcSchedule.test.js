import test from 'node:test';
import assert from 'node:assert/strict';
import { scheduleAmc, parseAmcDate } from '../src/data/amcSchedule.js';

const record = { source: 'Phase 1', lastAmc: '14/09/2026', amcCount: '2' };
test('monthly due date is inclusive and uses day/month/year', () => {
  assert.equal(scheduleAmc(record, '2026-10-13').state, 'upcoming');
  assert.equal(scheduleAmc(record, '2026-10-14').reason, 'Due today');
  assert.equal(scheduleAmc(record, '2026-10-15').overdueDays, 1);
  assert.equal(parseAmcDate('7/9/2026').toISOString().slice(0, 10), '2026-09-07');
});
test('three and six month intervals and month-end clamping', () => {
  for (const source of ['Phase 2', 'Package']) assert.equal(scheduleAmc({ ...record, source }, '2026-10-14').dueDate, '2026-12-14');
  assert.equal(scheduleAmc({ ...record, source: 'MNRE', amcCount: '9' }, '2026-10-14').dueDate, '2027-03-14');
  assert.equal(scheduleAmc({ ...record, lastAmc: '31/01/2024' }, '2024-02-29').dueDate, '2024-02-29');
  assert.equal(scheduleAmc({ ...record, lastAmc: '31/01/2026' }, '2026-02-28').dueDate, '2026-02-28');
});
test('maximum counts exclude completed contracts', () => {
  for (const [source, max] of [['Phase 1', 24], ['Phase 2', 20], ['Package', 20], ['MNRE', 10]]) {
    assert.equal(scheduleAmc({ ...record, source, amcCount: String(max - 1) }, '2027-04-01').state, 'due');
    for (const count of [max, max + 1]) assert.equal(scheduleAmc({ ...record, source, amcCount: String(count) }, '2027-04-01').state, 'completed');
  }
});
test('missing, invalid and future inputs remain visible for review', () => {
  for (const lastAmc of ['', '31/02/2026', '15/10/2026']) assert.equal(scheduleAmc({ ...record, lastAmc }, '2026-10-14').state, 'review');
  for (const amcCount of ['', 'PHASE 1', '-1', '1.5']) assert.equal(scheduleAmc({ ...record, amcCount }, '2026-10-14').state, 'review');
  assert.equal(scheduleAmc({ ...record, amcCount: '2.00' }, '2026-10-14').state, 'due');
  assert.equal(scheduleAmc({ ...record, source: 'MNRE', amcCount: '' }, '2027-04-01').state, 'review');
});
