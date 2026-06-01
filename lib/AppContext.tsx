"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import type { ConfigState, ChatMessage, VerificationLog } from "@/lib/types";

interface AppContextValue {
  websiteUrl: string;
  setWebsiteUrl: (v: string) => void;
  config: ConfigState | null;
  setConfig: (v: ConfigState | null) => void;
  generationStep: number;
  isGenerating: boolean;
  generationLogs: string[];
  activeTab: "agent-commerce" | "products" | "x402";
  setActiveTab: (v: "agent-commerce" | "products" | "x402") => void;
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  editedStoreName: string;
  setEditedStoreName: (v: string) => void;
  editedCurrency: string;
  setEditedCurrency: (v: string) => void;
  editedProducts: string;
  setEditedProducts: (v: string) => void;
  editedMerchant: string;
  setEditedMerchant: (v: string) => void;
  verifyUrl: string;
  setVerifyUrl: (v: string) => void;
  isVerifying: boolean;
  verificationLogs: VerificationLog[];
  verificationResult: "success" | "failure" | null;
  simulationType: "success" | "failure";
  setSimulationType: (v: "success" | "failure") => void;
  auth: { email: string; method: "google" | "email" } | null;
  setAuth: (v: { email: string; method: "google" | "email" } | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (v: boolean) => void;
  authEmail: string;
  setAuthEmail: (v: string) => void;
  authCode: string;
  setAuthCode: (v: string) => void;
  codeSent: boolean;
  setCodeSent: (v: boolean) => void;
  isGoogleLoading: boolean;
  isEmailLoading: boolean;
  chatMessages: ChatMessage[];
  setChatMessages: (v: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  chatInput: string;
  setChatInput: (v: string) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (v: boolean) => void;
  checkoutProduct: { name: string; price: number; currency: string } | null;
  setCheckoutProduct: (v: { name: string; price: number; currency: string } | null) => void;
  checkoutProgress: number;
  setCheckoutProgress: (v: number | ((prev: number) => number)) => void;
  isPaid: boolean;
  setIsPaid: (v: boolean) => void;
  copiedStates: { [key: string]: boolean };
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  activeSection: string;
  waitlistEmail: string;
  setWaitlistEmail: (v: string) => void;
  onWaitlist: boolean;
  setOnWaitlist: (v: boolean) => void;
  chatBottomRef: React.RefObject<HTMLDivElement | null>;
  handleCopyToClipboard: (text: string, identifier: string) => void;
  handleDownloadFile: (filename: string, text: string) => void;
  handleScrollToSegment: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  handleGenerateConfig: (e: React.FormEvent) => Promise<void>;
  handleVerifyWebsite: () => void;
  handleSaveEdits: () => void;
  handleSendChatMessage: (e: React.FormEvent) => void;
  handleGoogleSignInByEmail: (email: string) => void;
  handleSendEmailCode: () => void;
  handleVerifyEmailCode: () => void;
  agentCommerceString: string;
  productsString: string;
  x402String: string;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultConfig: ConfigState = {
  websiteUrl: "https://yourstore.com",
  storeName: "HyperScale Compute Registry",
  storeType: "AI Computing & APIs",
  currency: "USD",
  productsCount: 3,
  checkoutDetected: "x402 Unified Gateway",
  agent_commerce: {
    store_name: "HyperScale Compute Registry",
    currency: "USD",
    products_feed: "/products.json",
    checkout_endpoint: "/checkout",
    payment_provider: "x402",
  },
  products: [
    { id: "credits-starter", name: "Compute Credits (Starter Pack - 1,000 Runs)", price: 10, currency: "USD", availability: "in_stock" },
    { id: "credits-dev", name: "Compute Credits (Developer Pack - 10,000 Runs)", price: 80, currency: "USD", availability: "in_stock" },
    { id: "credits-pro", name: "Compute Credits (Pro Pack - 50,000 Runs)", price: 350, currency: "USD", availability: "in_stock" },
  ],
  x402: {
    payment_method: "x402",
    currency: "USDT/USDC",
    network: "Base",
    merchant: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [websiteUrl, setWebsiteUrl] = useState("https://yourstore.com");
  const [config, setConfig] = useState<ConfigState | null>(null);
  const [generationStep, setGenerationStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"agent-commerce" | "products" | "x402">("agent-commerce");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStoreName, setEditedStoreName] = useState("HyperScale Compute Registry");
  const [editedCurrency, setEditedCurrency] = useState("USD");
  const [editedProducts, setEditedProducts] = useState(JSON.stringify(defaultConfig.products, null, 2));
  const [editedMerchant, setEditedMerchant] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [verifyUrl, setVerifyUrl] = useState("https://yourstore.com");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>([]);
  const [verificationResult, setVerificationResult] = useState<"success" | "failure" | null>(null);
  const [simulationType, setSimulationType] = useState<"success" | "failure">("success");
  const [auth, setAuth] = useState<{ email: string; method: "google" | "email" } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "user", text: "I want to purchase some AI Compute Credits (Compute Credits)." },
    { sender: "agent", text: "Detected compute node supporting the Agent Commerce protocol. Retrieving available packages for you...", isProductCard: true },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<{ name: string; price: number; currency: string } | null>(null);
  const [checkoutProgress, setCheckoutProgress] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [onWaitlist, setOnWaitlist] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sections = ["how-it-works", "manifest-generator", "readiness-verification", "agent-sandbox"];
    const fallback = () => {
      if (window.scrollY < 300) setActiveSection("");
    };
    window.addEventListener("scroll", fallback, { passive: true });
    const observerOption = { root: null, rootMargin: "-25% 0px -45% 0px", threshold: 0.1 };
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(id);
        });
      }, observerOption);
      obs.observe(el);
      return { observer: obs, element: el };
    });
    return () => {
      window.removeEventListener("scroll", fallback);
      observers.forEach((o) => { if (o) o.observer.unobserve(o.element); });
    };
  }, []);

  useEffect(() => {
    if (isCheckoutModalOpen && checkoutProgress < 100) {
      const timer = setInterval(() => {
        setCheckoutProgress((p) => {
          if (p >= 100) { clearInterval(timer); setIsPaid(true); return 100; }
          return p + 20;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isCheckoutModalOpen, checkoutProgress]);

  const handleCopyToClipboard = useCallback((text: string, identifier: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [identifier]: true }));
      setTimeout(() => setCopiedStates((prev) => ({ ...prev, [identifier]: false })), 2000);
    } catch (e) { console.error(e); }
  }, []);

  const handleDownloadFile = useCallback((filename: string, text: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleScrollToSegment = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const handleGoogleSignInByEmail = useCallback((email: string) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setAuth({ email, method: "google" });
      setIsGoogleLoading(false);
      setAuthModalOpen(false);
    }, 1200);
  }, []);

  const handleSendEmailCode = useCallback(() => {
    if (!authEmail.trim() || !authEmail.includes("@")) return;
    setIsEmailLoading(true);
    setTimeout(() => { setIsEmailLoading(false); setCodeSent(true); }, 1000);
  }, [authEmail]);

  const handleVerifyEmailCode = useCallback(() => {
    if (authCode.length < 4) return;
    setIsEmailLoading(true);
    setTimeout(() => {
      setAuth({ email: authEmail, method: "email" });
      setIsEmailLoading(false);
      setAuthModalOpen(false);
      setCodeSent(false);
      setAuthCode("");
    }, 1200);
  }, [authCode, authEmail]);

  const handleGenerateConfig = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;
    setVerificationResult(null);
    setVerifyUrl(websiteUrl);
    setIsGenerating(true);
    setGenerationStep(0);
    setGenerationLogs([]);
    const logsSequence = [
      "🔍 Resolving DNS constraints for " + websiteUrl,
      "🤖 Mapping page architecture and locating merchant meta...",
      "📦 Crawling product inventory details...",
      "💰 Categorizing pricing matrices and standard discount indicators...",
      "🛒 Analyzing routing tables for checkout endpoint mappings...",
      "📝 Generating secure Agent Commerce protocol specifications...",
    ];
    for (let i = 0; i < logsSequence.length; i++) {
      setGenerationStep(i);
      setGenerationLogs((prev) => [...prev, logsSequence[i]]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    try {
      const res = await fetch("/api/generate-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl }),
      });
      const data = await res.json();
      if (data && !data.error) {
        setConfig(data);
        setEditedStoreName(data.storeName || "");
        setEditedCurrency(data.currency || "USD");
        setEditedProducts(JSON.stringify(data.products || [], null, 2));
        setEditedMerchant(data.x402?.merchant || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        const topProduct = data.products && data.products[0] ? data.products[0] : { name: "Compute Credits (Starter Pack - 1,000 Runs)", price: 10 };
        setChatMessages([
          { sender: "user", text: `I want to buy ${topProduct.name}` },
          { sender: "agent", text: `Analyzing system state... I found a compatible Agent-Ready store: "${data.storeName || "HyperScale Compute Registry"}". Support verified.`, isProductCard: true },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [websiteUrl]);

  const handleVerifyWebsite = useCallback(() => {
    setIsVerifying(true);
    setVerificationResult(null);
    const checkPoints = [
      { key: "products", label: "Checking products.json parameters..." },
      { key: "agent", label: "Checking /.well-known/agent-commerce.json syntax..." },
      { key: "x402", label: "Checking /.well-known/x402.json crypto definitions..." },
      { key: "checkout", label: "Pinging merchant checkout endpoint and route security..." },
    ];
    setVerificationLogs([]);
    let currentIndex = 0;
    const runNextCheck = () => {
      if (currentIndex < checkPoints.length) {
        const item = checkPoints[currentIndex];
        setVerificationLogs((prev) => [...prev, { text: item.label, status: "pending" as const }]);
        setTimeout(() => {
          setVerificationLogs((prev) => {
            const copy = [...prev];
            let status: "success" | "error" = "success";
            if (simulationType === "failure") {
              if (item.key === "agent" || item.key === "x402") status = "error";
            }
            copy[currentIndex] = {
              text: status === "success"
                ? `✓ Clean check: ${item.label.replace("Checking ", "").replace("...", " valid.")}`
                : `✗ Error: ${item.label.replace("Checking ", "").replace("...", " could not be resolved (404 Not Found).")}`,
              status,
            };
            return copy;
          });
          currentIndex++;
          runNextCheck();
        }, 600);
      } else {
        setTimeout(() => { setIsVerifying(false); setVerificationResult(simulationType); }, 400);
      }
    };
    runNextCheck();
  }, [simulationType]);

  const handleSaveEdits = useCallback(() => {
    if (!config) return;
    try {
      const parsedProducts = JSON.parse(editedProducts);
      const updatedConfig: ConfigState = {
        ...config,
        storeName: editedStoreName,
        currency: editedCurrency,
        agent_commerce: {
          ...config.agent_commerce,
          store_name: editedStoreName,
          currency: editedCurrency,
        },
        products: parsedProducts,
        x402: { ...config.x402, merchant: editedMerchant },
      };
      setConfig(updatedConfig);
      setIsEditMode(false);
    } catch (e: any) {
      alert("Invalid JSON format in products.json. Please check brackets and commas:\n" + e.message);
    }
  }, [config, editedStoreName, editedCurrency, editedProducts, editedMerchant]);

  const handleSendChatMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    const productsAvailable = config ? config.products : defaultConfig.products;
    const storeTitle = config ? config.storeName : "HyperScale Compute Registry";
    setTimeout(() => {
      const lower = userText.toLowerCase();
      const matched = productsAvailable.find(
        (p) => lower.includes(p.name.toLowerCase()) || p.name.toLowerCase().split(" ").some((word) => word.length > 3 && lower.includes(word))
      );
      if (matched) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "agent",
            text: `Query matches products feed of "${storeTitle}". Analyzing item availability...`,
            isProductCard: true,
            customNode: (
              <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl shadow-lg mt-2 max-w-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-indigo-500/30">Agent Commerce Verified</span>
                    <h4 className="text-sm font-bold tracking-tight text-white mt-1.5">{matched.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Offered by {storeTitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-indigo-400 font-mono">{matched.currency === "USD" ? "$" : ""}{matched.price}</div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 justify-end mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>In Stock
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-mono">Gateway: x402 USDT</span>
                  <button
                    type="button"
                    onClick={() => { setCheckoutProduct(matched); setIsCheckoutModalOpen(true); setIsPaid(false); setCheckoutProgress(0); }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                    Buy Now
                  </button>
                </div>
              </div>
            ),
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: "agent", text: `I queried the products manifest for "${storeTitle}". What would you like to inquire about? Available: ${productsAvailable.map((p) => p.name).join(", ")}.` },
        ]);
      }
    }, 800);
  }, [chatInput, config]);

  const s = JSON.stringify;
  const agentCommerceString = config ? s(config.agent_commerce, null, 2) : s(defaultConfig.agent_commerce, null, 2);
  const productsString = config ? s(config.products, null, 2) : s(defaultConfig.products, null, 2);
  const x402String = config ? s(config.x402, null, 2) : s(defaultConfig.x402, null, 2);

  return (
    <AppContext.Provider
      value={{
        websiteUrl, setWebsiteUrl, config, setConfig,
        generationStep, isGenerating, generationLogs,
        activeTab, setActiveTab, isEditMode, setIsEditMode,
        editedStoreName, setEditedStoreName, editedCurrency, setEditedCurrency,
        editedProducts, setEditedProducts, editedMerchant, setEditedMerchant,
        verifyUrl, setVerifyUrl, isVerifying, verificationLogs, verificationResult,
        simulationType, setSimulationType,
        auth, setAuth, authModalOpen, setAuthModalOpen,
        authEmail, setAuthEmail, authCode, setAuthCode,
        codeSent, setCodeSent, isGoogleLoading, isEmailLoading,
        chatMessages, setChatMessages, chatInput, setChatInput,
        isCheckoutModalOpen, setIsCheckoutModalOpen,
        checkoutProduct, setCheckoutProduct, checkoutProgress, setCheckoutProgress, isPaid, setIsPaid,
        copiedStates, isMobileMenuOpen, setIsMobileMenuOpen, activeSection,
        waitlistEmail, setWaitlistEmail, onWaitlist, setOnWaitlist,
        chatBottomRef,
        handleCopyToClipboard, handleDownloadFile, handleScrollToSegment,
        handleGenerateConfig, handleVerifyWebsite, handleSaveEdits,
        handleSendChatMessage, handleGoogleSignInByEmail,
        handleSendEmailCode, handleVerifyEmailCode,
        agentCommerceString, productsString, x402String,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
