import React from "react";
import UpdateAccount from "../features/authentication/UpdateAccount";
import { useDarkMode } from "../context/DarkModeContext";

export default function Account() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="2xl:px-24">
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "bg-indigo-700 px-3 py-4 text-xl text-gray-200 rounded-md"
            : "bg-indigo-300 px-3 py-4 text-xl rounded-md"
        }`}
      >
        Update your account
      </h1>
      <UpdateAccount />
    </div>
  );
}
