"use client";
import Image from "next/image";
import { InputsAccount } from "./InputsAccount";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

const MiCuenta: React.FC = () => {
  const { user, error } = useUser("1");
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="rounded w-full md:w-[80%] min-h-[90vh] bg-secundario-ligth dark:bg-fondo-dark m-auto flex flex-col gap-2 justify-between">
      <div className="rounded-t bg-fondo-dark dark:bg-secundario p-1 text-texto-dark">
        Nombre
      </div>
      <div className="flex flex-col lg:flex-row gap-4 justify-between p-1 h-full my-5">
        <div>
          <form className={`flex flex-wrap gap-2 justify-center max-w-[2/3] `}>
            {InputsAccount.map((input) =>
              input.name === "password" || input.name === "newPassword" ? (
                isEditing ? (
                  <div
                    className="outline outline-1 outline-black dark:outline-white rounded relative"
                    key={input.id}
                  >
                    <label
                      htmlFor={input.id}
                      className="text-[.5rem] absolute -top-1 bg-white dark:bg-black px-1 ml-1 rounded"
                    >
                      {input.children}
                    </label>

                    <input
                      disabled={!isEditing}
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 text-[.5rem]"
                    />
                  </div>
                ) : null
              ) : (
                <div
                  className="outline outline-1 outline-black dark:outline-white rounded relative"
                  key={input.id}
                >
                  <label
                    htmlFor={input.id}
                    className="text-[.5rem] absolute -top-1 bg-white dark:bg-black px-1 ml-1 rounded"
                  >
                    {input.children}
                  </label>

                  <input
                    disabled={!isEditing}
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    className="rounded w-full p-0 bg-transparent px-1 text-texto-ligth dark:text-texto-dark outline-none border-none focus:ring-0 text-[.5rem]"
                  />
                </div>
              )
            )}
          </form>
        </div>
        <div className="flex flex-row justify-center h-2/3 relative items-center w-full">
          <Image
            src="/profile.png"
            alt="logo"
            width={200}
            height={200}
            className=" bg-secundario p-1 rounded-xl shadow-lg blur-md mx-auto"
          />
          <Image
            src="/profile.png"
            alt="logo"
            width={200}
            height={200}
            className="absolute bg-transparent p-1 rounded-xl mx-auto"
          />
        </div>
      </div>
      <div className="rounded-b bg-fondo-dark dark:bg-secundario  py-1 px-2 text-texto-dark flex flex-row gap-2 justify-center">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="text-[.8rem] outline outline-1 px-2 dark:outline-black rounded hover:scale-105 hover:outline-red-600 hover:outline-2"
            >
              Cancelar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-[.8rem] outline outline-1 px-2 dark:outline-black rounded hover:scale-105 hover:outline-red-600 hover:outline-2"
            >
              Guardar
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[.8rem] outline outline-1 px-2 dark:outline-black rounded hover:scale-105 hover:outline-blue-600 hover:outline-2"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
};

export default MiCuenta;
