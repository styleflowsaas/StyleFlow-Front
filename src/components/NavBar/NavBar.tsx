"use client";
import { useState } from "react";
import Image from "next/image";
import DarkModeToggle from "../buttons/Dark";
import Link from "next/link";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="flex flex-col">
      <nav
        className={`flex flex-col  ${isCollapsed ? "w-0 " : "w-[15vw]"} ${
          isOpen ? "w-[50vw] fixed" : "w-0 max-w-[15vw]"
        } gap-2 items-center justify-between bg-secundario dark:bg-fondo-dark fixed p-4 h-screen transition-all duration-300 z-30`}
      >
        {/* Botón para colapsar la barra */}
        <button
          onClick={toggleCollapse}
          className="hidden md:absolute top-1 left-1 rounded-full text-sm z-40"
        >
          {isCollapsed ? <MdArrowForward /> : <MdArrowBack />}
        </button>
        <div className="flex justify-evenly items-center w-full md:w-auto">
          <Image
            src={"/logoDark.svg"}
            alt="logo"
            width={100}
            height={100}
            className={`w-1/3 md:w-full ${isOpen ? "" : "hidden md:block"}`}
          />
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <ul
          className={`flex flex-col gap-2 items-center text-base md:text-xs transition-transform md:flex ${
            isOpen ? "flex" : "hidden"
          } ${isCollapsed ? "opacity-100 hidden" : ""}`}
        >
          <Link href="/Ventas" className={`${isCollapsed ? "hidden" : ""}`}>
            Ventas
          </Link>
          <Link href="/Productos" className={`${isCollapsed ? "hidden" : ""}`}>
            Productos
          </Link>
          <Link
            href="/Proveedores"
            className={`${isCollapsed ? "hidden" : ""}`}
          >
            Proveedores
          </Link>
          <Link href="/Informes" className={`${isCollapsed ? "hidden" : ""}`}>
            Informes
          </Link>
          <Link href="/MiCuenta" className={`${isCollapsed ? "hidden" : ""}`}>
            Mi Cuenta
          </Link>
          <div className={`${isCollapsed ? "hidden" : ""}`}>
            <DarkModeToggle />
          </div>
        </ul>

        <button
          className={`text-base md:text-xs ${isCollapsed ? "hidden" : ""}`}
        >
          Salir
        </button>
      </nav>
      <div
        className={`bg-secundario dark:bg-fondo-dark h-full ${
          isCollapsed ? "w-0" : "w-[15vw]"
        }`}
      ></div>
    </div>
  );
};

export default NavBar;
