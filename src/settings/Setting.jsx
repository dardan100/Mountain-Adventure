import React from "react";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import Spinner from "../ui/Spinner";

import { useDarkMode } from "../context/DarkModeContext";

export default function Setting() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isDarkMode } = useDarkMode();

  const { updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(e) {
    const { value, id, defaultValue } = e.target;

    if (!value || !id || defaultValue === value) return;
    updateSetting({ [id]: value });
    e.target.defaultValue = value;
  }

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? " h-screen py-7 flex rounded-lg  bg-gray-800 flex-col px-10 overflow-x-hidden"
          : " h-screen py-7 px-5  overflow-x-hidden bg-gray-200 flex flex-col"
      }`}
    >
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "text-[35px]  px-3 py-4 rounded-xl bg-indigo-600 text-gray-100 font-medium text-center xl:text-start "
            : "text-[35px] text-gray-600  l px-2 rounded-xl font-medium text-center xl:text-start "
        } `}
      >
        Update hotel settings
      </h1>

      <div className="mt-10 ">
        <form>
          <div>
            <label className="basis-40 text-xl">Minimum nights/booking</label>
            <div className="mt-2">
              <input
                type="number"
                id="minBookingLength"
                defaultValue={minBookingLength}
                onBlur={(e) => handleUpdate(e)}
                className={`transition-colors duration-500 ${
                  isDarkMode
                    ? "input text-gray-200 bg-gray-800 border-gray-900 font-bold text-lg  w-full"
                    : "input text-gray-800 bg-gray-100 border-gray-200 font-bold text-lg  w-full"
                }`}
              />
            </div>
          </div>

          <label className="basis-40 text-xl">Maximum nights/booking</label>
          <div className="grow">
            <input
              type="number"
              id="maxBookingLength"
              className={`transition-colors duration-500 ${
                isDarkMode
                  ? "input text-gray-200 bg-gray-800 border-gray-900 font-bold text-lg  w-full"
                  : "input text-gray-800 bg-gray-100 border-gray-200 font-bold text-lg  w-full"
              }`}
              defaultValue={maxBookingLength}
              onBlur={(e) => handleUpdate(e)}
            />
          </div>

          <label className="basis-40 text-xl">Maximum guests/booking</label>
          <div className="grow">
            <input
              type="number"
              defaultValue={maxGuestsPerBooking}
              className={`transition-colors duration-500 ${
                isDarkMode
                  ? "input text-gray-200 bg-gray-800 border-gray-900 font-bold text-lg  w-full"
                  : "input text-gray-800 bg-gray-100 border-gray-200 font-bold text-lg  w-full"
              }`}
              id="maxGuestsPerBooking"
              onBlur={(e) => handleUpdate(e)}
            />
          </div>
          <label className="basis-40 text-xl">Breakfast price</label>
          <div className="grow">
            <input
              type="number"
              id="breakfastPrice"
              defaultValue={breakfastPrice}
              className={`transition-all duration-500 ${
                isDarkMode
                  ? "input text-gray-200 bg-gray-800 border-gray-900 font-bold text-lg  w-full"
                  : "input text-gray-800 bg-gray-100 border-gray-200 font-bold text-lg  w-full"
              }`}
              onBlur={(e) => handleUpdate(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
