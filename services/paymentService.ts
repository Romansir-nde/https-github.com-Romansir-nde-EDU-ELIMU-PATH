
import { PaymentRecord } from '../types';

export type PaymentStatus = 'IDLE' | 'INITIATED' | 'SENT_TO_PHONE' | 'PIN_ENTERED' | 'VERIFYING' | 'SUCCESS' | 'FAILED';

/**
 * EDU PATH Payment Service (Advanced Simulation)
 * Mimics the lifecycle of a real Safaricom Daraja STK Push transaction.
 */
export const paymentService = {
  /**
   * Initiates the handshake with the simulated M-Pesa API.
   */
  initiateStkPush: async (phone: string, amount: number, studentName: string): Promise<{ checkoutRequestId: string }> => {
    // Validate Safaricom Number
    if (!phone.match(/^(?:254|\+254|0)?(7|1)(?:[0-9]){8}$/)) {
      throw new Error("Invalid Safaricom M-Pesa number.");
    }

    // Simulate network delay to gateway
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      checkoutRequestId: 'ws_CO_' + Math.random().toString(36).substring(7).toUpperCase()
    };
  },

  /**
   * Generates a unique secure OTP for the transaction.
   */
  generateTransactionOtp: (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  /**
   * Triggers haptic feedback if supported by the device.
   */
  triggerVibration: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }
};
