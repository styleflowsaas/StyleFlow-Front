"use client";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detectar preferencia del sistema
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(systemTheme);
    // Añadir o quitar la clase dark de acuerdo con la preferencia del sistema
    if (systemTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Alternar la clase dark según el tema
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button className="p-2 text-texto-oscuro rounded-lg" onClick={toggleTheme}>
      {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
    </button>
  );
};

export default ThemeToggle;
