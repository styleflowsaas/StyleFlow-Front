export interface Product {
  id: number;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface Invoice {
  id: number;
  products: Product[];
  clientSearch: string;
  invoiceNumber: number;
  clientType: string;
  generalDiscount: number;
  paymentMethod: string;
}
