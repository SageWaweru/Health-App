import { useState, useEffect } from "react";

// Custom hook to toggle between light and dark themes
export const useTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme || "light";

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Add 'dark' class to <html>
      localStorage.setItem("theme", "dark"); // Save to localStorage
    } else {
      document.documentElement.classList.remove("dark"); // Remove 'dark' class from <html>
      localStorage.setItem("theme", "light"); // Save to localStorage
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
