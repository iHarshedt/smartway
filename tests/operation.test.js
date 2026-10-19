import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryDateKey, deliveredCustomers } from '../src/data/operationData.js';

test('delivery dates accept sheet formats and exclude requests and invalid dates', () => {
  assert.equal(deliveryDateKey('10/07/26'), 20260710);
  assert.equal(deliveryDateKey('31-08-2026'), 20260831);
  for (const value of ['', 'REQUEST', '-', null, '31/02/2026', '00/08/26']) assert.equal(deliveryDateKey(value), null);
});

test('delivered customers exclude future deliveries and sort latest first without mutating records', () => {
  const records = ['10/07/26', 'REQUEST', '16/10/2026', '17/10/2026', '31-08-2026'].map((deliveryDate, id) => ({ id, deliveryDate }));
  assert.deepEqual(deliveredCustomers(records, new Date('2026-10-15T20:00:00Z')).map(c => c.id), [2, 4, 0]);
  assert.deepEqual(records.map(c => c.id), [0, 1, 2, 3, 4]);
});
