import React, { useMemo, useState } from 'react';
import { ExternalLink, Search, Truck } from 'lucide-react';
import { CUSTOMER_RECORDS, GOOGLE_SHEET_URL } from '../data/customerData';
import { deliveredCustomers } from '../data/operationData';
import './FinanceLedgerPage.css';

export default function OperationPage({ onOpenPayment }) {
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('all');
  const [engineer, setEngineer] = useState('all');
  const customers = useMemo(() => deliveredCustomers(CUSTOMER_RECORDS), []);
  const sections = [...new Set(customers.map(c => c.section).filter(Boolean))].sort();
  const engineers = [...new Set(customers.map(c => c.salesEngineer).filter(Boolean))].sort();
  const filtered = customers.filter(c =>
    [c.customerName, c.consumerNo, c.phone, c.section, c.salesEngineer].join(' ').toLowerCase().includes(search.trim().toLowerCase()) &&
    (section === 'all' || c.section === section) && (engineer === 'all' || c.salesEngineer === engineer));
  const reset = () => { setSearch(''); setSection('all'); setEngineer('all'); };

  return (
    <div className="finance-page">
      <header className="finance-heading">
        <div><div className="finance-eyebrow">SMARTWAY / OPERATION</div><h1>Delivered customers</h1><p>Track deliveries and follow up on each customer’s installation.</p></div>
        <a className="finance-button" href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer"><ExternalLink size={15} />Open master sheet</a>
      </header>
      <div className="finance-source"><Truck size={18} /><strong>{customers.length} delivered customers</strong><span>From the same saved customer records as Sales</span></div>
      <section className="finance-panel" aria-label="Delivered customers">
        <div className="finance-panel-heading"><div><h2>Delivery list</h2><p>{filtered.length} of {customers.length} customers · Latest delivery first</p><p>Includes recorded delivery dates through today. Pending requests and future dates are excluded.</p></div><button className="finance-reset" onClick={reset}>Reset filters</button></div>
        <div className="finance-filters">
          <label className="finance-search"><Search size={17} /><input aria-label="Search delivered customers" placeholder="Search customer, consumer no., phone…" value={search} onChange={e => setSearch(e.target.value)} /></label>
          <select aria-label="KSEB section" value={section} onChange={e => setSection(e.target.value)}><option value="all">All sections</option>{sections.map(value => <option key={value}>{value}</option>)}</select>
          <select aria-label="Sales engineer" value={engineer} onChange={e => setEngineer(e.target.value)}><option value="all">All engineers</option>{engineers.map(value => <option key={value}>{value}</option>)}</select>
        </div>
        {filtered.length ? <div className="finance-table-scroll"><table className="finance-table">
          <thead><tr><th>Customer / consumer no.</th><th>Contact</th><th>Delivery date</th><th>Capacity / section</th><th>Sales engineer</th><th>KSEB status</th><th>QC status</th><th>Accounts</th></tr></thead>
          <tbody>{filtered.map(customer => <tr key={customer.id}>
            <td><strong>{customer.customerName}</strong><small>{customer.consumerNo || 'Not recorded'}</small></td>
            <td>{customer.phone ? <a href={`tel:${customer.phone}`}>{customer.phone}</a> : 'Not recorded'}</td>
            <td>{customer.deliveryDate}</td>
            <td>{customer.capacityKW ? `${customer.capacityKW} kW` : 'Not recorded'}<small>{customer.section || 'Not recorded'}</small></td>
            <td className="finance-wrap">{customer.salesEngineer || 'Not recorded'}</td>
            <td className="finance-wrap">{customer.ksebStatus && customer.ksebStatus !== '-' ? customer.ksebStatus : 'Not recorded'}</td>
            <td>{customer.qcStatus && customer.qcStatus !== '-' ? customer.qcStatus : 'Not recorded'}</td>
            <td><button className="finance-button" onClick={() => onOpenPayment(customer)}>View finance</button></td>
          </tr>)}</tbody>
        </table></div> : <div className="finance-empty"><Truck size={28} /><h3>{customers.length ? 'No customers match your filters' : 'No delivered customers yet'}</h3>{customers.length > 0 && <button className="finance-button" onClick={reset}>Clear filters</button>}</div>}
      </section>
    </div>
  );
}
