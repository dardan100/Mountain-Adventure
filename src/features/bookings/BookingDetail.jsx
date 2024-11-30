import React from "react";
import BookingDataBox from "./BookingDataBox";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import SpanStatus from "../../ui/SpanStatus";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useDarkMode } from "../../context/DarkModeContext";

export default function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isLoading: isLoading2 } = useDeleteBooking();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  if (isLoading || isLoading2) return <Spinner />;
  const { status, id: bookingId } = booking.data;

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "md:w-full py-4  md:items-start bg-more-gray-300 px-36"
          : "md:w-full py-4 md:items-start bg-more-gray-100 px-36"
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        className={` transition-colors duration-500 ${
          isDarkMode
            ? "text-blue-100 hover:text-indigo-500 text-lg"
            : "text-blue-600 hover:text-blue-400 text-lg"
        }`}
      >
        &larr; Back
      </button>

      <div className="flex flex-col items-center">
        <div className="flex items-center flex-col md:flex-row py-2 justify-between w-[420px] md:w-full">
          <section className="flex gap-4 items-center">
            <h1
              className={`transition-colors duration-500 ${
                isDarkMode
                  ? "text-4xl text-more-gray-100"
                  : "text-4xl text-more-gray-200"
              }`}
            >
              Booking #{bookingId}
            </h1>

            <SpanStatus status={status}>{status}</SpanStatus>
          </section>
        </div>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex justify-center md:justify-end items-center gap-4 mt-6">
        {status === "unconfirmed" && (
          <button
            className="bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-more-gray-100 px-4 py-3 rounded-lg"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check In
          </button>
        )}

        {status === "checked-in" && (
          <CheckoutButton
            bookingId={bookingId}
            className={
              "bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-more-gray-100 px-4 py-3 rounded-lg"
            }
          />
        )}

        <Modal>
          <Modal.Open opens="deleteBooking">
            <button className=" text-more-gray-100 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-3">
              Delete
            </button>
          </Modal.Open>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              onConfirm={() => {
                navigate("/bookings");
                deleteBooking(bookingId);
              }}
            />
          </Modal.Window>
        </Modal>

        <button
          className=" text-more-gray-300 hover:text-more-gray-100 bg-white px-4 py-3 border border-gray-300 rounded-lg"
          onClick={() => navigate("/bookings")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
