"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

const steps = [
  {
    num: "Step 01",
    title: "Upload Products Feed",
    desc: "Upload your formatted products parameters file directly onto the public directory root.",
    path: "/products.json",
    scope: "Search feed",
  },
  {
    num: "Step 02",
    title: "Publish Manifest specs",
    desc: "Place your primary agent commerce configuration JSON inside the secure path directory.",
    path: "/.well-known/agent-commerce.json",
    scope: "Protocol ID",
  },
  {
    num: "Step 03",
    title: "Verify Payment gateway",
    desc: "Configure Base settlement routing mechanisms file inside the same verification directory.",
    path: "/.well-known/x402.json",
    scope: "Base Wallet",
  },
];

export default function DeploymentGuide() {
  const { config } = useAppContext();
  if (!config) return null;

  return (
    <section className="border-y border-slate-800/80 bg-slate-950/40 py-16 px-6" id="how-it-works">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs text-indigo-300 bg-indigo-500/10 rounded-full px-3 py-1 font-bold tracking-wider uppercase border border-indigo-500/20">
            Installation Routine
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-3">Protocol Deployment Guide</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto font-medium">
            Upload configuration endpoints directly to your hosting directory or web servers backends parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i}
              className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/70 relative group flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">{step.num}</span>
                <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">{step.desc}</p>
                <p className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded px-2 py-0.5 mt-3 inline-block leading-none">{step.path}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>Scope: {step.scope}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
            </div>
          ))}
          <div className="bg-indigo-950/20 p-5 rounded-2xl border border-indigo-500/35 text-white relative group flex flex-col justify-between animate-pulse">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400">Step 04</span>
              <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">Pinging Live Scanner</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Interact with testing protocols. Pings the website endpoints, certifying score parameters.
              </p>
              <p className="text-[11px] font-semibold text-indigo-300 mt-3 inline-block leading-none">
                Proceed to Verification below
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-900/50 flex justify-between items-center text-[10px] text-indigo-400 font-bold">
              <span>Scope: Readiness Check</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
