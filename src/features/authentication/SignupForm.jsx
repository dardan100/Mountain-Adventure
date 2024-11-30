import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";

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
          ? " h-screen rounded-sm py-7 flex flex-col  px-5 overflow-x-hidden"
          : " h-screen py-7 px-5  overflow-x-hidden flex flex-col "
      }`}
    >
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "text-[35px] w-full px-2 rounded-xl text-gray-100 font-medium text-center xl:text-start "
            : "text-[35px] text-gray-600  w-full px-2 rounded-xl font-medium text-center xl:text-start "
        } `}
      >
        Create a new user
      </h1>

      <div className="mt-10 w-full rounded-md  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex grow gap-4 pb-7 items-center">
            <label
              className={`transition-colors duration-500 ${
                isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
              }`}
            >
              Full name
            </label>
            <div className="items-center flex gap-2">
              <input
                type="text"
                id="fullName"
                className="input grow text-black"
                {...register("fullName", {
                  required: "This field is required",
                })}
              />
              <p className="text-red-700 bg-red-200 px-2  rounded-md">
                {errors?.fullName?.message}
              </p>
            </div>
          </div>

          <div className=" flex gap-4 items-center  pb-5">
            <label
              className={`transition-colors duration-500 ${
                isDarkMode ? "basis-40 text-gray-100" : "basis-40 text-gray-900"
              }`}
            >
              Email address
            </label>
            <div className="items-center flex gap-2">
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
                className="input grow text-black"
              />
              <p className="text-red-700 bg-red-200 px-2  rounded-md">
                {errors?.email?.message}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center pb-5">
            <label
              className={`transition-colors duration-500 ${
                isDarkMode ? "basis-40 text-gray-100" : "basis-40 text-gray-900"
              }`}
            >
              Password (min 8 characters)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                className="input text-black"
                id="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Passowrd needs a minimun of 8 characters",
                  },
                })}
              />

              <p className="text-red-700 bg-red-200 px-2  rounded-md">
                {errors?.password?.message}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center pb-5">
            <label
              className={`transition-colors duration-500 ${
                isDarkMode ? "basis-40 text-gray-100" : "basis-40 text-gray-900"
              }`}
            >
              Repeat password
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                id="passwordConfirm"
                className="input text-black"
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Passowrd need to match",
                })}
              />
              <p className="text-red-700 bg-red-200 px-2  rounded-md">
                {errors?.passwordConfirm?.message}
              </p>
            </div>
          </div>
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
