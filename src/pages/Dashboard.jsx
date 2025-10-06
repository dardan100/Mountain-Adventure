import React from "react";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useDarkMode } from "../context/DarkModeContext";

export default function Dashboard() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="2xl:px-24  items-center flex flex-col md:block">
      <div
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "md:flex md:items-center md:flex-row md:justify-between flex flex-col items-center bg-indigo-700 rounded-xl min-w-[372px] py-4 md:px-4"
            : "md:flex md:items-center md:flex-row md:justify-between flex flex-col items-center bg-blue-300 rounded-xl py-4 md:px-4 max-xl:px-10"
        }  `}
      >
        <h1
          className={`transition-colors duration-500 ${
            isDarkMode
              ? "xl:text-start text-center mb-2  text-[31px] text-white "
              : "xl:text-start text-center mb-2  text-[31px] text-gray-900 "
          }`}
        >
          Dashboard
        </h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}
