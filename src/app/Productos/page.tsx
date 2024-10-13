"use client";
import ProductCard from "@/components/Cards/ProductCard";
import ProductSearchBar from "@/components/NavBar/ProductSearchBar";
import ProductTable from "@/components/Table/ProductTable";
import { useState } from "react";
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    brand: "Nike",
    price: 235000,
    img: "/product.png",
    stock: 5,
    description: "Descripción del producto 1",
    category: "Zapatilla",
  },
  {
    id: 1,
    name: "Pantalón Negro",
    brand: "Nike",
    price: 7000,
    img: "/product2.png",
    stock: 5,
  },
  {
    id: 1,
    name: "Remera Azul",
    brand: "Adidas",
    price: 15000,
    img: "/product2.png",
    stock: 5,
  },
  {
    id: 1,
    name: "Medias Negras",
    brand: "Generica",
    price: 5000,
    img: "/product.png",
    stock: 5,
  },
  {
    id: 1,
    name: "Producto 1",
    brand: "Brand 1",
    price: 200000,
    img: "/product2.png",
    stock: 5,
  },
  {
    id: 1,
    name: "Producto 1",
    brand: "Brand 1",
    price: 200000,
    img: "/product.png",
    stock: 5,
  },
  {
    id: 1,
    name: "Producto 1",
    brand: "Brand 1",
    price: 200000,
    img: "/product2.png",
    stock: 5,
  },
];
const Productos: React.FC = () => {
  const [viewTable, setViewTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <ProductSearchBar
        setTable={setViewTable}
        setSearchQuery={setSearchQuery}
      />
      <section className=" flex flex-wrap gap-1 items-center justify-center w-[100%]">
        {viewTable ? (
          <ProductTable data={filteredProducts} />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </section>
    </section>
  );
};

export default Productos;
