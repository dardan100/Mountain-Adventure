import React from "react";

export default function SpanStatus({ status, children }) {
  // Normalize the status by replacing hyphens with no space to match the keys in the styles object
  const normalizedStatus = status.replace("-", ""); // "checked-in" becomes "checkedin"

  const styles = {
    unconfirmed:
      "text-[14px] bg-blue-200 font-medium text-blue-600 rounded-3xl flex justify-center px-3 uppercase items-center",
    checkedin:
      "text-[14px] bg-green-400 font-medium text-white rounded-3xl flex justify-center px-3 uppercase items-center",
    checkedout:
      "text-[14px] bg-gray-200 font-medium text-white rounded-3xl flex justify-center px-3 uppercase items-center",
  };

  const className =
    styles[normalizedStatus] ||
    "text-[14px] bg-gray-200 font-medium text-gray-600 rounded-3xl flex justify-center px-3 uppercase items-center";

  return <span className={className}>{children || status}</span>;
}
