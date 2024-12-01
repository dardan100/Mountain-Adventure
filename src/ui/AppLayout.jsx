import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDarkMode } from "../context/DarkModeContext";

export default function AppLayout() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="grid relative xl:grid-cols-[15rem_1fr] overflow-hidden grid-rows-[auto_1fr]  ">
      {/* Header spans the full width at the top */}
      <header
        className={`${
          isDarkMode
            ? "col-span-2 h-20 xl:col-span-1 bg-gray-900 "
            : "col-span-2 h-20 xl:col-span-1 bg-gray-100 "
        }`}
      >
        <Header />
      </header>

      {/* Sidebar takes the full height from row 2 onwards */}
      <aside
        className={`${
          isDarkMode
            ? "col-start-1 border-r border-gray-700 bg-gray-900 row-span-full row-start-2 xl:row-start-1 mt-0 pl-5"
            : "col-start-1 border-r bg-gray-100 row-span-full row-start-2 xl:row-start-1 mt-0 pl-5"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Main content next to the sidebar, below the header */}
      <main
        className={`${
          isDarkMode
            ? "col-start-1 col-end-3 xl:col-start-2 row-start-2 -mt-4 bg-gray-900 xl:p-[4rem_4.8rem_6.4rem] p-[2rem_1.8rem_1.4rem] overflow-auto text-white"
            : "col-start-1 col-end-3 xl:col-start-2 row-start-2 -mt-4 bg-gray-100 xl:p-[4rem_4.8rem_6.4rem] p-[2rem_1.8rem_1.4rem] overflow-auto"
        }`}
      >
        <div className="flex flex-col gap-[3.2rem]  max-w-[120rem] m-[0_auto]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
