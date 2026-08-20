declare module "@paystack/inline-js" {
  interface TransactionResponse {
    id: number;
    reference: string;
    message: string;
  }

  interface ErrorResponse {
    message: string;
  }

  interface ResumeCallbacks {
    onSuccess?: (transaction: TransactionResponse) => void;
    onCancel?: () => void;
    onError?: (error: ErrorResponse) => void;
  }

  export default class PaystackPop {
    resumeTransaction(accessCode: string, callbacks?: ResumeCallbacks): unknown;
  }
}
