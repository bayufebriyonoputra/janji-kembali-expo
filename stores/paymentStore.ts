import { create } from 'zustand';

type PaymentState = {
    payment: string;
    setPayment: (payment: string) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
    payment: "",
    setPayment: (payment) => set({ payment: payment })
}));