import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import UpdatePassword from "./UpdatePassword";

export default function UpdateAccount() {
  const { reset } = useForm();

  const { isDarkMode } = useDarkMode();
  const { updateUser } = useUpdateUser();
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmitUser(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <div>
      <section>
        <h1
          className={`transition-colors duration-500 ${
            isDarkMode
              ? "bg-blue-400 mt-6 px-3 py-2 text-xl text-gray-200 rounded-md"
              : "bg-blue-100 mt-6 px-3 py-2 text-xl rounded-md"
          }`}
        >
          Update user data
        </h1>

        <div
          className={`${
            isDarkMode
              ? "bg-gray-700 mt-8 px-8 py-8 rounded-md"
              : "bg-gray-200 mt-8 px-8 py-8 rounded-md"
          }`}
        >
          <form className="space-y-4" onSubmit={handleSubmitUser}>
            <div className="flex flex-col">
              <label
                className={`${
                  isDarkMode ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
                }`}
              >
                Email address
              </label>
              <input
                type="text"
                value={email}
                disabled
                className={`${
                  isDarkMode
                    ? "input w-full bg-gray-600 border border-gray-500 rounded-md p-2 "
                    : "input w-full bg-gray-100 border border-gray-300 rounded-md p-2 "
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label
                className={`${
                  isDarkMode ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
                }`}
              >
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`${
                  isDarkMode
                    ? "input w-full bg-gray-600 border border-gray-500 rounded-md p-2 "
                    : "input w-full bg-gray-100 border border-gray-300 rounded-md p-2 "
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label
                className={`${
                  isDarkMode ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
                }`}
              >
                Avatar image
              </label>

              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                className={`${
                  isDarkMode
                    ? "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-indigo-700 file:cursor-pointer file:hover:bg-indigo-800 file:focus:ring-2 file:focus:ring-indigo-500 text-gray-200"
                    : "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-indigo-700 file:cursor-pointer file:hover:bg-indigo-800 file:focus:ring-2 file:focus:ring-indigo-500 text-gray-800"
                }`}
              />

              <div className="flex gap-4 justify-end">
                <button
                  className={`transition-colors duration-500 ${
                    isDarkMode
                      ? "border text-gray-100 rounded-lg hover:bg-gray-400 border-gray-300 px-3 py-2"
                      : "border text-gray-500 rounded-lg hover:bg-gray-200 border-gray-300 px-3 py-2"
                  }`}
                >
                  Cancel
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg">
                  Update account
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <UpdatePassword />
    </div>
  );
}

// {...register("password", {
//   required: "This field is required",
//   minLength: {
//     value: 8,
//     message: "Passowrd needs a minimun of 8 characters",
//   },
// })}
// type="password"
// id="passwordConfirm"
// {...register("passwordConfirm", {
//   required: "This field is required",
//   validate: (value) =>
//     value === getValues().password ||
//     "Passowrd need to match",
// })}
