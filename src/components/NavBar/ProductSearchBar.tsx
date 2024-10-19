import { Dropdown } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  MdQrCode,
  MdAddCircle,
  MdApps,
  MdSearch,
  MdCancel,
} from "react-icons/md";
import ScanModal from "../Modals/ScanModal";
import { useRouter } from "next/navigation";

const ProductSearchBar: React.FC<{
  setTable: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQueryValue: string;
  startTransition: (callback: () => void) => void; // Recibimos startTransition
}> = ({ setTable, setSearchQuery, searchQueryValue, startTransition }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleSearch = (code: string) => {
    if (code) {
      router.push(`/Productos/${code}`);
      handleModal();
    }
  };
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
          onChange={(e) => setSearchQuery(e)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="max-h-[80%] hover:outline outline-1 dark:outline-white rounded">
          <Dropdown label="Filtrar" size="xs" color="secundario">
            <Dropdown.Item
              onClick={() =>
                startTransition(() => {
                  setSearchQuery({
                    target: { value: "Calzado" },
                  } as React.ChangeEvent<HTMLInputElement>);
                })
              }
            >
              Calzado
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                startTransition(() => {
                  setSearchQuery({
                    target: { value: "Vestimenta" },
                  } as React.ChangeEvent<HTMLInputElement>);
                })
              }
            >
              Vestimenta
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                startTransition(() => {
                  setSearchQuery({
                    target: { value: "Accesorios" },
                  } as React.ChangeEvent<HTMLInputElement>);
                })
              }
            >
              Accesorios
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                startTransition(() => {
                  setSearchQuery({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>);
                })
              }
              icon={MdCancel}
            >
              Quitar
            </Dropdown.Item>
          </Dropdown>
        </div>
        <button className="hover:scale-110" onClick={handleModal}>
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
      {showModal && (
        <ScanModal handleModal={handleModal} handleSearch={handleSearch} />
      )}
    </nav>
  );
};

export default ProductSearchBar;
