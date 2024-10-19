import { acountUser, User } from "@/types/basicTypes";
import { useEffect, useState } from "react";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const UserMock: acountUser = {
  name: "Javier",
  lastName: "Larusso",
  email: "Javier@email.com",
  dni: "20-40150802-8",
  address: "Ramon padilla N125",
  phone: "+54937584828",
  password: "password",
  newPassword: "password",
};
export const useUser = (id: string) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(null);
        setUser(UserMock);
        const token = localStorage.getItem("token-sf");

        if (!token) return;
        // const response = await fetch(`${API_URL}/user/${id}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // if (!response.ok) {
        //   throw new Error("Error al Cargar los datos del usuario");
        // }
        // const data = await response.json();
        // console.log(data);
        //desencriptamos?
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchUser();
  }, [id]);
  return { user, error };
};
