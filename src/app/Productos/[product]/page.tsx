"use client";
import { toastAnswer, toastError, toastInfo } from "@/libs/Sonner";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InputsProducts } from "./InputProduct";
import { Carousel } from "flowbite-react";
import { MdArrowBack, MdArrowForward, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Loader from "@/components/Loader";

const ProductId: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const productId = usePathname().split("/")[2];
  const [producto, setProducto] = useState({
    nombre: "Camiseta de Algodón Premium",
    descripción:
      "Camiseta de alta calidad hecha de 100% algodón orgánico. Disponible en varios colores y tallas.",
    precio: "29.99",
    stock: "100",
    categoría: "Ropa",
    codeBr: "1234567890",
    img: ["/airmax1.png", "/airmax2.png"],
    talles: ["S", "L"],
    colores: ["white", "green"],
  });

  const [originalProducto, setOriginalProducto] = useState({
    nombre: "Camiseta de Algodón Premium",
    descripción:
      "Camiseta de alta calidad hecha de 100% algodón orgánico. Disponible en varios colores y tallas.",
    precio: "29.99",
    stock: "100",
    categoría: "Ropa",
    codeBr: "1234567890",
    img: ["/airmax1.png", "/airmax2.png"],
    talles: ["S", "L"],
    colores: ["white", "green"],
  });
  const tallesDisponibles = ["S", "M", "L", "XL"];
  const coloresDisponibles = [
    "white",
    "black",
    "red",
    "green",
    "blue",
    "yellow",
  ];

  useEffect(() => {
    const productFetch = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
        );

        // Si la respuesta no es correcta, trata de leer el mensaje del JSON
        if (!response.ok) {
          const errorData = await response.json(); // Intenta extraer el mensaje de error
          throw new Error(errorData.message || response.statusText); // Usa el mensaje si existe
        }

        const data = await response.json();
        setProducto(data);
        setOriginalProducto(data);
      } catch (error) {
        toastError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) productFetch();
  }, [productId]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };
  const toggleTalle = (talle: string) => {
    setProducto((prev) => ({
      ...prev,
      talles: prev.talles.includes(talle)
        ? prev.talles.filter((t) => t !== talle)
        : [...prev.talles, talle],
    }));
  };

  const toggleColor = (color: string) => {
    setProducto((prev) => ({
      ...prev,
      colores: prev.colores.includes(color)
        ? prev.colores.filter((c) => c !== color)
        : [...prev.colores, color],
    }));
  };
  const handleCancel = async () => {
    const confirmed = await toastAnswer("Se perderán los cambios, ¿Continuar?");
    if (!confirmed) {
      // Si el usuario cancela, no se continúa con la ejecución
      return;
    }
    setIsEditing(false);
    setProducto(originalProducto);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = await toastAnswer("¿Deseas guardar los cambios?");

    if (!confirmed) {
      // Si el usuario cancela, no se continúa con la ejecución
      return;
    }

    // Aquí iría la lógica para guardar los cambios en el backend --> productoEdited
    setIsEditing(false);
    toastInfo("Guardado Correctamente");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="rounded w-full md:w-[80%] min-h-[90vh] bg-secundario-ligth dark:bg-fondo-dark m-auto flex flex-col gap-2 justify-between">
      <div className="flex flex-row gap-1 justify-between items-center rounded-t bg-fondo-dark dark:bg-secundario p-1 text-texto-dark">
        <p className="pl-7 md:p-0">{producto.nombre}</p>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="text-2xl md:text-[.8rem] hover:scale-105 hover:text-red-500"
              >
                <MdCancel />
              </button>
              <button
                onClick={handleSubmit}
                className="text-2xl md:text-[.8rem] hover:scale-105 hover:text-green-500"
              >
                <GiConfirmed />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-2xl md:text-[.8rem] hover:scale-105"
            >
              <FaEdit />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 justify-between p-1 h-full ">
        <div>
          <form
            className={`flex flex-col md:flex-wrap gap-4 md:gap-2 justify-center min-w-[2/3] max-w-[2/3] my-2 md:my-1`}
          >
            {InputsProducts.map((input) =>
              isEditing ? (
                <div
                  className="outline outline-1 outline-main dark:outline-main rounded relative"
                  key={input.id}
                >
                  <label
                    htmlFor={input.id}
                    className="text-[.8rem] md:text-[.5rem] absolute -top-1 bg-white dark:bg-black px-1 ml-1 rounded"
                  >
                    {input.label}
                  </label>
                  {input.type === "textarea" ? (
                    <textarea
                      cols={50}
                      rows={3}
                      onChange={handleInputChange}
                      name={input.name}
                      id={input.id}
                      className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 md:text-[.5rem] "
                    />
                  ) : (
                    <input
                      onChange={handleInputChange}
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 md:text-[.5rem] "
                    />
                  )}
                </div>
              ) : (
                <div
                  className="outline outline-1 outline-black dark:outline-white rounded relative p-2 md:p-0"
                  key={input.id}
                >
                  <label
                    htmlFor={input.id}
                    className="text-[.8rem] md:text-[.5rem] absolute -top-2 md:-top-1 bg-white dark:bg-black px-1 ml-1 rounded"
                  >
                    {input.label}
                  </label>

                  {input.type === "textarea" ? (
                    <textarea
                      cols={50}
                      rows={3}
                      disabled={!isEditing}
                      value={producto[input.name as keyof typeof producto]}
                      onChange={handleInputChange}
                      name={input.name}
                      id={input.id}
                      className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 md:text-[.5rem]"
                    />
                  ) : (
                    <input
                      disabled={!isEditing}
                      value={producto[input.name as keyof typeof producto]}
                      onChange={handleInputChange}
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 md:text-[.5rem]"
                    />
                  )}
                </div>
              )
            )}
          </form>
        </div>
        <div className="flex flex-row justify-center h-2/3 relative items-center md:w-1/3">
          <div className="w-full h-full">
            <Image
              src={producto.img[0]}
              alt={`Imagen del proyecto ${producto.nombre}`}
              layout="responsive"
              width={300}
              height={300}
              quality={100}
              className="blur-xl"
            />
          </div>
          <Carousel
            className="absolute bg-transparent text-transparent p-1 rounded-xl mx-auto"
            leftControl={<MdArrowBack />}
            rightControl={<MdArrowForward />}
            indicators={false}
          >
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
      <div className="flex flex-col md:flex-row gap-2 justify-around items-center md:items-start">
        <div>
          <h4 className="text-[.5rem]">Colores Disponibles:</h4>
          <div className="flex gap-3 p-1">
            {coloresDisponibles.map((color) => (
              <div key={color} className="flex flex-col gap-1 items-center">
                <div
                  onClick={() => isEditing && toggleColor(color)}
                  className={`w-5 h-5 rounded border-2 shadow-lg cursor-pointer rotate-45   ${
                    producto.colores.includes(color)
                      ? `bg-${color.toLowerCase()}-500 border-green-500 `
                      : `bg-${color.toLowerCase()}-200 border-red-300`
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  <p className="text-black text-center -rotate-45">
                    {producto.colores.includes(color) ? "✓" : ""}
                  </p>
                </div>
                <p className="text-[.5rem] mt-1">{color}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[.5rem]">Talles Disponibles:</h4>
          <div className="flex gap-2 p-1">
            {tallesDisponibles.map((talle) => (
              <div
                key={talle}
                onClick={() => isEditing && toggleTalle(talle)}
                className={`w-6 h-6 text-[.8rem] flex items-center justify-center text-center cursor-pointer border-2 rounded-full ${
                  producto.talles.includes(talle)
                    ? "border-green-500 bg-white text-black"
                    : "border-gray-300"
                }`}
              >
                {talle}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-b bg-fondo-dark dark:bg-secundario  py-1 px-2 text-texto-dark flex flex-row gap-2 justify-center"></div>
    </div>
  );
};

export default ProductId;
