"use client";
import React, { useState, useEffect } from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "ligth";

    setTheme(systemTheme);

    if (systemTheme === "dark") {
      toggleTheme();
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "ligth" : "dark";

    setTheme(newTheme);

    // Alternar la clase dark según el tema
    if (newTheme === "ligth") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  if (!mounted) {
    return null;
  }
  return (
    <label htmlFor="theme" className="theme text-xs">
      <span className="theme__toggle-wrap">
        <input
          id="theme"
          className="theme__toggle cursor-pointer"
          type="checkbox"
          role="switch"
          name="theme"
          checked={theme === "dark"}
          onClick={toggleTheme}
        />
        <span className="theme__fill cursor-pointer"></span>
        <span className="theme__icon cursor-pointer">
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
        </span>
      </span>
    </label>
  );
};

export default DarkModeToggle;
