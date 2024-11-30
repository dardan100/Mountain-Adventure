import React from "react";
import Filter from "../../ui/Filter";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DashboardFilter() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "flex items-center justify-center text-white bg-gray-700  text-center gap-[1.6rem] rounded-md py-1 "
          : "flex items-center justify-center bg-white text-center gap-[1.6rem] rounded-md py-1"
      }`}
    >
      <Filter
        filterField="last"
        options={[
          {
            value: "7",
            label: "Last 7 days",
          },
          {
            value: "30",
            label: "Last 30 days",
          },
          {
            value: "90",
            label: "Last 90 days",
          },
        ]}
      />
    </div>
  );
}
