import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../context/DarkModeContext";

import { useLogin } from "./useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("drd100@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { isDarkMode } = useDarkMode();
  const { register } = useForm();
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-more-gray-300 py-10 px-20 lg:py-20 mt-8"
          : "bg-more-gray-100 py-10 px-20 lg:py-20 mt-8 rounded-md"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <section className="flex flex-col ">
          <label>Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input rounded-lg text-gray-600"
            disabled={isLoading}
          />
        </section>
        <section className="flex flex-col">
          <label for="forms-validationInputCode_error">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { require: "This field is required" })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input rounded-lg text-gray-600"
            disabled={isLoading}
          />
        </section>
        <div>
          <button
            disabled={isLoading}
            className={` ${
              isDarkMode
                ? "bg-indigo-600 text-lg px-4 py-2 -mt-6 w-full transition-colors duration-300 hover:bg-indigo-700 text-white rounded-lg"
                : "bg-blue-500 text-lg px-4 py-2 w-full -mt-4 transition-colors duration-300 hover:bg-blue-600 text-white rounded-lg"
            }`}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
