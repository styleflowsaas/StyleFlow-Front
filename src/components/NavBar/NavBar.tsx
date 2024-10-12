import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <nav className="flex flex-col gap-4 items-center justify-evenly h-svh top-0 left-0 bg-secundario dark:bg-fondo-dark relative w-[15vw] p-4">
      <Image
        src={"/logoDark.svg"}
        alt="logo"
        layout="responsive"
        width={100}
        height={100}
      />
      <div className=""></div>

      <ul className="flex flex-col gap-4 items-center">
        <li>Ventas</li>
        <li>Productos</li>
        <li>Proveedores</li>
        <li>Informes</li>
        <li>Mi Cuenta</li>
      </ul>
      <button>Salir</button>
    </nav>
  );
};

export default NavBar;
