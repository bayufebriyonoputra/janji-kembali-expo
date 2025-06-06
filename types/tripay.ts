export interface PaymentChanel {
    success: boolean;
    message: string;
    data: PaymentChanlelData[];
}

export interface PaymentChanlelData {
    group: string;
    code: string;
    name: string;
    type: string;
    fee_merchant: Fee;
    fee_customer: Fee;
    total_fee: Totalfee;
    minimum_fee: null | number;
    maximum_fee: null;
    minimum_amount: number;
    maximum_amount: number;
    icon_url: string;
    active: boolean;
}

interface Totalfee {
    flat: number;
    percent: string;
}

interface Fee {
    flat: number;
    percent: number;
}


