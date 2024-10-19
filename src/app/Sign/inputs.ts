import { InputsBasic } from "@/types/basicTypes";

export const InputLogin: InputsBasic[] = [
  {
    name: "dni",
    type: "text",
    placeholder: "",
    id: "dni",
    children: "D.N.I.",
  },
  {
    name: "password",
    type: "password",
    placeholder: "",
    id: "password",
    children: "Contraseña",
  },
];
export const InputRegister: InputsBasic[] = [
  {
    name: "name",
    type: "text",
    placeholder: "",
    id: "name",
    children: "Nombre",
  },
  {
    name: "email",
    type: "email",
    placeholder: "usuario@gmail.com",
    id: "email",
    children: "Email",
  },

  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "",
    id: "passwordConfirm",
    children: "Confirmar Contraseña",
  },
];
