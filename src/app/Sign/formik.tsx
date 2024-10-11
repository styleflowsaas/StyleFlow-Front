import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { InputRegisterType } from "@/types/fetchTypes";
import { InputLogin, InputRegister } from "./inputs";
import classNames from "classnames";

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { login, register, loading } = useAuth();

  const validationSchema = Yup.object({
    name: !isLogin
      ? Yup.string().required("El nombre es obligatorio")
      : Yup.string(),
    dni: !isLogin
      ? Yup.number().required("El D.N.I. es obligatorio")
      : Yup.number(),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    passwordConfirm: !isLogin
      ? Yup.string()
          .oneOf(
            [Yup.ref("password"), undefined],
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
      const result = await login({
        email: values.email,
        password: values.password,
      });
      if (result) console.log("Usuario logueado:", result);
    } else {
      const result = await register(values);
      if (result) console.log("Usuario registrado:", result);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-4 w-1/2  items-center">
          {isLogin ? (
            <section
              className={classNames(
                "flex flex-row gap-4 transition-all duration-1000 transform",
                {
                  "translate-x-0 opacity-100": isLogin,
                  "translate-x-1 opacity-0": isLogin,
                }
              )}
            >
              <section className="flex flex-col gap-4">
                {InputLogin.map((input) => {
                  return (
                    <>
                      <div
                        key={input.id}
                        className="relative border border-main rounded-lg cursor-pointer"
                      >
                        <Field
                          name={input.name}
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.id}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-texto-ligth dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                        />
                        <label
                          htmlFor={input.id}
                          className="absolute font-semibold text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-7 scale-75 top-2 z-10 origin-[0] bg-fondo-ligth dark:bg-secundario px-2 peer-focus:px-2 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ml-1 w-[90%] h-[90%] peer-focus:size-auto flex items-center cursor-pointer"
                        >
                          {input.children}
                        </label>
                      </div>

                      <div
                        className={classNames(
                          "bg-main rounded-lg italic text-center relative transform transition-all duration-1000",
                          {
                            "translate-y-0 opacity-100":
                              errors[input.name] && touched[input.name], // Mostrar con animación si hay error y ha sido tocado.
                            "-translate-y-10 opacity-0":
                              !errors[input.name] || !touched[input.name], // Ocultar si no hay error o no ha sido tocado.
                          }
                        )}
                      >
                        <ErrorMessage name={input.name} />
                      </div>
                    </>
                  );
                })}
              </section>
            </section>
          ) : (
            <section
              className={classNames(
                "flex flex-row gap-4 items-center transition-all duration-1000 transform",
                {
                  "-translate-x-1 opacity-100": !isLogin,
                  "translate-x-full opacity-0": isLogin,
                }
              )}
            >
              <section className="flex flex-col gap-4">
                {InputRegister.map((input) => {
                  return (
                    <>
                      <div
                        key={input.id}
                        className="relative border border-main rounded-lg cursor-pointer"
                      >
                        <Field
                          name={input.name}
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.id}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-texto-ligth dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                        />
                        <label
                          htmlFor={input.id}
                          className="absolute font-semibold text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-7 scale-75 top-2 z-10 origin-[0] bg-fondo-ligth dark:bg-secundario px-2 peer-focus:px-2 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ml-1 w-[90%] h-[99%] peer-focus:size-auto flex items-center cursor-pointer"
                        >
                          {input.children}
                        </label>
                      </div>
                      {/* <ErrorMessage
                    name={input.name}
                    className="mx-auto text-red-500"
                  /> */}
                    </>
                  );
                })}
              </section>
            </section>
          )}

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="p-2 w-full bg-main text-texto-dark rounded-lg"
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
