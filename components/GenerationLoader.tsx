"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function GenerationLoader() {
  const { isGenerating, generationStep, generationLogs } = useAppContext();

  return (
    <AnimatePresence>
      {isGenerating && (
        <section className="max-w-4xl mx-auto w-full px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800/80 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
              <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: `${((generationStep + 1) / 6) * 100}%` }}></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">Constructing Protocols Manifest</h3>
                <p className="text-xs text-slate-400">Crawling, analyzing catalog structures via AI-Engine</p>
              </div>
              <div className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                Step {generationStep + 1} of 6
              </div>
            </div>

            <div className="space-y-3.5 bg-slate-900 p-5 rounded-xl border border-slate-800 font-mono text-xs">
              {generationLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between text-slate-300"
                >
                  <div className="flex items-center gap-2.5">
                    {index < generationStep ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    )}
                    <span>{log}</span>
                  </div>
                  {index < generationStep ? (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold font-mono">COMPLETE</span>
                  ) : (
                    <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono animate-pulse">PROCESSING</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
}
