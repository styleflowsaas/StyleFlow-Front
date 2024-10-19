import { InputsBasic } from "@/types/basicTypes";

export const InputsAccount: InputsBasic[] = [
  {
    name: "name",
    type: "text",
    placeholder: "",
    id: "name",
    children: "Nombre",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "",
    id: "lastName",
    children: "Apellido",
  },
  {
    name: "address",
    type: "text",
    placeholder: "",
    id: "address",
    children: "Dirección",
  },
  {
    name: "email",
    type: "email",
    placeholder: "",
    id: "email",
    children: "Email",
  },
  {
    name: "phone",
    type: "text",
    placeholder: "",
    id: "phone",
    children: "Celular",
  },
  {
    name: "userType",
    type: "text",
    placeholder: "",
    id: "userType",
    children: "Tipo de Usuario",
  },
  {
    name: "password",
    type: "password",
    placeholder: "",
    id: "password",
    children: "Contraseña Anterior",
  },
  {
    name: "newPassword",
    type: "password",
    placeholder: "",
    id: "newPassword",
    children: "Nueva Contraseña",
  },
];
