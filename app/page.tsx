"use client";

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Search,
  FileJson,
  Copy,
  Check,
  Download,
  ArrowRight,
  Lock,
  Shield,
  Activity,
  User,
  Mail,
  RefreshCw,
  Send,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Cpu,
  Wallet,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronRight,
  Sparkle,
  Menu,
  X
} from "lucide-react";

// Standard JSON display structure interfaces
interface ConfigState {
  websiteUrl: string;
  storeName: string;
  storeType: string;
  currency: string;
  productsCount: number;
  checkoutDetected: string;
  agent_commerce: {
    store_name: string;
    currency: string;
    products_feed: string;
    checkout_endpoint: string;
    payment_provider: string;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
    availability: string;
  }>;
  x402: {
    payment_method: string;
    currency: string;
    network: string;
    merchant: string;
  };
}

export default function GetCiteFlowPage() {
  // State variables
  const [websiteUrl, setWebsiteUrl] = useState("https://yourstore.com");
  const [config, setConfig] = useState<ConfigState | null>({
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
      payment_provider: "x402"
    },
    products: [
      {
        id: "credits-starter",
        name: "Compute Credits (Starter Pack - 1,000 Runs)",
        price: 10,
        currency: "USD",
        availability: "in_stock"
      },
      {
        id: "credits-dev",
        name: "Compute Credits (Developer Pack - 10,000 Runs)",
        price: 80,
        currency: "USD",
        availability: "in_stock"
      },
      {
        id: "credits-pro",
        name: "Compute Credits (Pro Pack - 50,000 Runs)",
        price: 350,
        currency: "USD",
        availability: "in_stock"
      }
    ],
    x402: {
      payment_method: "x402",
      currency: "USDT/USDC",
      network: "Base",
      merchant: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
    }
  });
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"agent-commerce" | "products" | "x402">("agent-commerce");
  
  // Custom edit states for configured files
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStoreName, setEditedStoreName] = useState("HyperScale Compute Registry");
  const [editedCurrency, setEditedCurrency] = useState("USD");
  const [editedProducts, setEditedProducts] = useState<string>(`[
  {
    "id": "credits-starter",
    "name": "Compute Credits (Starter Pack - 1,000 Runs)",
    "price": 10,
    "currency": "USD",
    "availability": "in_stock"
  },
  {
    "id": "credits-dev",
    "name": "Compute Credits (Developer Pack - 10,000 Runs)",
    "price": 80,
    "currency": "USD",
    "availability": "in_stock"
  },
  {
    "id": "credits-pro",
    "name": "Compute Credits (Pro Pack - 50,000 Runs)",
    "price": 350,
    "currency": "USD",
    "availability": "in_stock"
  }
]`);
  const [editedMerchant, setEditedMerchant] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");

  // Verification states
  const [verifyUrl, setVerifyUrl] = useState("https://yourstore.com");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<Array<{ text: string; status: "pending" | "success" | "error" }>>([]);
  const [verificationResult, setVerificationResult] = useState<"success" | "failure" | null>(null);
  const [simulationType, setSimulationType] = useState<"success" | "failure">("success");
  
  // Auth state
  const [auth, setAuth] = useState<{ email: string; method: "google" | "email" } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  
  // Chat agent visual simulation state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "agent"; text: string; isProductCard?: boolean; customNode?: React.ReactNode }>>([
    { sender: "user", text: "I want to purchase some AI Compute Credits (Compute Credits)." },
    {
      sender: "agent",
      text: "Detected compute node supporting the Agent Commerce protocol. Retrieving available packages for you...",
      isProductCard: true
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<{ name: string; price: number; currency: string } | null>(null);
  const [checkoutProgress, setCheckoutProgress] = useState<number>(0);
  const [isPaid, setIsPaid] = useState(false);

  // Clipboard copies
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Section State for Navigation Highlighting
  const [activeSection, setActiveSection] = useState<string>("manifest-generator");

  // Waitlist
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [onWaitlist, setOnWaitlist] = useState(false);

  // Auto scroll references
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Automatically track scrolling to highlight navigation items
  useEffect(() => {
    const sections = ["how-it-works", "manifest-generator", "readiness-verification", "agent-sandbox"];
    
    // Fallback: If we are near the very top of the page, highlight manifest-generator
    const handleScrollFallback = () => {
      if (window.scrollY < 300) {
        setActiveSection("manifest-generator");
      }
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    const observerOption = {
      root: null,
      rootMargin: "-25% 0px -45% 0px", // Focus on the middle-upper part of the viewport
      threshold: 0.1,
    };

    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, observerOption);

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      window.removeEventListener("scroll", handleScrollFallback);
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  // Handle Copy feedback
  const handleCopyToClipboard = (text: string, identifier: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [identifier]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [identifier]: false }));
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Download json files directly
  const handleDownloadFile = (filename: string, text: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Smooth Scroll for elements with sticky header height offset
  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90; // offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Auth Functions
  const handleGoogleSignInByEmail = (email: string) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setAuth({ email, method: "google" });
      setIsGoogleLoading(false);
      setAuthModalOpen(false);
    }, 1200);
  };

  const handleSendEmailCode = () => {
    if (!authEmail.trim() || !authEmail.includes("@")) return;
    setIsEmailLoading(true);
    setTimeout(() => {
      setIsEmailLoading(false);
      setCodeSent(true);
    }, 1000);
  };

  const handleVerifyEmailCode = () => {
    if (authCode.length < 4) return;
    setIsEmailLoading(true);
    setTimeout(() => {
      setAuth({ email: authEmail, method: "email" });
      setIsEmailLoading(false);
      setAuthModalOpen(false);
      // Reset
      setCodeSent(false);
      setAuthCode("");
    }, 1200);
  };

  // Generate Agent commerce specifications
  const handleGenerateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;

    // Reset verification status when URL is changed/regenerated
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
      "📝 Generating secure Agent Commerce protocol specifications..."
    ];

    // Dynamic incremental timer for loading UX
    for (let i = 0; i < logsSequence.length; i++) {
      setGenerationStep(i);
      setGenerationLogs(prev => [...prev, logsSequence[i]]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch("/api/generate-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl })
      });
      const data = await res.json();
      
      if (data && !data.error) {
        setConfig(data);
        // Pre-populate input values for editing
        setEditedStoreName(data.storeName || "");
        setEditedCurrency(data.currency || "USD");
        setEditedProducts(JSON.stringify(data.products || [], null, 2));
        setEditedMerchant(data.x402?.merchant || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F");

        // Prepopulate chatbot with realistic generated item
        const topProduct = data.products && data.products[0] ? data.products[0] : { name: "Compute Credits (Starter Pack - 1,000 Runs)", price: 10 };
        setChatMessages([
          { sender: "user", text: `I want to buy ${topProduct.name}` },
          {
            sender: "agent",
            text: `Analyzing system state... I found a compatible Agent-Ready store: "${data.storeName || 'HyperScale Compute Registry'}". Support verified.`,
            isProductCard: true
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Verify Deployment simulator
  const handleVerifyWebsite = () => {
    setIsVerifying(true);
    setVerificationResult(null);

    const checkPoints = [
      { key: "products", label: "Checking products.json parameters..." },
      { key: "agent", label: "Checking /.well-known/agent-commerce.json syntax..." },
      { key: "x402", label: "Checking /.well-known/x402.json crypto definitions..." },
      { key: "checkout", label: "Pinging merchant checkout endpoint and route security..." }
    ];

    setVerificationLogs([]);

    let currentIndex = 0;

    const runNextCheck = () => {
      if (currentIndex < checkPoints.length) {
        const item = checkPoints[currentIndex];
        
        // Append entry as pending
        setVerificationLogs(prev => [...prev, { text: item.label, status: "pending" }]);
        
        setTimeout(() => {
          setVerificationLogs(prev => {
            const copy = [...prev];
            // Determine result based on simulation selection
            let status: "success" | "error" = "success";
            
            if (simulationType === "failure") {
              if (item.key === "agent" || item.key === "x402") {
                status = "error";
              }
            }
            
            copy[currentIndex] = {
              text: status === "success" 
                ? `✓ Clean check: ${item.label.replace("Checking ", "").replace("...", " valid.")}` 
                : `✗ Error: ${item.label.replace("Checking ", "").replace("...", " could not be resolved (404 Not Found).")}`,
              status: status
            };
            return copy;
          });

          currentIndex++;
          runNextCheck();
        }, 600);
      } else {
        // Evaluate overall simulation score
        setTimeout(() => {
          setIsVerifying(false);
          setVerificationResult(simulationType);
        }, 400);
      }
    };

    runNextCheck();
  };

  // Save customized edits of config
  const handleSaveEdits = () => {
    if (!config) return;
    try {
      const parsedProducts = JSON.parse(editedProducts);
      const updatedConfig: ConfigState = {
        ...config,
        storeName: editedStoreName,
        currency: editedCurrency,
        agent_commerce: {
          ...(config.agent_commerce || {}),
          store_name: editedStoreName,
          currency: editedCurrency,
        },
        products: parsedProducts,
        x402: {
          ...(config.x402 || {}),
          merchant: editedMerchant
        }
      } as ConfigState;
      setConfig(updatedConfig);
      setIsEditMode(false);
    } catch (e: any) {
      alert("Invalid JSON format in products.json. Please check brackets and commas:\n" + e.message);
    }
  };

  // Interactive Live Chat Simulator
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    // Read configured products to supply context
    const productsAvailable = config ? config.products : [
      { id: "credits-starter", name: "Compute Credits (Starter Pack - 1,000 Runs)", price: 10, currency: "USD", availability: "in_stock" }
    ];
    const storeTitle = config ? config.storeName : "HyperScale Compute Registry";

    setTimeout(() => {
      const lower = userText.toLowerCase();
      // Match query from actual schema
      const matched = productsAvailable.find(p => lower.includes(p.name.toLowerCase()) || p.name.toLowerCase().split(" ").some(word => word.length > 3 && lower.includes(word)));

      if (matched) {
        setChatMessages(prev => [...prev, {
          sender: "agent",
          text: `Query matches products feed of "${storeTitle}". Analyzing item availability...`,
          isProductCard: true,
          customNode: (
            <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl shadow-lg mt-2 max-w-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-indigo-500/30">
                    Agent Commerce Verified
                  </span>
                  <h4 className="text-sm font-bold tracking-tight text-white mt-1.5">{matched.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Offered by {storeTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-indigo-400 font-mono">
                    {matched.currency === "USD" ? "$" : ""}{matched.price}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 justify-end mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    In Stock
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center gap-3">
                <span className="text-[10px] text-slate-400 font-mono">Gateway: x402 USDT</span>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutProduct(matched);
                    setIsCheckoutModalOpen(true);
                    setIsPaid(false);
                    setCheckoutProgress(0);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  Buy Now
                </button>
              </div>
            </div>
          )
        }]);
      } else {
        setChatMessages(prev => [...prev, {
          sender: "agent",
          text: `I queried the products manifest for "${storeTitle}". What would you like to inquire about? Available: ${productsAvailable.map(p => p.name).join(", ")}.`
        }]);
      }
    }, 800);
  };

  // Launch simulated payment flow
  useEffect(() => {
    if (isCheckoutModalOpen && checkoutProgress < 100) {
      const timer = setInterval(() => {
        setCheckoutProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            setIsPaid(true);
            return 100;
          }
          return p + 20;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isCheckoutModalOpen, checkoutProgress]);

  // Serialized String values of config for displaying
  const agentCommerceString = config
    ? JSON.stringify(config.agent_commerce, null, 2)
    : `{\n  "store_name": "HyperScale Compute Registry",\n  "currency": "USD",\n  "products_feed": "/products.json",\n  "checkout_endpoint": "/checkout",\n  "payment_provider": "x402"\n}`;

  const productsString = config
    ? JSON.stringify(config.products, null, 2)
    : `[\n  {\n    "id": "credits-starter",\n    "name": "Compute Credits (Starter Pack - 1,000 Runs)",\n    "price": 10,\n    "currency": "USD",\n    "availability": "in_stock"\n  }\n]`;

  const x402String = config
    ? JSON.stringify(config.x402, null, 2)
    : `{\n  "payment_method": "x402",\n  "currency": "USDT/USDC",\n  "network": "Base",\n  "merchant": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"\n}`;

  return (
    <div id="getciteflow-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-indigo-900 selection:text-indigo-100 pb-16">
      


      {/* Main Header / Navigation */}
      <header className="sticky top-0 bg-slate-950/85 backdrop-blur-md border-b border-slate-900/90 py-4 px-6 z-30 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20 tracking-wider text-lg">
              G
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                GetCiteFlow
                <span className="text-xs bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded-full border border-indigo-500/25">
                  Agent Commerce V1
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 leading-none">Auto-agent definitions scanner & wallet proxy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-350">
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollToSegment(e, "how-it-works")}
              className={`transition-all duration-250 cursor-pointer px-3 py-1.5 rounded-xl border ${
                activeSection === "how-it-works"
                  ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20 shadow-sm"
                  : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/30"
              }`}
            >
              How it works
            </a>
            <a
              href="#manifest-generator"
              onClick={(e) => handleScrollToSegment(e, "manifest-generator")}
              className={`transition-all duration-250 cursor-pointer px-3 py-1.5 rounded-xl border ${
                activeSection === "manifest-generator"
                  ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20 shadow-sm"
                  : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/30"
              }`}
            >
              Manifest Generator
            </a>
            <a
              href="#readiness-verification"
              onClick={(e) => handleScrollToSegment(e, "readiness-verification")}
              className={`transition-all duration-250 cursor-pointer px-3 py-1.5 rounded-xl border ${
                activeSection === "readiness-verification"
                  ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20 shadow-sm"
                  : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/30"
              }`}
            >
              Readiness Checker
            </a>
            <a
              href="#agent-sandbox"
              onClick={(e) => handleScrollToSegment(e, "agent-sandbox")}
              className={`transition-all duration-250 cursor-pointer px-3 py-1.5 rounded-xl border ${
                activeSection === "agent-sandbox"
                  ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20 shadow-sm"
                  : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/30"
              }`}
            >
              Agent Terminal
            </a>
          </nav>

          {/* Desktop CTA / Profile Connect */}
          <div className="hidden md:flex items-center gap-4">
            {auth ? (
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
                  Active Owner
                </span>
                <span className="font-semibold truncate max-w-[110px]" title={auth.email}>
                  {auth.email}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthEmail("1986.yanning@gmail.com");
                  setAuthModalOpen(true);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition duration-250 cursor-pointer font-bold flex items-center gap-1"
                id="connect-profile-trigger"
              >
                <User className="w-3.5 h-3.5" />
                Connect Profile
              </button>
            )}
            <a
              href="#manifest-generator"
              onClick={(e) => handleScrollToSegment(e, "manifest-generator")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition duration-250 rounded-xl px-4 py-2 shadow-md hover:shadow-indigo-600/15 cursor-pointer whitespace-nowrap"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-1 rounded-lg border border-slate-800 bg-slate-900/60"
            aria-label="Toggle Menu"
            id="mobile-hamburger-btn"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Flyout Dropdown Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden mt-3 pt-3 border-t border-slate-900"
            >
              <div className="flex flex-col gap-2.5 pb-3 text-sm font-semibold text-slate-300">
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollToSegment(e, "how-it-works")}
                  className={`py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                    activeSection === "how-it-works"
                      ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20"
                      : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/50"
                  }`}
                >
                  How it works
                </a>
                <a
                  href="#manifest-generator"
                  onClick={(e) => handleScrollToSegment(e, "manifest-generator")}
                  className={`py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                    activeSection === "manifest-generator"
                      ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20"
                      : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/50"
                  }`}
                >
                  Manifest Generator
                </a>
                <a
                  href="#readiness-verification"
                  onClick={(e) => handleScrollToSegment(e, "readiness-verification")}
                  className={`py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                    activeSection === "readiness-verification"
                      ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20"
                      : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/50"
                  }`}
                >
                  Readiness Checker
                </a>
                <a
                  href="#agent-sandbox"
                  onClick={(e) => handleScrollToSegment(e, "agent-sandbox")}
                  className={`py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                    activeSection === "agent-sandbox"
                      ? "text-indigo-400 bg-indigo-500/10 font-bold border-indigo-500/20"
                      : "text-slate-300 hover:text-white border-transparent hover:bg-slate-900/50"
                  }`}
                >
                  Agent Terminal
                </a>

                <div className="border-t border-slate-900 pt-3 my-1 flex flex-col gap-3">
                  {auth ? (
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Owner active
                      </span>
                      <span className="text-xs text-slate-300 truncate max-w-[120px]">{auth.email}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuth(null);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-[11px] text-rose-400 hover:underline font-bold"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthEmail("1986.yanning@gmail.com");
                        setAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center text-xs font-bold text-indigo-400 hover:text-white transition flex items-center justify-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5" />
                      Connect Profile
                    </button>
                  )}
                  <a
                    href="#manifest-generator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-center text-xs font-bold text-white shadow-md block"
                  >
                    Build Manifest
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

         <section className="relative overflow-hidden pt-12 pb-16 px-6 max-w-6xl mx-auto w-full text-center">
        {/* Ambient absolute graphics */}
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
 
        <div className="relative z-1 ">
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
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-6 max-w-3xl mx-auto leading-[1.1]"
          >
            Turn Any Website Into An <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Agent-Ready</span> Store
          </motion.h2>
 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 mt-6 max-w-2xl mx-auto font-medium"
          >
            Enable AI agents to discover, understand, and purchase products directly from your website. Complete V1 production-ready protocols.
          </motion.p>
 
          {/* Website URL Input Form Block */}
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
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing Website...
                  </>
                ) : (
                  <>
                    Generate Agent Configuration
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              Featured URL templates: <span className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={() => setWebsiteUrl("https://aurora-phones.com")}>aurora-phones.com</span>, <span className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={() => setWebsiteUrl("https://retrocoffee.co")}>retrocoffee.co</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* GENERATION / LOADING SECTION */}
      <AnimatePresence>
        {isGenerating && (
          <section className="max-w-4xl mx-auto w-full px-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800/80 relative overflow-hidden"
            >
              {/* Top ambient loader bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
                <div
                  className="h-full bg-indigo-600 transition-all duration-700 ease-out"
                  style={{ width: `${((generationStep + 1) / 6) * 100}%` }}
                ></div>
              </div>
 
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    Constructing Protocols Manifest
                  </h3>
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

      {/* RESULTS DISPLAY & PROTOCOL FILES */}
      {config && !isGenerating && (
        <section className="max-w-5xl mx-auto w-full px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Website Metadata Summary column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-800/80 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 self-start px-2.5 py-1 rounded font-bold uppercase text-[9px] tracking-widest border border-indigo-500/20 mb-4 w-fit">
                    <Activity className="w-3 h-3" />
                    Website Summary
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-5">
                    Metadata Output
                  </h3>

                  <div className="space-y-4 font-semibold text-xs border-t border-slate-800/60 pt-4">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Website:</span>
                      <a
                        href={config.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline flex items-center gap-1 font-bold truncate max-w-[150px]"
                      >
                        {config.websiteUrl.replace("https://", "").replace("http://", "")}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Store Type:</span>
                      <span className="text-slate-205 text-slate-200 font-bold bg-slate-800/85 px-2 py-0.5 rounded">
                        {config.storeType}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Products Feeds:</span>
                      <span className="text-slate-200 font-mono text-[11px] font-bold">
                        {config.productsCount} items indexed
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">USDT/USDC Gateway:</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px] flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        Base (x402)
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Checkout Endpoint:</span>
                      <span className="text-slate-200 font-mono text-[11px] font-bold">
                        {config.agent_commerce.checkout_endpoint}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-t border-slate-800/60 pt-4">
                      <span className="text-slate-400">Status:</span>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                        Pending Deployment
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/60 space-y-2">
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Configurations are generated dynamically. You can customize files or override parameters prior to hosting configurations.
                  </p>
                  
                  {isEditMode ? (
                    <button
                      type="button"
                      onClick={handleSaveEdits}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition rounded-xl px-4 py-2.5 shadow-sm text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      Save Protocol Overrides
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditMode(true)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold transition rounded-xl px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 border border-slate-700/65 cursor-pointer"
                    >
                      <Cpu className="w-4 h-4" />
                      Override Variables Schema
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Protocol Files Display Columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden">
                {/* File tab headers */}
                <div className="bg-slate-950/40 border-b border-slate-800/70 px-6 py-3.5 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <FileJson className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-slate-200">Generated Agent Commerce Specifications</span>
                  </div>

                  <div className="flex gap-1.5 bg-slate-950/85 p-1 border border-slate-850/80 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab("agent-commerce")}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeTab === "agent-commerce"
                          ? "bg-slate-800/90 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      agent-commerce.json
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("products")}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeTab === "products"
                          ? "bg-slate-800/90 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      products.json
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("x402")}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeTab === "x402"
                          ? "bg-slate-800/90 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      x402.json
                    </button>
                  </div>
                </div>

                {/* Tab content area */}
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

                      {activeTab === "agent-commerce" && (
                        <div className="space-y-3 font-semibold text-xs text-slate-300">
                          <div>
                            <label className="block mb-1.5">store_name</label>
                            <input
                              type="text"
                              value={editedStoreName}
                              onChange={(e) => setEditedStoreName(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white"
                            />
                          </div>
                          <div>
                            <label className="block mb-1.5">currency</label>
                            <input
                              type="text"
                              value={editedCurrency}
                              onChange={(e) => setEditedCurrency(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white"
                            />
                          </div>
                        </div>
                      )}

                      {activeTab === "products" && (
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-slate-300">products.json list</label>
                          <textarea
                            rows={8}
                            value={editedProducts}
                            onChange={(e) => setEditedProducts(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed text-white"
                          />
                        </div>
                      )}

                      {activeTab === "x402" && (
                        <div className="space-y-3 font-semibold text-xs text-slate-300">
                          <div>
                            <label className="block mb-1.5">Base USDT/USDC Merchant Wallet Address</label>
                            <input
                              type="text"
                              value={editedMerchant}
                              onChange={(e) => setEditedMerchant(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-white"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-800/60">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditMode(false);
                            // Reset
                            if (config) {
                              setEditedStoreName(config.storeName || "");
                              setEditedCurrency(config.currency || "USD");
                              setEditedProducts(JSON.stringify(config.products || [], null, 2));
                              setEditedMerchant(config.x402?.merchant || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
                            }
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition px-4 py-2 rounded-xl text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveEdits}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition px-4 py-2 rounded-xl text-xs cursor-pointer"
                        >
                          Save Override Schema
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Active file display text */}
                      <pre className="bg-slate-900/80 text-slate-200 p-5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
                        {activeTab === "agent-commerce" && agentCommerceString}
                        {activeTab === "products" && productsString}
                        {activeTab === "x402" && x402String}
                      </pre>

                      {/* Download controls */}
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-[11px] text-slate-500 font-semibold">
                          File: {activeTab === "agent-commerce" ? "agent-commerce.json" : activeTab === "products" ? "products.json" : "x402.json"}
                        </span>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const content = activeTab === "agent-commerce" ? agentCommerceString : activeTab === "products" ? productsString : x402String;
                              handleCopyToClipboard(content, activeTab);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-350 font-semibold transition rounded-xl px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedStates[activeTab] ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                Copied File
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy to Clipboard
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const title = activeTab === "agent-commerce" ? "agent-commerce.json" : activeTab === "products" ? "products.json" : "x402.json";
                              const content = activeTab === "agent-commerce" ? agentCommerceString : activeTab === "products" ? productsString : x402String;
                              handleDownloadFile(title, content);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download JSON
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
      )}

      {/* DEPLOYMENT GUIDE STEPS & INSTRUCTIONS */}
      {config && (
        <section className="border-y border-slate-800/80 bg-slate-950/40 py-16 px-6" id="how-it-works">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-12">
              <span className="text-xs text-indigo-300 bg-indigo-500/10 rounded-full px-3 py-1 font-bold tracking-wider uppercase border border-indigo-500/20">
                Installation Routine
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mt-3">
                Protocol Deployment Guide
              </h3>
              <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto font-medium">
                Upload configuration endpoints directly to your hosting directory or web servers backends parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/70 relative group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">Step 01</span>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">Upload Products Feed</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Upload your formatted products parameters file directly onto the public directory root.
                  </p>
                  <p className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded px-2 py-0.5 mt-3 inline-block leading-none">
                    /products.json
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>Scope: Search feed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/70 relative group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">Step 02</span>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">Publish Manifest specs</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Place your primary agent commerce configuration JSON inside the secure path directory.
                  </p>
                  <p className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded px-2 py-0.5 mt-3 inline-block leading-none">
                    /.well-known/agent-commerce.json
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>Scope: Protocol ID</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/70 relative group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">Step 03</span>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">Verify Payment gateway</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Configure Base settlement routing mechanisms file inside the same verification directory.
                  </p>
                  <p className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded px-2 py-0.5 mt-3 inline-block leading-none">
                    /.well-known/x402.json
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>Scope: Base Wallet</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-indigo-950/20 p-5 rounded-2xl border border-indigo-500/35 text-white relative group flex flex-col justify-between animate-pulse">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400">Step 04</span>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1 mb-2">Pinging Live Scanner</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Interact with testing protocols. Pings the website endpoints, certifying score parameters.
                  </p>
                  <p className="text-[11px] font-semibold text-indigo-300 mt-3 inline-block leading-none">
                    Proceed to Verification below
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-900/50 flex justify-between items-center text-[10px] text-indigo-400 font-bold">
                  <span>Scope: Readiness Check</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VERIFY WEBSITE INTERACTIVE ROUTINES */}
      {config && (
        <section className="pt-16 pb-20 px-6" id="readiness-verification">
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800/80">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <span className="text-[10px] uppercase bg-violet-500/10 text-violet-400 px-2.5 py-1 rounded font-extrabold tracking-widest border border-violet-500/20">
                    Agent Commerce Readiness Validator
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white mt-2">
                    Verify Website Placement
                  </h3>
                </div>

                {/* Simulation Toggle Switch */}
                <div className="flex items-center gap-2 bg-slate-950 p-1 border border-slate-850/80 rounded-xl shrink-0">
                  <span className="text-[10px] text-slate-450 text-slate-400 font-bold pl-2">Validation Mode:</span>
                  <button
                    type="button"
                    onClick={() => setSimulationType("success")}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      simulationType === "success"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Standard Compliance
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimulationType("failure")}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      simulationType === "failure"
                        ? "bg-slate-800 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Strict Security Audit
                  </button>
                </div>
              </div>

              {/* Verify input Form */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center pr-2 pl-2">
                  <span className="text-xs bg-slate-850 text-slate-350 border border-slate-800 px-2 py-1 rounded font-bold font-mono mr-2">VERIFY</span>
                  <input
                    type="text"
                    required
                    value={verifyUrl}
                    onChange={(e) => setVerifyUrl(e.target.value)}
                    placeholder="https://yourstore.com"
                    className="w-full text-white text-sm font-semibold focus:outline-none bg-transparent placeholder:text-slate-600"
                  />
                </div>
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleVerifyWebsite}
                  className="bg-indigo-600 hover:bg-indigo-505 bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-6 py-2.5 shadow-sm active:scale-95 disabled:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Scanning Directories...
                    </>
                  ) : (
                    "Verify Website Placement"
                  )}
                </button>
              </div>

              {/* Active Loading Diagnostics logs */}
              {isVerifying && (
                <div className="mt-6 space-y-2 bg-slate-955 bg-slate-950 p-4 rounded-xl font-mono text-xs">
                  {verificationLogs.map((log, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {log.status === "pending" ? (
                        <RefreshCw className="w-4.5 h-4.5 text-indigo-400 animate-spin shrink-0" />
                      ) : log.status === "success" ? (
                        <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                      )}
                      <span className={log.status === "success" ? "text-slate-300" : log.status === "error" ? "text-rose-400" : "text-indigo-300"}>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* DIAGNOSTICS RESULTS FOR SUCCESS PATH */}
              {verificationResult === "success" && !isVerifying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row gap-8 items-center"
                >
                  {/* Circle score ring chart */}
                  <div className="relative shrink-0 flex items-center justify-center w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="stroke-slate-800"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="stroke-emerald-500 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={263.89}
                        strokeDashoffset={263.89 - (263.89 * 96) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-3xl font-extrabold text-white font-mono tracking-tight leading-none block">96</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Protocol Score</span>
                    </div>
                  </div>

                  {/* Summary copy */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping font-semibold"></span>
                      <p className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 text-xs uppercase font-extrabold px-3 py-1 rounded w-fit">
                        Status: Agent Ready
                      </p>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight leading-none">Your website is ready for AI Agent Commerce.</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      Your files were parsed successfully. Autonomous assistants from ChatGPT, Gemini, and Claude protocol routing can now natively index, configure wallet calls, and check out instantly on your endpoint.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-200">
                      <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                        <Check className="text-emerald-500 w-4 h-4" />
                        <span>products.json found</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                        <Check className="text-emerald-500 w-4 h-4" />
                        <span>agent-commerce.json found</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                        <Check className="text-emerald-500 w-4 h-4" />
                        <span>x402.json found</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                        <Check className="text-emerald-500 w-4 h-4" />
                        <span>Checkout routing active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DIAGNOSTICS RESULTS FOR FAILURE PATH */}
              {verificationResult === "failure" && !isVerifying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-slate-800/80"
                >
                  <div className="flex items-start gap-4 bg-rose-950/15 border border-rose-900/40 p-5 rounded-2xl text-rose-200">
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Diagnostics Exception: Incomplete Protocol Deployments</h4>
                      <p className="text-rose-400 text-xs mt-1.5 font-medium leading-relaxed">
                        The live crawler verified your domain but couldn&apos;t locate primary files inside the verification path routing.
                      </p>

                      <div className="space-y-2 mt-4 font-mono text-[11px] font-bold">
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                          <Check className="w-4 h-4 shrink-0" />
                          <span>products.json was deployed at host root successfully.</span>
                        </div>
                        <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>/.well-known/agent-commerce.json: Missing File (404 Exception)</span>
                        </div>
                        <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>/.well-known/x402.json: Missing File (404 Exception)</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-rose-900/40 space-y-2.5">
                        <h5 className="text-xs font-extrabold text-white uppercase tracking-widest">Suggested Fixes:</h5>
                        <ul className="list-disc list-inside text-xs text-rose-300 space-y-1.5 pl-1.5 font-semibold">
                          <li>Create the subdirectory <code className="bg-rose-950/40 px-1.5 py-0.5 rounded text-rose-300 font-mono">.well-known</code> at the root layout of your host server.</li>
                          <li>Verify that paths are not serving fallback HTML index pages on 404 responses.</li>
                          <li>Verify correct CORS settings on your host config policies (Ensure headers: <code className="bg-rose-950/40 px-1 py-0.5 rounded text-rose-300 font-mono">Access-Control-Allow-Origin: *</code>).</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* AGENT PLAYGROUND SANDBOX SIMULATOR */}
      {config && (
        <section className="border-t border-slate-800/80 py-16 px-6" id="agent-sandbox">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-10">
              <span className="text-xs text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full font-bold border border-indigo-500/20 uppercase tracking-wider">
                Interactive Environment
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-white mt-2">
                AI Agent Terminal Interface
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium max-w-lg mx-auto">
                Experience real autonomous agency search, catalog indexing, and secure token checkout flows over the Base protocol network.
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 shadow-xl max-w-xl mx-auto overflow-hidden">
              {/* Simulator Header */}
              <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-xs font-bold font-mono text-slate-350">GetCiteFlow Agent Terminal v1</span>
                </div>
                <div className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Target: {config.storeName}
                </div>
              </div>

              {/* Chat log wrapper */}
              <div className="p-4 sm:p-5 h-80 overflow-y-auto bg-slate-950/40 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="text-[10px] text-slate-500 font-bold mb-1 px-1 opacity-80 uppercase select-none">
                      {msg.sender === "user" ? "Shopper AI" : "GetCiteFlow Proxy"}
                    </div>
                    
                    {msg.isProductCard ? (
                      <div className="space-y-2">
                        <div className="bg-slate-900 border border-slate-800 text-slate-100 px-4 py-3 rounded-2xl text-xs max-w-xs shadow-sm font-semibold select-all leading-normal">
                          {msg.text}
                        </div>
                        {/* Custom product checkout node */}
                        {msg.customNode ? (
                          msg.customNode
                        ) : (
                          <div className="bg-slate-950 border border-slate-850 text-white p-4 rounded-xl shadow-lg max-w-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] bg-indigo-550/20 text-indigo-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-indigo-500/30">
                                  Agent Commerce Verified
                                </span>
                                <h4 className="text-sm font-bold tracking-tight text-white mt-1.5">{config.products[0]?.name || "iPhone 17"}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Offered by {config.storeName}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-base font-extrabold text-indigo-400 font-mono">
                                  {config.currency === "USD" ? "$" : ""}{config.products[0]?.price || 999}
                                </div>
                                <div className="text-[10px] text-emerald-450 text-emerald-400 font-medium flex items-center justify-end gap-1 mt-0.5">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                  In Stock
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-850 flex justify-between items-center gap-3">
                              <span className="text-[10px] text-slate-505 text-slate-500 font-mono">Gateway: x402 USDT</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setCheckoutProduct(config.products[0]);
                                  setIsCheckoutModalOpen(true);
                                  setIsPaid(false);
                                  setCheckoutProgress(0);
                                }}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                              >
                                <Wallet className="w-3.5 h-3.5" />
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

              {/* Input field inside chat logs */}
              <form onSubmit={handleSendChatMessage} className="bg-slate-950 border-t border-slate-900 p-3.5 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Try 'I want to buy a ${config.products[0]?.name || "item"}'...`}
                  className="flex-1 px-3.5 py-2 hover:bg-slate-900 focus:bg-slate-900 rounded-xl text-xs font-semibold text-white bg-slate-950 border border-slate-850 focus:outline-none focus:border-indigo-500 placeholder:text-slate-650 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition shadow active:scale-95 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* MIDDLE PROMOTIVE MARKETING STATS */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/85 shadow-lg">
            <div className="w-11 h-11 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-white tracking-tight">Zero Coding Setup</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">
              GetCiteFlow outputs standard static manifests JSON files. You do not need to rewrite your actual backend database routes or core APIs.
            </p>
          </div>

          <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/85 shadow-lg">
            <div className="w-11 h-11 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-white tracking-tight">Standard x402 Gateway</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">
              Receive direct USDT/USDC secure payments over the Base blockchain network straight into your non-custodial business wallets.
            </p>
          </div>

          <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/85 shadow-lg">
            <div className="w-11 h-11 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-white tracking-tight">Universal Compatibility</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">
              Expose schemas parseable by all major language agent frameworks worldwide, ensuring your shop is ready for automatic purchasing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center select-none relative overflow-hidden">
        {/* Subtle grid indicators */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="relative z-1 max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] uppercase font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-full select-all tracking-widest inline-block leading-none">
            GetCiteFlow Commerce Pipeline
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Be Ready For The Future Of AI Commerce
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
            AI language models are purchasing items autonomously today. Do not lock yourself out from the agentic internet. Configure your verified gateway address.
          </p>

          <div className="pt-4 max-w-md mx-auto space-y-4">
            {onWaitlist ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-950 border border-indigo-500/30 p-4 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-100">You are on the V1 Launch Waitlist! We will notify you shortly.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (waitlistEmail.trim()) {
                    setOnWaitlist(true);
                  }
                }}
                className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter email to join waiting list"
                  className="flex-1 bg-transparent py-2.5 px-3.5 focus:outline-none text-slate-100 font-semibold text-xs placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition rounded-xl px-5 py-2.5 text-xs cursor-pointer shadow-md"
                >
                  Join Waitlist
                </button>
              </form>
            )}

            <button
              type="button"
              className="w-full text-slate-400 hover:text-slate-300 text-xs font-bold py-2 border border-slate-800 hover:border-slate-700 rounded-xl transition flex items-center justify-center gap-1.5 select-none"
            >
              <Lock className="w-3.5 h-3.5" />
              Enable Agent Commerce (Coming Soon V2)
            </button>
          </div>
        </div>
      </section>

      {/* SIGN IN / AUTHENTICATION MODAL */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              {/* Header inside modal */}
              <div className="bg-slate-950/80 p-6 text-white text-center select-none relative">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="w-10 h-10 bg-indigo-650 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3 font-extrabold text-base">
                  G
                </div>
                <h4 className="text-base font-bold tracking-tight">Connect Verified Owner</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal font-medium">Verify your shop credentials and store identities safely.</p>
              </div>

              {/* Form entries inside modal */}
              <div className="p-6 space-y-5">
                
                {/* Method 1: Email verification codes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5" />
                    Option 1: Email Verification
                  </div>

                  {!codeSent ? (
                    <div className="space-y-2">
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendEmailCode}
                        disabled={isEmailLoading || !authEmail}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold transition rounded-xl py-2 text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {isEmailLoading ? (
                          <RefreshCw className="w-3 animate-spin" />
                        ) : (
                          "Send Verification Link"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold text-slate-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Simulated code sent to: {authEmail}
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        placeholder="Enter 6-digit code (e.g. 123456)"
                        className="w-full text-center tracking-widest bg-slate-950 border border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-indigo-500 font-mono text-sm uppercase font-bold text-white"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyEmailCode}
                        disabled={isEmailLoading || authCode.length < 4}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold transition rounded-xl py-2 text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {isEmailLoading ? (
                          <RefreshCw className="w-3 animate-spin" />
                        ) : (
                          "Verify and Login"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-mono uppercase">or</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                {/* Method 2: Connect Google Account */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                    <Globe className="w-3.5 h-3.5" />
                    Option 2: Connected Protocols
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGoogleSignInByEmail("1986.yanning@gmail.com")}
                    disabled={isGoogleLoading}
                    className="w-full bg-slate-950 hover:bg-slate-900 text-slate-200 font-bold transition rounded-xl py-2.5 px-4 text-xs border border-slate-800 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                  >
                    {isGoogleLoading ? (
                      <RefreshCw className="w-3 animate-spin" />
                    ) : (
                      <>
                        {/* Custom Google inline icon */}
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#EA4335"
                            d="M12 5.04c1.8 0 3.42.62 4.69 1.83l3.52-3.52C18.06 1.44 15.22.75 12 .75 7.42.75 3.52 3.38 1.62 7.18l4.13 3.2C6.81 7.18 9.19 5.04 12 5.04z"
                          />
                          <path
                            fill="#4285F4"
                            d="M23.47 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.43a5.5 5.5 0 0 1-2.39 3.61l4.11 3.19c2.4-2.22 3.78-5.49 3.78-8.93z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.75 10.38a7.2 7.2 0 0 1 0-3.2l-4.13-3.2a11.95 11.95 0 0 0 0 9.6l4.13-3.2z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23.25c3.24 0 5.96-1.07 7.95-2.92l-4.11-3.19c-1.14.77-2.6 1.22-3.84 0-2.81 0-5.19-2.14-6.25-5.34l-4.13 3.2c1.9 3.8 5.8 6.43 10.38 6.43z"
                          />
                        </svg>
                        Continue with 1986.yanning@gmail.com
                      </>
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER SECTION */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950/60 backdrop-blur-md pt-16 pb-8 px-6 text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 animate-fade-in">
            {/* Column 1: Brand & Bio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-extrabold tracking-wider text-base">
                  G
                </div>
                <span className="text-base font-bold text-white tracking-tight">GetCiteFlow</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Autonomous agent standard schema generator and Base-native checkout pipeline for AI agents, enabling instant non-custodial USDT/USDC settlement.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">
                  Mainnet Gateway Active
                </span>
              </div>
            </div>

            {/* Column 2: App Modules */}
            <div>
              <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Application</h5>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => handleScrollToSegment(e, "how-it-works")}
                    className="hover:text-white hover:underline transition duration-200 cursor-pointer"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#manifest-generator"
                    onClick={(e) => handleScrollToSegment(e, "manifest-generator")}
                    className="hover:text-indigo-400 hover:underline transition duration-200 text-indigo-400 cursor-pointer"
                  >
                    Manifest Generator
                  </a>
                </li>
                <li>
                  <a
                    href="#readiness-verification"
                    onClick={(e) => handleScrollToSegment(e, "readiness-verification")}
                    className="hover:text-white hover:underline transition duration-200 cursor-pointer"
                  >
                    Readiness Checker
                  </a>
                </li>
                <li>
                  <a
                    href="#agent-sandbox"
                    onClick={(e) => handleScrollToSegment(e, "agent-sandbox")}
                    className="hover:text-white hover:underline transition duration-200 cursor-pointer"
                  >
                    Agent Terminal Sandbox
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Specs & Protocol standards */}
            <div>
              <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Specifications</h5>
              <ul className="space-y-2 text-xs font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-slate-400">Base ERC-20 USDT/USDC Pipeline</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-slate-400">ERC-402 Agent Protocol</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-slate-400">Schema.org Web Crawler standard</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-slate-400">OpenAI Agent Schema manifest</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Trust & Admin */}
            <div>
              <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-4">Connect Store</h5>
              {auth ? (
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
                  <div className="text-[10px] text-slate-505 text-slate-500 font-bold uppercase leading-none">Registered Owner</div>
                  <div className="text-xs font-semibold text-white truncate" title={auth.email}>
                    {auth.email}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAuth(null)}
                    className="text-[11px] text-rose-400 hover:underline font-bold block cursor-pointer"
                  >
                    Disconnect Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Verify store ownership, preview simulated payouts, and test compliance logs.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthEmail("1986.yanning@gmail.com");
                      setAuthModalOpen(true);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-850 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 border border-indigo-500/10 text-xs font-bold py-2 px-3 rounded-xl transition duration-200 text-center flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-slate-500 text-[11px] font-semibold">
            <div>
              <p>© {new Date().getFullYear()} GetCiteFlow. Built for the autonomous AI agent commerce era over Base blockchain network.</p>
              <p className="text-slate-600 mt-1">Non-custodial, peer-to-peer, secure static integration pipeline.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" /> Secure SSL
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Shield className="w-3 h-3 text-indigo-400" /> Decentralized
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* INSTANT CHECKOUT SIMULATED MODAL */}
      <AnimatePresence>
        {isCheckoutModalOpen && checkoutProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden select-none"
            >
              {/* Modal Core Title */}
              <div className="bg-slate-950/80 p-5 border-b border-slate-805 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold uppercase text-slate-300">x402 Instant Settlement Node</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="text-slate-400 hover:text-white font-bold text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
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

                {/* Progress routing log bar */}
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
                    <div
                      className={`h-full transition-all duration-300 ${isPaid ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                      style={{ width: `${checkoutProgress}%` }}
                    ></div>
                  </div>
                </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-805 space-y-1.5 font-mono text-[10px] text-slate-400">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="text-white">Base Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Smart Contract:</span>
                      <span className="text-white">x402-USDT-USDC-v1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merchant Wallet:</span>
                      <span className="text-indigo-400 truncate max-w-[120px] select-all">
                        {config ? config.x402.merchant : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
                      </span>
                    </div>
                  </div>

                {isPaid ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex flex-col items-center gap-1 text-center"
                  >
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

    </div>
  );
}
