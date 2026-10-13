import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PaymentReceiptModal from './PaymentReceiptModal';
import { 
  X, 
  Download, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Cloud, 
  Layers, 
  Sparkles,
  ChevronDown,
  Check
} from 'lucide-react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { CATEGORY_LABELS } from '../data/financeData';

const REMOVED_CATEGORIES = [
  'Fabrication Cost',
  'Electrical Work',
  'Earthing & Lightning Arrester',
];

const DEFAULT_CATEGORIES = [
  'Structure Cost',
  'Agreement Fee',
  'KSEB Feasibility',
  'Plant Registration',
  'Transportation Cost',
  'Miscellaneous Charges',
];

const sanitizeCategories = (list) => {
  return (list || []).filter(cat => 
    !REMOVED_CATEGORIES.some(rem => rem.toLowerCase() === (cat || '').trim().toLowerCase())
  );
};

// Helper to map classification code to proper label
const mapCategoryCodeToLabel = (code) => {
  if (code === 'structure') return 'Structure Cost';
  if (code === 'agreement') return 'Agreement Fee';
  if (code === 'feasibility') return 'KSEB Feasibility';
  if (code === 'registration') return 'Plant Registration';
  return 'Structure Cost';
};

export default function FinanceReceipt({ account, entry: initialEntry, onClose, initialAutoDownload = false }) {
  if (!account) return null;

  const positiveEntries = useMemo(() => {
    return (account.entries || []).filter(e => e.value > 0);
  }, [account]);

  // Unique customer document key in Firestore
  const customerDocId = useMemo(() => {
    if (!account) return 'unknown';
    if (account.consumer && account.consumer.trim() && account.consumer !== 'Pending') {
      return `cust_${account.consumer.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    }
    const cleanName = (account.name || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    return `row_${account.row || 0}_${cleanName || 'cust'}`;
  }, [account]);

  // Determine initial payment selection
  const initialSelectionId = initialEntry
    ? initialEntry.id
    : positiveEntries.length === 1
      ? positiveEntries[0].id
      : 'total';

  const [selectedId, setSelectedId] = useState(initialSelectionId);

  // Compute selected payment details
  const activeEntry = useMemo(() => {
    if (selectedId === 'total') return null;
    return positiveEntries.find(e => e.id === selectedId) || null;
  }, [selectedId, positiveEntries]);

  const activeAmount = activeEntry ? activeEntry.value : (account.net ?? account.received ?? 0);

  const getTodayFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const initialDate = getTodayFormatted();
  const initialRef = activeEntry
    ? `SW-${account.row}-${activeEntry.index}`
    : `SW-${account.row}-ALL`;

  const [date, setDate] = useState(initialDate);
  const [reference, setReference] = useState(initialRef);
  const [mode, setMode] = useState('UPI');
  const [preview, setPreview] = useState(initialAutoDownload);
  const [autoDownload, setAutoDownload] = useState(initialAutoDownload);

  // --- Category Management & Firestore Sync ---
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [cloudSynced, setCloudSynced] = useState(false);

  // Charges state (from negative sheet entries)
  const initialSheetCharges = useMemo(() => {
    const neg = (account.entries || []).filter(e => e.value < 0);
    return neg.map(e => ({
      id: e.id,
      index: e.index,
      amount: Math.abs(e.value),
      category: mapCategoryCodeToLabel(e.category),
      included: true
    }));
  }, [account]);

  const [charges, setCharges] = useState(initialSheetCharges);
  const [manualCharges, setManualCharges] = useState([]);

  // Load global custom categories from Firestore & localStorage
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const localCached = localStorage.getItem('smartway_cost_categories');
        let initialList = DEFAULT_CATEGORIES;
        if (localCached) {
          try {
            const parsed = JSON.parse(localCached);
            if (Array.isArray(parsed) && parsed.length) {
              initialList = sanitizeCategories(Array.from(new Set([...DEFAULT_CATEGORIES, ...parsed])));
            }
          } catch (_) {}
        }
        initialList = sanitizeCategories(initialList);
        if (isMounted) setCategories(initialList);

        if (db) {
          const catDocRef = doc(db, 'finance_meta', 'cost_categories');
          const catSnap = await getDoc(catDocRef);
          if (catSnap.exists() && isMounted) {
            const cloudList = catSnap.data().categories || [];
            if (Array.isArray(cloudList) && cloudList.length > 0) {
              const merged = sanitizeCategories(Array.from(new Set([...initialList, ...cloudList])));
              setCategories(merged);
              localStorage.setItem('smartway_cost_categories', JSON.stringify(merged));
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching categories from Firestore:', err);
      }
    };

    loadCategories();
    return () => { isMounted = false; };
  }, []);

  // Load customer's specific configuration from Firestore & localStorage
  useEffect(() => {
    let isMounted = true;
    const loadCustomerConfig = async () => {
      try {
        let loadedConfig = null;
        const localKey = `smartway_receipt_${customerDocId}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          try {
            loadedConfig = JSON.parse(localData);
          } catch (_) {}
        }

        if (db) {
          const configDocRef = doc(db, 'finance_receipts', customerDocId);
          const configSnap = await getDoc(configDocRef);
          if (configSnap.exists()) {
            loadedConfig = configSnap.data();
            localStorage.setItem(localKey, JSON.stringify(loadedConfig));
          }
        }

        if (loadedConfig && isMounted) {
          // Re-map saved charges to current entries
          if (Array.isArray(loadedConfig.charges) && loadedConfig.charges.length > 0) {
            setCharges(prevCharges => {
              return prevCharges.map(ch => {
                const saved = loadedConfig.charges.find(s => s.id === ch.id || s.index === ch.index);
                if (saved) {
                  return {
                    ...ch,
                    category: saved.category || ch.category,
                    included: typeof saved.included === 'boolean' ? saved.included : ch.included
                  };
                }
                return ch;
              });
            });
          }

          if (Array.isArray(loadedConfig.manualCharges)) {
            setManualCharges(loadedConfig.manualCharges);
          }

          setCloudSynced(true);
        }
      } catch (err) {
        console.warn('Error loading customer receipt config:', err);
      }
    };

    loadCustomerConfig();
    return () => { isMounted = false; };
  }, [customerDocId]);

  // Persist customer configuration to Firestore and localStorage
  const saveCustomerConfig = useCallback(async (currentCharges = charges, currentManual = manualCharges) => {
    const configData = {
      accountId: account.id,
      customerName: account.name,
      consumerNo: account.consumer || '',
      row: account.row,
      charges: currentCharges.map(c => ({
        id: c.id,
        index: c.index,
        amount: c.amount,
        category: c.category,
        included: c.included
      })),
      manualCharges: currentManual.map(m => ({
        id: m.id,
        category: m.category,
        amount: Number(m.amount) || 0,
        included: m.included
      })),
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(`smartway_receipt_${customerDocId}`, JSON.stringify(configData));
      if (db) {
        await setDoc(doc(db, 'finance_receipts', customerDocId), configData, { merge: true });
        setCloudSynced(true);
      }
    } catch (err) {
      console.warn('Error saving customer receipt config to Firestore:', err);
    }
  }, [account, customerDocId, charges, manualCharges]);

  // Add a new custom category (e.g. "Transportation Cost") and persist for all customers
  const handleAddNewCategory = async () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;

    // Check if category already exists (case-insensitive)
    const exists = categories.some(c => c.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setNewCategoryInput('');
      setIsAddingCategory(false);
      return;
    }

    const updated = [...categories, trimmed];
    setCategories(updated);
    setNewCategoryInput('');
    setIsAddingCategory(false);

    try {
      localStorage.setItem('smartway_cost_categories', JSON.stringify(updated));
      if (db) {
        await setDoc(doc(db, 'finance_meta', 'cost_categories'), {
          categories: updated,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Failed to save category to Firestore:', err);
    }
  };

  // Modify category of a charge row
  const handleChargeCategoryChange = (chargeId, newCategory) => {
    const updated = charges.map(ch => ch.id === chargeId ? { ...ch, category: newCategory } : ch);
    setCharges(updated);
    saveCustomerConfig(updated, manualCharges);
  };

  // Toggle charge inclusion
  const handleChargeToggle = (chargeId, included) => {
    const updated = charges.map(ch => ch.id === chargeId ? { ...ch, included } : ch);
    setCharges(updated);
    saveCustomerConfig(updated, manualCharges);
  };

  // Add manual charge row
  const handleAddManualCharge = () => {
    const newEntry = {
      id: `manual-${Date.now()}`,
      category: categories[0] || 'Transportation Cost',
      amount: '',
      included: true
    };
    const updated = [...manualCharges, newEntry];
    setManualCharges(updated);
  };

  // Modify manual charge category
  const handleManualCategoryChange = (id, newCategory) => {
    const updated = manualCharges.map(m => m.id === id ? { ...m, category: newCategory } : m);
    setManualCharges(updated);
    saveCustomerConfig(charges, updated);
  };

  // Modify manual charge amount
  const handleManualAmountChange = (id, value) => {
    const num = value === '' ? '' : Math.max(0, Number(value));
    const updated = manualCharges.map(m => m.id === id ? { ...m, amount: num } : m);
    setManualCharges(updated);
    saveCustomerConfig(charges, updated);
  };

  // Toggle manual charge inclusion
  const handleManualToggle = (id, included) => {
    const updated = manualCharges.map(m => m.id === id ? { ...m, included } : m);
    setManualCharges(updated);
    saveCustomerConfig(charges, updated);
  };

  // Remove manual charge
  const handleRemoveManual = (id) => {
    const updated = manualCharges.filter(m => m.id !== id);
    setManualCharges(updated);
    saveCustomerConfig(charges, updated);
  };

  // Aggregated Office Items for Receipt:
  // Combines multiple items of the SAME CATEGORY (e.g. multiple "Structure Cost") together into ONE entry!
  const officeItems = useMemo(() => {
    const categoryTotals = new Map();

    // 1. Sum up sheet-based charges
    charges.forEach(ch => {
      if (!ch.included) return;
      const cat = (ch.category || '').trim();
      if (!cat) return;
      const amt = Number(ch.amount) || 0;
      if (amt <= 0) return;
      categoryTotals.set(cat, (categoryTotals.get(cat) || 0) + amt);
    });

    // 2. Sum up manual charges
    manualCharges.forEach(mc => {
      if (!mc.included) return;
      const cat = (mc.category || '').trim();
      if (!cat) return;
      const amt = Number(mc.amount) || 0;
      if (amt <= 0) return;
      categoryTotals.set(cat, (categoryTotals.get(cat) || 0) + amt);
    });

    // If no charges were found/checked, fall back to default logic if sheet had expense numbers
    if (categoryTotals.size === 0) {
      if (charges.length === 0 && account.expenses > 0) {
        return [{ label: 'Fees & plant registration', amount: account.expenses }];
      }
      if (charges.length === 0 && account.balance < 0) {
        return [{ label: 'Office payment / deduction', amount: Math.abs(account.balance) }];
      }
      return [];
    }

    return Array.from(categoryTotals.entries()).map(([label, amount]) => ({
      label,
      amount
    }));
  }, [charges, manualCharges, account]);

  // Handle milestone selection change
  const handleSelectionChange = (newId) => {
    setSelectedId(newId);
    if (newId === 'total') {
      setReference(`SW-${account.row}-ALL`);
    } else {
      const e = positiveEntries.find(entry => entry.id === newId);
      if (e) {
        setReference(`SW-${account.row}-${e.index}`);
      }
    }
    setDate(getTodayFormatted());
  };

  const remarks = activeEntry
    ? `Customer payment (Entry #${activeEntry.index}), Source row ${account.row}`
    : `Cumulative solar project payments to date (${account.capacity ? `${account.capacity} kW` : 'Solar plant'})`;

  if (preview) {
    return (
      <PaymentReceiptModal
        onClose={onClose}
        autoDownload={autoDownload}
        receipt={{
          customerName: account.name,
          consumerNo: account.consumer || 'Pending',
          capacityKW: account.capacity || 3,
          amount: activeAmount,
          paymentDate: date || getTodayFormatted(),
          receiptNo: reference || `REC-${account.row}`,
          paymentMode: mode,
          referenceNo: '',
          remarks,
          totalProjectCost: account.bill,
          cumulativePaid: (account.received || account.net) ?? activeAmount,
          balanceRemaining: account.balance,
          officeExpenses: account.expenses || (account.balance < 0 ? Math.abs(account.balance) : 0),
          officeItems,
        }}
      />
    );
  }

  const handleDownloadClick = async (e) => {
    e.preventDefault();
    await saveCustomerConfig();
    setAutoDownload(true);
    setPreview(true);
  };

  const handlePreviewClick = async (e) => {
    e.preventDefault();
    await saveCustomerConfig();
    setAutoDownload(false);
    setPreview(true);
  };

  const totalOtherChargesAmount = officeItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="finance-receipt-overlay" role="dialog" aria-modal="true" aria-label="Download payment receipt">
      <div className="finance-receipt-form">
        <div className="finance-panel-heading">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            <h2 className="text-base font-bold text-[var(--app-text-primary)]">Download Payment Receipt</h2>
          </div>
          <button type="button" aria-label="Close receipt" onClick={onClose} className="cursor-pointer text-[var(--app-text-secondary)] hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Customer Summary Card */}
        <div className="p-3 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[var(--app-text-primary)] text-sm">{account.name}</span>
            <div className="flex items-center gap-1.5">
              {cloudSynced && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-semibold flex items-center gap-1" title="Saved and synced with Firestore">
                  <Cloud size={11} /> Saved
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                {account.capacity ? `${account.capacity} kW Solar` : 'Solar Project'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[var(--app-text-secondary)] text-[11px]">
            <span>Consumer: <b>{account.consumer || 'Pending'}</b></span>
            <span>Row #{account.row}</span>
          </div>
          {account.bill !== null && (() => {
            const effectiveBill = (account.bill || 0) + totalOtherChargesAmount;
            const effectivePaid = (account.received || account.net) ?? activeAmount;
            const effectiveBal = effectiveBill - effectivePaid;

            return (
              <div className="pt-1.5 border-t border-[var(--app-border-subtle)] flex items-center justify-between text-[11px]">
                <span>
                  Bill Amount: <b>₹{effectiveBill.toLocaleString('en-IN')}</b>
                  {totalOtherChargesAmount > 0 && (
                    <span className="text-[10px] text-[var(--app-text-secondary)] font-normal ml-1">
                      (₹{account.bill?.toLocaleString('en-IN')} + ₹{totalOtherChargesAmount.toLocaleString('en-IN')})
                    </span>
                  )}
                </span>
                {effectiveBal > 0 ? (
                  <span>Balance: <b className="text-amber-400">₹{effectiveBal.toLocaleString('en-IN')}</b></span>
                ) : (
                  <span className="text-emerald-400 font-semibold">✓ Paid in full</span>
                )}
              </div>
            );
          })()}
        </div>

        <form onSubmit={handleDownloadClick} className="flex flex-col gap-3.5">
          {/* Payment selection if multiple payments exist */}
          {positiveEntries.length > 1 && (
            <label className="flex flex-col gap-1 text-xs">
              <span className="font-semibold text-[var(--app-text-secondary)]">Receipt For:</span>
              <select
                value={selectedId}
                onChange={e => handleSelectionChange(e.target.value)}
                className="bg-[var(--app-bg)] p-2 rounded-lg border border-[var(--app-border)] text-xs text-[var(--app-text-primary)]"
              >
                <option value="total">
                  Total Paid to Date (₹{(account.net ?? account.received ?? 0).toLocaleString('en-IN')})
                </option>
                {positiveEntries.map(e => (
                  <option key={e.id} value={e.id}>
                    Milestone #{e.index}: ₹{e.value.toLocaleString('en-IN')} {e.date ? `(${e.date})` : ''}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Amount banner */}
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-medium">Total Amount Received</span>
            <span className="text-base font-black text-emerald-400">
              ₹{Number((account.net ?? account.received) ?? activeAmount).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex flex-col gap-1 text-xs">
              <span className="font-semibold text-[var(--app-text-secondary)]">Receipt Reference #</span>
              <input
                required
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="e.g. SW-12-1"
                className="bg-[var(--app-bg)] p-2 rounded-lg border border-[var(--app-border)] text-xs text-[var(--app-text-primary)]"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs">
              <span className="font-semibold text-[var(--app-text-secondary)]">Payment Date</span>
              <input
                required
                placeholder="DD/MM/YYYY"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-[var(--app-bg)] p-2 rounded-lg border border-[var(--app-border)] text-xs text-[var(--app-text-primary)]"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs">
              <span className="font-semibold text-[var(--app-text-secondary)]">Payment Mode</span>
              <select
                value={mode}
                onChange={e => setMode(e.target.value)}
                className="bg-[var(--app-bg)] p-2 rounded-lg border border-[var(--app-border)] text-xs text-[var(--app-text-primary)]"
              >
                {['UPI', 'Bank transfer', 'Cash', 'Cheque', 'Card'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>

          {/* --- Other Charges Section (Interactive Dropdown & Add Categories) --- */}
          <div className="finance-charges-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-[var(--app-text-primary)]">
                  Other Charges (Deductions &amp; Expenses)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(prev => !prev)}
                  className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 flex items-center gap-1 transition cursor-pointer"
                  title="Add new category like Transportation Cost to the dropdown list for all customers"
                >
                  <Plus size={12} />
                  <span>New Category</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddManualCharge}
                  className="px-2 py-1 rounded-md text-[11px] font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 transition cursor-pointer"
                  title="Add an additional cost entry"
                >
                  <Plus size={12} />
                  <span>Add Cost</span>
                </button>
              </div>
            </div>

            {/* Inline Add New Category Box */}
            {isAddingCategory && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Transportation Cost, Site Expenses..."
                  value={newCategoryInput}
                  onChange={e => setNewCategoryInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddNewCategory(); } }}
                  className="flex-1 bg-[var(--app-surface)] text-xs text-[var(--app-text-primary)] px-2.5 py-1.5 rounded-lg border border-[var(--app-border)] focus:border-amber-400"
                  autoFocus
                />
                <div className="flex items-center gap-1.5 justify-end">
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    disabled={!newCategoryInput.trim()}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold text-xs rounded-lg transition cursor-pointer"
                  >
                    Save Category
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsAddingCategory(false); setNewCategoryInput(''); }}
                    className="px-2.5 py-1.5 text-xs text-[var(--app-text-secondary)] hover:text-white rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Charges from sheet */}
            {charges.length === 0 && manualCharges.length === 0 ? (
              <p className="text-[11px] text-[var(--app-text-secondary)] italic py-1">
                No expense deductions found in customer breakdown. Click "+ Add Cost" to include items like Transportation Cost.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {charges.map(ch => (
                  <div key={ch.id} className="finance-charge-row">
                    <input
                      type="checkbox"
                      checked={ch.included}
                      onChange={e => handleChargeToggle(ch.id, e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded cursor-pointer shrink-0"
                      title="Include on receipt"
                    />
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold shrink-0">
                      #{ch.index}
                    </span>
                    <span className="text-xs font-bold text-rose-400 shrink-0 min-w-16">
                      -₹{ch.amount.toLocaleString('en-IN')}
                    </span>
                    <select
                      value={ch.category}
                      onChange={e => handleChargeCategoryChange(ch.id, e.target.value)}
                      className="flex-1 bg-[var(--app-bg)] text-xs text-[var(--app-text-primary)] border border-[var(--app-border)] rounded-lg p-1.5 cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* Additional manual charges */}
                {manualCharges.map(mc => (
                  <div key={mc.id} className="finance-charge-row border-emerald-500/30">
                    <input
                      type="checkbox"
                      checked={mc.included}
                      onChange={e => handleManualToggle(mc.id, e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded cursor-pointer shrink-0"
                      title="Include on receipt"
                    />
                    <select
                      value={mc.category}
                      onChange={e => handleManualCategoryChange(mc.id, e.target.value)}
                      className="flex-1 bg-[var(--app-bg)] text-xs text-[var(--app-text-primary)] border border-[var(--app-border)] rounded-lg p-1.5 cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1 w-28 shrink-0">
                      <span className="text-xs text-[var(--app-text-secondary)]">₹</span>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={mc.amount}
                        onChange={e => handleManualAmountChange(mc.id, e.target.value)}
                        className="w-full bg-[var(--app-bg)] text-xs text-[var(--app-text-primary)] p-1.5 rounded-lg border border-[var(--app-border)] focus:border-emerald-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveManual(mc.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded transition shrink-0 cursor-pointer"
                      title="Remove charge"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Combined preview summary (sums duplicate categories together as one!) */}
            {officeItems.length > 0 && (
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5 mt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Sparkles size={12} />
                    Combined on Receipt:
                  </span>
                  <span className="text-amber-300">
                    Total: ₹{totalOtherChargesAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {officeItems.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold flex items-center gap-1"
                    >
                      <span>{item.label}:</span>
                      <span className="font-bold text-white">₹{item.amount.toLocaleString('en-IN')}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <small className="text-[11px] text-[var(--app-text-secondary)]">
            Receipt selections are saved to Firestore so they are remembered next time. Official seal &amp; letterhead are added to PDF.
          </small>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--app-border-subtle)]">
            <button
              type="submit"
              className="flex-1 finance-button finance-primary flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              title="Save configuration and download official PDF receipt"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePreviewClick}
              className="finance-button flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer"
              title="Preview receipt before downloading or share via WhatsApp"
            >
              <Eye size={15} />
              <span>Preview</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="finance-button py-2.5 px-3 rounded-xl text-xs text-[var(--app-text-secondary)] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
