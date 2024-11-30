import React from "react";
import CabinsTable from "../features/cabins/CabinsTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import { useDarkMode } from "../context/DarkModeContext";

export default function Cabins() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="2xl:px-24">
      <div
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "md:flex md:items-center md:flex-row md:justify-between flex flex-col items-center bg-indigo-700 rounded-xl py-4 md:px-4"
            : "md:flex md:items-center md:flex-row md:justify-between flex flex-col items-center bg-blue-300 rounded-xl py-4 md:px-4"
        }  `}
      >
        <header>
          <h1
            className={`transition-colors duration-500 ${
              isDarkMode
                ? "xl:text-start text-center mb-2  text-[31px] text-white "
                : "xl:text-start text-center mb-2  text-[31px] text-gray-900 "
            }`}
          >
            All Cabins
          </h1>
        </header>
        <CabinTableOperation />
      </div>

      <CabinsTable />
      <AddCabin />
    </div>
  );
}
