"use client";
import ProductCard from "@/components/Cards/ProductCard";
import Loader from "@/components/Loader";
import ProductSearchBar from "@/components/NavBar/ProductSearchBar";
import ProductTable from "@/components/Table/ProductTable";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/types/basicTypes";

import { useState } from "react";

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
const Productos: React.FC = () => {
  const [viewTable, setViewTable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { products } = useProducts();

  // Filtra los productos si ya están cargados
  const filteredProducts = mockProducts?.filter((product) =>
    searchQuery === ""
      ? true
      : [product.name, product.brand, product.codeBar, product.category].some(
          (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
        )
  );

  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <ProductSearchBar
        setTable={setViewTable}
        setSearchQuery={setSearchQuery}
        searchQueryValue={searchQuery}
      />

      {/* Muestra el Loader si los productos aún no están cargados */}
      {!mockProducts ? (
        <Loader />
      ) : (
        <section className="flex flex-wrap gap-3 items-center justify-center w-full">
          {filteredProducts && filteredProducts.length > 0 ? (
            viewTable ? (
              <ProductTable data={filteredProducts} />
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            )
          ) : (
            <p className="text-center text-texto-ligth">
              No se encontraron productos.
            </p>
          )}
        </section>
      )}
    </section>
  );
};

export default Productos;
