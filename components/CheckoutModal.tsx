"use client";

import { motion, AnimatePresence } from "motion/react";
import { RefreshCw } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen, setIsCheckoutModalOpen, checkoutProduct,
    checkoutProgress, isPaid, config,
  } = useAppContext();

  return (
    <AnimatePresence>
      {isCheckoutModalOpen && checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden select-none"
          >
            <div className="bg-slate-950/80 p-5 border-b border-slate-805 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase text-slate-300">x402 Instant Settlement Node</span>
              </div>
              <button type="button" onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold text-xs shrink-0 cursor-pointer">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest border border-indigo-500/20">
                  Routing Base Pipeline
                </span>
                <h4 className="text-xs font-bold text-slate-400 mt-4">Order Summary:</h4>
                <p className="text-base font-extrabold text-white mt-1 leading-none">{checkoutProduct.name}</p>
                <div className="text-4xl font-black text-indigo-400 mt-3 font-mono">
                  {checkoutProduct.currency === "USD" ? "$" : ""}{checkoutProduct.price}
                  <span className="text-xs font-mono font-bold text-slate-300 pl-1">USDT</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 font-semibold">
                  <span>
                    {isPaid
                      ? "✓ Transaction confirmed on block"
                      : checkoutProgress < 40
                        ? "Securing Base handshake..."
                        : checkoutProgress < 80
                          ? "Transmitting USDT/USDC package..."
                          : "Waiting for block settlement..."}
                  </span>
                  <span>{checkoutProgress}%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className={`h-full transition-all duration-300 ${isPaid ? "bg-emerald-500" : "bg-indigo-600"}`}
                    style={{ width: `${checkoutProgress}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-805 space-y-1.5 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between"><span>Network:</span><span className="text-white">Base Mainnet</span></div>
                <div className="flex justify-between"><span>Smart Contract:</span><span className="text-white">x402-USDT-USDC-v1</span></div>
                <div className="flex justify-between">
                  <span>Merchant Wallet:</span>
                  <span className="text-indigo-400 truncate max-w-[120px] select-all">
                    {config ? config.x402.merchant : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
                  </span>
                </div>
              </div>

              {isPaid ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex flex-col items-center gap-1 text-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <h5 className="text-xs font-extrabold uppercase mt-1 tracking-wider">Payment Complete</h5>
                  <p className="text-[11px] text-slate-300 font-semibold leading-relaxed mt-1">
                    Store received notification. Your digital agent has concluded the target procurement checklist safely!
                  </p>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 justify-center text-[11px] text-slate-500 font-bold leading-none select-none">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  Do not close or leave current window. Settling.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
