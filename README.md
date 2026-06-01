# GetCiteFlow Agent Commerce

> Turn any website into an AI Agent-ready store. Generate agent commerce configurations, verify placement, and enable AI agents to browse, select, and purchase products autonomously using the x402 payment protocol on the Base blockchain.

**Last updated: June 2026**

---

## What Is GetCiteFlow Agent Commerce?

GetCiteFlow Agent Commerce is a **free AI-powered tool** that crawls any e-commerce website, detects products and payment methods, and generates **three standardized JSON manifests** that enable AI agents to discover, browse, and purchase products autonomously — with **zero backend modifications** required.

It supports any website with a defined product catalog and checkout flow, including Shopify, WooCommerce, Magento, BigCommerce, and custom-built stores.

## Key Features

- **Agent Specs Generator**: Crawls store URLs, auto-detects product catalogs, checkout endpoints, and payment methods, then generates standardized JSON manifests compatible with all major AI agent frameworks.
- **Readiness Checker**: Validates website readiness for AI agent commerce with real-time diagnostics.
- **Agent Terminal Sandbox**: Interactive simulator that demonstrates autonomous agent shopping — search, catalog index, and x402 token checkout.
- **x402 Payment Gateway**: Non-custodial USDT/USDC settlements directly to your wallet via the Base blockchain (ERC-402 Agent Protocol compliant).

## How It Works

1. **Enter a website URL** into the manifest generator
2. **AI engine crawls and analyzes** product catalog, checkout flow, and payment provider
3. **Three JSON manifests are generated**: agent-commerce config, products feed, x402 payment gateway
4. **Upload manifests** to your server's public directory
5. **AI agents can now discover and purchase** from your store autonomously

## Key Statistics

- Generates **3 standardized JSON manifest files** per scan
- Supports **any e-commerce platform** with a product catalog and checkout flow
- Uses **x402 non-custodial payment protocol** on the Base blockchain (USDT/USDC)
- Outputs **static JSON files only** — no backend or database modifications required
- Compatible with **all major AI agent frameworks**

## Pricing

**Completely free during V1 development.** No credit card required. Unlimited website scans. Paid tiers in planning — early users will receive grandfathered pricing. See [pricing.md](public/pricing.md) for details.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Motion
- **Blockchain**: Base (Coinbase L2)
- **Payment Protocol**: x402 — non-custodial USDT/USDC settlements
- **Standards**: Schema.org Web Crawler, OpenAI Agent Schema manifest, ERC-402 Agent Protocol
- **AI**: Google Gemini API

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app: `npm run dev`

## Links

- **Homepage**: [https://app.getciteflow.ai](https://app.getciteflow.ai)
- **Manifest Generator**: [https://app.getciteflow.ai/#manifest-generator](https://app.getciteflow.ai/#manifest-generator)
- **Readiness Checker**: [https://app.getciteflow.ai/#readiness-verification](https://app.getciteflow.ai/#readiness-verification)
- **Agent Terminal**: [https://app.getciteflow.ai/#agent-sandbox](https://app.getciteflow.ai/#agent-sandbox)
- **Pricing**: [public/pricing.md](public/pricing.md)
- **LLMs Context**: [public/llms.txt](public/llms.txt)
