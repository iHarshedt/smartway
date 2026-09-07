import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sun, ShieldCheck, Zap, Sparkles, ArrowRight, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { signInWithGoogle, authError, setAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg,#0f172a)] text-[var(--app-text-primary,#f8fafc)] flex flex-col items-center justify-center p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#CC785C]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Brand Card */}
        <div className="bg-[var(--app-surface,#1e293b)] border border-[var(--app-border,#334155)] rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden text-center">
          
          {/* Top Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/logo-512.png" 
                alt="Smart Way" 
                className="w-20 h-20 rounded-3xl object-contain shadow-lg border-2 border-[var(--app-border,#334155)] p-1 bg-white"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[var(--app-surface,#1e293b)] flex items-center justify-center text-white" title="Secure System">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--app-text-primary,#f8fafc)] font-['Outfit',sans-serif]">
              SMART WAY
            </h1>
            <p className="text-xs font-semibold text-[var(--app-accent,#CC785C)] uppercase tracking-widest">
              Team &amp; Operations Portal
            </p>
            <p className="text-xs text-[var(--app-text-muted,#94a3b8)] mt-2">
              Kerala Rooftop Solar EPC, Financial Ledger &amp; KSEB Net-Metering System
            </p>
          </div>

          {/* Error Message if any */}
          {authError && (
            <div className="mb-6 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSigningIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group border border-slate-200"
          >
            {isSigningIn ? (
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></div>
                <span>Signing in with Google...</span>
              </div>
            ) : (
              <>
                {/* Official Google SVG Icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="tracking-wide">Sign in with Google</span>
                <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Policy Note */}
          <div className="mt-6 pt-6 border-t border-[var(--app-border,#334155)] text-[11px] text-[var(--app-text-muted,#94a3b8)] flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized Smart Way Team Access Only</span>
          </div>

        </div>

        {/* System Capabilities Footer */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-[var(--app-surface,#1e293b)]/60 border border-[var(--app-border,#334155)] rounded-2xl p-3">
            <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-[var(--app-text-secondary,#cbd5e1)] block">KSEB Engine</span>
          </div>
          <div className="bg-[var(--app-surface,#1e293b)]/60 border border-[var(--app-border,#334155)] rounded-2xl p-3">
            <Sun className="w-4 h-4 text-[#CC785C] mx-auto mb-1" />
            <span className="text-[10px] font-bold text-[var(--app-text-secondary,#cbd5e1)] block">Sales Deals</span>
          </div>
          <div className="bg-[var(--app-surface,#1e293b)]/60 border border-[var(--app-border,#334155)] rounded-2xl p-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-[var(--app-text-secondary,#cbd5e1)] block">Finance Ledger</span>
          </div>
        </div>

      </div>

    </div>
  );
}
