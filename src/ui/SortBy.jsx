import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  function handleClick(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="">
      <select
        onChange={handleClick}
        className={`${
          isDarkMode
            ? "sm:text-sm xl:text-md border border-gray-700 rounded-md focus:outline-none px-2 py-2 flex  text-white items-center focus:ring focus:ring-gray-900 bg-gray-700 "
            : "sm:text-sm xl:text-md border border-gray-200 rounded-md focus:outline-none px-2 py-2 flex items-center focus:ring focus:ring-blue-600 bg-white"
        }  `}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
