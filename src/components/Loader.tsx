import { Spinner } from "flowbite-react";

const Loader: React.FC = () => {
  return (
    <div className="text-center flex h-full items-center justify-center">
      <div className="flex flex-col gap-1 ">
        <Spinner size="xl" />
        <p className="text-texto-ligth ">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;
