import { IProduct } from "@/types/basicTypes";
import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const mockProducts: IProduct[] = [
  {
    id: 1,
    name: "Airmax",
    price: 135000,
    description: "Zapatilla con base aerodinamica",
    brand: "Nike",
    stock: 1,
    img: ["/airmax1.png", "/airmax2.png"],
    category: "Calzado",
    colores: ["Blanca", "Negra"],
    codeBar: "545646",
  },
  {
    id: 2,
    name: "short Futbol",
    price: 100,
    description: "Pantalon corto con logo de marca",
    brand: "Generica",
    stock: 1,
    img: ["/short1.png"],
    category: "Vestimenta",
    colores: ["Negro"],
    codeBar: "3545646",
  },
  {
    id: 3,
    name: "Medias 3/4",
    price: 100,
    description: "Medias 3/4",
    brand: "Genericas",
    stock: 1,
    img: ["/media1.png", "/media2.png"],
    category: "Accesorios",
    colores: ["Negra", "Blanca"],
    codeBar: "684869498",
  },
  {
    id: 4,
    name: "SubUnder",
    price: 100,
    description: "Medias 3/4",
    brand: "Puma",
    stock: 1,
    img: ["/puma1.png", "/puma2.png"],
    category: "Accesorios",
    colores: ["Blanca", "Negra"],
    codeBar: "684869498",
  },
  {
    id: 5,
    name: "Short sleeve",
    price: 100,
    description: "Pantalon corto con logo de marca",
    brand: "Genericas",
    stock: 1,
    img: ["/product.png", "/product2.png"],
    category: "Vestimenta",
    colores: ["Rojo", "Verde"],
    codeBar: "3545646",
  },
  {
    id: 6,
    name: "Standford",
    price: 100000,
    description: "Zapatilla generica",
    brand: "Puma",
    stock: 1,
    img: ["/product.png", "/product2.png"],
    category: "Calzado",
    colores: ["Rojo", "Verde"],
    codeBar: "545646",
  },
  {
    id: 7,
    name: "Short",
    price: 100,
    description: "Pantalon corto con logo de marca",
    brand: "Adibas",
    stock: 1,
    img: ["/product.png", "/product2.png"],
    category: "Vestimenta",
    colores: ["Rojo", "Verde"],
    codeBar: "3545646",
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/product`);
        if (!response.ok) {
          throw new Error("Error al Cargar Productos");
        }
        const data = await response.json();
        console.log(data);
        // setProducts(data);
        setProducts(mockProducts);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchProducts();
  }, []);
  return { products, error };
};
