import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CabinTableOperation() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex xl:flex xl:flex-row  xl:gap-8 gap-3 flex-col items-center">
      <div
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "flex items-center justify-center text-white bg-gray-700  text-center gap-[1.6rem] rounded-md py-1 "
            : "flex items-center justify-center bg-white text-center gap-[1.6rem] rounded-md py-1"
        }`}
      >
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No Discount" },
            { value: "with-discount", label: "With Discount" },
          ]}
        />
      </div>
      <div>
        <SortBy
          options={[
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
            { value: "regularPrice-asc", label: "Sort by price (low first)" },
            { value: "regularPrice-desc", label: "Sort by price (high first)" },
            { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
            {
              value: "maxCapacity-desc",
              label: "Sort by capacity (high first)",
            },
          ]}
        />
      </div>
    </div>
  );
}
