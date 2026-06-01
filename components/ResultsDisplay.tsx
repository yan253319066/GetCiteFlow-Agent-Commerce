"use client";

import { motion } from "motion/react";
import {
  FileJson, Copy, Check, Download, Activity, ExternalLink, Wallet,
  AlertCircle, Cpu
} from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function ResultsDisplay() {
  const {
    config, activeTab, setActiveTab, isEditMode, setIsEditMode,
    editedStoreName, setEditedStoreName, editedCurrency, setEditedCurrency,
    editedProducts, setEditedProducts, editedMerchant, setEditedMerchant,
    copiedStates, handleCopyToClipboard, handleDownloadFile, handleSaveEdits,
    agentCommerceString, productsString, x402String,
  } = useAppContext();

  if (!config) return null;

  const getContent = () => {
    switch (activeTab) {
      case "agent-commerce": return agentCommerceString;
      case "products": return productsString;
      case "x402": return x402String;
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case "agent-commerce": return "agent-commerce.json";
      case "products": return "products.json";
      case "x402": return "x402.json";
    }
  };

  const renderEditFields = () => {
    switch (activeTab) {
      case "agent-commerce":
        return (
          <div className="space-y-3 font-semibold text-xs text-slate-300">
            <div>
              <label className="block mb-1.5">store_name</label>
              <input type="text" value={editedStoreName} onChange={(e) => setEditedStoreName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white" />
            </div>
            <div>
              <label className="block mb-1.5">currency</label>
              <input type="text" value={editedCurrency} onChange={(e) => setEditedCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white" />
            </div>
          </div>
        );
      case "products":
        return (
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300">products.json list</label>
            <textarea rows={8} value={editedProducts} onChange={(e) => setEditedProducts(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed text-white" />
          </div>
        );
      case "x402":
        return (
          <div className="space-y-3 font-semibold text-xs text-slate-300">
            <div>
              <label className="block mb-1.5">Base USDT/USDC Merchant Wallet Address</label>
              <input type="text" value={editedMerchant} onChange={(e) => setEditedMerchant(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white" />
            </div>
          </div>
        );
    }
  };

  return (
    <section className="max-w-5xl mx-auto w-full px-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-800/80 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 self-start px-2.5 py-1 rounded font-bold uppercase text-[9px] tracking-widest border border-indigo-500/20 mb-4 w-fit">
                <Activity className="w-3 h-3" />
                Website Summary
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-5">Metadata Output</h3>
              <div className="space-y-4 font-semibold text-xs border-t border-slate-800/60 pt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Website:</span>
                  <a href={config.websiteUrl} target="_blank" rel="noreferrer"
                    className="text-indigo-400 hover:underline flex items-center gap-1 font-bold truncate max-w-[150px]">
                    {config.websiteUrl.replace("https://", "").replace("http://", "")}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Store Type:</span>
                  <span className="text-slate-200 font-bold bg-slate-800/85 px-2 py-0.5 rounded">{config.storeType}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Products Feeds:</span>
                  <span className="text-slate-200 font-mono text-[11px] font-bold">{config.productsCount} items indexed</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">USDT/USDC Gateway:</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px] flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> Base (x402)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Checkout Endpoint:</span>
                  <span className="text-slate-200 font-mono text-[11px] font-bold">{config.agent_commerce.checkout_endpoint}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-800/60 pt-4">
                  <span className="text-slate-400">Status:</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Pending Deployment</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/60 space-y-2">
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Configurations are generated dynamically. You can customize files or override parameters prior to hosting configurations.
              </p>
              {isEditMode ? (
                <button type="button" onClick={handleSaveEdits}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition rounded-xl px-4 py-2.5 shadow-sm text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                  <Check className="w-4 h-4" /> Save Protocol Overrides
                </button>
              ) : (
                <button type="button" onClick={() => setIsEditMode(true)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold transition rounded-xl px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 border border-slate-700/65 cursor-pointer">
                  <Cpu className="w-4 h-4" /> Override Variables Schema
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden">
            <div className="bg-slate-950/40 border-b border-slate-800/70 px-6 py-3.5 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-slate-200">Generated Agent Commerce Specifications</span>
              </div>
              <div className="flex gap-1.5 bg-slate-950/85 p-1 border border-slate-850/80 rounded-xl">
                {(["agent-commerce", "products", "x402"] as const).map((tab) => (
                  <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === tab ? "bg-slate-800/90 text-white shadow-md" : "text-slate-400 hover:text-white"
                    }`}>
                    {tab === "agent-commerce" ? "agent-commerce.json" : tab === "products" ? "products.json" : "x402.json"}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {isEditMode ? (
                <div className="space-y-4">
                  <div className="bg-amber-950/20 border border-amber-500/20 text-amber-400 rounded-xl p-4 text-xs font-semibold flex items-start gap-2.5">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p>You have enabled Schema Editor Mode.</p>
                      <p className="font-medium text-slate-400 mt-1">Changes are instantly parsed across Agent Commerce pipelines and verification terminal.</p>
                    </div>
                  </div>
                  {renderEditFields()}
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800/60">
                    <button type="button" onClick={() => setIsEditMode(false)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition px-4 py-2 rounded-xl text-xs cursor-pointer">Cancel</button>
                    <button type="button" onClick={handleSaveEdits}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition px-4 py-2 rounded-xl text-xs cursor-pointer">Save Override Schema</button>
                  </div>
                </div>
              ) : (
                <div>
                  <pre className="bg-slate-900/80 text-slate-200 p-5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">{getContent()}</pre>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[11px] text-slate-500 font-semibold">File: {getFilename()}</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleCopyToClipboard(getContent(), activeTab)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-350 font-semibold transition rounded-xl px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer">
                        {copiedStates[activeTab] ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied File</> : <><Copy className="w-3.5 h-3.5" /> Copy to Clipboard</>}
                      </button>
                      <button type="button" onClick={() => handleDownloadFile(getFilename(), getContent())}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm">
                        <Download className="w-3.5 h-3.5" /> Download JSON
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
