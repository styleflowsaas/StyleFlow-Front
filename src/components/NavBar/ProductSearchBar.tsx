import { Dispatch, SetStateAction } from "react";
import { MdQrCode, MdAddCircle, MdApps, MdSearch } from "react-icons/md";

const ProductSearchBar: React.FC<{
  setTable: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}> = ({ setTable, setSearchQuery }) => {
  return (
    <nav className="flex flex-row gap-4 w-[90%] mx-auto rounded-lg bg-secundario p-1 justify-around items-center dark:bg-fondo-dark sticky top-1 z-10">
      <h2 className="cursor-default">Productos</h2>
      <div className="rounded-lg text-[.8em] relative">
        <label htmlFor="search" className="absolute top-0.5 left-1  ">
          <MdSearch />
        </label>
        <input
          id="search"
          className="px-5 rounded-lg bg-secundario-ligth dark:bg-fondo-dark dark:border border-main placeholder:text-[.8em]"
          placeholder="Buscar Producto"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <button className="hover:scale-110 text-[.8em]">Filtrar</button>
        <button className="hover:scale-110">
          <MdQrCode />
        </button>
        <button className="hover:scale-110">
          {" "}
          <MdAddCircle />
        </button>
        <button
          className="hover:scale-110"
          onClick={() => setTable((prev) => !prev)}
        >
          <MdApps />
        </button>
      </div>
    </nav>
  );
};

export default ProductSearchBar;
