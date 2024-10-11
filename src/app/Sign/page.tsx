"use client";
import Logo from "@/components/Logo";
import { useState } from "react";
import AuthForm from "./formik";

const Sign: React.FC = () => {
  const [module, setModule] = useState("login"); // El estado controla si es login o registro

  return (
    <section className="w-full md:w-2/3 lg:w-1/2 min-h-[90vh] mx-auto flex flex-col gap-4 items-center justify-center border border-main dark:border-none rounded-lg p-5 shadow-2xl dark:bg-secundario overflow-hidden my-5">
      <Logo />
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
