import Link from "next/link";

export default function Home() {
  return (
    <main className="text-texto-ligth flex flex-col gap-2 pattern-reverse ">
      <div className="my-2 rounded-lg mx-auto p-6 pattern">
        <p>Bienvenido!</p>
        <div className="flex flex-row items-center justify-end gap-1">
          <p>Esto es </p>
          <h1 className=" inline italic text-2xl">StyleFlow</h1>
        </div>
      </div>
      <div className="bg-secundario-ligth rounded mx-auto p-4 pattern flex flex-col gap-2 text-[.8rem]">
        <p>
          StyleFlow es una aplicación en etapa de desarrollo, orientada al
          manejo de stock, carga y facturación de productos y ventas
          presenciales de parte de un comercio del rubro vestimenta
        </p>
        <p>
          El proyecto incluye diferentes módulos de gestión de stock, vista de
          productos, panel de facturación e informes de ventas
        </p>
      </div>
      <Link
        href={"/Sign"}
        className="mx-auto my-2 p-2 outline outline-1 rounded hover:bg-green-500 hover:text-texto-dark hover:scale-105"
      >
        Iniciar
      </Link>
    </main>
  );
}
