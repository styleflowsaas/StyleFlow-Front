"use client";
import ProductCard from "@/components/Cards/ProductCard";
import Loader from "@/components/Loader";
import ProductSearchBar from "@/components/NavBar/ProductSearchBar";
import ProductTable from "@/components/Table/ProductTable";
import { useProducts } from "@/hooks/useProducts";

import { useState, useTransition } from "react";

const Productos: React.FC = () => {
  const [viewTable, setViewTable] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProducts();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const filteredProducts = products?.filter((product) =>
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
        setSearchQuery={handleSearch}
        searchQueryValue={searchQuery}
        startTransition={startTransition}
      />

      {/* Muestra el Loader si los productos aún no están cargados */}
      {!products ? (
        <Loader />
      ) : (
        <section className="flex flex-wrap gap-3 items-center justify-center w-full">
          {isPending && <Loader />}
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
