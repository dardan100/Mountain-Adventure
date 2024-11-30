import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Logo from "./Logo";
import { useDarkMode } from "../context/DarkModeContext";

export default function MainNav() {
  const [activeLink, setActiveLink] = useState(
    () => localStorage.getItem("activeLink") || "/dashboard"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  function handleClick(link) {
    setActiveLink(link);
    setIsMenuOpen(false); // Close menu on link click
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  // xl:hidden flex items-center px-4 py-2 transition-transform transform duration-300 ease-in-out hover:scale-110 hover:rotate-12 hover:text-indigo-500

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="xl:hidden flex items-center fixed left-4 top-[5px] px-4 py-4 transition-transform transform duration-300 ease-in-out hover:scale-x-125 hover:rotate-180 hover:text-indigo-900"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <HiOutlineX className="text-3xl  text-indigo-700 transition-all duration-300 ease-in-out " />
        ) : (
          <HiOutlineMenu className="text-3xl text-indigo-700  transition-all duration-300 ease-in-out" />
        )}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen
            ? "opacity-100 translate-x-0 "
            : "opacity-0 pointer-events-none xl:pointer-events-auto -translate-x-4 xl:opacity-100 xl:-translate-x-0 "
        } ${
          isDarkMode
            ? "xl:flex flex-col gap-y-10 px-10 mt-12 font-medium text-gray-300 h-screen xl:h-auto xl:mt-0 xl:px-0 absolute -top-[260px] xl:top-16 -left-10 xl:left-0 xl:bg-transparent  xl:w-auto shadow-lg xl:shadow-none z-10 xl:relative rounded-lg bg-indigo-700 transition-all duration-500 ease-in-out transform"
            : "xl:flex flex-col gap-y-10 px-10 mt-12 font-medium text-gray-500 h-screen xl:h-auto xl:mt-0 xl:px-0 absolute -top-[225px] xl:top-16 -left-10 xl:left-0 xl:bg-transparent  xl:w-auto shadow-lg xl:shadow-none z-10 xl:relative rounded-lg bg-indigo-100 transition-all duration-500 ease-in-out transform"
        } `}
      >
        <div className="xl:hidden mb-8 mt-10">
          <Logo />
        </div>

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
                ? "group-hover:text-black text-white  text-xl transition-colors"
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
              ? "bg-indigo-300"
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
                ? "group-hover:text-black text-white  text-xl transition-colors"
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
              ? "bg-indigo-300"
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
                ? "group-hover:text-black text-white  text-xl transition-colors"
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
              ? "bg-indigo-300"
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
                ? "group-hover:text-black text-white  text-xl transition-colors"
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
              ? "bg-indigo-300"
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
                ? "group-hover:text-black text-white  text-xl transition-colors"
                : "group-hover:text-black text-gray-700 text-xl transition-colors"
            }`}
          >
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
}
