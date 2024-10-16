"use client";
import ProductCard from "@/components/Cards/ProductCard";
import Loader from "@/components/Loader";
import ProductSearchBar from "@/components/NavBar/ProductSearchBar";
import ProductTable from "@/components/Table/ProductTable";
import { useProducts } from "@/hooks/useProducts";

import { useState } from "react";

const Productos: React.FC = () => {
  const [viewTable, setViewTable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProducts();

  // Filtra los productos si ya están cargados
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(products);
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <ProductSearchBar
        setTable={setViewTable}
        setSearchQuery={setSearchQuery}
      />

      {/* Muestra el Loader si los productos aún no están cargados */}
      {!products ? (
        <Loader />
      ) : (
        <section className="flex flex-wrap gap-1 items-center justify-center w-full">
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
