import React from "react";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center px-5">
      <button
        className="text-xl text-blue-700 rounded-md focus:outline-none px-2 py-2 flex items-center focus:ring focus:ring-blue-600"
        onClick={() => navigate("/account")}
      >
        <HiOutlineUser />
      </button>

      <span>
        <DarkModeToggle />
      </span>

      <span>
        <Logout />
      </span>
    </div>
  );
}
