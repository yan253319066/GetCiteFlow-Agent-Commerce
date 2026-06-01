"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function AgentSandbox() {
  const {
    config, chatMessages, chatInput, setChatInput,
    handleSendChatMessage, chatBottomRef, setCheckoutProduct,
    setIsCheckoutModalOpen, setIsPaid, setCheckoutProgress,
  } = useAppContext();

  if (!config) return null;

  return (
    <section className="border-t border-slate-800/80 py-16 px-6" id="agent-sandbox">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full font-bold border border-indigo-500/20 uppercase tracking-wider">
            Interactive Environment
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-2">AI Agent Terminal Interface</h2>
          <p className="text-xs text-slate-400 mt-2 font-medium max-w-lg mx-auto">
            Experience real autonomous agency search, catalog indexing, and secure token checkout flows over the Base protocol network.
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 shadow-xl max-w-xl mx-auto overflow-hidden">
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-850">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-xs font-bold font-mono text-slate-350">GetCiteFlow Agent Terminal v1</span>
            </div>
            <div className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
              Target: {config.storeName}
            </div>
          </div>

          <div className="p-4 sm:p-5 h-80 overflow-y-auto bg-slate-950/40 space-y-4">
            {chatMessages.map((msg, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className="text-[10px] text-slate-500 font-bold mb-1 px-1 opacity-80 uppercase select-none">
                  {msg.sender === "user" ? "Shopper AI" : "GetCiteFlow Proxy"}
                </div>
                {msg.isProductCard ? (
                  <div className="space-y-2">
                    <div className="bg-slate-900 border border-slate-800 text-slate-100 px-4 py-3 rounded-2xl text-xs max-w-xs shadow-sm font-semibold select-all leading-normal">
                      {msg.text}
                    </div>
                    {msg.customNode ? msg.customNode : (
                      <div className="bg-slate-950 border border-slate-850 text-white p-4 rounded-xl shadow-lg max-w-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] bg-indigo-550/20 text-indigo-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-indigo-500/30">Agent Commerce Verified</span>
                            <h4 className="text-sm font-bold tracking-tight text-white mt-1.5">{config.products[0]?.name || "iPhone 17"}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Offered by {config.storeName}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-extrabold text-indigo-400 font-mono">{config.currency === "USD" ? "$" : ""}{config.products[0]?.price || 999}</div>
                            <div className="text-[10px] text-emerald-400 font-medium flex items-center justify-end gap-1 mt-0.5">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>In Stock
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-850 flex justify-between items-center gap-3">
                          <span className="text-[10px] text-slate-500 font-mono">Gateway: x402 USDT</span>
                          <button type="button"
                            onClick={() => { setCheckoutProduct(config.products[0]); setIsCheckoutModalOpen(true); setIsPaid(false); setCheckoutProgress(0); }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                            Buy Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`px-4 py-2.5 rounded-2xl text-xs max-w-xs font-semibold leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white shadow-sm rounded-tr-none"
                      : "bg-slate-900 border border-slate-800 text-slate-100 shadow-xs rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          <form onSubmit={handleSendChatMessage} className="bg-slate-950 border-t border-slate-900 p-3.5 flex gap-2">
            <input
              type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Try 'I want to buy a ${config.products[0]?.name || "item"}'...`}
              className="flex-1 px-3.5 py-2 hover:bg-slate-900 focus:bg-slate-900 rounded-xl text-xs font-semibold text-white bg-slate-950 border border-slate-850 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
            />
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition shadow active:scale-95 cursor-pointer">
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
