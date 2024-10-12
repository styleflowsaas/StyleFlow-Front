import { InputLoginType, InputRegisterType } from "@/types/fetchTypes";
import { useState } from "react";

// Definir las URLs de autenticación
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const LOGIN_URL = process.env.NEXT_PUBLIC_AUTH_LOGIN;
const REGISTER_URL = process.env.NEXT_PUBLIC_AUTH_REGISTER;

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para hacer el login
  const login = async (dataInput: InputLoginType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
      });

      if (!response.ok) {
        throw new Error("Error en el login, verifica tus credenciales.");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un usuario
  const register = async (dataInput: InputRegisterType) => {
    setLoading(true);
    setError(null);
    dataInput.dni = Number(dataInput.dni);
    dataInput.startDate = new Date();
    try {
      const response = await fetch(`${API_URL}${REGISTER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario.");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
};
