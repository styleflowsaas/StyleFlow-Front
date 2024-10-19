/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const toastSuccess = (message: string = "Completado") => {
  toast.success(message, {
    duration: 5000,
    dismissible: true,
  });
};

export const toastError = (message: string = "Error") => {
  toast.error(message, {
    duration: 5000,
    dismissible: true,
  });
};

export const toastInfo = (message: string = "Info") => {
  toast.info(message, {
    duration: 5000,
    dismissible: true,
  });
};

export const toastWarning = (message: string = "Advertencia") => {
  toast.warning(message, {
    duration: 5000,
    dismissible: true,
  });
};

export const toastAnswer = (message: string = "Respuesta") => {
  return new Promise((resolve, reject) => {
    const toastId = toast(
      <div className="flex flex-col w-full gap-4">
        <p className="text-center">{message}</p>
        <div className="flex flex-row justify-around">
          <button
            className="hover:text-green-500 scale-105 hover:outline p-1 rounded"
            onClick={() => {
              toast.dismiss(toastId);
              resolve(true); // Resuelve la promesa cuando se acepta
            }}
          >
            Aceptar
          </button>
          <button
            className="hover:text-red-500 scale-105 hover:outline p-1 rounded"
            onClick={() => {
              toast.dismiss(toastId);
              reject(false); // Resuelve la promesa con false cuando se cancela
            }}
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
        dismissible: true,
      }
    );
  });
};

export const toastPromise = (
  promise: Promise<any>,
  successMessage: string = "Exitoso",
  loadingMessage: string = "Procesando"
) => {
  toast.promise(promise, {
    loading: loadingMessage,
    success: successMessage,
    error: (data) => {
      return `Error: ${data.message}`;
    },
    closeButton: false,
  });
};
