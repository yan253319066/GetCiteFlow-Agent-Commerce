export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: 'What is GetCiteFlow Agent Commerce?',
    answer:
      'GetCiteFlow Agent Commerce is an AI-powered tool that generates standardized agent commerce configurations for any website. It crawls your store, detects products and payment methods, and outputs JSON manifests that enable AI agents to browse, select, and purchase products autonomously.',
  },
  {
    question: 'How does the manifest generation work?',
    answer:
      "Simply enter your website URL and the AI engine crawls your product catalog, analyzes your checkout flow, and detects your payment provider. It then generates three standardized JSON files: an agent-commerce manifest, a products feed, and an x402 payment gateway configuration. No coding required.",
  },
  {
    question: 'Do I need to modify my existing website?',
    answer:
      "No. GetCiteFlow outputs static JSON manifest files that you upload to your server's public directory. Your existing backend, database, and checkout system remain untouched. The manifests serve as a standardized interface that AI agents can read and interact with.",
  },
  {
    question: 'What is the x402 payment gateway?',
    answer:
      'x402 is a standardized payment protocol for AI agent transactions on the Base blockchain. It enables non-custodial USDT/USDC settlements directly to your wallet, allowing AI agents to complete purchases without human intervention while maintaining security and transparency.',
  },
  {
    question: 'Is my website compatible?',
    answer:
      "GetCiteFlow works with any website that has a defined product catalog and checkout flow. The readiness checker validates your store's compatibility by scanning for common e-commerce patterns, product listings, and payment gateway detections.",
  },
];
