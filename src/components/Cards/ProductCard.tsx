import { IProduct } from "@/types/basicTypes";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import Link from "next/link";

const ProductCard: React.FC<IProduct> = (data) => {
  return (
    <Link
      className="flex flex-col justify-evenly items-center rounded-md bg-secundario-ligth dark:bg-fondo-dark w-1/3 md:w-1/4 text-sm max-h-[70vh] transition-all duration-500  shadow-md"
      href={`/Productos/${data.id}`}
    >
      <div className="w-full h-[35vh] cursor-default bg-main dark:bg-secundario relative rounded-t overflow-visible">
        <Carousel
          indicators={false}
          leftControl={"<"}
          rightControl={">"}
          className="text-transparent absolute -top-1  overflow-visible h-[35vh] hover:translate-y-1 duration-300 "
          draggable={false}
          pauseOnHover
        >
          {data.img.map((imgUrl, index) => (
            <Image
              key={index}
              src={imgUrl}
              alt={`Producto ${data.name}`}
              width={100} // Puedes ajustar las dimensiones
              height={100} // según tus necesidades
              layout="responsive"
              quality={100}
            />
          ))}
        </Carousel>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-[1.2rem] text-main w-full dark:bg-secundario  text-center">
          {data.name}{" "}
        </h3>
        <div className="flex flex-row gap-1 justify-evenly items-center w-full cursor-pointer p-1">
          <div className="flex flex-col w-full text-[.8rem] cursor-default">
            <div className="px-1">
              <p className="h-4">{data.brand}</p>
              <p className="h-4">Stock: {data.stock}</p>
              <p className="h-4 flex flex-row items-center font-semibold my-1">
                <FaDollarSign /> {data.price}
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-2 text-center h-full">
            <button className="hover:scale-110 hover:text-main">
              <MdOutlineEdit />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
