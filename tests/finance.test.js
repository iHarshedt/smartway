import test from 'node:test';
import assert from 'node:assert/strict';
import { splitPayments, registrationFee, classifyExpense, parseFinance, parseCSV, summarize } from '../src/data/financeData.js';
test('signed payments preserve order and do not execute formulas', () => {
  assert.deepEqual(splitPayments('=50000+100000-1000-200+400'), [50000,100000,-1000,-200,400]);
  assert.equal(splitPayments('=SUM(F2:F5)'), null);
  assert.equal(splitPayments('=1*1000'), null);
  assert.equal(splitPayments(''), null);
});
test('expense rules use sign independently and confirmed registration formula', () => {
  assert.equal(registrationFee(2.95),3108); assert.equal(registrationFee(5.25),6216);
  assert.equal(classifyExpense(-1000,2.95),'feasibility');
  assert.equal(classifyExpense(-400,2.95),'agreement');
  assert.equal(classifyExpense(-3108,2.95),'registration');
  assert.equal(classifyExpense(-5180,5.25),'structure');
  assert.equal(classifyExpense(-5000,null),'review');
});
const header='CUSTOMER NAME,BILL AMOUNT,PAID AMOUNT,BALANCE AMOUNT,PAYMENT BREAKDOWN,CAPACITY';
test('sheet without breakdown column retains balances without inventing transactions', () => {
  const rows = parseFinance('CUSTOMER NAME,BILL AMOUNT,PAID AMOUNT,BALANCE AMOUNT,CAPACITY\nAlice,100,80,20,3');
  const [account] = rows;
  assert.equal(account.net, 80);
  assert.equal(account.balance, 20);
  assert.equal(account.status, 'outstanding');
  assert.equal(account.received, null);
  assert.equal(account.expenses, null);
  assert.deepEqual(account.entries, []);
  assert.ok(account.issues.includes('Payment breakdown not recorded'));
  const totals = summarize(rows);
  assert.equal(totals.net, 80);
  assert.equal(totals.outstanding, 20);
  assert.equal(totals.unresolved, 1);
});
test('missing required balance column still rejects the sheet', () => {
  assert.throws(() => parseFinance('CUSTOMER NAME,BILL AMOUNT,PAID AMOUNT\nAlice,100,80'), /missing BALANCE AMOUNT/);
});
test('reconcile gross receipts less expenses to net paid', () => {
  const [r]=parseFinance(header+'\nAlice,196500,95800,100700,=100000-1000-200-3000,2.95');
  assert.equal(r.received,100000); assert.equal(r.expenses,4200); assert.equal(r.net,95800);
  assert.equal(r.entries.length,4); assert.equal(r.issues.filter(x => !x.includes('date')).length,0);
});
test('mismatched and missing breakdowns cannot become invented receipts', () => {
  const [r]=parseFinance(header+'\nAlice,100,80,20,=100-10,3');
  assert.equal(r.received,null); assert.equal(r.entries.length,0); assert.ok(r.issues.length);
  const [blank]=parseFinance(header+'\nBob,100,,100,,3');
  assert.equal(blank.net,null); assert.equal(blank.received,null);
});
test('CSV handles quoted commas, newlines and escaped quotes', () => {
  assert.deepEqual(parseCSV('a,"b,c","d""e"\r\nx,"y\nz",0'),[['a','b,c','d"e'],['x','y\nz','0']]);
  assert.throws(()=>parseCSV('<html>login</html>'));
});
test('only incoming entries receive dates, and mismatches stay unpaired', () => {
 const [r]=parseFinance(header+',PAYMENT DATE,DATE\nAlice,100,90,10,=50-10+50,3,01-10-2026,02-10-2026');
 assert.equal(r.entries[0].date,'01-10-2026'); assert.equal(r.entries[1].date,undefined); assert.equal(r.entries[2].date,'02-10-2026');
 const [m]=parseFinance(header+',PAYMENT DATE\nAlice,100,90,10,=50-10+50,3,01-10-2026');
 assert.equal(m.dateMismatch,true); assert.ok(m.entries.every(e=>!e.date));
});
