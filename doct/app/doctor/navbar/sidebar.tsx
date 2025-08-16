"use client";
import { useState, useEffect } from "react";
import { X, Menu, Sun, Moon } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Optional: persist dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center p-4 bg-blue-600 text-white">
        <button onClick={toggleSidebar} className="mr-3">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold">My App</h1>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button onClick={toggleSidebar}>
            <X size={24} className="text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-4">
          {/* Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Logout */}
          <button
            className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-red-100 dark:hover:bg-red-700 rounded"
            onClick={() => alert("Logged out!")}
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}
