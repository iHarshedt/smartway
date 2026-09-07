import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  CreditCard, 
  Receipt, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Filter, 
  Trash2, 
  MessageSquare, 
  ExternalLink, 
  Building2, 
  User, 
  X, 
  RefreshCw,
  Cloud,
  CloudOff,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  FileText,
  Users,
  Check,
  BarChart3,
  ArrowUpRight,
  PieChart,
  MapPin,
  Phone,
  Zap
} from 'lucide-react';
import { db, isFirebaseConfigured, firebaseConfig } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { CUSTOMER_RECORDS } from '../data/customerData';
import PaymentReceiptModal from './PaymentReceiptModal';
import CustomerBillModal from './CustomerBillModal';

// Initial verified payment stages derived from master customers
const INITIAL_STAGES_DATA = [
  {
    id: 'stage-001',
    customerId: 'SW-101',
    customerName: 'ABDUL MAJEED',
    consumerNo: '1165481034446',
    customerPhone: '9074757876',
    customerAddress: 'EDAVANNA, Malappuram',
    section: 'EDAVANNA',
    capacityKW: 2.95,
    stageName: 'Full Settlement (Net Meter Connected)',
    amount: 196500,
    paymentMode: 'CASH',
    referenceNo: 'CSH-EDV-0907',
    collectedBy: 'MUHAMMADALI',
    paymentDate: '2026-07-09',
    receiptNo: 'REC-2026-101',
    remarks: 'Full Plant Settlement upon Net-meter connection',
    totalProjectCost: 196500,
    createdAt: '2026-07-09T10:00:00.000Z'
  },
  {
    id: 'stage-002',
    customerId: 'SW-102',
    customerName: 'ABDUL NAZAR KARUMAROT',
    consumerNo: '1165595033958',
    customerPhone: '8078403579',
    customerAddress: 'WANDOOR, Malappuram',
    section: 'WANDOOR',
    capacityKW: 2.95,
    stageName: 'Full Settlement',
    amount: 196500,
    paymentMode: 'CASH',
    referenceNo: 'CSH-WDR-1307',
    collectedBy: 'ABDU SALAM',
    paymentDate: '2026-07-13',
    receiptNo: 'REC-2026-102',
    remarks: 'Full Settlement for 2.95kW Plant',
    totalProjectCost: 196500,
    createdAt: '2026-07-13T11:30:00.000Z'
  },
  {
    id: 'stage-003',
    customerId: 'SW-103',
    customerName: 'MUSTHAFA PN',
    consumerNo: '1165487016684',
    customerPhone: '9895414600',
    customerAddress: 'EDAVANNA, Malappuram',
    section: 'EDAVANNA',
    capacityKW: 5.0,
    stageName: '1st Stage: Advance & Structure',
    amount: 250000,
    paymentMode: 'CASH',
    referenceNo: 'CSH-EDV-1507',
    collectedBy: 'MUHAMMEDALI',
    paymentDate: '2026-07-15',
    receiptNo: 'REC-2026-103',
    remarks: 'Advance collection (CR Submitted, Balance ₹75,500)',
    totalProjectCost: 325500,
    createdAt: '2026-07-15T14:15:00.000Z'
  },
  {
    id: 'stage-004',
    customerId: 'SW-104',
    customerName: 'ASLAM V',
    consumerNo: '1165484026317',
    customerPhone: '9072910094',
    customerAddress: 'EDAVANNA, Malappuram',
    section: 'EDAVANNA',
    capacityKW: 2.95,
    stageName: '1st Stage: Advance Payment',
    amount: 170000,
    paymentMode: 'CASH',
    referenceNo: 'CSH-EDV-0908',
    collectedBy: 'MUHAMMEDALI',
    paymentDate: '2026-08-09',
    receiptNo: 'REC-2026-104',
    remarks: 'Advance for 2.95kW (Balance ₹26,500)',
    totalProjectCost: 196500,
    createdAt: '2026-08-09T16:00:00.000Z'
  },
  {
    id: 'stage-005',
    customerId: 'SW-105',
    customerName: 'ALIBAPPU',
    consumerNo: '1165576031344',
    customerPhone: '7510343053',
    customerAddress: 'KOTTAKKAL, Malappuram',
    section: 'KOTTAKKAL',
    capacityKW: 5.0,
    stageName: '1st Stage: Token Advance',
    amount: 100000,
    paymentMode: 'UPI',
    referenceNo: 'UPI-77492193',
    collectedBy: 'NAJMUDHEEN',
    paymentDate: '2026-07-28',
    receiptNo: 'REC-2026-105',
    remarks: 'Token advance for 5kW Solar plant',
    totalProjectCost: 299000,
    createdAt: '2026-07-28T12:00:00.000Z'
  },
  {
    id: 'stage-006',
    customerId: 'SW-105',
    customerName: 'ALIBAPPU',
    consumerNo: '1165576031344',
    customerPhone: '7510343053',
    customerAddress: 'KOTTAKKAL, Malappuram',
    section: 'KOTTAKKAL',
    capacityKW: 5.0,
    stageName: '2nd Stage: Structure Delivery',
    amount: 144620,
    paymentMode: 'CASH',
    referenceNo: 'CSH-KTK-0508',
    collectedBy: 'NAJMUDHEEN',
    paymentDate: '2026-08-05',
    receiptNo: 'REC-2026-105B',
    remarks: 'Structure delivery on site',
    totalProjectCost: 299000,
    createdAt: '2026-08-05T17:30:00.000Z'
  }
];

