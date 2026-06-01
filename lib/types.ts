export interface ConfigState {
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

export interface ChatMessage {
  sender: "user" | "agent";
  text: string;
  isProductCard?: boolean;
  customNode?: React.ReactNode;
}

export interface VerificationLog {
  text: string;
  status: "pending" | "success" | "error";
}
