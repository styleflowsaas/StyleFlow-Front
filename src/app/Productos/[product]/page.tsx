"use client";
import { toastInfo } from "@/libs/Sonner";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { InputsProducts } from "./InputProduct";
import { Button, Carousel } from "flowbite-react";
const ProductId: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const productId = usePathname().split("/")[2];
  const [producto, setProducto] = useState({
    nombre: "Camiseta de Algodón Premium",
    descripción:
      "Camiseta de alta calidad hecha de 100% algodón orgánico. Disponible en varios colores y tallas.",
    precio: "29.99",
    stock: "100",
    categoría: "Ropa",
    codeBr: "1234567890",
    img: ["/product.png", "/product2.png"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios en el backend
    setIsEditing(false);
    toastInfo("Guardado Correctamente");
  };
  return (
    <section className="rounded-lg bg-secundario dark:bg-fondo-dark w-full h-full flex flex-col p-2 text-[.8rem] text-texto-ligth dark:text-texto-dark">
      <div className="flex flex-col gap-2 items-center">
        <form
          onSubmit={handleSubmit}
          className=" items-center justify-center text-center"
        >
          <div className="flex flex-wrap gap-2 items-center my-2">
            {InputsProducts.map((input) => (
              <div
                key={input.id}
                className={`relative rounded bg-transparent mx-auto p-1 ${
                  isEditing ? "outline outline-white" : ""
                }`}
              >
                <label
                  htmlFor={input.id}
                  className="duration-300 translate-y-3 scale-75 -top-5 left-0 z-10  bg-fondo-ligth dark:bg-secundario px-2 peer-focus:px-2 peer-focus:text-main peer-focus:dark:text-main absolute rounded "
                >
                  {input.label}
                </label>
                {input.type === "textarea" ? (
                  <textarea
                    id={input.id}
                    name={input.name}
                    className="block p-1 w-full text-[.5rem]  bg-transparent rounded-lg appearance-none dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main border-none peer"
                    value={producto[input.name as keyof typeof producto]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    cols={40}
                  />
                ) : (
                  <input
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    className="block p-1 w-full text-[.5rem] font-semibold bg-transparent rounded-lg focus:ring-0 border-none"
                    value={producto[input.name as keyof typeof producto]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            {!isEditing ? (
              <Button
                color="light"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Editar Producto
              </Button>
            ) : (
              <>
                <Button type="button" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </>
            )}
          </div>
        </form>
        <div className="h-[50vh] w-1/3 m-auto">
          <Carousel className="object-fill" leftControl="<" rightControl=">">
            {producto.img.map((img) => (
              <Image
                key={img}
                src={img}
                alt={`Imagen del producto ${producto.nombre}`}
                layout="responsive"
                width={300}
                height={300}
                quality={100}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductId;
