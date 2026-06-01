"use client";

import Image from "next/image";
import { User, Lock, Shield } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function Footer() {
  const {
    auth, setAuth, setAuthModalOpen, setAuthEmail,
    handleScrollToSegment,
  } = useAppContext();

  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/60 backdrop-blur-md pt-16 pb-8 px-6 text-slate-400">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 animate-fade-in">
          <div className="space-y-4">
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <Image src="/logo.png" alt="GetCiteFlow" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">GetCiteFlow</span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Autonomous agent standard schema generator and Base-native checkout pipeline for AI agents, enabling instant non-custodial USDT/USDC settlement.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">Mainnet Gateway Active</span>
            </div>
          </div>

          <div>
            <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Application</h5>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { id: "how-it-works", label: "How It Works" },
                { id: "manifest-generator", label: "Manifest Generator", isIndigo: true },
                { id: "readiness-verification", label: "Readiness Checker" },
                { id: "agent-sandbox", label: "Agent Terminal Sandbox" },
                { id: "faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => handleScrollToSegment(e, link.id)}
                    className={`hover:underline transition duration-200 cursor-pointer ${link.isIndigo ? "text-indigo-400 hover:text-indigo-300" : "hover:text-white"}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Specifications</h5>
            <ul className="space-y-2 text-xs font-semibold">
              {["Base ERC-20 USDT/USDC Pipeline", "ERC-402 Agent Protocol", "Schema.org Web Crawler standard", "OpenAI Agent Schema manifest"].map((spec) => (
                <li key={spec} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-slate-400">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Connect Store</h5>
            {auth ? (
              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Registered Owner</div>
                <div className="text-xs font-semibold text-white truncate" title={auth.email}>{auth.email}</div>
                <button type="button" onClick={() => setAuth(null)}
                  className="text-[11px] text-rose-400 hover:underline font-bold block cursor-pointer">Disconnect Profile</button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Verify store ownership, preview simulated payouts, and test compliance logs.
                </p>
                <button type="button" onClick={() => { setAuthEmail("1986.yanning@gmail.com"); setAuthModalOpen(true); }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 border border-indigo-500/10 text-xs font-bold py-2 px-3 rounded-xl transition duration-200 text-center flex items-center justify-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-slate-500 text-[11px] font-semibold">
          <div>
            <p>© {new Date().getFullYear()} GetCiteFlow. Built for the autonomous AI agent commerce era over Base blockchain network.</p>
            <p className="text-slate-600 mt-1">Non-custodial, peer-to-peer, secure static integration pipeline.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400"><Lock className="w-3 h-3 text-emerald-400" /> Secure SSL</span>
            <span className="flex items-center gap-1 text-slate-400"><Shield className="w-3 h-3 text-indigo-400" /> Decentralized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
