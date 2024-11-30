import React from "react";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperator from "../features/bookings/BookingTableOperator";
import { useDarkMode } from "../context/DarkModeContext";

import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
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
            All Bookings
          </h1>
        </header>
        <button
          onClick={() => navigate("/bookings/new")}
          className={
            isDarkMode
              ? "bg-indigo-500 px-2 py-3 my-4 md:my-2 xl:my-0 rounded-md hover:bg-indigo-600 transition-colors duration-500"
              : "bg-blue-400 px-2 py-3  my-4 md:my-2 xl:my-0 rounded-md hover:bg-blue-500 transition-colors duration-500 text-white"
          }
        >
          + New Booking
        </button>
        <BookingTableOperator />
      </div>

      <BookingTable />
    </div>
  );
}
