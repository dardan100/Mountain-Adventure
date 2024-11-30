import { format, isToday } from "date-fns";
import React from "react";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckOut";
import { useDarkMode } from "../../context/DarkModeContext";

export default function BookingItem({
  item: {
    id: bookingId,
    status,
    totalPrice,
    extrasPrice,
    startDate,
    endDate,
    numNights,
    cabinPrice,
    guests,
    cabins: { name: cabinName },
  },
}) {
  const guestName = guests?.fullName || "Unknown Guest";
  const email = guests?.email || "No Email";

  const navigate = useNavigate();
  const { deleteBooking, isLoading } = useDeleteBooking();
  const { checkout } = useCheckout();
  const { isDarkMode } = useDarkMode();
  if (isLoading) return <Spinner />;

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "mt-5 bg-gray-800  text-gray-200 px-4"
          : "mt-5 bg-gray-200 text-gray-700 px-4"
      } `}
    >
      <section
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "md:grid md:border-b-2 md:py-3 md:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:items-center gap-4 flex flex-col  items-start px-4  border-b-gray-800  relativ py-2 "
            : "md:grid md:border-b-2 md:py-3 md:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:items-center gap-4 flex flex-col  items-start px-4  relativ py-2 "
        }`}
      >
        <span className="md:hidden -mb-4">{bookingId}</span>
        <span>{cabinName}</span>
        <div className="flex flex-col px-0 ">
          <span className="text-[12px] md:text-[15px] font-semibold">
            {guestName}
          </span>
          <span className="text-[10px]   max-w-[10px] ">{email}</span>
        </div>
        <div className="flex flex-col xl:ml-0 md:ml-8">
          <span className="text-[16px]">
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span className="text-[11px]">
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </div>

        <span>{formatCurrency(totalPrice)}</span>

        {status === "unconfirmed" && (
          <span
            className={
              "text-[11px] bg-blue-200 text-blue-500 p-1 rounded-3xl flex justify-center w-[100px]"
            }
          >
            {status}
          </span>
        )}
        {status === "checked-in" && (
          <span
            className={
              "text-[11px] bg-green-200 text-green-600 p-1 rounded-3xl flex justify-center w-[100px]"
            }
          >
            {status}
          </span>
        )}
        {status === "checked-out" && (
          <span
            className={
              "text-[11px] bg-gray-300 text-gray-600 p-1 rounded-3xl flex justify-center w-[100px]"
            }
          >
            {status}
          </span>
        )}

        <div className="absolute right-16 mt-4 xl:mt-0 xl:right-[200px]">
          <Modal>
            <Menus.Menu>
              <div className="relative">
                <Menus.Toggle />
                <Menus.List>
                  <button
                    className="flex items-center gap-2  text-gray-600"
                    onClick={() => navigate(`/bookings/${bookingId}`)}
                  >
                    <span
                      className={`${
                        isDarkMode
                          ? "text-gray-600 text-xl"
                          : "text-gray-400 text-xl"
                      }`}
                    >
                      <HiEye />
                    </span>
                    See Details
                  </button>

                  <Modal.Open opens="deleteBooking">
                    <button className="flex items-center gap-2 flex-auto text-gray-600 ">
                      <span
                        className={`${
                          isDarkMode
                            ? "text-gray-600 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                      >
                        <HiTrash />
                      </span>
                      Delete booking
                    </button>
                  </Modal.Open>

                  {status === "unconfirmed" && (
                    <button
                      className="flex items-center gap-2 text-gray-600"
                      onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                      <span
                        className={`${
                          isDarkMode
                            ? "text-gray-600 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                      >
                        <HiArrowDownOnSquare />
                      </span>
                      Check In
                    </button>
                  )}

                  {status === "checked-in" && (
                    <button
                      className="flex items-center gap-2 text-gray-600"
                      onClick={() => checkout(bookingId)}
                    >
                      <span
                        className={`${
                          isDarkMode
                            ? "text-gray-600 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                      >
                        <HiArrowUpOnSquare />
                      </span>
                      Check Out
                    </button>
                  )}
                </Menus.List>
              </div>
            </Menus.Menu>

            <Modal.Window name="deleteBooking">
              <ConfirmDelete onConfirm={() => deleteBooking(bookingId)} />
            </Modal.Window>
          </Modal>
        </div>
      </section>
    </div>
  );
}
