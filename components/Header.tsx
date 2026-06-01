"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function Header() {
  const {
    auth, setAuth, authModalOpen, setAuthModalOpen, setAuthEmail,
    isMobileMenuOpen, setIsMobileMenuOpen, activeSection,
    handleScrollToSegment, config,
  } = useAppContext();

  const navItems = [
    { id: "how-it-works", label: "How It Works", requiresConfig: false },
    { id: "manifest-generator", label: "Manifest Generator", requiresConfig: false },
    { id: "readiness-verification", label: "Readiness Checker", requiresConfig: true },
    { id: "agent-sandbox", label: "Agent Terminal", requiresConfig: true },
  ];

  return (
    <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 py-3.5 px-4 sm:px-6 z-30 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10">
            <Image src="/logo.png" alt="GetCiteFlow" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2 min-w-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-200">GetCiteFlow</span>
              <span className="hidden sm:inline-flex text-[9px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded-md border border-indigo-500/20 whitespace-nowrap shrink-0">
                Agent Commerce
              </span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide leading-none mt-0.5 max-sm:truncate max-sm:max-w-[150px] whitespace-nowrap">Auto-agent definitions scanner & wallet proxy</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/40 rounded-xl border border-slate-900/50">
          {navItems.map((item) => {
            const disabled = item.requiresConfig && !config;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { if (!disabled) handleScrollToSegment(e, item.id); }}
                className={`transition-all duration-300 px-4 py-1.5 text-xs font-semibold tracking-wide rounded-lg whitespace-nowrap border ${
                  disabled
                    ? "text-slate-700 cursor-not-allowed border-transparent"
                    : activeSection === item.id
                      ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/15 shadow-sm cursor-pointer"
                      : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/30 cursor-pointer"
                }`}
                title={disabled ? "Generate a manifest first to unlock" : item.label}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          {auth ? (
            <div className="flex items-center gap-2 text-xs text-slate-305 bg-slate-900/40 px-3 py-1.5 rounded-xl border border-slate-900/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold truncate max-w-[120px]" title={auth.email}>{auth.email}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { setAuthEmail("1986.yanning@gmail.com"); setAuthModalOpen(true); }}
              className="text-xs text-slate-400 hover:text-white transition duration-250 cursor-pointer font-bold flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-900/40 border border-transparent hover:border-slate-800"
            >
              <User className="w-4 h-4 text-indigo-400" />
              Connect Profile
            </button>
          )}
          <a
            href="#manifest-generator"
            onClick={(e) => handleScrollToSegment(e, "manifest-generator")}
            className="relative group bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition duration-300 rounded-xl px-4.5 py-2.5 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition duration-300" />
            <span className="relative z-10 flex items-center gap-1">Get Started</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1 rounded-lg border border-slate-800 bg-slate-900/60"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mt-3 pt-3 border-t border-slate-900"
          >
            <div className="flex flex-col gap-2.5 pb-3 text-sm font-semibold text-slate-300">
              {navItems.map((item) => {
                const disabled = item.requiresConfig && !config;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { if (!disabled) handleScrollToSegment(e, item.id); }}
                    className={`py-2 px-3 rounded-xl transition-all duration-200 border ${
                      disabled
                        ? "text-slate-700 cursor-not-allowed border-transparent"
                        : activeSection === item.id
                          ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20 cursor-pointer"
                          : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/50 cursor-pointer"
                    }`}
                    title={disabled ? "Generate a manifest first to unlock" : item.label}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="border-t border-slate-900 pt-3 my-1 flex flex-col gap-3">
                {auth ? (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Owner active</span>
                    <span className="text-xs text-slate-300 truncate max-w-[120px]">{auth.email}</span>
                    <button type="button" onClick={() => { setAuth(null); setIsMobileMenuOpen(false); }} className="text-[11px] text-rose-400 hover:underline font-bold">Disconnect</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setAuthEmail("1986.yanning@gmail.com"); setAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center text-xs font-bold text-indigo-400 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    Connect Profile
                  </button>
                )}
                <a
                  href="#manifest-generator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-center text-xs font-bold text-white shadow-md block"
                >
                  Build Manifest
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
