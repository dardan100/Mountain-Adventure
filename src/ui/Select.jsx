import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const Select = React.forwardRef(
  ({ options, value, onChange, className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode();

    return (
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        className={`text-base px-3 py-2 border rounded shadow-sm font-medium ${
          isDarkMode
            ? "border-gray-600 bg-gray-800 text-white"
            : "border-gray-200 bg-gray-200 text-gray-800"
        } ${
          props.type === "white" ? "border-gray-200" : "border-gray-400"
        } ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option
            key={`${option.value}-${index}`}
            value={option.value}
            className="text-sm"
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
