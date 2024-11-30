import BookingDataBox from "../bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useSettings } from "../../settings/useSettings";
import { useCheckin } from "./useCheckin";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckin } = useCheckin();
  const { settings, isLoading: isLoading2 } = useSettings();

  const [addBreakfast, setAddBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { breakfastPrice } = settings || 25;

  useEffect(() => setIsPaid(booking?.isPaid ?? false), [booking?.isPaid]);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  if (isLoading || isLoading2 || isCheckin) return <Spinner />;

  if (!booking) return <div>Booking data not available</div>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    numNights,
    status,
  } = booking.data;

  const guestName = guests?.fullName || "Unknown Guest";

  const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleChange() {
    if (!isPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        statusIsPaid: {
          status: "checked-in",
          isPaid: true,
        },
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        breakfast: {},
        statusIsPaid: {
          status: "checked-in",
          isPaid: true,
        },
      });
    }
  }

  return (
    <div className="px-20">
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "text-4xl text-more-gray-100"
            : "text-4xl text-more-gray-200"
        }`}
      >
        Check in booking {bookingId}#
      </h1>

      <BookingDataBox booking={booking} />

      <section className="mt-10 flex flex-col items-center md:items-end">
        <div
          className={`transition-colors duration-500 ${
            isDarkMode
              ? "md:w-full w-[250px] px-2 py-4 bg-more-gray-300 text-gray-200 items-center rounded-lg text-lg flex gap-4"
              : "md:w-full w-[250px] px-2 py-4 bg-more-gray-100 items-center rounded-lg text-lg flex gap-4"
          }
            `}
        >
          <input
            type="checkbox"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setIsPaid(false);
            }}
            className="min-w-[25px] min-h-[25px]"
            disabled={isPaid}
          />

          <label>
            Want to add breakfast {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </div>

        <div
          className={` transition-colors duration-500 ${
            isDarkMode
              ? "bg-more-gray-300 md:w-full w-[250px] px-2 py-4 mt-10 flex items-center gap-4 rounded-lg text-lg"
              : "bg-more-gray-100 md:w-full w-[250px] px-2 py-4 mt-10 flex items-center gap-4 rounded-lg text-lg"
          }`}
        >
          <input
            type="checkbox"
            className="min-w-[25px] min-h-[25px]  "
            checked={isPaid}
            onChange={() => setIsPaid((paid) => !paid)}
          />
          <label>
            I confirm that {guestName} has paid the total amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          {status === "unconfirmed" && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-more-gray-100 px-4 py-3 rounded-lg"
              onClick={handleChange}
            >
              Check In
            </button>
          )}
          <button
            className=" text-more-gray-200 hover:bg-more-gray-100 bg-white px-4 py-3 border border-gray-300 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
}
