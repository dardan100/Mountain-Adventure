import React from "react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUpdateUser } from "./useUpdateUser";

export default function UpdatePassword() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { isDarkMode } = useDarkMode();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <section>
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "bg-blue-400 mt-6 px-3 py-2 text-xl text-gray-200 rounded-md"
            : "bg-blue-100 mt-6 px-3 py-2 text-xl rounded-md"
        }`}
      >
        Update password
      </h1>

      <div
        className={`${
          isDarkMode
            ? "bg-gray-700 mt-8 px-8 py-8 rounded-md"
            : "bg-gray-200 mt-8 px-8 py-8 rounded-md"
        }`}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label
              className={`${
                isDarkMode ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
              }`}
            >
              Password (min 8 characters)
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isUpdating}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              className={`${
                isDarkMode
                  ? "input w-full bg-gray-600 border border-gray-500 rounded-md p-2 "
                  : "input w-full bg-gray-100 border border-gray-300 rounded-md p-2 "
              }`}
            />
            <p className="text-red-700 mt-1 bg-red-200 px-2 rounded-md">
              {errors?.password?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className={`transition-colors duration-500 ${
                isDarkMode ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
              }`}
            >
              Confirm password
            </label>

            <input
              className={`${
                isDarkMode
                  ? "input w-full bg-gray-600 border border-gray-500 rounded-md p-2 "
                  : "input w-full bg-gray-100 border border-gray-300 rounded-md p-2 "
              }`}
              type="password"
              autoComplete="new-password"
              id="passwordConfirm"
              disabled={isUpdating}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords need to match",
              })}
            />
            <p className="text-red-700 mt-1 bg-red-200 px-2  rounded-md">
              {errors?.passwordConfirm?.message}
            </p>
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

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
