import { create } from 'zustand';

type PaymentState = {
    payment: string;
    setPayment: (payment: string) => void;
}

type TotalState = {
    total: number;
    setTotal: (total: number) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
    payment: "",
    setPayment: (payment) => set({ payment: payment })
}));

export const useTotalStore = create<TotalState>((set) => ({
    total: 0,
    setTotal: (total) => set({total:total}),
}))