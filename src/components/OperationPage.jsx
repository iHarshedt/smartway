import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Search, Truck, ArrowUpDown, RefreshCw, Calendar } from 'lucide-react';
import { CUSTOMER_RECORDS, GOOGLE_SHEET_URL } from '../data/customerData';
import { CSV_URL, parseFinance } from '../data/financeData';
import { FALLBACK_FINANCE_ACCOUNTS } from '../data/financeSnapshot';
import { deliveryDateKey, formatDeliveryDate } from '../data/operationData';
import './FinanceLedgerPage.css';

export default function OperationPage({ onOpenPayment }) {
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('all');
  const [engineer, setEngineer] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc'); // 'date-desc', 'date-asc', 'name-asc'
  const [busy, setBusy] = useState(false);
  const [financeAccounts, setFinanceAccounts] = useState(() => {
    try {
      const cached = localStorage.getItem('smartway_finance_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return FALLBACK_FINANCE_ACCOUNTS || [];
  });

  // Fetch latest live finance accounts on mount or manual refresh
  const refreshData = async () => {
    setBusy(true);
    try {
      const response = await fetch(CSV_URL, { cache: 'no-store' });
      if (response.ok) {
        const text = await response.text();
        const next = parseFinance(text);
        if (next && next.length > 0) {
          setFinanceAccounts(next);
          try {
            localStorage.setItem('smartway_finance_cache', JSON.stringify(next));
          } catch (_) {}
        }
      }
    } catch (e) {
      console.warn('Failed to refresh live operation delivery data:', e);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Merge Finance accounts (source of 60+ delivery dates) with CUSTOMER_RECORDS (phone, section, status)
  const customers = useMemo(() => {
    const list = [];
    const seenConsumers = new Set();
    const seenNames = new Set();

    // 1. Process all accounts from finance that have a valid delivery date
    (financeAccounts || []).forEach(a => {
      const key = deliveryDateKey(a.deliveryDate);
      if (key !== null) {
        const matched = CUSTOMER_RECORDS.find(c =>
          (c.consumerNo && a.consumer && String(c.consumerNo).trim() === String(a.consumer).trim()) ||
          (c.customerName && a.name && c.customerName.trim().toLowerCase() === a.name.trim().toLowerCase())
        );

        if (a.consumer) seenConsumers.add(String(a.consumer).trim());
        if (a.name) seenNames.add(a.name.trim().toLowerCase());

        list.push({
          id: a.id,
          customerName: a.name,
          consumerNo: a.consumer || matched?.consumerNo || '',
          phone: matched?.phone || '',
          deliveryDate: a.deliveryDate,
          formattedDeliveryDate: formatDeliveryDate(a.deliveryDate),
          deliveryKey: key,
          capacityKW: a.capacity || matched?.capacityKW || null,
          section: matched?.section || a.structure || '',
          salesEngineer: a.engineer || matched?.salesEngineer || '',
          ksebStatus: matched?.ksebStatus || '',
          qcStatus: matched?.qcStatus || '',
          rawAccount: a
        });
      }
    });

    // 2. Also include any records in CUSTOMER_RECORDS that have a valid delivery date not yet covered
    CUSTOMER_RECORDS.forEach(c => {
      const key = deliveryDateKey(c.deliveryDate);
      if (key !== null) {
        const consumerStr = c.consumerNo ? String(c.consumerNo).trim() : '';
        const nameLower = c.customerName ? c.customerName.trim().toLowerCase() : '';
        if ((consumerStr && seenConsumers.has(consumerStr)) || (nameLower && seenNames.has(nameLower))) {
          return;
        }
        list.push({
          id: c.id,
          customerName: c.customerName,
          consumerNo: c.consumerNo || '',
          phone: c.phone || '',
          deliveryDate: c.deliveryDate,
          formattedDeliveryDate: formatDeliveryDate(c.deliveryDate),
          deliveryKey: key,
          capacityKW: c.capacityKW || null,
          section: c.section || '',
          salesEngineer: c.salesEngineer || '',
          ksebStatus: c.ksebStatus || '',
          qcStatus: c.qcStatus || ''
        });
      }
    });

    return list;
  }, [financeAccounts]);

  const sections = useMemo(() => [...new Set(customers.map(c => c.section).filter(Boolean))].sort(), [customers]);
  const engineers = useMemo(() => [...new Set(customers.map(c => c.salesEngineer).filter(Boolean))].sort(), [customers]);

  const filtered = useMemo(() => {
    return customers
      .filter(c =>
        [c.customerName, c.consumerNo, c.phone, c.section, c.salesEngineer].join(' ').toLowerCase().includes(search.trim().toLowerCase()) &&
        (section === 'all' || c.section === section) &&
        (engineer === 'all' || c.salesEngineer === engineer)
      )
      .sort((a, b) => {
        if (sortOrder === 'date-desc') return (b.deliveryKey || 0) - (a.deliveryKey || 0);
        if (sortOrder === 'date-asc') return (a.deliveryKey || 0) - (b.deliveryKey || 0);
        if (sortOrder === 'name-asc') return a.customerName.localeCompare(b.customerName);
        return 0;
      });
  }, [customers, search, section, engineer, sortOrder]);

  const reset = () => {
    setSearch('');
    setSection('all');
    setEngineer('all');
    setSortOrder('date-desc');
  };

  return (
    <div className="finance-page">
      <header className="finance-heading">
        <div>
          <div className="finance-eyebrow">SMARTWAY / OPERATION</div>
          <h1>Delivered customers</h1>
          <p>Track deliveries and follow up on each customer’s installation.</p>
        </div>
        <div className="finance-actions">
          <a className="finance-button" href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer">
            <ExternalLink size={15} />Open master sheet
          </a>
          <button className="finance-button finance-primary" disabled={busy} onClick={refreshData}>
            <RefreshCw size={15} className={busy ? 'animate-spin' : ''} />
            {busy ? 'Refreshing…' : 'Refresh data'}
          </button>
        </div>
      </header>

      <div className="finance-source">
        <Truck size={18} />
        <strong>{customers.length} delivered customers</strong>
        <span>Synchronized with live delivery & installation records</span>
      </div>

      <section className="finance-panel" aria-label="Delivered customers">
        <div className="finance-panel-heading">
          <div>
            <h2>Delivery list</h2>
            <p>{filtered.length} of {customers.length} customers · Sorted by {sortOrder === 'date-desc' ? 'Latest delivery first' : sortOrder === 'date-asc' ? 'Oldest delivery first' : 'Customer Name'}</p>
            <p>All delivery dates are standardized to DD/MM/YYYY format. Pending requests are excluded.</p>
          </div>
          <button className="finance-reset" onClick={reset}>Reset filters</button>
        </div>

        <div className="finance-filters">
          <label className="finance-search">
            <Search size={17} />
            <input
              aria-label="Search delivered customers"
              placeholder="Search customer, consumer no., phone…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </label>
          <select aria-label="KSEB section" value={section} onChange={e => setSection(e.target.value)}>
            <option value="all">All sections</option>
            {sections.map(value => <option key={value}>{value}</option>)}
          </select>
          <select aria-label="Sales engineer" value={engineer} onChange={e => setEngineer(e.target.value)}>
            <option value="all">All engineers</option>
            {engineers.map(value => <option key={value}>{value}</option>)}
          </select>
          <select aria-label="Sort by" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="date-desc">Latest delivery first (Newest)</option>
            <option value="date-asc">Oldest delivery first</option>
            <option value="name-asc">Customer A–Z</option>
          </select>
        </div>

        {filtered.length ? (
          <div className="finance-table-scroll">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Customer / consumer no.</th>
                  <th>Contact</th>
                  <th
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => setSortOrder(prev => prev === 'date-desc' ? 'date-asc' : 'date-desc')}
                    title="Click to toggle date sort order"
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      <span>Delivery date</span>
                      <ArrowUpDown size={12} style={{ opacity: 0.7 }} />
                    </div>
                  </th>
                  <th>Capacity / section</th>
                  <th>Sales engineer</th>
                  <th>KSEB status</th>
                  <th>QC status</th>
                  <th>Accounts</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => (
                  <tr key={customer.id}>
                    <td>
                      <strong>{customer.customerName}</strong>
                      <small>{customer.consumerNo || 'Not recorded'}</small>
                    </td>
                    <td>{customer.phone ? <a href={`tel:${customer.phone}`}>{customer.phone}</a> : 'Not recorded'}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--app-text-primary, #f1f5f9)' }}>
                        {customer.formattedDeliveryDate}
                      </span>
                    </td>
                    <td>
                      {customer.capacityKW ? `${customer.capacityKW} kW` : 'Not recorded'}
                      <small>{customer.section || 'Not recorded'}</small>
                    </td>
                    <td className="finance-wrap">{customer.salesEngineer || 'Not recorded'}</td>
                    <td className="finance-wrap">{customer.ksebStatus && customer.ksebStatus !== '-' ? customer.ksebStatus : 'Not recorded'}</td>
                    <td>{customer.qcStatus && customer.qcStatus !== '-' ? customer.qcStatus : 'Not recorded'}</td>
                    <td>
                      <button
                        className="finance-button"
                        onClick={() => onOpenPayment(customer.rawAccount || customer)}
                      >
                        View finance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="finance-empty">
            <Truck size={28} />
            <h3>{customers.length ? 'No customers match your filters' : 'No delivered customers yet'}</h3>
            {customers.length > 0 && <button className="finance-button" onClick={reset}>Clear filters</button>}
          </div>
        )}
      </section>
    </div>
  );
}
