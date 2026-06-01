import { Shield, Wallet, Sparkles, FileJson, Globe, Zap } from "lucide-react";

const stats = [
  {
    icon: FileJson,
    color: "indigo",
    title: "3 JSON Manifests Per Scan",
    desc: "Each website scan generates three standardized manifests: agent-commerce config, products feed, and x402 payment gateway — ready to deploy in seconds.",
  },
  {
    icon: Wallet,
    color: "violet",
    title: "Standard x402 Gateway",
    desc: "Receive direct USDT/USDC secure payments over the Base blockchain network straight into your non-custodial business wallets.",
  },
  {
    icon: Zap,
    color: "emerald",
    title: "Zero Backend Modifications",
    desc: "Outputs static JSON files only — no changes needed to your existing backend, database, checkout system, or payment infrastructure.",
  },
  {
    icon: Globe,
    color: "sky",
    title: "Universal Platform Support",
    desc: "Works with Shopify, WooCommerce, Magento, BigCommerce, and any custom-built store with a defined product catalog and checkout flow.",
  },
  {
    icon: Shield,
    color: "amber",
    title: "Non-Custodial Blockchain Settlement",
    desc: "Payments settle directly to your wallet via Base blockchain USDT/USDC — no intermediary, no custody risk, full transparency.",
  },
  {
    icon: Sparkles,
    color: "purple",
    title: "100% Free During Development",
    desc: "GetCiteFlow Agent Commerce is completely free during V1 development. No credit card required. No usage limits on website scans.",
  },
];

const colorMap = {
  indigo: { text: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/10" },
  violet: { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/10" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
  sky: { text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/10" },
  amber: { text: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10" },
  purple: { text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10" },
};

export default function MarketingStats() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s, i) => {
          const c = colorMap[s.color as keyof typeof colorMap];
          const Icon = s.icon;
          return (
            <div key={i} className="p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/85 shadow-lg">
              <div className={`w-11 h-11 ${c.bg} ${c.text} rounded-2xl flex items-center justify-center mx-auto mb-4 ${c.border}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white tracking-tight">{s.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
