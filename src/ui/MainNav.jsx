import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useDarkMode } from "../context/DarkModeContext";
import MobileMenu from "./MobileMenu";
// ⬅️ Import new mobile menu

export default function MainNav() {
  const [activeLink, setActiveLink] = useState(
    () => localStorage.getItem("activeLink") || "/dashboard"
  );
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  function handleClick(link) {
    setActiveLink(link);
  }

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div
        className={`${
          isDarkMode
            ? "hidden xl:flex flex-col gap-y-10 font-medium text-gray-300 xl:relative"
            : "hidden xl:flex flex-col gap-y-10 font-medium text-gray-500 xl:relative"
        }`}
      >
        <Logo />

        <Link
          to="/dashboard"
          onClick={() => handleClick("/dashboard")}
          className={`${
            isDarkMode
              ? activeLink === "/dashboard"
                ? "bg-indigo-500"
                : ""
              : activeLink === "/dashboard"
              ? "bg-indigo-200"
              : ""
          } group flex items-center gap-2 hover:bg-indigo-300 rounded-md text-lg px-4 py-2`}
        >
          <span
            className={`text-2xl ${
              activeLink === "/dashboard"
                ? "text-indigo-700"
                : "group-hover:text-indigo-700"
            } transition-colors`}
          >
            <HiOutlineHome />
          </span>
          <span
            className={`${
              isDarkMode
                ? "group-hover:text-black text-white text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            Home
          </span>
        </Link>

        <Link
          to="/cabins"
          onClick={() => handleClick("/cabins")}
          className={`${
            isDarkMode
              ? activeLink === "/cabins"
                ? "bg-indigo-500"
                : ""
              : activeLink === "/cabins"
              ? "bg-indigo-200"
              : ""
          } group flex items-center gap-2 hover:bg-indigo-300 rounded-md text-lg px-4 py-2`}
        >
          <span
            className={`text-2xl ${
              activeLink === "/cabins"
                ? "text-indigo-700"
                : "group-hover:text-indigo-700"
            } transition-colors`}
          >
            <HiOutlineHomeModern />
          </span>
          <span
            className={`${
              isDarkMode
                ? "group-hover:text-black text-white text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            Cabins
          </span>
        </Link>

        <Link
          to="/bookings"
          onClick={() => handleClick("/bookings")}
          className={`${
            isDarkMode
              ? activeLink === "/bookings"
                ? "bg-indigo-500"
                : ""
              : activeLink === "/bookings"
              ? "bg-indigo-200"
              : ""
          } group flex items-center gap-2 hover:bg-indigo-300 rounded-md text-lg px-4 py-2`}
        >
          <span
            className={`text-2xl ${
              activeLink === "/bookings"
                ? "text-indigo-700"
                : "group-hover:text-indigo-700"
            } transition-colors`}
          >
            <HiOutlineCalendarDays />
          </span>
          <span
            className={`${
              isDarkMode
                ? "group-hover:text-black text-white text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            Bookings
          </span>
        </Link>

        <Link
          to="/user"
          onClick={() => handleClick("/user")}
          className={`${
            isDarkMode
              ? activeLink === "/user"
                ? "bg-indigo-500"
                : ""
              : activeLink === "/user"
              ? "bg-indigo-200"
              : ""
          } group flex items-center gap-2 hover:bg-indigo-300 rounded-md text-lg px-4 py-2`}
        >
          <span
            className={`text-2xl ${
              activeLink === "/user"
                ? "text-indigo-700"
                : "group-hover:text-indigo-700"
            } transition-colors`}
          >
            <HiOutlineUser />
          </span>
          <span
            className={`${
              isDarkMode
                ? "group-hover:text-black text-white text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            User
          </span>
        </Link>

        <Link
          to="/settings"
          onClick={() => handleClick("/settings")}
          className={`${
            isDarkMode
              ? activeLink === "/settings"
                ? "bg-indigo-500"
                : ""
              : activeLink === "/settings"
              ? "bg-indigo-200"
              : ""
          } group flex items-center gap-2 hover:bg-indigo-300 rounded-md text-lg px-4 py-2`}
        >
          <span
            className={`text-2xl ${
              activeLink === "/settings"
                ? "text-indigo-700"
                : "group-hover:text-indigo-700"
            } transition-colors`}
          >
            <HiOutlineCog6Tooth />
          </span>
          <span
            className={`${
              isDarkMode
                ? "group-hover:text-black text-white text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            Settings
          </span>
        </Link>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu />
    </div>
  );
}
