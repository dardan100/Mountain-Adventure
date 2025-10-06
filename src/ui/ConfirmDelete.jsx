import React from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDarkMode } from "../context/DarkModeContext";

export default function ConfirmDelete({ onConfirm, onCloseModal }) {
  const ref = useOutsideClick(onCloseModal);
  const { isDarkMode } = useDarkMode();
  return (
    <div className="px-4 py-4" ref={ref}>
      <h1 className="text-2xl mb-4 ">Delete booking</h1>
      <p className={`${isDarkMode ? "text-white" : "text-gray-700"}`}>
        Are you sure you want to delete this booking permanently? This action
        cannot be undone.
      </p>
      <div className="mt-4 flex justify-end items-center gap-3">
        <button
          className=" text-black border border-gray-300 hover:bg-gray-200 flex justify-end items-center rounded-lg bg-white px-4 py-3"
          onClick={() => onCloseModal()}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className=" text-white rounded-lg bg-red-600 hover:bg-red-700 px-4 py-3"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
