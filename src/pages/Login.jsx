import React from "react";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import { useDarkMode } from "../context/DarkModeContext";

export default function Login() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="h-screen flex flex-col items-center">
      <Logo />

      <h1
        className={`${
          isDarkMode
            ? "text-3xl mb-2 mt-14 text-center bg-indigo-600 px-8 lg:w-[555px] py-2 text-white rounded-lg"
            : "text-3xl mb-2 mt-14 text-center bg-blue-500 px-32 py-2  transition-colors duration-300 text-white rounded-lg"
        }`}
      >
        Log in to your account
      </h1>

      <LoginForm />
    </div>
  );
}
