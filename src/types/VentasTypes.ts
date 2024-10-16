export interface Product {
  id: number;
  name: string;
  brand?: string;
  price: number;
  img?: string[];
  stock: number;
  description?: string;
  category?: string;
  colores?: string[];
  codeBar: string;
  discount?: number;
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
