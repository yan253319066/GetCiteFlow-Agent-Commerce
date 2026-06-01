export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: 'What is GetCiteFlow Agent Commerce?',
    answer:
      'GetCiteFlow Agent Commerce is an AI-powered tool that generates standardized agent commerce configurations for any website. It crawls your store using Schema.org Web Crawler standards, detects products and payment methods, and outputs three JSON manifest files (agent-commerce config, products feed, and x402 payment gateway) that enable AI agents to browse, select, and purchase products autonomously over the Base blockchain network.',
  },
  {
    question: 'How does the manifest generation work?',
    answer:
      "GetCiteFlow's manifest generation works by scanning your website URL with its AI engine. It crawls your product catalog to detect available items, analyzes your checkout flow to understand the purchase process, and identifies your payment provider. The system then generates three standardized JSON files: an agent-commerce manifest (store configuration), a products feed (catalog with pricing and availability), and an x402 payment gateway configuration (Base blockchain settlement details). The entire process requires no coding or technical setup — just enter your URL and receive the files.",
  },
  {
    question: 'Do I need to modify my existing website?',
    answer:
      "No. GetCiteFlow is designed as a non-invasive solution. It outputs static JSON manifest files that you simply upload to your web server's public directory. Your existing backend infrastructure, database schema, checkout system, and payment processing remain completely untouched. The JSON manifests act as a standardized interface layer that AI agents can read and interact with, without requiring any changes to your underlying website code or architecture.",
  },
  {
    question: 'What is the x402 payment gateway?',
    answer:
      'x402 is a standardized payment protocol designed specifically for AI agent transactions on the Base blockchain (Coinbase L2 network). It enables non-custodial USDT and USDC stablecoin settlements that go directly to your merchant wallet. This allows AI agents to complete purchases autonomously without human intervention, while maintaining full security, transparency, and traceability on the blockchain. The protocol conforms to the ERC-402 Agent Protocol standard.',
  },
  {
    question: 'Is my website compatible?',
    answer:
      "GetCiteFlow is compatible with any website that has a defined product catalog and a checkout flow. The built-in readiness checker validates your store's compatibility in real time by scanning for common e-commerce patterns such as product listings with pricing, add-to-cart functionality, checkout endpoints, and payment gateway integrations. If the scanner detects any missing elements, it provides specific recommendations to address them. Most modern e-commerce platforms, including Shopify, WooCommerce, Magento, BigCommerce, and custom-built stores, are supported.",
  },
];
