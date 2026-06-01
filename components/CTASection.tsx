"use client";

import { motion } from "motion/react";
import { CheckCircle2, Lock } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function CTASection() {
  const { waitlistEmail, setWaitlistEmail, onWaitlist, setOnWaitlist } = useAppContext();

  return (
    <section className="bg-slate-900 text-white py-16 px-6 text-center select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
      <div className="relative z-1 max-w-3xl mx-auto space-y-6">
        <span className="text-[10px] uppercase font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-full select-all tracking-widest inline-block leading-none">
          GetCiteFlow Commerce Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Be Ready For The Future Of AI Commerce</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
          AI language models are purchasing items autonomously today. Do not lock yourself out from the agentic internet. Configure your verified gateway address.
        </p>
        <div className="pt-4 max-w-md mx-auto space-y-4">
          {onWaitlist ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-950 border border-indigo-500/30 p-4 rounded-xl text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-100">You are on the V1 Launch Waitlist! We will notify you shortly.</span>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (waitlistEmail.trim()) setOnWaitlist(true); }}
              className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-2">
              <input type="email" required value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter email to join waiting list"
                className="flex-1 bg-transparent py-2.5 px-3.5 focus:outline-none text-slate-100 font-semibold text-xs placeholder:text-slate-500" />
              <button type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-5 py-2.5 text-xs cursor-pointer shadow-md">
                Join Waitlist
              </button>
            </form>
          )}
          <button type="button"
            className="w-full text-slate-400 hover:text-slate-300 text-xs font-bold py-2 border border-slate-800 hover:border-slate-700 rounded-xl transition flex items-center justify-center gap-1.5 select-none">
            <Lock className="w-3.5 h-3.5" /> Enable Agent Commerce (Coming Soon V2)
          </button>
        </div>
      </div>
    </section>
  );
}
