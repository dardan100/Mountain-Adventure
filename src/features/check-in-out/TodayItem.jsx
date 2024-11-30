import React from "react";
import SpanStatus from "../../ui/SpanStatus";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { fullName } = guests;
  const navigate = useNavigate();
  return (
    <div className="flex border-b border-b-gray-300 border-t border-t-gray-300 p-3 justify-between items-center w-full px-2 md:px-10">
      <div className="flex gap-1 md:gap-8 ">
        {status === "unconfirmed" && (
          <p className="text-[12px] bg-green-400 font-medium text-more-gray-100 rounded-3xl flex justify-center px-3 uppercase items-center">
            Arriving
          </p>
        )}
        {status === "checked-in" && (
          <p className="text-[12px] bg-gray-500 font-medium text-more-gray-100 rounded-3xl flex justify-center px-3 uppercase items-center">
            Departing
          </p>
        )}{" "}
        <p className=" whitespace-nowrap">{fullName}</p>
      </div>
      <div className="flex gap-4 md:gap-8 items-center">
        <p>{numNights} nights</p>
        {status === "unconfirmed" && (
          <button
            className="bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-more-gray-100 px-4 py-1 rounded-lg"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check In
          </button>
        )}
        {status === "checked-in" && (
          <CheckoutButton
            bookingId={id}
            className={
              "bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-more-gray-100 px-4 py-1 rounded-lg"
            }
          />
        )}
      </div>
    </div>
  );
}