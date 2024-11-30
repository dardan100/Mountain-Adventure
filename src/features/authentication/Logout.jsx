import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/login")}
        className="text-xl text-blue-700 rounded-md focus:outline-none px-2 py-2 flex items-center focus:ring focus:ring-blue-600"
      >
        <HiArrowRightOnRectangle />
      </button>
    </div>
  );
}
