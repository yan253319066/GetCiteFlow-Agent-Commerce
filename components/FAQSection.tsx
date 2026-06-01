import { ChevronRight } from "lucide-react";
import { faqData } from "@/lib/faq-data";

export default function FAQSection() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto w-full" id="faq">
      <div className="text-center mb-12">
        <span className="text-xs text-indigo-300 bg-indigo-500/10 rounded-full px-3 py-1 font-bold tracking-wider uppercase border border-indigo-500/20">
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-3">Everything You Need To Know</h2>
      </div>
      <div className="space-y-3">
        {faqData.map((faq) => (
          <details key={faq.question}
            className="group bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/70 overflow-hidden transition-all duration-200 open:border-indigo-500/30">
            <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-bold text-white tracking-tight hover:text-indigo-300 transition-colors list-none">
              {faq.question}
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 group-open:rotate-90" />
            </summary>
            <div className="px-5 pb-5">
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
