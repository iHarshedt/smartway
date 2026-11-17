import React, { useEffect, useMemo, useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  Truck, 
  ArrowUpDown, 
  RefreshCw, 
  Calendar, 
  Zap, 
  Hammer, 
  Edit3, 
  X, 
  Save, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  MessageSquare,
  Users,
  Building2,
  BadgeDollarSign,
  Plus,
  Trash2
} from 'lucide-react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { CUSTOMER_RECORDS, GOOGLE_SHEET_URL } from '../data/customerData';
import { CSV_URL, parseFinance } from '../data/financeData';
import { FALLBACK_FINANCE_ACCOUNTS } from '../data/financeSnapshot';
import { deliveryDateKey, formatDeliveryDate, getSectionFromConsumer } from '../data/operationData';
import './FinanceLedgerPage.css';

// Status styling and configuration for teams
const STAGES = {
  unassigned: { label: 'Unassigned', bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30', icon: Clock },
  assigned: { label: 'Assigned', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', icon: UserCheck },
  in_progress: { label: 'In Progress', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: Clock },
  delayed: { label: 'Delayed', bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', icon: AlertTriangle },
  completed: { label: 'Completed', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2 }
};

export default function OperationPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('all');
  const [engineer, setEngineer] = useState('all');
  const [electricalFilter, setElectricalFilter] = useState('all');
  const [structuralFilter, setStructuralFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc'); // 'date-desc', 'date-asc', 'name-asc'
  const [busy, setBusy] = useState(false);

  // Modal state for editing customer team assignment and remarks
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formElectricalTeam, setFormElectricalTeam] = useState('');
  const [formElectricalStatus, setFormElectricalStatus] = useState('assigned');
  const [formStructuralTeam, setFormStructuralTeam] = useState('');
  const [formStructuralStatus, setFormStructuralStatus] = useState('assigned');
  const [formRemarks, setFormRemarks] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Real-time Firestore assignments store: key is customerId
  const [assignments, setAssignments] = useState({});

  // Top Operational Management Teams (Financial Team & Industrial Team)
  const [opsTeams, setOpsTeams] = useState({
    financialTeams: [],
    industrialTeams: []
  });

  // Modals for Top Teams Management
  const [showTeamModal, setShowTeamModal] = useState(null); // 'financial' | 'industrial' | null
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamLead, setNewTeamLead] = useState('');
  const [newTeamPhone, setNewTeamPhone] = useState('');
  const [newTeamStatus, setNewTeamStatus] = useState('Active');
  const [isSavingOpsTeam, setIsSavingOpsTeam] = useState(false);

  // Subscribe to operations state (both customer assignments and top teams)
  useEffect(() => {
    if (!db) return;
    const unsubTeams = onSnapshot(doc(db, 'operations', 'teams_state'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() || {};
        setAssignments(data.assignments || data || {});
        if (data.opsTeams) {
          setOpsTeams(data.opsTeams);
        }
      }
    }, (err) => {
      console.warn('Firestore operations teams_state read warning:', err);
    });
    return () => unsubTeams();
  }, []);

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

  // Open modal prefilled with current assignment
  const handleOpenAssign = (customer) => {
    const record = assignments[customer.id] || {};
    setEditingCustomer(customer);
    setFormElectricalTeam(record.electricalTeam || '');
    setFormElectricalStatus(record.electricalStatus || 'assigned');
    setFormStructuralTeam(record.structuralTeam || '');
    setFormStructuralStatus(record.structuralStatus || 'assigned');
    setFormRemarks(record.remarks || '');
    setSaveSuccess(false);
  };

  // Save customer assignments to Firebase Firestore
  const handleSaveAssignment = async (e) => {
    if (e) e.preventDefault();
    if (!editingCustomer || !db) return;

    setIsSaving(true);
    try {
      const custId = editingCustomer.id;
      const updatedAssignments = {
        ...assignments,
        [custId]: {
          customerName: editingCustomer.customerName,
          consumerNo: editingCustomer.consumerNo || '',
          electricalTeam: formElectricalTeam.trim(),
          electricalStatus: formElectricalStatus,
          structuralTeam: formStructuralTeam.trim(),
          structuralStatus: formStructuralStatus,
          remarks: formRemarks.trim(),
          updatedAt: new Date().toISOString(),
          updatedBy: user?.displayName || user?.email || 'Operations'
        }
      };

      await setDoc(doc(db, 'operations', 'teams_state'), {
        assignments: updatedAssignments,
        opsTeams
      }, { merge: true });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditingCustomer(null);
      }, 700);
    } catch (err) {
      console.error('Error saving operation assignments:', err);
      alert('Failed to save to Firebase: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Add / Delete Top Operational Teams (Financial / Industrial)
  const handleAddOpsTeam = async (e) => {
    if (e) e.preventDefault();
    if (!newTeamName.trim() || !db) return;

    setIsSavingOpsTeam(true);
    try {
      const newEntry = {
        id: `team_${Date.now()}`,
        name: newTeamName.trim(),
        lead: newTeamLead.trim(),
        phone: newTeamPhone.trim(),
        status: newTeamStatus,
        createdAt: new Date().toISOString()
      };

      const updatedOpsTeams = { ...opsTeams };
      if (showTeamModal === 'financial') {
        updatedOpsTeams.financialTeams = [...(opsTeams.financialTeams || []), newEntry];
      } else if (showTeamModal === 'industrial') {
        updatedOpsTeams.industrialTeams = [...(opsTeams.industrialTeams || []), newEntry];
      }

      await setDoc(doc(db, 'operations', 'teams_state'), {
        assignments,
        opsTeams: updatedOpsTeams
      }, { merge: true });

      setOpsTeams(updatedOpsTeams);
      setNewTeamName('');
      setNewTeamLead('');
      setNewTeamPhone('');
      setNewTeamStatus('Active');
      setShowTeamModal(null);
    } catch (err) {
      console.error('Error saving top ops team:', err);
      alert('Failed to save team: ' + err.message);
    } finally {
      setIsSavingOpsTeam(false);
    }
  };

  const handleDeleteOpsTeam = async (type, teamId) => {
    if (!window.confirm('Are you sure you want to remove this team?')) return;
    try {
      const updatedOpsTeams = { ...opsTeams };
      if (type === 'financial') {
        updatedOpsTeams.financialTeams = (opsTeams.financialTeams || []).filter(t => t.id !== teamId);
      } else if (type === 'industrial') {
        updatedOpsTeams.industrialTeams = (opsTeams.industrialTeams || []).filter(t => t.id !== teamId);
      }

      await setDoc(doc(db, 'operations', 'teams_state'), {
        assignments,
        opsTeams: updatedOpsTeams
      }, { merge: true });

      setOpsTeams(updatedOpsTeams);
    } catch (err) {
      console.error('Error deleting ops team:', err);
    }
  };

  // Merge Finance accounts with CUSTOMER_RECORDS & Firebase assignments
  const customers = useMemo(() => {
    const list = [];
    const seenConsumers = new Set();
    const seenNames = new Set();

    (financeAccounts || []).forEach(a => {
      const key = deliveryDateKey(a.deliveryDate);
      if (key !== null) {
        const matched = CUSTOMER_RECORDS.find(c =>
          (c.consumerNo && a.consumer && String(c.consumerNo).trim() === String(a.consumer).trim()) ||
          (c.customerName && a.name && c.customerName.trim().toLowerCase() === a.name.trim().toLowerCase())
        );

        if (a.consumer) seenConsumers.add(String(a.consumer).trim());
        if (a.name) seenNames.add(a.name.trim().toLowerCase());

        const assign = assignments[a.id] || {};
        const consNo = a.consumer || matched?.consumerNo || '';
        const mappedSec = getSectionFromConsumer(consNo);
        const resolvedSection = mappedSec?.section || matched?.section || a.structure || '';
        const resolvedCircle = mappedSec?.circle || matched?.circle || '';
        const sectionCode = mappedSec?.code || '';

        list.push({
          id: a.id,
          customerName: a.name,
          consumerNo: consNo,
          phone: matched?.phone || '',
          deliveryDate: a.deliveryDate,
          formattedDeliveryDate: formatDeliveryDate(a.deliveryDate),
          deliveryKey: key,
          capacityKW: a.capacity || matched?.capacityKW || null,
          section: resolvedSection,
          circle: resolvedCircle,
          sectionCode: sectionCode,
          salesEngineer: a.engineer || matched?.salesEngineer || '',
          rawAccount: a,
          // Operational teams assignment state
          electricalTeam: assign.electricalTeam || '',
          electricalStatus: assign.electricalStatus || (assign.electricalTeam ? 'assigned' : 'unassigned'),
          structuralTeam: assign.structuralTeam || '',
          structuralStatus: assign.structuralStatus || (assign.structuralTeam ? 'assigned' : 'unassigned'),
          remarks: assign.remarks || '',
          updatedAt: assign.updatedAt || null
        });
      }
    });

    CUSTOMER_RECORDS.forEach(c => {
      const key = deliveryDateKey(c.deliveryDate);
      if (key !== null) {
        const consumerStr = c.consumerNo ? String(c.consumerNo).trim() : '';
        const nameLower = c.customerName ? c.customerName.trim().toLowerCase() : '';
        if ((consumerStr && seenConsumers.has(consumerStr)) || (nameLower && seenNames.has(nameLower))) {
          return;
        }
        const assign = assignments[c.id] || {};
        const mappedSec = getSectionFromConsumer(consumerStr);
        const resolvedSection = mappedSec?.section || c.section || '';
        const resolvedCircle = mappedSec?.circle || c.circle || '';
        const sectionCode = mappedSec?.code || '';

        list.push({
          id: c.id,
          customerName: c.customerName,
          consumerNo: consumerStr,
          phone: c.phone || '',
          deliveryDate: c.deliveryDate,
          formattedDeliveryDate: formatDeliveryDate(c.deliveryDate),
          deliveryKey: key,
          capacityKW: c.capacityKW || null,
          section: resolvedSection,
          circle: resolvedCircle,
          sectionCode: sectionCode,
          salesEngineer: c.salesEngineer || '',
          // Operational teams assignment state
          electricalTeam: assign.electricalTeam || '',
          electricalStatus: assign.electricalStatus || (assign.electricalTeam ? 'assigned' : 'unassigned'),
          structuralTeam: assign.structuralTeam || '',
          structuralStatus: assign.structuralStatus || (assign.structuralTeam ? 'assigned' : 'unassigned'),
          remarks: assign.remarks || '',
          updatedAt: assign.updatedAt || null
        });
      }
    });

    return list;
  }, [financeAccounts, assignments]);

  const sections = useMemo(() => [...new Set(customers.map(c => c.section).filter(Boolean))].sort(), [customers]);
  const engineers = useMemo(() => [...new Set(customers.map(c => c.salesEngineer).filter(Boolean))].sort(), [customers]);

  const filtered = useMemo(() => {
    return customers
      .filter(c =>
        [c.customerName, c.consumerNo, c.phone, c.section, c.circle, c.sectionCode, c.salesEngineer, c.electricalTeam, c.structuralTeam, c.remarks]
          .join(' ')
          .toLowerCase()
          .includes(search.trim().toLowerCase()) &&
        (section === 'all' || c.section === section) &&
        (engineer === 'all' || c.salesEngineer === engineer) &&
        (electricalFilter === 'all' || c.electricalStatus === electricalFilter) &&
        (structuralFilter === 'all' || c.structuralStatus === structuralFilter)
      )
      .sort((a, b) => {
        if (sortOrder === 'date-desc') return (b.deliveryKey || 0) - (a.deliveryKey || 0);
        if (sortOrder === 'date-asc') return (a.deliveryKey || 0) - (b.deliveryKey || 0);
        if (sortOrder === 'name-asc') return a.customerName.localeCompare(b.customerName);
        return 0;
      });
  }, [customers, search, section, engineer, electricalFilter, structuralFilter, sortOrder]);

  // Operational metrics overview
  const stats = useMemo(() => {
    const total = customers.length;
    let elecDone = 0, elecInProgress = 0, structDone = 0, structInProgress = 0;
    customers.forEach(c => {
      if (c.electricalStatus === 'completed') elecDone++;
      if (c.electricalStatus === 'in_progress') elecInProgress++;
      if (c.structuralStatus === 'completed') structDone++;
      if (c.structuralStatus === 'in_progress') structInProgress++;
    });
    return { total, elecDone, elecInProgress, structDone, structInProgress };
  }, [customers]);

  const reset = () => {
    setSearch('');
    setSection('all');
    setEngineer('all');
    setElectricalFilter('all');
    setStructuralFilter('all');
    setSortOrder('date-desc');
  };

  return (
    <div className="finance-page">
      <header className="finance-heading">
        <div>
          <div className="finance-eyebrow">SMARTWAY / OPERATION</div>
          <h1>Operations & Team Assignments</h1>
          <p>Manage project teams, assign site installations, and track real-time delivery milestones.</p>
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

      {/* TOP OPERATIONS TEAMS SECTION: FINANCIAL TEAM & INDUSTRIAL TEAM */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5" aria-label="Operations Divisions">
        
        {/* Financial Team Card */}
        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--app-border,#334155)]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <BadgeDollarSign size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--app-text-primary,#f8fafc)]">Financial Team</h3>
                  <p className="text-[11px] text-[var(--app-text-muted,#94a3b8)]">Payment clearances, bank loan liaisons & billing</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNewTeamName('');
                  setNewTeamLead('');
                  setNewTeamPhone('');
                  setNewTeamStatus('Active');
                  setShowTeamModal('financial');
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 transition cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Team</span>
              </button>
            </div>

            {/* List of Financial Teams */}
            <div className="space-y-2">
              {opsTeams.financialTeams && opsTeams.financialTeams.length > 0 ? (
                opsTeams.financialTeams.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--app-surface-subtle,#0f172a)]/60 border border-[var(--app-border,#334155)] text-xs">
                    <div>
                      <span className="font-bold text-[var(--app-text-primary,#f8fafc)]">{t.name}</span>
                      <div className="text-[10px] text-[var(--app-text-muted,#94a3b8)] flex items-center gap-2 mt-0.5">
                        {t.lead && <span>Lead: <strong>{t.lead}</strong></span>}
                        {t.phone && <span>📞 {t.phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {t.status || 'Active'}
                      </span>
                      <button
                        onClick={() => handleDeleteOpsTeam('financial', t.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Remove team"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-xs text-[var(--app-text-muted,#94a3b8)] italic">
                  No financial teams added yet. Click &quot;Add Team&quot; to assign officers.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Industrial Team Card */}
        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--app-border,#334155)]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--app-text-primary,#f8fafc)]">Industrial Team</h3>
                  <p className="text-[11px] text-[var(--app-text-muted,#94a3b8)]">Commercial &amp; High-voltage grid EPC execution</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNewTeamName('');
                  setNewTeamLead('');
                  setNewTeamPhone('');
                  setNewTeamStatus('Active');
                  setShowTeamModal('industrial');
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/40 transition cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Team</span>
              </button>
            </div>

            {/* List of Industrial Teams */}
            <div className="space-y-2">
              {opsTeams.industrialTeams && opsTeams.industrialTeams.length > 0 ? (
                opsTeams.industrialTeams.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--app-surface-subtle,#0f172a)]/60 border border-[var(--app-border,#334155)] text-xs">
                    <div>
                      <span className="font-bold text-[var(--app-text-primary,#f8fafc)]">{t.name}</span>
                      <div className="text-[10px] text-[var(--app-text-muted,#94a3b8)] flex items-center gap-2 mt-0.5">
                        {t.lead && <span>Lead: <strong>{t.lead}</strong></span>}
                        {t.phone && <span>📞 {t.phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        {t.status || 'Active'}
                      </span>
                      <button
                        onClick={() => handleDeleteOpsTeam('industrial', t.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Remove team"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-xs text-[var(--app-text-muted,#94a3b8)] italic">
                  No industrial teams added yet. Click &quot;Add Team&quot; to assign commercial leads.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS METRICS CARDS */}
      <section className="finance-metrics" aria-label="Operations Overview">
        <article className="finance-metric neutral">
          <div>
            <span>Delivered Installations</span>
            <Truck size={18} />
          </div>
          <strong>{customers.length}</strong>
          <small>Eligible active site installations</small>
        </article>

        <article className="finance-metric sage">
          <div>
            <span>Structural Teams</span>
            <Hammer size={18} />
          </div>
          <strong>{stats.structDone} <span style={{ fontSize: '14px', fontWeight: 500 }}>completed</span></strong>
          <small>{stats.structInProgress} active in-progress</small>
        </article>

        <article className="finance-metric ochre">
          <div>
            <span>Electrical Teams</span>
            <Zap size={18} />
          </div>
          <strong>{stats.elecDone} <span style={{ fontSize: '14px', fontWeight: 500 }}>completed</span></strong>
          <small>{stats.elecInProgress} active in-progress</small>
        </article>
      </section>

      <div className="finance-source">
        <Users size={18} />
        <strong>{customers.length} delivered customers</strong>
        <span>Live synced with Google Sheets &amp; Firebase Team Operations</span>
      </div>

      <section className="finance-panel" aria-label="Delivered customers">
        <div className="finance-panel-heading">
          <div>
            <h2>Delivery &amp; Installation Work Orders</h2>
            <p>
              {filtered.length} of {customers.length} customers · Sorted by{' '}
              {sortOrder === 'date-desc' ? 'Latest delivery first' : sortOrder === 'date-asc' ? 'Oldest delivery first' : 'Customer Name'}
            </p>
          </div>
          <button className="finance-reset" onClick={reset}>Reset filters</button>
        </div>

        {/* COMPREHENSIVE FILTER BAR */}
        <div className="finance-filters" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <label className="finance-search" style={{ minWidth: '240px', flex: 1 }}>
            <Search size={17} />
            <input
              aria-label="Search delivered customers"
              placeholder="Search customer, phone, team, remarks…"
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
          <select aria-label="Electrical status" value={electricalFilter} onChange={e => setElectricalFilter(e.target.value)}>
            <option value="all">⚡ Electrical: All</option>
            <option value="assigned">⚡ Assigned</option>
            <option value="in_progress">⚡ In Progress</option>
            <option value="delayed">⚡ Delayed</option>
            <option value="completed">⚡ Completed</option>
            <option value="unassigned">⚡ Unassigned</option>
          </select>
          <select aria-label="Structural status" value={structuralFilter} onChange={e => setStructuralFilter(e.target.value)}>
            <option value="all">🔨 Structural: All</option>
            <option value="assigned">🔨 Assigned</option>
            <option value="in_progress">🔨 In Progress</option>
            <option value="delayed">🔨 Delayed</option>
            <option value="completed">🔨 Completed</option>
            <option value="unassigned">🔨 Unassigned</option>
          </select>
          <select aria-label="Sort by" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="date-desc">Latest delivery (Newest)</option>
            <option value="date-asc">Oldest delivery</option>
            <option value="name-asc">Customer A–Z</option>
          </select>
        </div>

        {filtered.length ? (
          <div className="finance-table-scroll">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Customer / Contact</th>
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
                  <th>Capacity / Section</th>
                  <th>Structural Team</th>
                  <th>Electrical Team</th>
                  <th>Remarks / Notes</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => {
                  const elecStage = STAGES[customer.electricalStatus] || STAGES.unassigned;
                  const structStage = STAGES[customer.structuralStatus] || STAGES.unassigned;

                  return (
                    <tr key={customer.id}>
                      {/* Customer Info */}
                      <td>
                        <strong>{customer.customerName}</strong>
                        <small>{customer.consumerNo || 'Consumer No. not recorded'}</small>
                        {customer.phone && (
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>
                            <a href={`tel:${customer.phone}`} style={{ color: 'var(--app-accent, #CC785C)' }}>📞 {customer.phone}</a>
                          </div>
                        )}
                      </td>

                      {/* Delivery Date */}
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--app-text-primary, #f1f5f9)' }}>
                          {customer.formattedDeliveryDate}
                        </span>
                        <small>{customer.salesEngineer ? `Eng: ${customer.salesEngineer}` : ''}</small>
                      </td>

                      {/* Capacity & Section */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ fontSize: '13px' }}>
                            {customer.capacityKW ? `${customer.capacityKW} kW` : '—'}
                          </strong>
                          {customer.sectionCode && (
                            <span 
                              style={{ 
                                fontSize: '9px', 
                                fontWeight: 700, 
                                padding: '1px 5px', 
                                borderRadius: '4px', 
                                background: 'rgba(56, 189, 248, 0.1)', 
                                color: '#38bdf8', 
                                border: '1px solid rgba(56, 189, 248, 0.25)' 
                              }}
                              title={`KSEB Section Code: ${customer.sectionCode}`}
                            >
                              #{customer.sectionCode}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-text-secondary, #cbd5e1)', marginTop: '2px' }}>
                          {customer.section || 'Section not recorded'}
                        </div>
                        {customer.circle && (
                          <div style={{ fontSize: '10px', color: 'var(--app-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Circle: {customer.circle}
                          </div>
                        )}
                      </td>

                      {/* Structural Team */}
                      <td>
                        {customer.structuralTeam ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <strong style={{ fontSize: '12px' }}>🔨 {customer.structuralTeam}</strong>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${structStage.bg} ${structStage.text} ${structStage.border}`} style={{ width: 'fit-content' }}>
                              {structStage.label}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--app-text-muted, #94a3b8)', fontStyle: 'italic' }}>
                            Not Assigned
                          </span>
                        )}
                      </td>

                      {/* Electrical Team */}
                      <td>
                        {customer.electricalTeam ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <strong style={{ fontSize: '12px' }}>⚡ {customer.electricalTeam}</strong>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${elecStage.bg} ${elecStage.text} ${elecStage.border}`} style={{ width: 'fit-content' }}>
                              {elecStage.label}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--app-text-muted, #94a3b8)', fontStyle: 'italic' }}>
                            Not Assigned
                          </span>
                        )}
                      </td>

                      {/* Remarks */}
                      <td style={{ maxWidth: '220px' }}>
                        {customer.remarks ? (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', fontSize: '11px', color: 'var(--app-text-secondary, #cbd5e1)', lineHeight: 1.4 }}>
                            <MessageSquare size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--app-accent, #CC785C)' }} />
                            <span style={{ wordBreak: 'break-word' }}>{customer.remarks}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--app-text-muted, #64748b)' }}>—</span>
                        )}
                      </td>

                      {/* Action Button: Edit Assignment Only (Finance button removed) */}
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          className="finance-button"
                          onClick={() => handleOpenAssign(customer)}
                          title="Assign Teams & Update Status"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--app-surface-subtle)', borderColor: 'var(--app-accent)' }}
                        >
                          <Edit3 size={13} />
                          <span>Assign</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

      {/* TOP TEAMS CREATION MODAL (Financial Team / Industrial Team) */}
      {showTeamModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowTeamModal(null)}
        >
          <div 
            className="w-full max-w-md bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-2xl p-6 shadow-2xl relative text-[var(--app-text-primary,#f8fafc)] font-['Plus_Jakarta_Sans',sans-serif]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-[var(--app-border,#334155)]">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--app-accent,#CC785C)]">
                  Operations Management
                </div>
                <h3 className="text-base font-bold text-[var(--app-text-primary,#f8fafc)] mt-0.5">
                  {showTeamModal === 'financial' ? 'Add Financial Team' : 'Add Industrial Team'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTeamModal(null)}
                className="p-1.5 rounded-lg text-[var(--app-text-muted,#94a3b8)] hover:text-white hover:bg-[var(--app-surface-hover,#334155)] transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddOpsTeam} className="mt-4 space-y-3.5">
              <div>
                <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                  Team Name / Division *
                </label>
                <input
                  type="text"
                  required
                  placeholder={showTeamModal === 'financial' ? 'e.g. Accounts & Subsidies Team' : 'e.g. C&I Solar Division 1'}
                  value={newTeamName}
                  onChange={e => setNewTeamName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                  Team Lead / Head
                </label>
                <input
                  type="text"
                  placeholder="e.g. Harshed / Vineesh"
                  value={newTeamLead}
                  onChange={e => setNewTeamLead(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9946236101"
                  value={newTeamPhone}
                  onChange={e => setNewTeamPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                  Status
                </label>
                <select
                  value={newTeamStatus}
                  onChange={e => setNewTeamStatus(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)]"
                >
                  <option value="Active">Active</option>
                  <option value="On Standby">On Standby</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--app-border,#334155)]">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(null)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--app-border,#334155)] text-xs font-semibold text-[var(--app-text-secondary,#cbd5e1)] hover:bg-[var(--app-surface-hover,#334155)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingOpsTeam}
                  className="px-4 py-1.5 rounded-lg bg-[var(--app-accent,#CC785C)] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>{isSavingOpsTeam ? 'Saving…' : 'Save Team'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ASSIGN TEAMS MODAL FOR CUSTOMER */}
      {editingCustomer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setEditingCustomer(null)}
        >
          <div 
            className="w-full max-w-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-2xl p-6 shadow-2xl relative text-[var(--app-text-primary,#f8fafc)] font-['Plus_Jakarta_Sans',sans-serif]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[var(--app-border,#334155)]">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--app-accent,#CC785C)]">
                  Site Work Order · Operations
                </div>
                <h3 className="text-lg font-bold text-[var(--app-text-primary,#f8fafc)] mt-0.5">
                  {editingCustomer.customerName}
                </h3>
                <p className="text-xs text-[var(--app-text-muted,#94a3b8)]">
                  {editingCustomer.consumerNo ? `Consumer: ${editingCustomer.consumerNo}` : 'Consumer not recorded'}
                  {editingCustomer.section && ` · ${editingCustomer.section}`}
                  {editingCustomer.sectionCode && ` (#${editingCustomer.sectionCode})`}
                  {editingCustomer.circle && ` [${editingCustomer.circle}]`}
                  {` · Delivered: ${editingCustomer.formattedDeliveryDate}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingCustomer(null)}
                className="p-1.5 rounded-lg text-[var(--app-text-muted,#94a3b8)] hover:text-white hover:bg-[var(--app-surface-hover,#334155)] transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveAssignment} className="mt-5 space-y-4">
              
              {/* STRUCTURAL TEAM BLOCK */}
              <div className="p-3.5 rounded-xl border border-[var(--app-border,#334155)] bg-[var(--app-surface-subtle,#0f172a)]/50 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Hammer size={15} />
                  <span>Structural Installation Team</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                      Team Name / Leader
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shalet Team, Vineesh"
                      value={formStructuralTeam}
                      onChange={e => setFormStructuralTeam(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)] font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                      Structural Stage
                    </label>
                    <select
                      value={formStructuralStatus}
                      onChange={e => setFormStructuralStatus(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)] font-medium"
                    >
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                      <option value="unassigned">Unassigned</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ELECTRICAL TEAM BLOCK */}
              <div className="p-3.5 rounded-xl border border-[var(--app-border,#334155)] bg-[var(--app-surface-subtle,#0f172a)]/50 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Zap size={15} />
                  <span>Electrical Wiring &amp; Net Metering Team</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                      Team Name / Electrician
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Team, Junaid"
                      value={formElectricalTeam}
                      onChange={e => setFormElectricalTeam(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)] font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                      Electrical Stage
                    </label>
                    <select
                      value={formElectricalStatus}
                      onChange={e => setFormElectricalStatus(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)] font-medium"
                    >
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                      <option value="unassigned">Unassigned</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* REMARKS BLOCK */}
              <div>
                <label className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block mb-1">
                  Site Remarks &amp; Updates
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Roof concrete completed. Fasteners delivered. Waiting for KSEB inspection on Monday."
                  value={formRemarks}
                  onChange={e => setFormRemarks(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] text-[var(--app-text-primary,#f8fafc)] focus:outline-none focus:border-[var(--app-accent,#CC785C)] resize-none"
                />
              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--app-border,#334155)]">
                <span className="text-[11px] text-[var(--app-text-muted,#94a3b8)]">
                  {saveSuccess ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} /> Saved to Firebase!
                    </span>
                  ) : (
                    'Saves live to Firebase cloud'
                  )}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCustomer(null)}
                    className="px-3.5 py-1.5 rounded-lg border border-[var(--app-border,#334155)] text-xs font-semibold text-[var(--app-text-secondary,#cbd5e1)] hover:bg-[var(--app-surface-hover,#334155)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-1.5 rounded-lg bg-[var(--app-accent,#CC785C)] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Save size={14} />
                    <span>{isSaving ? 'Saving…' : 'Save Assignment'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
