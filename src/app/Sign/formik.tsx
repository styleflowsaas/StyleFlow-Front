/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { InputLoginType, InputRegisterType } from "@/types/fetchTypes";
import { InputLogin, InputRegister } from "./inputs";
import classNames from "classnames";
import { toastPromise } from "@/libs/Sonner";

import { useRouter } from "next/navigation";
export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { login, register, loading } = useAuth();
  const router = useRouter();
  const validationSchema = Yup.object({
    name: !isLogin
      ? Yup.string().required("El nombre es obligatorio")
      : Yup.string(),
    dni: !isLogin
      ? Yup.string()
          .required("El D.N.I. es obligatorio")
          .matches(/^\d+$/, "El D.N.I. debe ser numérico")
      : Yup.string(),
    email: !isLogin
      ? Yup.string().email("Email inválido").required("El email es obligatorio")
      : Yup.string(),
    password: !isLogin
      ? Yup.string()
          .min(8, "Al menos 8 caracteres")
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Al menos una Mayúscula, minúscula, numero y carácter especial"
          )
          .required("La contraseña es obligatoria")
      : Yup.string(),

    passwordConfirm: !isLogin
      ? Yup.string()
          .oneOf(
            [Yup.ref("password"), "coincidencia"],
            "Las contraseñas no coinciden"
          )
          .required("Confirma tu contraseña")
      : Yup.string(),
  });

  const initialValues = {
    name: "",
    dni: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const handleSubmit = async (values: InputRegisterType) => {
    if (isLogin) {
      toastPromise(handleLogin(values), "Sesión iniciada", "Iniciando sesión");
    } else {
      toastPromise(
        handleRegister(values),
        "Registrado correctamente",
        "Registrandote"
      );
    }
  };
  const handleLogin = async (values: InputLoginType) => {
    try {
      const result = await login({
        dni: Number(values.dni),
        password: values.password,
      });
      if (result) {
        document.cookie = `token-sf=${result.token}`;
        router.push("/Ventas");
      } else {
        throw new Error("Verifica tus credenciales");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleRegister = async (values: InputRegisterType) => {
    try {
      const result = await register(values);
      if (result) {
        toastPromise(
          handleLogin(values),
          "Sesión iniciada",
          "Iniciando sesión"
        );
      } else throw new Error("No pudimos registrarte");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-2 items-center w-full">
          <section
            className="flex flex-col justify-center gap-2 items-center "
            key={"Principal"}
          >
            <section
              className={classNames(
                "flex flex-col md:flex-row gap-2 transition-all duration-1000 transform",
                {
                  "md:translate-x-0 opacity-100 ": isLogin,
                  "-translate-x-1 opacity-100 ": !isLogin,
                }
              )}
              key={"loginFather"}
            >
              <section className="flex flex-col gap-2  " key={"login"}>
                {InputLogin.map((input) => {
                  return (
                    <div key={input.id} className="flex flex-col">
                      <div className="relative border border-main rounded-lg cursor-pointer">
                        <Field
                          name={input.name}
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.id}
                          className={`block p-1 w-full text-[.5rem] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-texto-ligth dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer`}
                        />
                        <label
                          htmlFor={input.id}
                          className="absolute font-semibold text-[.5rem] text-gray-500 dark:text-gray-900 duration-300 group-focus-within:transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-fondo-ligth dark:bg-secundario px-2 peer-focus:px-2 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ml-1 peer-placeholder-shown:h-[90%] peer-placeholder-shown:w-[90%] size-auto peer-focus:size-auto flex items-center cursor-pointer"
                        >
                          {input.children}
                        </label>
                      </div>

                      <div
                        className={classNames(
                          "bg-transparent rounded-lg italic text-main animate-pulse  text-center relative top-0 right-0 transform transition-all duration-1000 p-1 text-[.5rem]",
                          {
                            "translate-y-0 border border-main opacity-100":
                              errors[input.name as keyof typeof errors] &&
                              touched[input.name as keyof typeof errors], // Mostrar con animación si hay error y ha sido tocado.
                            "-translate-y-10  border-none opacity-0":
                              !errors[input.name as keyof typeof errors] ||
                              !touched[input.name as keyof typeof errors], // Ocultar si no hay error o no ha sido tocado.
                          }
                        )}
                      >
                        <p className="text-wrap ">
                          <ErrorMessage name={input.name} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </section>
              {!isLogin && (
                <section
                  className={classNames(
                    "flex flex-row gap-4 items-center transition-all duration-1000 transform",
                    {
                      "translate-x-0 opacity-1000": !isLogin,
                      "translate-x-full opacity-0 ": isLogin,
                    }
                  )}
                  key={"registerFather"}
                >
                  <section className="flex flex-col" key={"register"}>
                    {InputRegister.map((input) => {
                      return (
                        <div className="flex flex-col gap-2" key={input.id}>
                          <div className="relative border border-main rounded-lg cursor-pointer group">
                            <Field
                              name={input.name}
                              type={input.type}
                              placeholder={input.placeholder}
                              id={input.id}
                              className={`block p-1 w-full text-[.5rem] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-texto-ligth dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer `}
                            />
                            <label
                              htmlFor={input.id}
                              className="absolute font-semibold text-[.5rem] text-gray-500 dark:text-gray-900 duration-300 group-focus-within:transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-fondo-ligth dark:bg-secundario  peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ml-1 peer-placeholder-shown:h-[90%] peer-placeholder-shown:w-[90%] size-auto peer-focus:size-auto flex items-center cursor-pointer"
                            >
                              {input.children}
                            </label>
                          </div>
                          <div
                            className={classNames(
                              "bg-transparent border border-main text-main rounded-lg italic text-center relative top-0 right-0 transform transition-all duration-1000 p-1 text-[.5rem] opacity-0 z-20",
                              {
                                "translate-y-0 opacity-100":
                                  errors[input.name as keyof typeof errors] &&
                                  touched[input.name as keyof typeof errors], // Mostrar con animación si hay error y ha sido tocado.
                                "-translate-y-10 opacity-0 border-none":
                                  !errors[input.name as keyof typeof errors] ||
                                  !touched[input.name as keyof typeof errors], // Ocultar si no hay error o no ha sido tocado.
                              }
                            )}
                          >
                            <ErrorMessage name={input.name} />
                          </div>
                        </div>
                      );
                    })}
                  </section>
                </section>
              )}
            </section>
          </section>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="p-1 text-[.5rem] bg-main text-texto-dark rounded-lg hover:scale-105 duration-300 w-full md:w-1/3  hover:bg-green-600"
          >
            {loading || isSubmitting
              ? "Cargando..."
              : isLogin
              ? "Iniciar Sesión"
              : "Registrarse"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
