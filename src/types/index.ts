export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface TransactionHistory {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}