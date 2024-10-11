import { InputLoginType, InputRegisterType } from "@/types/fetchTypes";
import { useState } from "react";

// Definir las URLs de autenticación
const LOGIN_URL = "https://styleflow-backend.onrender.com/auth/signin";
const REGISTER_URL = "https://styleflow-backend.onrender.com/auth/signup";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para hacer el login
  const login = async (dataInput: InputLoginType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(LOGIN_URL, {
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

    try {
      const response = await fetch(REGISTER_URL, {
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
