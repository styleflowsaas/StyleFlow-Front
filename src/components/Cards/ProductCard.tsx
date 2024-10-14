import Image from "next/image";
import { MdOutlineEdit, MdAdd } from "react-icons/md";
export interface IProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  img: string;
  stock: number;
  description?: string;
  category?: string;
}
const ProductCard: React.FC<IProduct> = (data) => {
  return (
    <article className="flex flex-col gap-1 justify-evenly items-center rounded-md bg-secundario-ligth dark:bg-fondo-dark w-1/4 text-sm transition-all duration-500 shadow-2xl">
      <div className="bg-white rounded w-[80%] my-2 py-7 flex items-center relative justify-center">
        <Image
          src={data.img}
          alt={`Producto ${data.name}`}
          width={100}
          height={100}
          className="absolute -top-5 hover:-top-4  duration-500"
          quality={100}
          layout="responsive"
        />
      </div>
      <div className="flex flex-row gap-1 justify-evenly p-1 items-center w-[90%]">
        <div className="flex flex-col w-full text-[.5em] cursor-default">
          <h3 className="text-[1.5em] text-main">{data.name} </h3>
          <p className="h-4">{data.brand}</p>
          <p className="h-4">${data.price}</p>
          <p className="h-4">Stock: {data.stock}</p>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 text-center h-full">
          <button className="hover:scale-110 hover:text-main">
            <MdOutlineEdit />
          </button>
          <button className="hover:scale-110 hover:text-main">
            <MdAdd />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
