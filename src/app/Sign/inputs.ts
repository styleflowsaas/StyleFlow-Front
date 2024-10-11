export const InputLogin = [
  {
    name: "email",
    type: "email",
    placeholder: "usuario@gmail.com",
    id: "email",
    children: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "*********",
    id: "password",
    children: "Contraseña",
  },
];
export const InputRegister = [
  {
    name: "name",
    type: "text",
    placeholder: "",
    id: "name",
    children: "Nombre",
  },
  {
    name: "dni",
    type: "text",
    placeholder: "",
    id: "dni",
    children: "D.N.I.",
  },
  ...InputLogin,

  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "********",
    id: "passwordConfirm",
    children: "Confirmar Contraseña",
  },
];
