"use client";

import { useState } from "react";
import AuthForm from "./formik";
import Image from "next/image";

const Sign: React.FC = () => {
  const [module, setModule] = useState("login"); // El estado controla si es login o registro

  return (
    <section className="w-full h-screen md:h-auto md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-4 items-center justify-center border border-main dark:border-none md:rounded-lg p-2 shadow-2xl dark:bg-secundario overflow-hidden md:my-5">
      <Image
        src={"/logoDark.svg"}
        alt="logo"
        layout=""
        width={100}
        height={100}
        className="w-1/3 lg:w-"
      />
      {module && <AuthForm isLogin={module === "login"} />}
      <p className="dark:text-texto-ligth">
        {module === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          className="text-main font-semibold bg-transparent hover:scale-105 duration-300"
          onClick={() => setModule(module === "login" ? "register" : "login")}
        >
          {module === "login" ? "Registrate" : "Inicia sesión"}
        </button>
      </p>
    </section>
  );
};
export default Sign;