export default function FinanceLedgerPage({ 
  initialCustomerForPayment, 
  activeSubSession = 'customers', 
  onSubSessionChange 
}) {
  // Sub-sessions: 'customers' | 'daily' | 'monthly'
  const [internalSubSession, setInternalSubSession] = useState(activeSubSession || 'customers');
  const currentSubSession = onSubSessionChange ? activeSubSession : internalSubSession;

  const handleSwitchSubSession = (tab) => {
    if (onSubSessionChange) onSubSessionChange(tab);
    setInternalSubSession(tab);
  };

  // Payment stages state synced with Firestore & LocalStorage
  const [stages, setStages] = useState(() => {
    try {
      const saved = localStorage.getItem('smartway_payment_stages_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading payment stages from localStorage', e);
    }
    return INITIAL_STAGES_DATA;
  });

  const [firebaseStatus, setFirebaseStatus] = useState('connecting'); // 'connected' | 'offline'

  // Modals state
  const [selectedReceiptForView, setSelectedReceiptForView] = useState(null);
  const [selectedCustomerForBill, setSelectedCustomerForBill] = useState(null);
  const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);

  // Search & Filter state for Customer Accounts
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all'); // 'all' | 'partial' | 'settled' | 'none'

  // Search & Filter state for Daily Ledger
  const [dailySearchQuery, setDailySearchQuery] = useState('');
  const [dailyDatePreset, setDailyDatePreset] = useState('all'); // 'all' | 'today' | 'yesterday' | 'this_month' | 'custom'
  const [dailyCustomDate, setDailyCustomDate] = useState('');
  const [dailySelectedMonth, setDailySelectedMonth] = useState('all');
  const [dailyModeFilter, setDailyModeFilter] = useState('all');

  // FIRESTORE REAL-TIME LISTENER
  useEffect(() => {
    let unsubscribe = null;
    if (isFirebaseConfigured && db) {
      try {
        const stagesRef = collection(db, 'smartway_payment_stages');
        const q = query(stagesRef, orderBy('createdAt', 'desc'));

        unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const firebaseStages = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setStages(firebaseStages);
            try {
              localStorage.setItem('smartway_payment_stages_v2', JSON.stringify(firebaseStages));
            } catch (err) {}
            setFirebaseStatus('connected');
          } else {
            setFirebaseStatus('connected');
          }
        }, (error) => {
          console.warn('Firestore snapshot listener error:', error);
          setFirebaseStatus('offline');
        });
      } catch (err) {
        console.warn('Firestore setup error:', err);
        setFirebaseStatus('offline');
      }
    } else {
      setFirebaseStatus('offline');
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Save to LocalStorage whenever stages change
  useEffect(() => {
    try {
      localStorage.setItem('smartway_payment_stages_v2', JSON.stringify(stages));
    } catch (e) {}
  }, [stages]);

  // Handle incoming customer from other pages
  useEffect(() => {
    if (initialCustomerForPayment) {
      openAddStageForCustomer(initialCustomerForPayment);
    }
  }, [initialCustomerForPayment]);

  // FORM STATE FOR ADDING A PAYMENT STAGE
  const [targetCustomer, setTargetCustomer] = useState(null);
  const [stageName, setStageName] = useState('1st Stage: Booking Token Advance');
  const [stageAmount, setStageAmount] = useState(0);
  const [stageDate, setStageDate] = useState(new Date().toISOString().split('T')[0]);
  const [stageMode, setStageMode] = useState('CASH'); // 'CASH' | 'UPI' | 'NEFT' | 'CHEQUE' | 'LOAN'
  const [stageRefNo, setStageRefNo] = useState('');
  const [stageCollector, setStageCollector] = useState('MUHAMMADALI');
  const [stageRemarks, setStageRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open Add Stage Modal pre-filled for a customer
  const openAddStageForCustomer = (cust) => {
    setTargetCustomer(cust);
    const custStages = stages.filter(s => 
      (s.customerId && s.customerId === cust.id) ||
      (s.consumerNo && s.consumerNo === cust.consumerNo) ||
      (s.customerName && s.customerName.toLowerCase() === (cust.customerName || cust.name).toLowerCase())
    );
    const nextStageNum = custStages.length + 1;
    
    // Auto-suggest stage name
    if (nextStageNum === 1) setStageName('1st Stage: Booking Token Advance');
    else if (nextStageNum === 2) setStageName('2nd Stage: Structure Delivery on Site');
    else if (nextStageNum === 3) setStageName('3rd Stage: Panels & Inverter Delivery');
    else if (nextStageNum === 4) setStageName('4th Stage: Net-Metering Commissioning');
    else setStageName(`Stage ${nextStageNum}: Installment`);

    setStageCollector(cust.salesEngineer || 'SmartWay Team');
    setStageAmount(0);
    setStageRemarks('');
    setIsAddStageModalOpen(true);
    handleSwitchSubSession('customers');
  };

  // Compute stats for all customers
  const customersWithStages = useMemo(() => {
    return CUSTOMER_RECORDS.map(cust => {
      const custStages = stages.filter(s => 
        (s.customerId && s.customerId === cust.id) ||
        (s.consumerNo && cust.consumerNo && s.consumerNo === cust.consumerNo) ||
        (s.customerName && s.customerName.toLowerCase() === cust.customerName.toLowerCase())
      );

      const totalBill = Number(cust.totalAmount || cust.totalBillAmount || 250000);
      const paid = custStages.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
      const balance = Math.max(0, totalBill - paid);
      const percentage = totalBill > 0 ? Math.min(100, Math.round((paid / totalBill) * 100)) : 0;

      return {
        ...cust,
        totalBill,
        totalPaid: paid,
        balanceRemaining: balance,
        paidPercentage: percentage,
        stages: custStages,
        isFullyPaid: balance === 0 && paid > 0,
        hasNoPayments: paid === 0
      };
    });
  }, [stages]);

  // Filtered customer accounts
  const filteredCustomers = useMemo(() => {
    return customersWithStages.filter(c => {
      if (paymentStatusFilter === 'partial' && (c.isFullyPaid || c.hasNoPayments)) return false;
      if (paymentStatusFilter === 'settled' && !c.isFullyPaid) return false;
      if (paymentStatusFilter === 'none' && !c.hasNoPayments) return false;

      const q = customerSearchQuery.toLowerCase();
      if (!q.trim()) return true;
      return (
        c.customerName.toLowerCase().includes(q) ||
        (c.consumerNo && c.consumerNo.includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.section && c.section.toLowerCase().includes(q)) ||
        (c.salesEngineer && c.salesEngineer.toLowerCase().includes(q))
      );
    });
  }, [customersWithStages, paymentStatusFilter, customerSearchQuery]);

  // Overall financial summary metrics
  const financialSummary = useMemo(() => {
    const totalQuoted = customersWithStages.reduce((acc, c) => acc + c.totalBill, 0);
    const totalCollected = stages.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
    const totalBalance = Math.max(0, totalQuoted - totalCollected);
    const fullyPaidCount = customersWithStages.filter(c => c.isFullyPaid).length;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCollected = stages
      .filter(s => s.paymentDate === todayStr)
      .reduce((acc, s) => acc + (Number(s.amount) || 0), 0);

    return {
      totalQuoted,
      totalCollected,
      totalBalance,
      fullyPaidCount,
      todayCollected,
      totalStagesCount: stages.length
    };
  }, [customersWithStages, stages]);

  // =========================================================
  // DATA GROUPING: DAILY COLLECTIONS LEDGER (PER DATE)
  // =========================================================
  const dailyLedgerGroups = useMemo(() => {
    const map = new Map();

    stages.forEach(stage => {
      const dateKey = stage.paymentDate || (stage.createdAt ? stage.createdAt.substring(0, 10) : 'Unknown');
      if (!map.has(dateKey)) {
        map.set(dateKey, {
          date: dateKey,
          items: [],
          totalAmount: 0,
          modes: { CASH: 0, UPI: 0, NEFT: 0, CHEQUE: 0, LOAN: 0 }
        });
      }
      const entry = map.get(dateKey);
      entry.items.push(stage);
      const amt = Number(stage.amount) || 0;
      entry.totalAmount += amt;
      const mode = (stage.paymentMode || 'CASH').toUpperCase();
      entry.modes[mode] = (entry.modes[mode] || 0) + amt;
    });

    const sorted = Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
    return sorted;
  }, [stages]);

  // Filtered Daily Groups based on date picker / presets / search
  const filteredDailyGroups = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];
    const currentMonthStr = todayStr.substring(0, 7);

    return dailyLedgerGroups.filter(group => {
      // Date preset
      if (dailyDatePreset === 'today' && group.date !== todayStr) return false;
      if (dailyDatePreset === 'yesterday' && group.date !== yesterdayStr) return false;
      if (dailyDatePreset === 'this_month' && !group.date.startsWith(currentMonthStr)) return false;
      if (dailyDatePreset === 'custom' && dailyCustomDate && group.date !== dailyCustomDate) return false;

      // Month dropdown filter
      if (dailySelectedMonth !== 'all' && !group.date.startsWith(dailySelectedMonth)) return false;

      // Filter items within the group by mode and search query
      const matchingItems = group.items.filter(item => {
        if (dailyModeFilter !== 'all' && item.paymentMode !== dailyModeFilter) return false;
        
        const q = dailySearchQuery.toLowerCase().trim();
        if (!q) return true;
        return (
          item.customerName.toLowerCase().includes(q) ||
          (item.consumerNo && item.consumerNo.includes(q)) ||
          (item.receiptNo && item.receiptNo.toLowerCase().includes(q)) ||
          (item.section && item.section.toLowerCase().includes(q)) ||
          (item.collectedBy && item.collectedBy.toLowerCase().includes(q)) ||
          (item.stageName && item.stageName.toLowerCase().includes(q))
        );
      });

      return matchingItems.length > 0;
    }).map(group => {
      // Recompute filtered items for this group
      const matchingItems = group.items.filter(item => {
        if (dailyModeFilter !== 'all' && item.paymentMode !== dailyModeFilter) return false;
        const q = dailySearchQuery.toLowerCase().trim();
        if (!q) return true;
        return (
          item.customerName.toLowerCase().includes(q) ||
          (item.consumerNo && item.consumerNo.includes(q)) ||
          (item.receiptNo && item.receiptNo.toLowerCase().includes(q)) ||
          (item.section && item.section.toLowerCase().includes(q)) ||
          (item.collectedBy && item.collectedBy.toLowerCase().includes(q)) ||
          (item.stageName && item.stageName.toLowerCase().includes(q))
        );
      });

      const filteredTotal = matchingItems.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
      return {
        ...group,
        items: matchingItems,
        totalAmount: filteredTotal
      };
    });
  }, [dailyLedgerGroups, dailyDatePreset, dailyCustomDate, dailySelectedMonth, dailyModeFilter, dailySearchQuery]);

  // Total for filtered daily collection
  const totalFilteredDailyCollection = useMemo(() => {
    return filteredDailyGroups.reduce((acc, g) => acc + g.totalAmount, 0);
  }, [filteredDailyGroups]);

  // =========================================================
  // DATA GROUPING: MONTHLY SUMMARY (PER MONTH)
  // =========================================================
  const monthlyLedgerGroups = useMemo(() => {
    const map = new Map();

    stages.forEach(stage => {
      const dateStr = stage.paymentDate || (stage.createdAt ? stage.createdAt.substring(0, 10) : '');
      const monthKey = dateStr.substring(0, 7) || 'Other'; // YYYY-MM
      
      if (!map.has(monthKey)) {
        map.set(monthKey, {
          monthKey,
          totalAmount: 0,
          count: 0,
          items: [],
          datesMap: new Map(),
          modes: { CASH: 0, UPI: 0, NEFT: 0, CHEQUE: 0, LOAN: 0 },
          collectors: new Map()
        });
      }
      const entry = map.get(monthKey);
      const amt = Number(stage.amount) || 0;
      entry.totalAmount += amt;
      entry.count += 1;
      entry.items.push(stage);

      const mode = (stage.paymentMode || 'CASH').toUpperCase();
      entry.modes[mode] = (entry.modes[mode] || 0) + amt;

      const coll = stage.collectedBy || 'SmartWay Team';
      entry.collectors.set(coll, (entry.collectors.get(coll) || 0) + amt);

      if (dateStr) {
        entry.datesMap.set(dateStr, (entry.datesMap.get(dateStr) || 0) + amt);
      }
    });

    const sorted = Array.from(map.values()).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
    return sorted;
  }, [stages]);

  // Formatter helpers
  const formatDateLabel = (dateStr) => {
    if (!dateStr || dateStr === 'Unknown') return 'Date Unspecified';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  const formatMonthLabel = (monthKey) => {
    if (!monthKey || monthKey === 'Other') return 'Other Period';
    try {
      const [year, month] = monthKey.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1, 1);
      return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    } catch (e) {
      return monthKey;
    }
  };

  // Jump from monthly card directly to daily ledger for that month
  const viewDailyForMonth = (mKey) => {
    setDailySelectedMonth(mKey);
    setDailyDatePreset('all');
    setDailyCustomDate('');
    handleSwitchSubSession('daily');
  };

  // Handle Save New Stage Payment (Saved to Firebase Firestore + LocalStorage)
  const handleSavePaymentStage = async (e) => {
    e.preventDefault();
    if (!targetCustomer || !stageAmount || Number(stageAmount) <= 0) return;

    setIsSubmitting(true);
    const receiptNum = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const totalBill = Number(targetCustomer.totalBill || targetCustomer.totalAmount || 250000);
    const priorPaid = targetCustomer.totalPaid || 0;
    const thisAmount = parseFloat(stageAmount) || 0;
    const newTotalPaid = priorPaid + thisAmount;
    const newBal = Math.max(0, totalBill - newTotalPaid);

    const newStageItem = {
      customerId: targetCustomer.id,
      customerName: targetCustomer.customerName || targetCustomer.name,
      consumerNo: targetCustomer.consumerNo || '',
      customerPhone: targetCustomer.phone || '',
      customerAddress: `${targetCustomer.section || ''}, Kerala`,
      section: targetCustomer.section || '',
      capacityKW: targetCustomer.capacityKW || 3,
      stageName: stageName.trim(),
      amount: thisAmount,
      paymentMode: stageMode,
      referenceNo: stageRefNo.trim() || (stageMode === 'CASH' ? 'CASH' : `REF-${Date.now().toString().slice(-6)}`),
      collectedBy: stageCollector.trim().toUpperCase(),
      paymentDate: stageDate,
      receiptNo: receiptNum,
      remarks: stageRemarks.trim(),
      totalProjectCost: totalBill,
      cumulativePaid: newTotalPaid,
      balanceRemaining: newBal,
      createdAt: new Date().toISOString()
    };

    // Save to Firebase Firestore
    if (isFirebaseConfigured && db && firebaseStatus === 'connected') {
      try {
        const docRef = await addDoc(collection(db, 'smartway_payment_stages'), {
          ...newStageItem,
          serverTime: serverTimestamp()
        });
        newStageItem.id = docRef.id;
      } catch (err) {
        console.warn('Could not save stage directly to Firestore, saving locally:', err);
        newStageItem.id = `stage-${Date.now()}`;
      }
    } else {
      newStageItem.id = `stage-${Date.now()}`;
    }

    setStages(prev => [newStageItem, ...prev]);
    setIsAddStageModalOpen(false);
    setIsSubmitting(false);
    setStageAmount(0);
    setStageRemarks('');

    // Open receipt modal immediately
    setSelectedReceiptForView(newStageItem);
  };

  // Delete a stage payment
  const handleDeleteStage = async (stageId) => {
    if (!window.confirm('Are you sure you want to delete this payment stage?')) return;

    if (isFirebaseConfigured && db && firebaseStatus === 'connected') {
      try {
        await deleteDoc(doc(db, 'smartway_payment_stages', stageId));
      } catch (e) {}
    }
    setStages(prev => prev.filter(s => s.id !== stageId));
  };

  return (
    <div className="space-y-6">

      {/* TOP SUB-SESSIONS SWITCHER BAR */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)] font-bold shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                SmartWay Financial Management
              </h2>
              {firebaseStatus === 'connected' ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border border-[var(--app-sage-border)] flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Firestore Synced ({firebaseConfig.projectId})
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-ochre-subtle)] text-[var(--app-ochre)] border border-[var(--app-ochre-border)] flex items-center gap-1">
                  <CloudOff className="w-3 h-3" />
                  Offline Local Cache
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--app-text-secondary)] mt-0.5">
              Track customer installment stages, daily collection logs per date, and monthly ledger summaries
            </p>
          </div>
        </div>

        {/* 3 SUB-SESSION PILLS */}
        <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] p-1 rounded-2xl flex items-center gap-1 self-start md:self-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleSwitchSubSession('customers')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              currentSubSession === 'customers'
                ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customers &amp; Stages</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              currentSubSession === 'customers' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
            }`}>
              {customersWithStages.length}
            </span>
          </button>

          <button
            onClick={() => handleSwitchSubSession('daily')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              currentSubSession === 'daily'
                ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily Ledger (Per Date)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              currentSubSession === 'daily' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
            }`}>
              {dailyLedgerGroups.length} Days
            </span>
          </button>

          <button
            onClick={() => handleSwitchSubSession('monthly')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              currentSubSession === 'monthly'
                ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Monthly Summary</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              currentSubSession === 'monthly' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
            }`}>
              {monthlyLedgerGroups.length} Mos
            </span>
          </button>
        </div>

      </div>

      {/* OVERALL FINANCIAL KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Metric 1: Total Collections */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Total Collected So Far</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-sage-subtle)] border border-[var(--app-sage-border)] flex items-center justify-center text-[var(--app-sage)]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--app-sage)] font-['Outfit',sans-serif]">
              ₹{(financialSummary.totalCollected / 100000).toFixed(2)}L
            </span>
            <span className="text-[11px] font-bold text-[var(--app-text-muted)]">({financialSummary.totalStagesCount} Stages)</span>
          </div>
          <p className="text-[10px] text-[var(--app-text-secondary)] mt-1">Today's Inflow: ₹{financialSummary.todayCollected.toLocaleString()}</p>
        </div>

        {/* Metric 2: Total Agreed Bill Value */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Total Agreed Bill Value</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)]">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
              ₹{(financialSummary.totalQuoted / 100000).toFixed(2)}L
            </span>
          </div>
          <p className="text-[10px] text-[var(--app-text-secondary)] mt-1">Across 48 Project Customers</p>
        </div>

        {/* Metric 3: Total Outstanding Balance */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Pending Customer Balance</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-rose-subtle)] border border-[var(--app-rose-border)] flex items-center justify-center text-[var(--app-rose)]">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--app-rose)] font-['Outfit',sans-serif]">
              ₹{(financialSummary.totalBalance / 100000).toFixed(2)}L
            </span>
          </div>
          <p className="text-[10px] text-[var(--app-text-secondary)] mt-1">To Be Collected Across Stages</p>
        </div>

        {/* Metric 4: Fully Settled Customers */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Fully Settled Accounts</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-sage-subtle)] border border-[var(--app-sage-border)] flex items-center justify-center text-[var(--app-sage)]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
              {financialSummary.fullyPaidCount}
            </span>
            <span className="text-[11px] font-medium text-[var(--app-text-secondary)]">/ {customersWithStages.length} Customers</span>
          </div>
          <p className="text-[10px] text-[var(--app-text-secondary)] mt-1">Zero Balance Remaining</p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SUB-SESSION 1: CUSTOMERS & PAYMENT STAGES                 */}
      {/* ========================================================= */}
      {currentSubSession === 'customers' && (
        <div className="space-y-4">
          
          {/* Search & Filter Bar */}
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[var(--app-text-muted)] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search customer name, 13-digit consumer #, section, or phone..."
                value={customerSearchQuery}
                onChange={e => setCustomerSearchQuery(e.target.value)}
                className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl pl-10 pr-3 py-2 text-xs text-[var(--app-text-primary)] placeholder-[var(--app-text-muted)] outline-none focus:border-[var(--app-accent)] transition"
              />
              {customerSearchQuery && (
                <button
                  onClick={() => setCustomerSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--app-text-secondary)] text-[11px] font-semibold">Payment Status:</span>
              <select
                value={paymentStatusFilter}
                onChange={e => setPaymentStatusFilter(e.target.value)}
                className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
              >
                <option value="all">All Accounts ({customersWithStages.length})</option>
                <option value="partial">Partially Paid</option>
                <option value="settled">Fully Settled</option>
                <option value="none">No Payments Yet</option>
              </select>
            </div>
          </div>

          {/* Customer Accounts Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCustomers.length === 0 ? (
              <div className="col-span-full bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl py-14 text-center text-xs text-[var(--app-text-muted)]">
                No customer accounts found matching your query.
              </div>
            ) : (
              filteredCustomers.map(cust => {
                const isExpanded = expandedCustomerId === cust.id;

                return (
                  <div 
                    key={cust.id} 
                    className="bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] rounded-2xl p-5 transition duration-150 shadow-xs flex flex-col justify-between gap-4"
                  >
                    
                    {/* TILE HEADER & IDENTITY */}
                    <div className="space-y-3">
                      
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-[var(--app-text-muted)] font-bold uppercase">
                            #{cust.id.replace('SW-', '')}
                          </span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)]">
                            {cust.capacityKW} kW
                          </span>
                        </div>

                        {/* Status Badge */}
                        {cust.isFullyPaid ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border border-[var(--app-sage-border)] flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Fully Paid</span>
                          </span>
                        ) : cust.totalPaid > 0 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-ochre-subtle)] text-[var(--app-ochre)] border border-[var(--app-ochre-border)]">
                            Paid {cust.paidPercentage}%
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--app-badge-bg)] text-[var(--app-text-muted)] border border-[var(--app-badge-border)]">
                            No Payments
                          </span>
                        )}
                      </div>

                      {/* Customer Name & Section */}
                      <div>
                        <h3 className="text-base font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif] leading-snug">
                          {cust.customerName}
                        </h3>
                        <div className="text-xs text-[var(--app-text-secondary)] flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--app-text-muted)] shrink-0" />
                          <span className="font-semibold text-[var(--app-text-primary)]">{cust.section}</span>
                          {cust.circle && <span className="text-[var(--app-text-muted)]">({cust.circle})</span>}
                        </div>
                      </div>

                      {/* KSEB Consumer Number Card */}
                      <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] rounded-xl p-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Zap className="w-3.5 h-3.5 text-[var(--app-accent)] shrink-0" />
                          <div className="truncate">
                            <span className="text-[9px] text-[var(--app-text-muted)] block font-medium uppercase">KSEB Consumer #</span>
                            <span className="font-mono text-xs font-bold text-[var(--app-text-primary)] tracking-wider">
                              {cust.consumerNo || 'Pending'}
                            </span>
                          </div>
                        </div>

                        {cust.phone && (
                          <a
                            href={`tel:${cust.phone}`}
                            className="p-1.5 rounded-lg bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-secondary)] border border-[var(--app-border)]"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Financial Figures Card */}
                      <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] rounded-xl p-3 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--app-text-secondary)]">Total Bill Value:</span>
                          <strong className="text-[var(--app-text-primary)] font-bold text-sm">
                            ₹{cust.totalBill.toLocaleString()}
                          </strong>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--app-border-subtle)] text-[11px]">
                          <div>
                            <span className="text-[var(--app-text-muted)] block text-[10px]">Total Paid:</span>
                            <span className="font-bold text-[var(--app-sage)]">
                              ₹{cust.totalPaid.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[var(--app-text-muted)] block text-[10px]">Balance Due:</span>
                            <span className={`font-bold ${cust.balanceRemaining > 0 ? 'text-[var(--app-rose)]' : 'text-[var(--app-text-muted)]'}`}>
                              ₹{cust.balanceRemaining.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="pt-1">
                          <div className="flex items-center justify-between text-[10px] text-[var(--app-text-muted)] mb-1">
                            <span>Stage Settlement</span>
                            <span className="font-bold text-[var(--app-text-primary)]">{cust.paidPercentage}%</span>
                          </div>
                          <div className="w-full bg-[var(--app-surface)] h-2 rounded-full overflow-hidden border border-[var(--app-border-subtle)]">
                            <div 
                              className={`h-full transition-all duration-300 ${cust.isFullyPaid ? 'bg-[var(--app-sage)]' : 'bg-[var(--app-accent)]'}`}
                              style={{ width: `${cust.paidPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Stages Count / Toggle */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[11px] text-[var(--app-text-secondary)] font-medium">
                          {cust.stages.length} {cust.stages.length === 1 ? 'Stage Recorded' : 'Stages Recorded'}
                        </span>
                        <button
                          onClick={() => setExpandedCustomerId(isExpanded ? null : cust.id)}
                          className="text-[11px] text-[var(--app-accent)] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide History' : 'View History'}</span>
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Expanded Stages History inside Tile */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-[var(--app-border-subtle)] space-y-1.5 animate-in fade-in">
                          {cust.stages.length === 0 ? (
                            <div className="text-[11px] text-[var(--app-text-muted)] italic py-1">
                              No payments recorded yet. Click "+ Add Record" below.
                            </div>
                          ) : (
                            cust.stages.map((stg, idx) => (
                              <div 
                                key={stg.id || idx}
                                className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] p-2 rounded-xl flex items-center justify-between gap-2 text-xs"
                              >
                                <div className="truncate">
                                  <div className="font-semibold text-[var(--app-text-primary)] text-[11px] truncate">
                                    {stg.stageName}
                                  </div>
                                  <div className="text-[10px] text-[var(--app-text-muted)] flex items-center gap-1 mt-0.5">
                                    <span>{stg.paymentDate}</span>
                                    <span>•</span>
                                    <span className="uppercase">{stg.paymentMode}</span>
                                    <span>•</span>
                                    <span className="font-mono text-[var(--app-accent)]">{stg.receiptNo}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="font-bold text-[var(--app-sage)] text-[11px]">
                                    ₹{Number(stg.amount).toLocaleString()}
                                  </span>
                                  <button
                                    onClick={() => setSelectedReceiptForView(stg)}
                                    className="p-1 rounded hover:bg-[var(--app-surface)] text-[var(--app-accent)] transition cursor-pointer"
                                    title="Print / WhatsApp Receipt"
                                  >
                                    <Printer className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteStage(stg.id)}
                                    className="p-1 rounded hover:bg-[var(--app-surface)] text-[var(--app-text-muted)] hover:text-[var(--app-rose)] transition cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                    </div>

                    {/* TILE FOOTER ACTION BUTTONS */}
                    <div className="pt-3 border-t border-[var(--app-border-subtle)] flex items-center gap-2">
                      <button
                        onClick={() => openAddStageForCustomer(cust)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Record</span>
                      </button>

                      <button
                        onClick={() => setSelectedCustomerForBill(cust)}
                        className="py-2 px-3 rounded-xl bg-[var(--app-surface-subtle)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] border border-[var(--app-border)] font-semibold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                        title="Generate Comprehensive Project Bill"
                      >
                        <FileText className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                        <span>Bill</span>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SESSION 2: DAILY COLLECTIONS LEDGER (PER DATE)         */}
      {/* ========================================================= */}
      {currentSubSession === 'daily' && (
        <div className="space-y-4">
          
          {/* Daily Ledger Control & Filter Bar */}
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl flex flex-col gap-3.5 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--app-accent)]" />
                <h3 className="text-sm font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                  Daily Collections Ledger (Per Date)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border border-[var(--app-sage-border)]">
                  ₹{totalFilteredDailyCollection.toLocaleString()} in view
                </span>
              </div>

              {/* Search in Daily Ledger */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-[var(--app-text-muted)] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter customer, receipt #, engineer..."
                  value={dailySearchQuery}
                  onChange={e => setDailySearchQuery(e.target.value)}
                  className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[var(--app-text-primary)] placeholder-[var(--app-text-muted)] outline-none focus:border-[var(--app-accent)] transition"
                />
                {dailySearchQuery && (
                  <button onClick={() => setDailySearchQuery('')} className="absolute right-2.5 top-2 text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills & Specific Date Picker */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--app-border-subtle)] text-xs">
              
              {/* Date Presets */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[var(--app-text-secondary)] font-semibold">Period:</span>
                {[
                  { id: 'all', label: 'All Dates' },
                  { id: 'today', label: 'Today' },
                  { id: 'yesterday', label: 'Yesterday' },
                  { id: 'this_month', label: 'This Month' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setDailyDatePreset(p.id);
                      setDailyCustomDate('');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      dailyDatePreset === p.id && !dailyCustomDate
                        ? 'bg-[var(--app-accent)] text-white font-bold'
                        : 'bg-[var(--app-surface-subtle)] text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Exact Date Picker Input */}
              <div className="flex items-center gap-1 ml-auto sm:ml-0">
                <span className="text-[11px] text-[var(--app-text-secondary)] font-semibold">Pick Date:</span>
                <input
                  type="date"
                  value={dailyCustomDate}
                  onChange={e => {
                    setDailyCustomDate(e.target.value);
                    setDailyDatePreset('custom');
                  }}
                  className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-2.5 py-1 text-xs text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
                />
              </div>

              {/* Payment Mode Selector */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[var(--app-text-secondary)] font-semibold">Mode:</span>
                <select
                  value={dailyModeFilter}
                  onChange={e => setDailyModeFilter(e.target.value)}
                  className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-2.5 py-1 text-xs text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
                >
                  <option value="all">All Modes</option>
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="NEFT">Bank (NEFT)</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="LOAN">Bank Loan</option>
                </select>
              </div>

              {/* Month Quick Selector */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[var(--app-text-secondary)] font-semibold">Month:</span>
                <select
                  value={dailySelectedMonth}
                  onChange={e => setDailySelectedMonth(e.target.value)}
                  className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-2.5 py-1 text-xs text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
                >
                  <option value="all">All Months</option>
                  {monthlyLedgerGroups.map(m => (
                    <option key={m.monthKey} value={m.monthKey}>{formatMonthLabel(m.monthKey)}</option>
                  ))}
                </select>
              </div>

              {(dailyDatePreset !== 'all' || dailyCustomDate || dailyModeFilter !== 'all' || dailySelectedMonth !== 'all' || dailySearchQuery) && (
                <button
                  onClick={() => {
                    setDailyDatePreset('all');
                    setDailyCustomDate('');
                    setDailyModeFilter('all');
                    setDailySelectedMonth('all');
                    setDailySearchQuery('');
                  }}
                  className="text-[11px] text-[var(--app-accent)] hover:underline ml-auto font-medium cursor-pointer"
                >
                  Reset
                </button>
              )}

            </div>

          </div>

          {/* GROUPED BY DATE CARDS */}
          <div className="space-y-4">
            {filteredDailyGroups.length === 0 ? (
              <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl py-16 text-center text-xs text-[var(--app-text-muted)]">
                No collections found for the selected date criteria.
              </div>
            ) : (
              filteredDailyGroups.map(group => (
                <div 
                  key={group.date}
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl overflow-hidden shadow-xs"
                >
                  
                  {/* DATE HEADER BANNER */}
                  <div className="bg-[var(--app-surface-subtle)] border-b border-[var(--app-border)] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)]">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                          {formatDateLabel(group.date)}
                        </h4>
                        <span className="text-[10px] text-[var(--app-text-muted)]">
                          {group.items.length} {group.items.length === 1 ? 'collection' : 'collections'} recorded on this day
                        </span>
                      </div>
                    </div>

                    {/* Right side: Day Total & Mode Breakdown */}
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">Day Collection Total</span>
                        <span className="text-base font-bold text-[var(--app-sage)] font-['Outfit',sans-serif]">
                          ₹{group.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TRANSACTIONS ON THIS DATE */}
                  <div className="divide-y divide-[var(--app-border-subtle)]">
                    {group.items.map(item => (
                      <div 
                        key={item.id}
                        className="p-3.5 sm:px-5 hover:bg-[var(--app-surface-hover)] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[var(--app-surface-subtle)] border border-[var(--app-border)] flex items-center justify-center text-[var(--app-text-secondary)] font-mono text-[10px] shrink-0 mt-0.5">
                            <Receipt className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[var(--app-text-primary)] text-xs sm:text-sm">
                                {item.customerName}
                              </span>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)] border border-[var(--app-badge-border)]">
                                {item.receiptNo || 'REC'}
                              </span>
                            </div>
                            <div className="text-[11px] text-[var(--app-text-secondary)] flex items-center gap-2 mt-0.5">
                              <span className="font-medium text-[var(--app-text-primary)]">{item.stageName}</span>
                              <span>•</span>
                              <span>{item.section}</span>
                              <span>•</span>
                              <span className="font-mono text-[10px]">{item.consumerNo}</span>
                            </div>
                            {item.remarks && (
                              <p className="text-[10px] text-[var(--app-text-muted)] italic mt-0.5">
                                "{item.remarks}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Amount & Mode & Print Button */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto shrink-0 pl-11 sm:pl-0">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)] border border-[var(--app-badge-border)] inline-block uppercase">
                              {item.paymentMode} {item.referenceNo ? `(${item.referenceNo})` : ''}
                            </span>
                            <span className="block font-bold text-sm text-[var(--app-sage)] mt-0.5">
                              ₹{Number(item.amount).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setSelectedReceiptForView(item)}
                              className="px-2.5 py-1.5 rounded-xl bg-[var(--app-accent-subtle)] hover:bg-[var(--app-accent-subtle)]/80 text-[var(--app-accent-text)] border border-[var(--app-accent-border)] font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                              title="Print / WhatsApp Official Receipt"
                            >
                              <Printer className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                              <span>Receipt</span>
                            </button>

                            <button
                              onClick={() => handleDeleteStage(item.id)}
                              className="p-1.5 text-[var(--app-text-muted)] hover:text-[var(--app-rose)] transition cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SESSION 3: MONTHLY SUMMARY (PER MONTH)                 */}
      {/* ========================================================= */}
      {currentSubSession === 'monthly' && (
        <div className="space-y-4">
          
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--app-accent)]" />
              <div>
                <h3 className="text-sm font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                  Monthly Payment Collections Summary
                </h3>
                <p className="text-xs text-[var(--app-text-secondary)]">
                  Month-by-month financial ledger breakdown with payment mode distributions
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-[var(--app-sage)]">
              {monthlyLedgerGroups.length} Active Months
            </span>
          </div>

          {/* MONTHLY CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {monthlyLedgerGroups.length === 0 ? (
              <div className="col-span-full bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl py-14 text-center text-xs text-[var(--app-text-muted)]">
                No monthly payment records found.
              </div>
            ) : (
              monthlyLedgerGroups.map(monthData => (
                <div 
                  key={monthData.monthKey}
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] rounded-2xl p-5 transition shadow-xs space-y-4 flex flex-col justify-between"
                >
                  
                  {/* Top: Month Header & Gross Revenue */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)]">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                            {formatMonthLabel(monthData.monthKey)}
                          </h4>
                          <span className="text-[10px] text-[var(--app-text-muted)]">
                            {monthData.count} stage payments recorded
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">Month Inflow</span>
                        <span className="text-xl font-bold text-[var(--app-sage)] font-['Outfit',sans-serif]">
                          ₹{monthData.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Mode Breakdown Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[var(--app-border-subtle)] mt-4 text-xs">
                      <div className="bg-[var(--app-surface-subtle)] p-2 rounded-xl border border-[var(--app-border-subtle)]">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">Cash</span>
                        <span className="font-bold text-[var(--app-text-primary)]">
                          ₹{monthData.modes.CASH.toLocaleString()}
                        </span>
                      </div>

                      <div className="bg-[var(--app-surface-subtle)] p-2 rounded-xl border border-[var(--app-border-subtle)]">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">UPI / Online</span>
                        <span className="font-bold text-[var(--app-text-primary)]">
                          ₹{monthData.modes.UPI.toLocaleString()}
                        </span>
                      </div>

                      <div className="bg-[var(--app-surface-subtle)] p-2 rounded-xl border border-[var(--app-border-subtle)]">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">Bank Transfer</span>
                        <span className="font-bold text-[var(--app-text-primary)]">
                          ₹{(monthData.modes.NEFT + monthData.modes.CHEQUE).toLocaleString()}
                        </span>
                      </div>

                      <div className="bg-[var(--app-surface-subtle)] p-2 rounded-xl border border-[var(--app-border-subtle)]">
                        <span className="text-[10px] text-[var(--app-text-muted)] block">Bank Loan</span>
                        <span className="font-bold text-[var(--app-text-primary)]">
                          ₹{monthData.modes.LOAN.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Days in Month breakdown */}
                    <div className="mt-4 pt-3 border-t border-[var(--app-border-subtle)] space-y-1.5">
                      <span className="text-[11px] font-bold text-[var(--app-text-secondary)] block">
                        Collection Days in this Month ({monthData.datesMap.size}):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                        {Array.from(monthData.datesMap.entries()).map(([dStr, dAmt]) => (
                          <div key={dStr} className="flex items-center justify-between bg-[var(--app-surface-subtle)]/70 px-2.5 py-1 rounded-lg border border-[var(--app-border-subtle)] text-[11px]">
                            <span className="text-[var(--app-text-muted)]">{dStr.slice(-5)}:</span>
                            <span className="font-bold text-[var(--app-sage)]">₹{dAmt.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Bottom Action: View in Daily Ledger */}
                  <div className="pt-3 border-t border-[var(--app-border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--app-text-muted)]">
                      Avg per payment: ₹{monthData.count > 0 ? Math.round(monthData.totalAmount / monthData.count).toLocaleString() : 0}
                    </span>

                    <button
                      onClick={() => viewDailyForMonth(monthData.monthKey)}
                      className="px-3 py-1.5 rounded-xl bg-[var(--app-accent-subtle)] hover:bg-[var(--app-accent-subtle)]/80 text-[var(--app-accent-text)] border border-[var(--app-accent-border)] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>View Daily Dates</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD PAYMENT STAGE FOR CUSTOMER                     */}
      {/* ========================================================= */}
      {isAddStageModalOpen && targetCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs">
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                    Add Payment Record
                  </h3>
                  <p className="text-xs text-[var(--app-text-secondary)]">
                    Adding payment collection record for {targetCustomer.customerName || targetCustomer.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStageModalOpen(false)}
                className="p-1.5 rounded-xl bg-[var(--app-surface-subtle)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Customer Summary Card */}
            <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] p-3 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[var(--app-text-muted)] block">Customer &amp; Plant</span>
                <span className="font-bold text-[var(--app-text-primary)]">{targetCustomer.customerName || targetCustomer.name}</span>
                <span className="text-[var(--app-text-muted)] block font-mono text-[10px]">{targetCustomer.consumerNo}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[var(--app-text-muted)] block">Total Bill / Remaining</span>
                <span className="font-bold text-[var(--app-text-primary)]">
                  ₹{Number(targetCustomer.totalBill || targetCustomer.totalAmount || 250000).toLocaleString()}
                </span>
                <span className="text-[var(--app-rose)] block font-bold text-[10px]">
                  Balance: ₹{Number(targetCustomer.balanceRemaining !== undefined ? targetCustomer.balanceRemaining : targetCustomer.totalBill || 250000).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSavePaymentStage} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--app-text-secondary)] font-semibold mb-1">Amount Collected (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="0"
                    value={stageAmount}
                    onChange={e => setStageAmount(e.target.value)}
                    onFocus={e => { if (e.target.value === '0') setStageAmount(''); }}
                    onBlur={e => { if (e.target.value === '') setStageAmount(0); }}
                    className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-2.5 text-[var(--app-text-primary)] font-bold text-sm outline-none focus:border-[var(--app-accent)] transition"
                  />
                </div>

                <div>
                  <label className="block text-[var(--app-text-secondary)] font-semibold mb-1">Collection Date *</label>
                  <input
                    type="date"
                    required
                    value={stageDate}
                    onChange={e => setStageDate(e.target.value)}
                    className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-2.5 text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--app-text-secondary)] font-semibold mb-1">Payment Mode *</label>
                <select
                  value={stageMode}
                  onChange={e => setStageMode(e.target.value)}
                  className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-2.5 text-[var(--app-text-primary)] font-semibold outline-none focus:border-[var(--app-accent)] transition"
                >
                  <option value="CASH">Cash in Hand</option>
                  <option value="UPI">UPI / GPay / PhonePe</option>
                  <option value="NEFT">Bank Transfer (NEFT/RTGS/IMPS)</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="LOAN">Bank Loan Disbursal</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--app-text-secondary)] font-semibold mb-1">Internal Remarks / Notes</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Advance paid on site survey; balance on delivery"
                  value={stageRemarks}
                  onChange={e => setStageRemarks(e.target.value)}
                  className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl p-2.5 text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--app-border)]">
                <button
                  type="button"
                  onClick={() => setIsAddStageModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--app-surface-subtle)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-secondary)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-white transition shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{isSubmitting ? 'Saving to Cloud...' : 'Save Record & Generate Receipt'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL PAYMENT RECEIPT */}
      {selectedReceiptForView && (
        <PaymentReceiptModal
          stage={selectedReceiptForView}
          onClose={() => setSelectedReceiptForView(null)}
        />
      )}

      {/* MODAL: COMPREHENSIVE CUSTOMER BILL */}
      {selectedCustomerForBill && (
        <CustomerBillModal
          customer={selectedCustomerForBill}
          onClose={() => setSelectedCustomerForBill(null)}
        />
      )}

    </div>
  );
}
