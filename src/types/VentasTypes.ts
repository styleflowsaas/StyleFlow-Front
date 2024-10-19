export interface SelectInputs {
  value: string;
  label: string;
}

export interface Cliente {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cuil: string;
  address: string;
  phone: string;
}

export interface ProductInterface {
  id: number;
  name: string;
  brand: string;
  price: number;
  img: string[];
  stock: number;
  description: string;
  category: string;
  colores: string[];
  codeBar: string;
  discount?: number;
}

export interface InvoiceInterface {
  id: number;
  factura: {
    id: number;
    tipo: string;
  };
  products: ProductInterface[];
  client: Cliente | undefined;
  clientType: string;
  generalDiscount: number;
  paymentMethod: string;
  total: number;
}
