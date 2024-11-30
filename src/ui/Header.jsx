import React from "react";
import HeaderMenu from "./HeaderMenu";
import { useDarkMode } from "../context/DarkModeContext";
import UserAvatar from "../features/authentication/UserAvatar";

export default function Header() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`${
        isDarkMode
          ? "flex justify-end items-center h-16 border-b border-gray-700"
          : "flex justify-end items-center h-16 border-b border-gray-200"
      }`}
    >
      <UserAvatar />
      <HeaderMenu />
    </div>
  );
}
