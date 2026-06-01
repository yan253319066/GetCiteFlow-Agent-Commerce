"use client";

import { motion } from "motion/react";
import { RefreshCw, Check, AlertCircle, XCircle } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function VerificationSection() {
  const {
    verifyUrl, setVerifyUrl, isVerifying, verificationLogs, verificationResult,
    simulationType, setSimulationType, handleVerifyWebsite, config,
  } = useAppContext();

  if (!config) return null;

  return (
    <section className="pt-16 pb-20 px-6" id="readiness-verification">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase bg-violet-500/10 text-violet-400 px-2.5 py-1 rounded font-extrabold tracking-widest border border-violet-500/20">
                Agent Commerce Readiness Validator
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white mt-2">Verify Website Placement</h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1 border border-slate-850/80 rounded-xl shrink-0">
              <span className="text-[10px] text-slate-400 font-bold pl-2">Validation Mode:</span>
              {(["success", "failure"] as const).map((mode) => (
                <button key={mode} type="button" onClick={() => setSimulationType(mode)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    simulationType === mode
                      ? mode === "success" ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-800 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}>
                  {mode === "success" ? "Standard Compliance" : "Strict Security Audit"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center pr-2 pl-2">
              <span className="text-xs bg-slate-850 text-slate-350 border border-slate-800 px-2 py-1 rounded font-bold font-mono mr-2">VERIFY</span>
              <input
                type="text" required value={verifyUrl} onChange={(e) => setVerifyUrl(e.target.value)}
                placeholder="https://yourstore.com"
                className="w-full text-white text-sm font-semibold focus:outline-none bg-transparent placeholder:text-slate-600"
              />
            </div>
            <button type="button" disabled={isVerifying} onClick={handleVerifyWebsite}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-6 py-2.5 shadow-sm active:scale-95 disabled:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer text-xs">
              {isVerifying ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning Directories...</> : "Verify Website Placement"}
            </button>
          </div>

          {isVerifying && (
            <div className="mt-6 space-y-2 bg-slate-950 p-4 rounded-xl font-mono text-xs">
              {verificationLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-2">
                  {log.status === "pending" ? (
                    <RefreshCw className="w-4.5 h-4.5 text-indigo-400 animate-spin shrink-0" />
                  ) : log.status === "success" ? (
                    <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                  )}
                  <span className={log.status === "success" ? "text-slate-300" : log.status === "error" ? "text-rose-400" : "text-indigo-300"}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {verificationResult === "success" && !isVerifying && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative shrink-0 flex items-center justify-center w-36 h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" className="stroke-slate-800" strokeWidth="8" fill="transparent" />
                  <circle cx="50" cy="50" r="42" className="stroke-emerald-500 transition-all duration-1000 ease-out"
                    strokeWidth="8" strokeDasharray={263.89} strokeDashoffset={263.89 - (263.89 * 96) / 100}
                    strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight leading-none block">96</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Protocol Score</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping font-semibold"></span>
                  <p className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 text-xs uppercase font-extrabold px-3 py-1 rounded w-fit">Status: Agent Ready</p>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight leading-none">Your website is ready for AI Agent Commerce.</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  Your files were parsed successfully. Autonomous assistants from ChatGPT, Gemini, and Claude protocol routing can now natively index, configure wallet calls, and check out instantly on your endpoint.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-200">
                  {["products.json found", "agent-commerce.json found", "x402.json found", "Checkout routing active"].map((label) => (
                    <div key={label} className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                      <Check className="text-emerald-500 w-4 h-4" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {verificationResult === "failure" && !isVerifying && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-slate-800/80">
              <div className="flex items-start gap-4 bg-rose-950/15 border border-rose-900/40 p-5 rounded-2xl text-rose-200">
                <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Diagnostics Exception: Incomplete Protocol Deployments</h4>
                  <p className="text-rose-400 text-xs mt-1.5 font-medium leading-relaxed">
                    The live crawler verified your domain but couldn&apos;t locate primary files inside the verification path routing.
                  </p>
                  <div className="space-y-2 mt-4 font-mono text-[11px] font-bold">
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>products.json was deployed at host root successfully.</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>/.well-known/agent-commerce.json: Missing File (404 Exception)</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>/.well-known/x402.json: Missing File (404 Exception)</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-rose-900/40 space-y-2.5">
                    <h5 className="text-xs font-extrabold text-white uppercase tracking-widest">Suggested Fixes:</h5>
                    <ul className="list-disc list-inside text-xs text-rose-300 space-y-1.5 pl-1.5 font-semibold">
                      <li>Create the subdirectory <code className="bg-rose-950/40 px-1.5 py-0.5 rounded text-rose-300 font-mono">.well-known</code> at the root layout of your host server.</li>
                      <li>Verify that paths are not serving fallback HTML index pages on 404 responses.</li>
                      <li>Verify correct CORS settings on your host config policies (Ensure headers: <code className="bg-rose-950/40 px-1 py-0.5 rounded text-rose-300 font-mono">Access-Control-Allow-Origin: *</code>).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
