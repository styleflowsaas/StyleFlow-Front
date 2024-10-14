"use client";

import { useState } from "react";
import AuthForm from "./formik";
import Image from "next/image";

const Sign: React.FC = () => {
  const [module, setModule] = useState("login"); // El estado controla si es login o registro

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-full mx-auto md:w-2/3 flex flex-col gap-2 items-center justify-center border border-main dark:border-none md:rounded-lg p-2 shadow-2xl dark:bg-secundario md:my-5">
        <Image
          src={"/logoDark.svg"}
          alt="logo"
          width={100}
          height={100}
          quality={100}
          className="w-1/4 lg:w-1/5"
        />
        {module && <AuthForm isLogin={module === "login"} />}
        <p className="dark:text-texto-ligth text-[.8rem]">
          {module === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="text-main font-semibold bg-transparent hover:scale-105 duration-300"
            onClick={() => setModule(module === "login" ? "register" : "login")}
          >
            {module === "login" ? "Registrate" : "Inicia sesión"}
          </button>
        </p>
      </section>
    </main>
  );
};
export default Sign;
