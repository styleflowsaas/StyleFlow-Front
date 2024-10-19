"use client";
import Image from "next/image";
import { InputsAccount } from "./InputsAccount";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { GiConfirmed } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toastAnswer, toastInfo } from "@/libs/Sonner";
import Loader from "@/components/Loader";

const MiCuenta: React.FC = () => {
  const { user } = useUser("1");
  const [editUser, setEditUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {}, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = async () => {
    const confirmed = await toastAnswer("Se perderán los cambios, ¿Continuar?");
    if (!confirmed) {
      // Si el usuario cancela, no se continúa con la ejecución
      return;
    }
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = await toastAnswer("¿Deseas guardar los cambios?");
    if (!confirmed) {
      // Si el usuario cancela, no se continúa con la ejecución
      return;
    }
    // Aquí iría la lógica para guardar los cambios en el backend --> userEdit
    setIsEditing(false);
    toastInfo("Guardado Correctamente");
  };
  return user !== undefined ? (
    <div className="rounded w-full md:w-[80%] min-h-[90vh] bg-secundario-ligth dark:bg-fondo-dark m-auto flex flex-col gap-2 justify-between">
      <div className="flex flex-row justify-between items-center rounded-t bg-fondo-dark dark:bg-secundario p-1 text-texto-dark px-2">
        {user ? user?.name : "Nombre"}
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="text-2xl md:text-[.8rem] hover:scale-105 hover:text-red-500"
            >
              <MdCancel />
            </button>
            <button
              onClick={handleSubmit}
              className="text-2xl md:text-[.8rem] hover:scale-105 hover:text-green-500"
            >
              <GiConfirmed />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-2xl md:text-[.8rem] hover:scale-105"
          >
            <FaEdit />
          </button>
        )}
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
                      onChange={handleInputChange}
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
    </div>
  ) : (
    <Loader />
  );
};

export default MiCuenta;
