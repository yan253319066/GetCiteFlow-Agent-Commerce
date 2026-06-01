import { Shield, Wallet, Sparkles } from "lucide-react";

const stats = [
  {
    icon: Shield,
    color: "indigo",
    title: "Zero Coding Setup",
    desc: "GetCiteFlow outputs standard static manifests JSON files. You do not need to rewrite your actual backend database routes or core APIs.",
  },
  {
    icon: Wallet,
    color: "violet",
    title: "Standard x402 Gateway",
    desc: "Receive direct USDT/USDC secure payments over the Base blockchain network straight into your non-custodial business wallets.",
  },
  {
    icon: Sparkles,
    color: "emerald",
    title: "Universal Compatibility",
    desc: "Expose schemas parseable by all major language agent frameworks worldwide, ensuring your shop is ready for automatic purchasing.",
  },
];

const colorMap = {
  indigo: { text: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/10" },
  violet: { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/10" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
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
