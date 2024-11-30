import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div>
      {options.map((option) => (
        <button
          className={`focus:outline-none focus:ring focus:ring-blue-400 mx-2 bg-gray-0 px-2 py-1 rounded-lg hover:bg-blue-600 hover:text-white  ${
            currentFilter === option.value && "bg-blue-600 text-white   "
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
