export interface TripayOrder {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  reference: string;
  merchant_ref: string;
  payment_selection_type: string;
  payment_method: string;
  payment_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: null;
  callback_url: null;
  return_url: null;
  amount: number;
  fee_merchant: number;
  fee_customer: number;
  total_fee: number;
  amount_received: number;
  pay_code: null;
  pay_url: null;
  checkout_url: string;
  status: string;
  expired_time: number;
  order_items: Orderitem[];
  instructions: Instruction[];
  qr_string: string;
  qr_url: string;
}

interface Instruction {
  title: string;
  steps: string[];
}

interface Orderitem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  product_url: null;
  image_url: null;
}