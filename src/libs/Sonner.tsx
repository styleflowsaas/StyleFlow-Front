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
