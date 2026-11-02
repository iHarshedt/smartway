import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import PendingApprovalBanner from './components/PendingApprovalBanner';
import TeamPortalPage from './components/TeamPortalPage';
import KSEBBillCalculator from './components/KSEBBillCalculator';
import SalesPage from './components/SalesPage';
import KSEBBillView from './components/KSEBBillView';
import FinanceLedgerPage from './components/FinanceLedgerPage';
import OperationPage from './components/OperationPage';
import AMCPage from './components/AMCPage';
import AMCDuePage from './components/AMCDuePage';
import QuotationGenerator from './components/QuotationGenerator';
import { 
  TrendingUp, 
  Truck,
  Zap, 
  Search, 
  Sun, 
  Moon,
  ShieldCheck, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Receipt,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  LogOut,
  Shield,
  FileText,
  Menu,
  X,
  LayoutGrid,
  Check
} from 'lucide-react';

function AppContent() {
  const { user, userProfile, role, isAdmin, isPending, loading, logout, isVendor } = useAuth();
  const [activeTab, setActiveTab] = useState(() => (role === 'vendor' ? 'quotation' : 'sales')); // 'sales' | 'finance' | 'quotation' | 'calculator' | 'lookup' | 'team'
  const [financeSubTab, setFinanceSubTab] = useState('customers'); // 'customers' | 'daily' | 'monthly'
  const [amcSubTab, setAmcSubTab] = useState('records');
  const [selectedCustomerForCalc, setSelectedCustomerForCalc] = useState(null);
  const [selectedCustomerForPayment, setSelectedCustomerForPayment] = useState(null);
  const [selectedCustomerForQuote, setSelectedCustomerForQuote] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileTabListRef = useRef(null);

  // Auto-scroll active tab into view in mobile tab bar
  useEffect(() => {
    if (mobileTabListRef.current) {
      const activeBtn = mobileTabListRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  // Tab definitions with roles & visual metadata
  const allTabs = useMemo(() => {
    if (isVendor) {
      return [
        {
          id: 'quotation',
          label: 'Quotation',
          fullLabel: 'Quotation Generator',
          icon: FileText,
          badge: 'Vendor Portal',
          desc: 'Equipment quotation and solar proposals',
        }
      ];
    }

    const list = [
      {
        id: 'sales',
        label: 'Sales',
        fullLabel: 'Sales Pipeline & Leads',
        icon: TrendingUp,
        badge: 'Master',
        desc: 'Customer deals, WhatsApp proposals & lead tracking',
      },
      {
        id: 'operation',
        label: 'Operation',
        fullLabel: 'Operations & Delivery',
        icon: Truck,
        badge: null,
        desc: 'Delivered installations & follow-ups',
      },
      {
        id: 'finance',
        label: 'Finance',
        fullLabel: 'Finance & Accounts',
        icon: Receipt,
        badge: 'Ledger',
        desc: 'Customer accounts, receipts, balances & expenses',
      },
      {
        id: 'amc',
        label: 'AMC',
        fullLabel: 'AMC Services & Due',
        icon: Calendar,
        badge: null,
        desc: 'Annual maintenance contracts & section due counts',
      },
      {
        id: 'quotation',
        label: 'Quotation',
        fullLabel: 'Quotation Generator',
        icon: FileText,
        badge: 'MSP',
        ping: Boolean(selectedCustomerForQuote),
        desc: 'Generate official solar proposals with subsidy calculation',
      },
      {
        id: 'calculator',
        label: 'Calculator',
        fullLabel: 'KSEB Bill Calculator',
        icon: Zap,
        badge: null,
        ping: Boolean(selectedCustomerForCalc),
        desc: 'Simulate solar savings under Kerala KSEB 2025/2026 tariff',
      },
      {
        id: 'lookup',
        label: 'Lookup',
        fullLabel: 'Consumer Lookup',
        icon: Search,
        badge: null,
        desc: 'Instant KSEB bill & consumer record search',
      },
    ];

    if (isAdmin) {
      list.push({
        id: 'team',
        label: 'Team',
        fullLabel: 'Team Portal & Roles',
        icon: Users,
        badge: 'Roles',
        desc: 'Manage authenticated members, role permissions & access approvals',
      });
    }

    return list;
  }, [isVendor, isAdmin, selectedCustomerForQuote, selectedCustomerForCalc]);

  // If role is vendor, strictly restrict to quotation tab
  useEffect(() => {
    if (isVendor || role === 'vendor') {
      setActiveTab('quotation');
    }
  }, [isVendor, role]);
  
  // Theme state: 'dark' (Claude Dark) | 'light' (Claude Warm White)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('smartway_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('smartway_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Navigate from Sales Page or Consumer Lookup directly into KSEB Calculator
  const handleOpenCalculatorWithDeal = (dealOrCustomer) => {
    setSelectedCustomerForCalc(dealOrCustomer);
    setActiveTab('calculator');
  };

  // Navigate directly into Finance & Receipts with customer pre-selected
  const handleOpenPaymentWithDeal = (dealOrCustomer) => {
    setSelectedCustomerForPayment(dealOrCustomer);
    setActiveTab('finance');
  };

  // Navigate directly into Quotation Generator with deal pre-selected
  const handleOpenQuoteWithDeal = (dealOrCustomer) => {
    setSelectedCustomerForQuote(dealOrCustomer);
    setActiveTab('quotation');
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--app-bg,#0f172a)] flex flex-col items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-12 h-12 border-3 border-[var(--app-accent,#CC785C)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold text-[var(--app-text-muted,#94a3b8)]">
          Connecting to Smart Way Portal...
        </p>
      </div>
    );
  }

  // Not Logged In -> Show Google Sign-in Page
  if (!user) {
    return <LoginPage />;
  }

  // Logged In but Role is Pending & Not Admin -> Show Review Notice
  if (isPending && !isAdmin) {
    return <PendingApprovalBanner />;
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text-primary)] selection:bg-[var(--app-accent)] selection:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      
      {/* TOP NOTIFICATION / TRUST BANNER */}
      <div className="bg-[var(--app-surface)] border-b border-[var(--app-border)] px-4 py-1.5 text-center text-[11px] text-[var(--app-text-secondary)] font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--app-sage)] animate-pulse"></span>
        <span>Kerala KSEB Net-Metering 2025/2026 Tariff Active</span>
        <span className="text-[var(--app-text-muted)]">•</span>
        <span className="text-[var(--app-accent)] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 inline text-[var(--app-accent)]" />
          PM Surya Ghar Muft Bijli Yojana Subsidy up to ₹78,000 Direct DBT
        </span>
      </div>

      {/* MAIN TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[var(--app-header-bg)] backdrop-blur-xl border-b border-[var(--app-border)]">
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Logo & Brand Identity */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" 
              onClick={() => {
                setActiveTab(isVendor ? 'quotation' : 'sales');
                setMobileMenuOpen(false);
              }}
            >
              <img 
                src="/logo-512.png" 
                alt="Smart Way" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl object-contain shadow-md shadow-[#CC785C]/20 shrink-0 p-0.5 bg-white border border-[var(--app-border)]"
              />
              <div className="shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[var(--app-text-primary)] font-['Outfit',sans-serif] whitespace-nowrap">
                    SMART WAY
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)] whitespace-nowrap">
                    {isVendor ? 'Vendor' : 'CRM & EPC'}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--app-text-secondary)] font-medium hidden 2xl:block truncate max-w-[260px]">
                  Opp Malabar Gold &amp; Diamonds, Keethipadi Nilambur
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Visible on lg and larger) */}
            <nav className="hidden lg:flex items-center bg-[var(--app-surface-subtle)] border border-[var(--app-border)] p-1 rounded-2xl shadow-inner overflow-x-auto scrollbar-none shrink">
              {allTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                        : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive 
                          ? 'bg-black/20 text-white' 
                          : tab.badge === 'MSP' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : tab.badge === 'Roles'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                    {tab.ping && (
                      <span className="w-2 h-2 rounded-full bg-[var(--app-sage)] animate-ping"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User Profile & Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] transition shadow-xs cursor-pointer shrink-0"
                title={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#D4A359]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#CC785C]" />
                )}
              </button>

              {/* LOGGED IN USER PROFILE CARD */}
              <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-[var(--app-border)] shrink-0">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border border-[var(--app-border)] object-cover shadow-xs shrink-0" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--app-accent)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}

                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-[var(--app-text-primary)] truncate max-w-[110px]">
                    {user.displayName || 'Member'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                      role === 'vendor'
                        ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                        : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                    }`}>
                      {role || 'Team'}
                    </span>
                  </div>
                </div>

                {/* Mobile Hamburger / Menu Drawer Button (Visible on < lg) */}
                {!isVendor && (
                  <button
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                    className="lg:hidden p-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] transition shadow-xs cursor-pointer shrink-0 relative"
                    aria-label="Toggle all modules menu"
                    title="All Navigation Tabs"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-4 h-4 text-[var(--app-accent)]" />
                    ) : (
                      <Menu className="w-4 h-4" />
                    )}
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--app-accent)]"></span>
                  </button>
                )}

                {/* Sign Out Button */}
                <button
                  onClick={logout}
                  className="p-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-rose-500/15 hover:text-rose-400 text-[var(--app-text-muted)] transition shadow-xs cursor-pointer shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* MOBILE HORIZONTAL SCROLLABLE TAB STRIP (Visible only on < lg) */}
        {!isVendor && (
          <div className="lg:hidden border-t border-[var(--app-border)] bg-[var(--app-surface-subtle)]/80 px-2 py-1.5 shadow-xs">
            <div className="relative flex items-center">
              <nav 
                ref={mobileTabListRef}
                aria-label="Mobile Navigation Tabs"
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-1 w-full scroll-smooth touch-pan-x"
              >
                {allTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      data-tab-id={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[var(--app-accent)] text-white font-bold shadow-md scale-[1.02]'
                          : 'bg-[var(--app-surface)] text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)] border border-[var(--app-border)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? 'bg-black/25 text-white'
                            : tab.badge === 'MSP'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : tab.badge === 'Roles'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                      {tab.ping && (
                        <span className="w-2 h-2 rounded-full bg-[var(--app-sage)] animate-ping"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE FULL NAVIGATION DRAWER (Slide-over / Sheet) */}
      {!isVendor && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative bg-[var(--app-surface)] border-t border-[var(--app-border)] rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl space-y-4">
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--app-border)]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--app-accent-subtle)] flex items-center justify-center text-[var(--app-accent)] font-bold">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                    All Application Tabs
                  </h3>
                  <p className="text-[11px] text-[var(--app-text-muted)]">
                    Tap any module to switch view immediately
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[var(--app-surface-subtle)] text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-[var(--app-accent-subtle)] border-[var(--app-accent)] shadow-sm'
                        : 'bg-[var(--app-surface-subtle)]/50 border-[var(--app-border)] hover:bg-[var(--app-surface-hover)]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-[var(--app-accent)] text-white'
                        : 'bg-[var(--app-surface)] text-[var(--app-text-secondary)] border border-[var(--app-border)]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold ${
                            isActive ? 'text-[var(--app-accent-text)]' : 'text-[var(--app-text-primary)]'
                          }`}>
                            {tab.fullLabel}
                          </span>
                          {tab.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)]">
                              {tab.badge}
                            </span>
                          )}
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-bold text-[var(--app-accent)] flex items-center gap-0.5 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--app-text-muted)] mt-0.5 line-clamp-1">
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* User Profile Bar inside Drawer */}
            <div className="pt-3 border-t border-[var(--app-border)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-9 h-9 rounded-full border border-[var(--app-border)] object-cover" 
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[var(--app-accent)] text-white flex items-center justify-center font-bold text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-[var(--app-text-primary)]">
                    {user.displayName || 'Team Member'}
                  </div>
                  <div className="text-[10px] text-purple-400 font-bold uppercase">
                    Role: {role || 'Team'}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MENU FOR FINANCE & AMC */}
      {!isVendor && activeTab === 'amc' && (
        <nav aria-label="AMC pages" className="bg-[var(--app-surface-subtle)] border-b border-[var(--app-border)] px-3 sm:px-4 py-2">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-none py-0.5">
            {[['records', 'AMC Records'], ['due', 'AMC Due'], ['sections', 'Section Due Counts']].map(([key, label]) => (
              <button 
                key={key} 
                onClick={() => setAmcSubTab(key)} 
                aria-pressed={amcSubTab === key} 
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition ${
                  amcSubTab === key 
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs' 
                    : 'text-[var(--app-text-secondary)] hover:bg-[var(--app-surface)] bg-[var(--app-surface)]/60 border border-[var(--app-border)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}
      {!isVendor && activeTab === 'finance' && (
        <div className="bg-[var(--app-surface-subtle)] border-b border-[var(--app-border)] px-3 sm:px-4 py-2 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none py-0.5">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold text-[var(--app-text-muted)] uppercase tracking-wider mr-1 hidden sm:inline">
                Finance Views:
              </span>
              <button
                onClick={() => setFinanceSubTab('customers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  financeSubTab === 'customers'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Customer Ledger</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('daily')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  financeSubTab === 'daily'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Payment Breakdown</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('monthly')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  financeSubTab === 'monthly'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Office Expenses</span>
              </button>
            </div>

            <div className="text-[11px] text-[var(--app-text-muted)] hidden md:flex items-center gap-1.5 font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--app-sage)]"></span>
              <span>Receipts, expenses & customer balances</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6 pb-24 lg:pb-6">
        {isVendor ? (
          <div className="space-y-4">
            <QuotationGenerator />
          </div>
        ) : (
          <>
            {activeTab === 'operation' && <OperationPage onOpenPayment={handleOpenPaymentWithDeal} />}
            {activeTab === 'amc' && (amcSubTab === 'records' ? <AMCPage /> : <AMCDuePage view={amcSubTab} onOpenDue={() => setAmcSubTab('due')} />)}
            {activeTab === 'sales' && (
              <SalesPage 
                onOpenCalculator={handleOpenCalculatorWithDeal} 
                onOpenPayment={handleOpenPaymentWithDeal}
                onOpenQuote={handleOpenQuoteWithDeal}
              />
            )}

            {activeTab === 'quotation' && (
              <div className="space-y-4">
                {selectedCustomerForQuote && (
                  <div className="flex items-center justify-between bg-[var(--app-surface)] border border-[var(--app-border)] px-4 py-2.5 rounded-2xl text-xs">
                    <div className="flex items-center gap-2 text-[var(--app-text-primary)]">
                      <span className="text-[var(--app-accent)] font-bold">Active Lead:</span>
                      <span className="font-semibold">{selectedCustomerForQuote.customerName || selectedCustomerForQuote.name}</span>
                      <span className="text-[var(--app-text-secondary)]">({selectedCustomerForQuote.capacityKW || selectedCustomerForQuote.solarKW} kWp)</span>
                    </div>
                    <button
                      onClick={() => setSelectedCustomerForQuote(null)}
                      className="text-xs text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] underline cursor-pointer"
                    >
                      Clear &amp; New Quote
                    </button>
                  </div>
                )}
                <QuotationGenerator initialCustomer={selectedCustomerForQuote} />
              </div>
            )}

            {activeTab === 'finance' && (
              <FinanceLedgerPage 
                initialCustomerForPayment={selectedCustomerForPayment}
                activeSubSession={financeSubTab}
                onSubSessionChange={setFinanceSubTab}
              />
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-4">
                {selectedCustomerForCalc && (
                  <div className="flex items-center justify-between bg-[var(--app-surface)] border border-[var(--app-border)] px-4 py-2.5 rounded-2xl text-xs">
                    <div className="flex items-center gap-2 text-[var(--app-text-primary)]">
                      <span className="text-[var(--app-accent)] font-bold">Active Simulation:</span>
                      <span className="font-semibold">{selectedCustomerForCalc.customerName || selectedCustomerForCalc.name}</span>
                      <span className="text-[var(--app-text-secondary)]">({selectedCustomerForCalc.capacityKW || selectedCustomerForCalc.solarKW} kW)</span>
                    </div>
                    <button
                      onClick={() => setSelectedCustomerForCalc(null)}
                      className="text-xs text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] underline cursor-pointer"
                    >
                      Clear &amp; Reset
                    </button>
                  </div>
                )}
                <KSEBBillCalculator initialCustomer={selectedCustomerForCalc} />
              </div>
            )}

            {activeTab === 'lookup' && (
              <KSEBBillView onSelectCustomer={handleOpenCalculatorWithDeal} />
            )}

            {activeTab === 'team' && isAdmin && (
              <TeamPortalPage />
            )}
          </>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Thumb friendly) */}
      {!isVendor && (
        <nav 
          aria-label="Mobile Bottom Navigation" 
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--app-surface)]/95 backdrop-blur-xl border-t border-[var(--app-border)] px-1.5 py-1 shadow-2xl pb-[max(0.35rem,env(safe-area-inset-bottom))]"
        >
          <div className="grid grid-cols-5 items-center justify-between text-center gap-1 max-w-md mx-auto">
            {/* Sales */}
            <button
              onClick={() => {
                setActiveTab('sales');
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer ${
                activeTab === 'sales'
                  ? 'text-[var(--app-accent)] font-bold'
                  : 'text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'sales' ? 'bg-[var(--app-accent-subtle)]' : ''}`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">Sales</span>
            </button>

            {/* Operation */}
            <button
              onClick={() => {
                setActiveTab('operation');
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer ${
                activeTab === 'operation'
                  ? 'text-[var(--app-accent)] font-bold'
                  : 'text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'operation' ? 'bg-[var(--app-accent-subtle)]' : ''}`}>
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">Operation</span>
            </button>

            {/* Finance */}
            <button
              onClick={() => {
                setActiveTab('finance');
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer ${
                activeTab === 'finance'
                  ? 'text-[var(--app-accent)] font-bold'
                  : 'text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'finance' ? 'bg-[var(--app-accent-subtle)]' : ''}`}>
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">Finance</span>
            </button>

            {/* Quotation */}
            <button
              onClick={() => {
                setActiveTab('quotation');
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer ${
                activeTab === 'quotation'
                  ? 'text-[var(--app-accent)] font-bold'
                  : 'text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]'
              }`}
            >
              <div className={`p-1 rounded-lg relative ${activeTab === 'quotation' ? 'bg-[var(--app-accent-subtle)]' : ''}`}>
                <FileText className="w-5 h-5" />
                {selectedCustomerForQuote && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--app-sage)] animate-ping"></span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 leading-none">Quote</span>
            </button>

            {/* More / All Tabs */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer ${
                ['calculator', 'lookup', 'amc', 'team'].includes(activeTab) || mobileMenuOpen
                  ? 'text-[var(--app-accent)] font-bold'
                  : 'text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)]'
              }`}
            >
              <div className={`p-1 rounded-lg relative ${
                ['calculator', 'lookup', 'amc', 'team'].includes(activeTab) || mobileMenuOpen
                  ? 'bg-[var(--app-accent-subtle)]' 
                  : ''
              }`}>
                <LayoutGrid className="w-5 h-5" />
                {['calculator', 'lookup', 'amc', 'team'].includes(activeTab) && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--app-accent)]"></span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 leading-none">
                {['calculator', 'lookup', 'amc', 'team'].includes(activeTab)
                  ? (activeTab === 'calculator' ? 'Calc' : activeTab === 'lookup' ? 'Lookup' : activeTab === 'amc' ? 'AMC' : 'Team')
                  : 'More'}
              </span>
            </button>
          </div>
        </nav>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[var(--app-border)] py-6 px-4 bg-[var(--app-footer-bg)] text-center text-xs text-[var(--app-text-muted)] print:hidden mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[var(--app-accent)]" />
            <span className="font-bold text-[var(--app-text-secondary)]">Smart Way Solutions</span>
            <span>— Kerala Approved Rooftop EPC Partner</span>
          </div>
          <div className="text-[11px] text-[var(--app-text-muted)]">
            Official Kerala Electricity Regulatory Commission (KERC) Tariff 2025/2026 Compliant
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
