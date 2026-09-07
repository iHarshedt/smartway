import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, ShieldAlert, LogOut, Mail, UserCheck } from 'lucide-react';

export default function PendingApprovalBanner() {
  const { user, userProfile, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--app-bg,#0f172a)] text-[var(--app-text-primary,#f8fafc)] flex flex-col items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
      
      <div className="w-full max-w-lg bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-3xl p-8 shadow-2xl text-center space-y-6">
        
        {/* Avatar with Status Badge */}
        <div className="flex justify-center">
          <div className="relative">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'User'} 
                className="w-20 h-20 rounded-full border-4 border-[var(--app-border,#334155)] object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-white border-4 border-[var(--app-border,#334155)]">
                {(user?.displayName || 'U')[0]}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 border-2 border-[var(--app-surface,#1e293b)] flex items-center justify-center text-white shadow-md" title="Pending Approval">
              <Clock className="w-4 h-4 animate-spin" />
            </div>
          </div>
        </div>

        {/* User Greeting */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--app-text-primary,#f8fafc)]">
            Welcome, {user?.displayName || 'Team Member'}!
          </h2>
          <p className="text-xs text-[var(--app-text-muted,#94a3b8)] flex items-center justify-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{user?.email}</span>
          </p>
        </div>

        {/* Informative Notice Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-left space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Account Under Review / Pending Role</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            Your Google account has been successfully registered into the Smart Way system. An Administrator will assign your role (Sales Engineer, Finance Officer, or Admin) shortly.
          </p>
          <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-300/80 font-medium">
            Contact Super Admin at <strong className="text-white">iharshedt@gmail.com</strong> for expedited access.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 py-2.5 bg-[var(--app-accent,#CC785C)] hover:bg-[#B35F44] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <UserCheck className="w-4 h-4" />
            <span>Check Approval Status</span>
          </button>

          <button
            onClick={logout}
            className="w-full sm:w-auto px-5 py-2.5 bg-[var(--app-surface-subtle,#334155)] hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

    </div>
  );
}
