import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../../src/context/DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div>
      <button
        className="text-xl text-blue-700 rounded-md focus:outline-none px-2 py-2 flex items-center focus:ring focus:ring-blue-600"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </div>
  );
}
