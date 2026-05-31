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

  // Choose products depending on name keywords
  const lowerName = storeName.toLowerCase();
  let products = [
    {
      id: "product-1",
      name: "Minimalist Leather Cardholder",
      price: 49,
      currency: currency,
      availability: "in_stock"
    },
    {
      id: "product-2",
      name: "Ergonomic Desk Organizer",
      price: 89,
      currency: currency,
      availability: "in_stock"
    }
  ];

  if (lowerName.includes("phone") || lowerName.includes("tech") || lowerName.includes("gear") || lowerName.includes("gadget") || lowerName.includes("mobile") || lowerName.includes("electronic")) {
    category = "Electronics & Gadgets";
    products = [
      {
        id: "iphone17",
        name: "iPhone 17 Pro Max",
        price: 1199,
        currency: currency,
        availability: "in_stock"
      },
      {
        id: "cyber-charg-65",
        name: "CyberCharge 65W GaN Power Adapter",
        price: 45,
        currency: currency,
        availability: "in_stock"
      },
      {
        id: "airbuds-x",
        name: "AirBuds X Noise Cancelling Earphones",
        price: 149,
        currency: currency,
        availability: "in_stock"
      }
    ];
  } else if (lowerName.includes("shoe") || lowerName.includes("kick") || lowerName.includes("foot") || lowerName.includes("sport") || lowerName.includes("run") || lowerName.includes("fit")) {
    category = "Sports & Footwear";
    products = [
      {
        id: "trailblazer-v2",
        name: "Trailblazer V2 Aerobic Running Shoes",
        price: 135,
        currency: currency,
        availability: "in_stock"
      },
      {
        id: "hydro-flask-32",
        name: "Insulated Sports Hydro Flask (32oz)",
        price: 34,
        currency: currency,
        availability: "in_stock"
      }
    ];
  } else if (lowerName.includes("coffee") || lowerName.includes("cafe") || lowerName.includes("bean") || lowerName.includes("brew") || lowerName.includes("roast")) {
    category = "Artisanal Coffee & Roasters";
    products = [
      {
        id: "single-origin-ethiopia",
        name: "Single-Origin Ethiopian Yirgacheffe Beans (500g)",
        price: 26,
        currency: currency,
        availability: "in_stock"
      },
      {
        id: "barista-pour-over-kettle",
        name: "Barista Precision Gooseneck Pour-Over Kettle",
        price: 68,
        currency: currency,
        availability: "in_stock"
      }
    ];
  } else if (lowerName.includes("apparel") || lowerName.includes("cloth") || lowerName.includes("wear") || lowerName.includes("fit") || lowerName.includes("boutique") || lowerName.includes("style")) {
    category = "Fashion & Apparel";
    products = [
      {
        id: "classic-heavyweight-hoodie",
        name: "Signature Classic Heavyweight Hoodie",
        price: 85,
        currency: currency,
        availability: "in_stock"
      },
      {
        id: "oversized-organic-tee",
        name: "Unisex Oversized Organic Cotton Tee",
        price: 38,
        currency: currency,
        availability: "in_stock"
      }
    ];
  }

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
      currency: "USDT",
      network: "TRON",
      merchant: `T${Array.from({ length: 33 }, () => "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 58))).join("")}`
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
Your goal is to look at a user-inputted website URL (e.g. "https://retro-coffee.com" or "https://futurephone.io"), extract a realistic Brand/Store name, select a logical currency (e.g. USD, EUR, JPY depending on domain/global defaults), identify its store type (e.g., Electronics, Artisanal Coffee, Fashion & Apparel), and forge a set of 1-3 hyper-realistic, theme-specific products that this store would sell.

Return a JSON object that strictly adheres to the following structure:
{
  "storeName": "Name of the Store",
  "storeType": "Niche category of the store (e.g. Artisanal Espresso, High-End Mobile Gears, Eco-Friendly Apparel)",
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
      "id": "item-id-slug",
      "name": "Full Product Name",
      "price": number,
      "currency": "USD" or logical currency,
      "availability": "in_stock"
    }
  ],
  "x402": {
    "payment_method": "x402",
    "currency": "USDT",
    "network": "TRON",
    "merchant": "A randomized secure-looking TRON address (e.g. starting with T followed by 33 characters)"
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
          currency: "USDT",
          network: "TRON",
          merchant: "TTr7Z8n5Fw3Q8MvXb9rZsPf7N1qL9p"
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
