"use client";

import { motion, AnimatePresence } from "motion/react";
import { Mail, RefreshCw, Check, Globe } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function AuthModal() {
  const {
    authModalOpen, setAuthModalOpen, authEmail, setAuthEmail,
    authCode, setAuthCode, codeSent, isGoogleLoading, isEmailLoading,
    handleGoogleSignInByEmail, handleSendEmailCode, handleVerifyEmailCode,
  } = useAppContext();

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
          >
            <div className="bg-slate-950/80 p-6 text-white text-center select-none relative">
              <button type="button" onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm cursor-pointer">✕</button>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3 font-extrabold text-base">G</div>
              <h4 className="text-base font-bold tracking-tight">Connect Verified Owner</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal font-medium">Verify your shop credentials and store identities safely.</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <Mail className="w-3.5 h-3.5" /> Option 1: Email Verification
                </div>
                {!codeSent ? (
                  <div className="space-y-2">
                    <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold text-xs text-white" />
                    <button type="button" onClick={handleSendEmailCode} disabled={isEmailLoading || !authEmail}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold transition rounded-xl py-2 text-xs flex items-center justify-center gap-1 cursor-pointer">
                      {isEmailLoading ? <RefreshCw className="w-3 animate-spin" /> : "Send Verification Link"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Simulated code sent to: {authEmail}
                    </div>
                    <input type="text" maxLength={6} value={authCode} onChange={(e) => setAuthCode(e.target.value)}
                      placeholder="Enter 6-digit code (e.g. 123456)"
                      className="w-full text-center tracking-widest bg-slate-950 border border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-indigo-500 font-mono text-sm uppercase font-bold text-white" />
                    <button type="button" onClick={handleVerifyEmailCode} disabled={isEmailLoading || authCode.length < 4}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold transition rounded-xl py-2 text-xs flex items-center justify-center gap-1 cursor-pointer">
                      {isEmailLoading ? <RefreshCw className="w-3 animate-spin" /> : "Verify and Login"}
                    </button>
                  </div>
                )}
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-mono uppercase">or</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                  <Globe className="w-3.5 h-3.5" /> Option 2: Connected Protocols
                </div>
                <button type="button" onClick={() => handleGoogleSignInByEmail("1986.yanning@gmail.com")} disabled={isGoogleLoading}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-slate-200 font-bold transition rounded-xl py-2.5 px-4 text-xs border border-slate-800 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer">
                  {isGoogleLoading ? (
                    <RefreshCw className="w-3 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.8 0 3.42.62 4.69 1.83l3.52-3.52C18.06 1.44 15.22.75 12 .75 7.42.75 3.52 3.38 1.62 7.18l4.13 3.2C6.81 7.18 9.19 5.04 12 5.04z" />
                        <path fill="#4285F4" d="M23.47 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.43a5.5 5.5 0 0 1-2.39 3.61l4.11 3.19c2.4-2.22 3.78-5.49 3.78-8.93z" />
                        <path fill="#FBBC05" d="M5.75 10.38a7.2 7.2 0 0 1 0-3.2l-4.13-3.2a11.95 11.95 0 0 0 0 9.6l4.13-3.2z" />
                        <path fill="#34A853" d="M12 23.25c3.24 0 5.96-1.07 7.95-2.92l-4.11-3.19c-1.14.77-2.6 1.22-3.84 0-2.81 0-5.19-2.14-6.25-5.34l-4.13 3.2c1.9 3.8 5.8 6.43 10.38 6.43z" />
                      </svg>
                      Continue with 1986.yanning@gmail.com
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
