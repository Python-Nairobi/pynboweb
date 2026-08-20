export interface PaystackInitializeData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaystackTransaction {
  reference: string;
  status: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
  };
  metadata: Record<string, unknown> | string | null;
}

export interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaystackWebhookEvent {
  event: string;
  data?: PaystackTransaction;
}
