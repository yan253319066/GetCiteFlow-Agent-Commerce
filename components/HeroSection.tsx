"use client";

import { motion } from "motion/react";
import { Globe, ArrowRight, RefreshCw, Sparkle } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function HeroSection() {
  const { websiteUrl, setWebsiteUrl, isGenerating, handleGenerateConfig } = useAppContext();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-6 max-w-6xl mx-auto w-full text-center">
      <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-1">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-indigo-950/40 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-900/60 uppercase tracking-widest shadow-sm">
            <Sparkle className="w-3.5 h-3.5 fill-current text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            Ready for the AI Agent Retail Revolution
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-6 max-w-3xl mx-auto leading-[1.1]"
        >
          Turn Any Website Into An <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Agent-Ready</span> Store
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 mt-6 max-w-2xl mx-auto font-medium"
        >
          GetCiteFlow Agent Commerce is a free AI-powered tool that crawls any e-commerce website, detects products and payment methods, and generates standardized JSON manifests. These manifests enable AI agents to discover, browse, and purchase products autonomously using the x402 payment protocol on the Base blockchain — with zero backend modifications required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 max-w-xl mx-auto"
          id="manifest-generator"
        >
          <form onSubmit={handleGenerateConfig} className="bg-slate-900 p-2 rounded-2xl shadow-xl shadow-slate-950/50 border border-slate-800/80 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center pr-2 pl-4">
              <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourstore.com"
                className="w-full py-3.5 px-3 bg-transparent text-slate-100 text-sm font-semibold rounded-lg focus:outline-none placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-6 py-3.5 shadow-md hover:shadow-indigo-600/20 active:scale-95 disabled:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm"
            >
              {isGenerating ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Website...</>
              ) : (
                <>Generate Agent Configuration <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-3 font-medium">
            Featured URL templates: <span className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={() => setWebsiteUrl("https://aurora-phones.com")}>aurora-phones.com</span>, <span className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={() => setWebsiteUrl("https://retrocoffee.co")}>retrocoffee.co</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
