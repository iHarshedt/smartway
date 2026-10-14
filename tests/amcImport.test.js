import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregateVisits, AMC_SOURCES } from '../src/data/amcImport.js';

test('visit histories use latest date and distinct dates, not row order', () => {
  const result = aggregateVisits([[],
    ['Customer', '123', '5', 'SECTION', 'PHASE1', '07/10/2026'],
    ['Customer', '123', '5', 'SECTION', 'PHASE1', '08/01/2026'],
    ['Customer', '123', '5', 'SECTION', 'PHASE1', '7/10/2026'],
  ], AMC_SOURCES[0]);
  assert.equal(result.length, 1);
  assert.equal(result[0].lastAmc, '7/10/2026');
  assert.equal(result[0].amcCount, '2');
  assert.equal(result[0].row, 4);
});
test('both MNRE layouts map section and capacity correctly', () => {
  const [result] = aggregateVisits([[],
    ['27/04/2026', 'Customer', '123', 'POTHUKALLU', '3.36KW 1PH'],
    ['01/09/2026', 'Customer', '123', 'MNRE/ECCOFULL', 'POTHUKALLU', '3.36KW 1PH'],
  ], AMC_SOURCES[2]);
  assert.equal(result.section, 'POTHUKALLU');
  assert.equal(result.capacity, '3.36KW 1PH');
  assert.equal(result.amcCount, '2');
  assert.equal(result.lastAmc, '01/09/2026');
});

test('phase visit rows support swapped project and section columns', () => {
  for (const model of ['PHASE I', 'PHASE1', 'PHASE 1', 'PHASE II', 'PHASE2']) {
    const [record] = aggregateVisits([[], ['Customer', '123', '5', model, 'MANJERI', '21/02/2026']], AMC_SOURCES[0]);
    assert.equal(record.section, 'MANJERI');
  }
});
test('missing identifiers never merge and invalid dates prevent unreliable counts', () => {
  const rows = aggregateVisits([[],
    ['Site A', '', '5', 'SECTION', '', '01/09/2026'],
    ['Site B', '', '5', 'SECTION', '', '01/09/2026'],
    ['Customer', '123', '5', 'SECTION', '', 'invalid'],
  ], AMC_SOURCES[0]);
  assert.equal(rows.length, 3);
  assert.ok(rows.every(row => row.amcCount === '' && row.status));
});
