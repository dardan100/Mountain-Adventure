import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { useDarkMode } from "../../context/DarkModeContext";

export default function BookingTableOperator() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex xl:flex xl:flex-row px-4 xl:gap-8 gap-3 flex-col items-center">
      <div
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "flex items-center justify-center text-white bg-gray-700  text-center gap-[1.6rem] rounded-md py-1 "
            : "flex items-center justify-center bg-white text-center gap-[1.6rem] rounded-md py-1"
        }`}
      >
        <Filter
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked Out" },
            { value: "checked-in", label: "Checked In" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>

      <div>
        <SortBy
          options={[
            { value: "startDate-desc", label: "Sort by date (recent first)" },
            { value: "startDate-asc", label: "Sort by date (earlier first)" },
            { value: "totalPrice-desc", label: "Sort by price (high first)" },
            { value: "totalPrice-asc", label: "Sort by price (low first)" },
          ]}
        />
      </div>
    </div>
  );
}
