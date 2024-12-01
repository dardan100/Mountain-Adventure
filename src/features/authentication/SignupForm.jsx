import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";
import { FieldWrapper } from "../../ui/FieldWrapper";

export default function SignupForm() {
  const { isDarkMode } = useDarkMode();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  if (isLoading) return <Spinner />;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "h-screen rounded-sm py-7 flex flex-col px-5 overflow-x-hidden"
          : "h-screen py-7 px-5 overflow-x-hidden flex flex-col"
      }`}
    >
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "text-[35px] w-full px-2 rounded-xl text-gray-100 font-medium text-center xl:text-start"
            : "text-[35px] text-gray-600 w-full px-2 rounded-xl font-medium text-center xl:text-start"
        }`}
      >
        Create a new user
      </h1>

      <div className="mt-10 w-full rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper
            label="Full name"
            id="fullName"
            isDarkMode={isDarkMode}
            error={errors?.fullName?.message}
          >
            <input
              type="text"
              id="fullName"
              className="input text-black"
              {...register("fullName", {
                required: "This field is required",
              })}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Email address"
            id="email"
            isDarkMode={isDarkMode}
            error={errors?.email?.message}
          >
            <input
              type="text"
              id="email"
              className="input text-black"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Password"
            id="password"
            isDarkMode={isDarkMode}
            error={errors?.password?.message}
          >
            <input
              type="password"
              id="password"
              className="input text-black"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Repeat password"
            id="passwordConfirm"
            isDarkMode={isDarkMode}
            error={errors?.passwordConfirm?.message}
          >
            <input
              type="password"
              id="passwordConfirm"
              className="input text-black"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </FieldWrapper>

          <div className="flex gap-4 justify-end">
            <button
              onClick={reset}
              className={`transition-colors duration-500 ${
                isDarkMode
                  ? "border text-gray-100 rounded-lg hover:bg-gray-400 border-gray-300 px-3 py-2"
                  : "border text-gray-500 rounded-lg hover:bg-gray-200 border-gray-300 px-3 py-2"
              }`}
            >
              Cancel
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg">
              Create new user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
