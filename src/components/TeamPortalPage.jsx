import React, { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Receipt, 
  Eye, 
  MoreVertical,
  Check,
  X,
  UserCheck,
  Shield,
  Briefcase
} from 'lucide-react';

const ROLE_DEFINITIONS = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to CRM, Financial Ledger, Team Management & Settings',
    color: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    icon: ShieldCheck
  },
  {
    id: 'sales',
    name: 'Sales Engineer',
    description: 'Access to Sales deals pipeline, WhatsApp proposals & KSEB calculator',
    color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    icon: TrendingUp
  },
  {
    id: 'finance',
    name: 'Finance Officer',
    description: 'Access to Finance ledger, payment stages, client bills & receipts',
    color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    icon: Receipt
  },
  {
    id: 'viewer',
    name: 'Viewer / Read-Only',
    description: 'Can inspect dashboard analytics and public customer details',
    color: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    icon: Eye
  },
  {
    id: 'pending',
    name: 'Pending Approval',
    description: 'Awaiting admin review. No module access granted yet.',
    color: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    icon: Clock
  }
];

export default function TeamPortalPage() {
  const { user: currentUser, userProfile, isAdmin } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatingRole, setUpdatingRole] = useState({});
  const [notification, setNotification] = useState(null);

  // Real-time listener on users collection
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = [];
      snapshot.forEach(docSnap => {
        userList.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      setMembers(userList);
      setLoading(false);
    }, (err) => {
      console.warn('Error listening to team users:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Update a user's role
  const handleAssignRole = async (targetUserId, newRole) => {
    if (!isAdmin) {
      alert('Only administrators can change team roles.');
      return;
    }

    try {
      setUpdatingRole(prev => ({ ...prev, [targetUserId]: true }));
      const userDocRef = doc(db, 'users', targetUserId);
      
      const newStatus = newRole === 'pending' ? 'pending_approval' : 'active';

      await updateDoc(userDocRef, {
        role: newRole,
        status: newStatus,
        roleUpdatedBy: currentUser?.email || 'Admin',
        roleUpdatedAt: serverTimestamp()
      });

      showNotification(`Role updated to ${newRole.toUpperCase()} successfully!`);
    } catch (err) {
      console.error('Error assigning role:', err);
      showNotification('Failed to update role. Check permissions.', 'error');
    } finally {
      setUpdatingRole(prev => ({ ...prev, [targetUserId]: false }));
      setEditingUserId(null);
    }
  };

  // Approve a pending user
  const handleQuickApprove = async (targetUserId, suggestedRole = 'sales') => {
    await handleAssignRole(targetUserId, suggestedRole);
  };

  // Metrics computation
  const stats = useMemo(() => {
    const total = members.length;
    const admins = members.filter(m => m.role === 'admin').length;
    const sales = members.filter(m => m.role === 'sales').length;
    const finance = members.filter(m => m.role === 'finance').length;
    const pending = members.filter(m => m.role === 'pending' || m.status === 'pending_approval').length;
    return { total, admins, sales, finance, pending };
  }, [members]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = 
        !searchQuery || 
        (m.displayName && m.displayName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole = 
        roleFilter === 'ALL' ||
        (roleFilter === 'PENDING' && (m.role === 'pending' || m.status === 'pending_approval')) ||
        m.role === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [members, searchQuery, roleFilter]);

  return (
    <div className="space-y-6">

      {/* TOP TITLE BANNER */}
      <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[var(--app-accent-subtle,#3b2219)] border border-[var(--app-accent-border,#572f23)] flex items-center justify-center text-[var(--app-accent,#CC785C)] font-bold shrink-0 shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--app-text-primary,#f8fafc)] font-['Outfit',sans-serif]">
                Smart Way Team Portal
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                Access &amp; Role Control
              </span>
            </div>
            <p className="text-xs text-[var(--app-text-muted,#94a3b8)] mt-0.5">
              Manage Google authenticated team members, assign operational roles, and review access requests.
            </p>
          </div>
        </div>

        {/* Quick Current User Status */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--app-surface-subtle,#334155)]/50 border border-[var(--app-border,#334155)] self-start md:self-auto">
          <div className="text-right">
            <div className="text-[11px] font-bold text-[var(--app-text-primary,#f8fafc)]">
              {currentUser?.displayName || 'Admin'}
            </div>
            <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
              {userProfile?.role || 'Admin'}
            </div>
          </div>
          {currentUser?.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName} 
              className="w-8 h-8 rounded-full border border-[var(--app-border,#334155)] object-cover" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
              {(currentUser?.displayName || 'A')[0]}
            </div>
          )}
        </div>

      </div>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
          notification.type === 'error'
            ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* METRIC KPI TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] font-semibold text-[var(--app-text-muted,#94a3b8)] uppercase block">
            Total Members
          </span>
          <div className="text-2xl font-black text-[var(--app-text-primary,#f8fafc)] mt-1">
            {stats.total}
          </div>
          <span className="text-[10px] text-[var(--app-text-muted,#94a3b8)]">Registered</span>
        </div>

        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] font-semibold text-purple-400 uppercase block">
            Admins
          </span>
          <div className="text-2xl font-black text-purple-300 mt-1">
            {stats.admins}
          </div>
          <span className="text-[10px] text-purple-400/80">Full Control</span>
        </div>

        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] font-semibold text-amber-400 uppercase block">
            Sales Engineers
          </span>
          <div className="text-2xl font-black text-amber-300 mt-1">
            {stats.sales}
          </div>
          <span className="text-[10px] text-amber-400/80">Proposals &amp; Leads</span>
        </div>

        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] font-semibold text-emerald-400 uppercase block">
            Finance
          </span>
          <div className="text-2xl font-black text-emerald-300 mt-1">
            {stats.finance}
          </div>
          <span className="text-[10px] text-emerald-400/80">Ledgers &amp; Receipts</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${
          stats.pending > 0 
            ? 'bg-rose-500/10 border-rose-500/30' 
            : 'bg-[var(--app-surface,#1e293b)] border-[var(--app-border,#334155)]'
        }`}>
          <span className={`text-[10px] font-semibold uppercase block ${
            stats.pending > 0 ? 'text-rose-400' : 'text-[var(--app-text-muted,#94a3b8)]'
          }`}>
            Pending Approval
          </span>
          <div className={`text-2xl font-black mt-1 ${
            stats.pending > 0 ? 'text-rose-400 animate-pulse' : 'text-[var(--app-text-primary,#f8fafc)]'
          }`}>
            {stats.pending}
          </div>
          <span className="text-[10px] text-[var(--app-text-muted,#94a3b8)]">Awaiting Role</span>
        </div>

      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--app-text-muted,#94a3b8)]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--app-surface-subtle,#334155)]/50 border border-[var(--app-border,#334155)] rounded-xl text-xs text-[var(--app-text-primary,#f8fafc)] outline-none focus:border-[var(--app-accent,#CC785C)] transition"
          />
        </div>

        {/* Role Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {['ALL', 'PENDING', 'ADMIN', 'SALES', 'FINANCE', 'VIEWER'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setRoleFilter(filterOption)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer whitespace-nowrap ${
                roleFilter === filterOption
                  ? 'bg-[var(--app-accent,#CC785C)] text-white shadow-xs'
                  : 'bg-[var(--app-surface-subtle,#334155)]/50 text-[var(--app-text-secondary,#cbd5e1)] hover:text-white hover:bg-[var(--app-surface-hover,#475569)]'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

      </div>

      {/* TEAM MEMBERS DIRECTORY LIST */}
      <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-3xl overflow-hidden shadow-sm">
        
        <div className="p-4 border-b border-[var(--app-border,#334155)] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#94a3b8)]">
            Members Directory ({filteredMembers.length})
          </span>
          <span className="text-[11px] text-[var(--app-text-muted,#94a3b8)]">
            {isAdmin ? 'Click on any role badge to re-assign permissions' : 'Read-only view'}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[var(--app-text-muted,#94a3b8)] space-y-2">
            <div className="w-8 h-8 border-2 border-[var(--app-accent,#CC785C)] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs">Loading team roster from Firestore...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-[var(--app-text-muted,#94a3b8)] space-y-2">
            <Users className="w-10 h-10 mx-auto text-slate-500 opacity-50" />
            <p className="text-xs font-semibold">No team members found matching your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--app-border,#334155)]">
            {filteredMembers.map(member => {
              const currentRoleDef = ROLE_DEFINITIONS.find(r => r.id === (member.role || 'pending')) || ROLE_DEFINITIONS[4];
              const isPending = member.role === 'pending' || member.status === 'pending_approval';
              const isCurrent = member.uid === currentUser?.uid;

              return (
                <div 
                  key={member.id || member.uid} 
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-[var(--app-surface-hover,#334155)]/40 ${
                    isPending ? 'bg-rose-500/5' : ''
                  }`}
                >
                  
                  {/* Member Identity & Details */}
                  <div className="flex items-center gap-3.5">
                    {member.photoURL ? (
                      <img 
                        src={member.photoURL} 
                        alt={member.displayName || 'Member'} 
                        className="w-12 h-12 rounded-2xl border border-[var(--app-border,#334155)] object-cover shrink-0 shadow-xs" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-[var(--app-border,#334155)] text-white font-bold flex items-center justify-center shrink-0 text-base">
                        {(member.displayName || member.email || 'U')[0].toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--app-text-primary,#f8fafc)]">
                          {member.displayName || 'Smart Way Member'}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            You
                          </span>
                        )}
                      </div>
                      
                      <div className="text-xs text-[var(--app-text-muted,#94a3b8)]">
                        {member.email}
                      </div>

                      <div className="text-[10px] text-[var(--app-text-muted,#94a3b8)] flex items-center gap-2 pt-0.5">
                        <span>Joined: {member.createdAt?.toDate ? member.createdAt.toDate().toLocaleDateString('en-IN') : 'Recently'}</span>
                        {member.lastLoginAt?.toDate && (
                          <>
                            <span>•</span>
                            <span>Last Active: {member.lastLoginAt.toDate().toLocaleDateString('en-IN')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Role Assignment Controls */}
                  <div className="flex flex-wrap items-center gap-3 md:self-center">
                    
                    {/* Role Selector / Editor */}
                    {isAdmin ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={member.role || 'pending'}
                          disabled={updatingRole[member.id || member.uid]}
                          onChange={(e) => handleAssignRole(member.id || member.uid, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer outline-none shadow-xs ${currentRoleDef.color}`}
                        >
                          <option value="admin" className="bg-slate-900 text-purple-300">👑 Administrator (Full Access)</option>
                          <option value="sales" className="bg-slate-900 text-amber-300">☀️ Sales Engineer</option>
                          <option value="finance" className="bg-slate-900 text-emerald-300">💰 Finance Officer</option>
                          <option value="viewer" className="bg-slate-900 text-sky-300">👁️ Viewer / Read-Only</option>
                          <option value="pending" className="bg-slate-900 text-rose-300">⏳ Pending Approval</option>
                        </select>

                        {/* Quick Approve Button if Pending */}
                        {isPending && (
                          <button
                            onClick={() => handleQuickApprove(member.id || member.uid, 'sales')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                            title="Quick Approve as Sales Engineer"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Approve (Sales)</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${currentRoleDef.color}`}>
                        {currentRoleDef.name}
                      </span>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Role Permission Guide Card */}
      <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--app-text-muted,#94a3b8)] mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--app-accent,#CC785C)]" />
          <span>Role Permissions Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {ROLE_DEFINITIONS.filter(r => r.id !== 'pending').map(def => {
            const Icon = def.icon;
            return (
              <div key={def.id} className="bg-[var(--app-surface-subtle,#334155)]/30 border border-[var(--app-border,#334155)] rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border ${def.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[var(--app-text-primary,#f8fafc)]">{def.name}</span>
                </div>
                <p className="text-[11px] text-[var(--app-text-muted,#94a3b8)] leading-relaxed">
                  {def.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
