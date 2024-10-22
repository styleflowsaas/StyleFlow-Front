import { Cliente } from "@/types/VentasTypes";
import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const useClients = () => {
  const clientesMock: Cliente[] = [
    {
      id: "1",
      name: "Javier",
      lastName: "Chori",
      email: "Javier@email.com",
      cuil: "20-40150802-8",
      address: "Ramon padilla N125",
      phone: "phone",
    },
    {
      id: "2",
      name: "Laura",
      lastName: "Chori",
      email: "Laura@mail.com",
      cuil: "27-52015369-8",
      address: "address",
      phone: "phone",
    },
  ];
  const [clients, setClients] = useState<Cliente[]>(clientesMock);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem("token-sf");
        if (!token) {
          setClients(clientesMock);
          return;
        }
        setError(null);
        const response = await fetch(`${API_URL}/user/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al Cargar los clientes");
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchClientes();
  }, []);
  return { clients, error };
};
