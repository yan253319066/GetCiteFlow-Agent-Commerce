import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Fallback generator for resiliency if API call fails or GEMINI_API_KEY is not defined
function getFallbackConfig(urlString: string) {
  let storeName = "E-Commerce Store";
  let domain = "yourstore.com";
  let currency = "USD";
  let category = "General Retail";

  try {
    const url = new URL(urlString);
    domain = url.hostname.replace("www.", "");
    const parts = domain.split(".");
    if (parts.length > 0) {
      storeName = parts[0]
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  } catch (e) {
    if (urlString && urlString.includes("://") === false) {
      try {
        const url = new URL(`https://${urlString}`);
        domain = url.hostname.replace("www.", "");
        const parts = domain.split(".");
        if (parts.length > 0) {
          storeName = parts[0]
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      } catch (err) {}
    }
  }

  // Always map to AI Computing & APIs for Scheme A (Compute Credits)
  category = "AI Computing & APIs";
  const lowerName = storeName.toLowerCase();
  if (!lowerName.includes("ai") && !lowerName.includes("compute") && !lowerName.includes("node") && !lowerName.includes("registry") && !lowerName.includes("api") && !lowerName.includes("cloud")) {
    storeName = `${storeName} Compute Node`;
  }

  let products = [
    {
      id: "credits-starter",
      name: `Compute Credits (Starter Pack - 1,000 Runs)`,
      price: 10,
      currency: currency,
      availability: "in_stock"
    },
    {
      id: "credits-dev",
      name: `Compute Credits (Developer Pack - 10,000 Runs)`,
      price: 80,
      currency: currency,
      availability: "in_stock"
    },
    {
      id: "credits-pro",
      name: `Compute Credits (Pro Pack - 50,000 Runs)`,
      price: 350,
      currency: currency,
      availability: "in_stock"
    }
  ];

  return {
    websiteUrl: urlString,
    storeName,
    storeType: category,
    currency,
    productsCount: products.length,
    checkoutDetected: "x402 Unified Gateway",
    agent_commerce: {
      store_name: storeName,
      currency: currency,
      products_feed: "/products.json",
      checkout_endpoint: "/checkout",
      payment_provider: "x402"
    },
    products,
    x402: {
      payment_method: "x402",
      currency: "USDT/USDC",
      network: "Base",
      merchant: `0x${Array.from({ length: 40 }, () => "0123456789abcdefABCDEF".charAt(Math.floor(Math.random() * 22))).join("")}`
    }
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      // Return beautiful fallback if Gemini credentials are not set up yet
      const fallback = getFallbackConfig(url);
      return NextResponse.json(fallback);
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemPrompt = `
You are a highly capable AI Assistant specializing in E-Commerce Website Analysis for Agent Commerce.
Your goal is to look at a user-inputted website URL (e.g. "https://yourstore.com"), extract a realistic Brand/Store name, select a logical currency (e.g. USD, EUR, JPY depending on domain/global defaults), always set its store type to "AI Computing & APIs", and forge a set of 1-3 hyper-realistic AI Compute Credit packages, Run quotas, or Developer Tier runs tailored for this merchant.

If the merchant's parsed website name doesn't already suggest an AI computing platform, append a professional modifier like "Compute Registry" or "AI Compute Node" to the extracted brand name (e.g., "Yourstore" becomes "Yourstore Compute Node").

Return a JSON object that strictly adheres to the following structure:
{
  "storeName": "Name of the Store",
  "storeType": "AI Computing & APIs",
  "currency": "USD" or logical currency code,
  "agent_commerce": {
    "store_name": "Name of the Store",
    "currency": "USD" or logical currency,
    "products_feed": "/products.json",
    "checkout_endpoint": "/checkout",
    "payment_provider": "x402"
  },
  "products": [
    {
      "id": "credits-starter",
      "name": "Compute Credits (Starter Pack - 1,000 Runs)",
      "price": 10,
      "currency": "USD" or logical currency,
      "availability": "in_stock"
    },
    {
      "id": "credits-dev",
      "name": "Compute Credits (Developer Pack - 10,000 Runs)",
      "price": 80,
      "currency": "USD" or logical currency,
      "availability": "in_stock"
    },
    {
      "id": "credits-pro",
      "name": "Compute Credits (Pro Pack - 50,000 Runs)",
      "price": 350,
      "currency": "USD" or logical currency,
      "availability": "in_stock"
    }
  ],
  "x402": {
    "payment_method": "x402",
    "currency": "USDT/USDC",
    "network": "Base",
    "merchant": "A randomized secure-looking Base EVM address (e.g. starting with 0x followed by 40 hexadecimal characters)"
  }
}

Do not include any extra thoughts, markdown formatting, or text outside the JSON. Return valid, parseable JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze this website URL and return the Agent Commerce configuration: ${url}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const rawText = response.text || "";
    const cleanText = rawText.trim().replace(/^```json/, "").replace(/```$/, "").trim();
    
    try {
      const parsedConfig = JSON.parse(cleanText);
      // Ensure all fields are sound
      return NextResponse.json({
        websiteUrl: url,
        storeName: parsedConfig.storeName || "AI Store",
        storeType: parsedConfig.storeType || "E-Commerce Retail",
        currency: parsedConfig.currency || "USD",
        productsCount: (parsedConfig.products || []).length || 1,
        checkoutDetected: "x402 Unified Gateway",
        agent_commerce: parsedConfig.agent_commerce || {
          store_name: parsedConfig.storeName || "AI Store",
          currency: parsedConfig.currency || "USD",
          products_feed: "/products.json",
          checkout_endpoint: "/checkout",
          payment_provider: "x402"
        },
        products: parsedConfig.products || [
          {
            id: "placeholder",
            name: "Premium Store Catalog Item",
            price: 99,
            currency: parsedConfig.currency || "USD",
            availability: "in_stock"
          }
        ],
        x402: parsedConfig.x402 || {
          payment_method: "x402",
          currency: "USDT/USDC",
          network: "Base",
          merchant: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        }
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini output, using fallback:", parseError);
      return NextResponse.json(getFallbackConfig(url));
    }
  } catch (error: any) {
    console.error("API generate-config route failure:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
