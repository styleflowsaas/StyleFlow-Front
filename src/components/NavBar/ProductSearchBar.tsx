import { Dropdown } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import {
  MdQrCode,
  MdAddCircle,
  MdApps,
  MdSearch,
  MdCancel,
} from "react-icons/md";

const ProductSearchBar: React.FC<{
  setTable: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQueryValue: string;
}> = ({ setTable, setSearchQuery, searchQueryValue }) => {
  return (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-[90%] mx-auto rounded-lg bg-secundario p-1 justify-around items-center dark:bg-fondo-dark sticky top-1 z-10">
      <h2 className="cursor-default hidden md:block">Productos</h2>
      <div className="rounded-lg text-[.8em] relative">
        <label htmlFor="search" className="absolute top-0.5 left-1  ">
          <MdSearch />
        </label>
        <input
          id="search"
          className="px-5 rounded-lg bg-secundario-ligth dark:bg-fondo-dark dark:border border-main placeholder:text-[.8em]"
          placeholder="Buscar Producto"
          value={searchQueryValue}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="max-h-[80%] hover:outline outline-1 dark:outline-white rounded">
          <Dropdown label="Filtrar" size="xs" color="secundario">
            <Dropdown.Item onClick={() => setSearchQuery("Calzado")}>
              Calzado
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQuery("Vestimenta")}>
              Vestimenta
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQuery("Accesorios")}>
              Accesorios
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQuery("")} icon={MdCancel}>
              Quitar
            </Dropdown.Item>
          </Dropdown>
        </div>
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
