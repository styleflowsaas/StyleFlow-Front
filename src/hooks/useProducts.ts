import { IProduct } from "@/types/basicTypes";
import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
        setProducts(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchProducts();
  }, []);
  return { products, error };
};
