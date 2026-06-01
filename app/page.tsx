"use client";

import { AppProvider } from "@/lib/AppContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GenerationLoader from "@/components/GenerationLoader";
import ResultsDisplay from "@/components/ResultsDisplay";
import DeploymentGuide from "@/components/DeploymentGuide";
import VerificationSection from "@/components/VerificationSection";
import AgentSandbox from "@/components/AgentSandbox";
import MarketingStats from "@/components/MarketingStats";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";

export default function GetCiteFlowPage() {
  return (
    <AppProvider>
      <div id="getciteflow-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-indigo-900 selection:text-indigo-100 pb-16">
        <Header />
        <HeroSection />
        <GenerationLoader />
        <ResultsDisplay />
        <DeploymentGuide />
        <VerificationSection />
        <AgentSandbox />
        <MarketingStats />
        <FAQSection />
        <CTASection />
        <AuthModal />
        <Footer />
        <CheckoutModal />
      </div>
    </AppProvider>
  );
}
