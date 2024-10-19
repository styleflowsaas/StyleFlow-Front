import { User } from "@/types/basicTypes";
import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const useUser = (id: string) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al Cargar los datos del usuario");
        }
        const data = await response.json();
        //desencriptamos?
        setUser(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchUser();
  }, [id]);
  return { user, error };
};
