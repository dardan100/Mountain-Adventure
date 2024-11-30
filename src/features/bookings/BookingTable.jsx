import React from "react";
import { useBookings } from "./useBookings";
import BookingItem from "./BookingItem";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";

export default function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const { isDarkMode } = useDarkMode();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName={"bookings"} />;

  return (
    <div className="mb-44">
      <div
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "mt-10 font-medium uppercase  bg-gray-900 rounded-sm text-white"
            : "mt-10 font-medium text-gray-700 uppercase bg-gray-100  rounded-sm"
        }`}
      >
        <section
          className={`transition-colors duration-500 ${
            isDarkMode
              ? " hidden bg-gray-800 xl:grid xl:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] xl:px-4  xl:gap-4 xl:items-center  md:grid md:grid-cols-[1.3fr_3.1fr_2.5fr_2.2fr_2.0fr_1.2fr] md:px-4 py-4 md:gap-4 md:items-center"
              : " hidden bg-gray-300  xl:grid xl:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] xl:px-4  xl:gap-4 xl:items-center  md:grid md:grid-cols-[1.3fr_3.1fr_2.5fr_2.2fr_2.0fr_1.2fr] md:px-4 py-4 md:gap-4 md:items-center"
          }`}
        >
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Amount</div>
          <div>Status</div>
          <div></div>
        </section>
        {bookings.map((item) => (
          <BookingItem item={item} key={item.id} />
        ))}

        <section
          className={`transition-colors duration-500 ${
            isDarkMode
              ? "px-4 py-2  pb-4 bg-gray-800 mt-4"
              : "px-4 py-2 pb-4 bg-gray-300 mt-4"
          }`}
        >
          <Pagination count={count} />
        </section>
      </div>
    </div>
  );
}
