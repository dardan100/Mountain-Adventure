import React from "react";

import {
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";

export default function BookingDataBox({ booking }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,

    isPaid,
    totalPrice,
    numGuests,
    hasBreakfast,
    cabinPrice,
    extrasPrice,
    cabins: { name: cabinName },
    guests,
    // guests: { email, fullName: guestName, nationalId, countryFlag },
  } = booking.data;
  const { isDarkMode } = useDarkMode();
  const email = guests?.email || "No Email";
  const guestName = guests?.fullName || "No Email";
  const nationalId = guests?.nationalId || "No Email";
  return (
    <div>
      <div className=" flex flex-col items-center md:items-start pb-10 ">
        <div
          className={`transition-colors duration-500 ${
            isDarkMode
              ? "flex gap-4 w-[300px] md:w-full md:justify-between bg-indigo-500 text-white  rounded-t-lg md:px-4 md:py-6 px-1 py-10 md:items-center mt-10 mb-8 font-bold xl:tracking-wide flex-col  md:flex-row"
              : "flex gap-4 w-[300px] md:w-full md:justify-between bg-blue-500 text-white  rounded-t-lg md:px-4 md:py-6 px-1 py-10 md:items-center mt-10 mb-8 font-bold xl:tracking-wide flex-col  md:flex-row"
          }`}
        >
          <div>
            <p className="text-xl text flex items-center gap-3">
              <span className="text-4xl">
                <HiOutlineHomeModern />
              </span>
              {numNights} nights in Cabin {cabinName}
            </p>
          </div>

          <div>
            <p>
              {format(new Date(startDate), "EEE, MMM dd yyyy")} (
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}
              ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center mb-3 px-7 flex-col md:flex-row">
          <p
            className={`transition-colors duration-500 ${
              isDarkMode
                ? "text-gray-200 font-semibold tracking-wide text-xl"
                : "text-gray-800 font-semibold tracking-wide text-xl"
            }`}
          >
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{email}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">National ID {nationalId}</span>
        </div>

        <section className="flex items-center gap-2 mb-3 justify-center px-7 md:justify-start mt-5">
          <span className="text-blue-700 text-xl">
            <HiOutlineCheckCircle />
          </span>
          <p className="font-normal text-xl  flex gap-4">
            Breakfast included?
            <span>{hasBreakfast ? "Yes" : "No"}</span>
          </p>
        </section>

        <div className="md:px-7 md:py-3 px-1 w-[220px] md:w-full">
          <section
            className={`rounded-xl ${
              isPaid ? "bg-green-200" : "bg-orange-200"
            } px-4 py-5 flex justify-between items-center`}
          >
            <p
              className={`flex items-center flex-col md:flex-row gap-2 ${
                isPaid ? "text-green-800" : "text-orange-600 font-medium "
              }`}
            >
              <span className="flex items-center gap-2">
                <HiOutlineCurrencyDollar />
                Total price
              </span>
              {formatCurrency(totalPrice)} ({formatCurrency(cabinPrice)} cabin +{" "}
              {formatCurrency(extrasPrice)} breakfast)
            </p>

            <div>
              <span
                className={`${
                  isPaid
                    ? "text-green-900 font-medium"
                    : "text-orange-600 font-medium "
                } `}
              >
                {isPaid ? "Paid" : "Will pay at property"}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// <p className="flex justify-end pt-10 text-sm text-gray-500">
//   Booked {format(new Date(startDate), "EEE, MMM dd yyyy")} (
//   {isToday(new Date(startDate))
//     ? "Today"
//     : formatDistanceFromNow(startDate)}
//   )
// </p>
