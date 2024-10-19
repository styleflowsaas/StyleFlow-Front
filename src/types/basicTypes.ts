export interface IProduct {
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
}

export interface InputsBasic {
  name: string;
  type: string;
  placeholder: string;
  id: string;
  children: string;
}

export interface acountUser {
  name: string;
  lastName: string;
  email: string;
  dni: string;
  address: string;
  phone: string;
  password: string;
  newPassword: string;
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  dni: string;
  address: string;
  phone: string;
  password: string;
}
