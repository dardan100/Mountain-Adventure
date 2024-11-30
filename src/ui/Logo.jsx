import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import logoDark from "../../src/cabins/snowfall-logo.png";
import logoLight from "../../src/cabins/s.png";

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  const lightLogo = logoLight;
  const darkLogo = logoDark;

  return (
    <div className="xl:mt-10">
      <img src={isDarkMode ? lightLogo : darkLogo} alt="Logo" />
    </div>
  );
}
