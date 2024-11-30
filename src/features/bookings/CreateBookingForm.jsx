import React, { useState } from "react";
import { useAllCabins } from "../cabins/useAllCabins";
import { useCreateBookings } from "./useCreateBookings";
import { useSettings } from "../../settings/useSettings";
import { DayPicker } from "react-day-picker";
import { useAllGuests } from "../../guests/useAllGuests";
import { useGetBookingsByCabin } from "./useGetBookingsByCabin";
import { useDarkMode } from "../../context/DarkModeContext";

import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";

import { formatCurrency, subtractDates } from "../../utils/helpers";
import "react-day-picker/dist/style.css"; // Import DayPicker styles
import "../../styles/custom-day-picker.css";
import {
  isBefore,
  isValid,
  parseISO,
  format,
  eachDayOfInterval,
  startOfToday,
  endOfDay,
} from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDatePicker } from "../../hooks/useDatePicker";

export default function CreateBookingForm() {
  const { cabins, isLoading: isLoadingCabins } = useAllCabins();
  const { createBooking, isCreating } = useCreateBookings();
  const { guests, isLoading: isLoadingGuests } = useAllGuests();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabinId: cabinIdUrl } = useParams();

  const navigate = useNavigate();

  const { range, setRange, handleDayClick, handleResetRange } = useDatePicker();
  const { isDarkMode } = useDarkMode();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cabinId: cabinIdUrl || "",
      startDate: "",
      endDate: "",
      guestId: "",
      numGuests: 1,
      numNights: 0,
      cabinPrice: 0,
      discount: 0,
      observations: "",
      extrasPrice: 0,
      totalPrice: 0,
      hasBreakfast: false,
      isPaid: false,
    },
  });

  useEffect(() => {
    reset({
      cabinId: cabinIdUrl || "",
      numGuests: 1,
      startDate: "",
      endDate: "",
      hasBreakfast: false,
      isPaid: false,
    });
  }, [cabinIdUrl, reset]);

  const cabinIdInput = watch("cabinId");
  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

  const { bookedDates, isLoadingBookedDates } = useGetBookingsByCabin(
    Number(cabinIdInput)
  );

  if (
    isLoadingSettings ||
    isLoadingCabins ||
    isLoadingGuests ||
    isLoadingBookedDates
  )
    return <Spinner />;

  const numNightsInput =
    startDateInput && endDateInput && endDateInput > startDateInput
      ? subtractDates(endDateInput, startDateInput)
      : 0;

  const cabinOptions = [
    { value: "", label: "Select a Cabin" },
    ...cabins
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cabin) => ({
        value: cabin.id,
        label: `${cabin.name}  (${cabin.maxCapacity} guests)`,
      })),
  ];

  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinInput = cabins.find(
    (cabinInput) => cabinInput.id === Number(cabinIdInput)
  );

  const guestOptions = [
    { value: "", label: "Select a Guest" },
    ...guests
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((guest) => ({
        value: guest.id,
        label: guest.fullName,
      })),
  ];

  // const numGuestOptions = [
  //   { value: "", label: "Select a number" },
  //   ...Array.from({ length: cabinInput?.maxCapacity }, (_, i) => ({
  //     value: i + 1,
  //     label: `${i + 1} guest${i > 0 ? "s" : ""}`,
  //   })),
  // ];

  const cabinPriceInput = cabinInput
    ? cabinInput.regularPrice * numNightsInput
    : 0;

  const extrasPriceInput = hasBreakfast
    ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
    : 0;

  const discountInput = cabinInput ? cabinInput.discount : 0;

  const totalPriceInput =
    numNightsInput > 0 ? cabinPriceInput + extrasPriceInput - discountInput : 0;

  const bookedDatesForCabin = bookedDates?.flatMap(({ startDate, endDate }) => {
    const start = parseISO(startDate);
    const end = endOfDay(parseISO(endDate));

    const startToday = isBefore(start, startOfToday()) ? startOfToday() : start;

    const datesInRange = eachDayOfInterval({ start: startToday, end });
    return datesInRange;
  });

  function handleReset() {
    reset();
    navigate("/bookings/new");
    handleResetRange();
  }

  function onSubmit(data) {
    // selected Cabin
    const cabinIdNum = Number(data.cabinId);
    const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

    const extrasPrice =
      numNightsInput * settings.breakfastPrice * Number(numGuestInput);

    const totalPrice = cabinPrice + extrasPrice;

    const finalData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: numNightsInput,
      numGuests: Number(data.numGuests),
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      observations: data.observations,
      hasBreakfast,
      isPaid,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: "unconfirmed",
    };

    createBooking(finalData, {
      onSuccess: () => {
        handleReset();
      },
    });
  }

  const className = isDarkMode ? "dark-mode" : "";

  return (
    <div className={className}>
      <div className="mb-12">
        <h1
          className={`${
            isDarkMode
              ? "text-3xl bg-indigo-600 px-2 py-4 rounded-md"
              : "text-3xl bg-blue-300 px-2 py-4 rounded-md"
          }`}
        >
          Book Cabin
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          isDarkMode
            ? "px-2 py-7 bg-gray-800 rounded-md space-y-4"
            : "px-6 py-6 bg-gray-200 rounded-md space-y-4"
        }`}
      >
        {/* Cabin Selector */}

        <div
          className={`${
            isDarkMode
              ? "mb-8 flex gap-24 items-center border-b border-b-gray-700 pb-4"
              : "mb-8 flex gap-24 items-center border-b border-b-gray-300 pb-4"
          }`}
        >
          <label
            htmlFor="cabinId"
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Select Cabin
          </label>
          <Controller
            name="cabinId"
            control={control}
            // rules={bookingValidation.cabinId}
            render={({ field }) => (
              <Select {...field} options={cabinOptions} disabled={isCreating} />
            )}
          />
        </div>

        <div className=" w-full flex flex-col gap-5 mb-4 items-center xl:flex xl:flex-row xl:gap-24 xl:mb-4 xl:items-center">
          <label
            htmlFor="cabinId"
            className={`transition-colors duration-500 ${
              isDarkMode
                ? "xl:basis-40 text-gray-200"
                : "xl:basis-40 text-gray-900"
            }`}
          >
            Check in - Check out dates
          </label>
          <Controller
            name="startDate"
            id="startDate"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <Controller
            name="endDate"
            id="endDate"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <DayPicker
            mode="range"
            className={`transition-colors duration-500 ${
              isDarkMode
                ? "shadow-xl  shadow-black mb-8"
                : "border border-gray-300 shadow-xl mb-8"
            }`}
            modifiers={{ booked: bookedDatesForCabin }}
            // modifiersStyles={modifiersStylesDatePicker.create}
            onDayClick={handleDayClick}
            selected={range}
            onSelect={(range) => {
              setRange(range);
              setValue(
                "startDate",
                range?.from ? format(range?.from, "yyyy-MM-dd") : ""
              );
              setValue(
                "endDate",
                range?.to ? format(range?.to, "yyyy-MM-dd") : ""
              );
            }}
            // footer={<FooterDatePicker range={range} />}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Number of Nights
          </label>
          <input
            type="text"
            value={numNightsInput}
            className={`${
              isDarkMode
                ? "input bg-gray-900 border-gray-700"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Guest Name
          </label>
          <Controller
            name="guestId"
            control={control}
            // rules={bookingValidation.guestId}
            render={({ field }) => (
              <Select {...field} options={guestOptions} disabled={isCreating} />
            )}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Price
          </label>
          <input
            type="text"
            disabled
            value={formatCurrency(cabinPriceInput)}
            className={`${
              isDarkMode
                ? "input bg-gray-900 border-gray-700"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Discount
          </label>
          <input
            type="text"
            disabled
            value={formatCurrency(discountInput)}
            className={`${
              isDarkMode
                ? "input bg-gray-900 border-gray-700"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Extra Price
          </label>
          <input
            type="text"
            disabled
            value={formatCurrency(extrasPriceInput)}
            className={`${
              isDarkMode
                ? "input bg-gray-900 border-gray-700"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2 xl:gap-24 items-center">
          <label
            className={`transition-colors duration-500 ${
              isDarkMode ? "basis-40 text-gray-200" : "basis-40 text-gray-900"
            }`}
          >
            Total Price
          </label>
          <input
            type="text"
            disabled
            value={formatCurrency(totalPriceInput)}
            className={`${
              isDarkMode
                ? "input bg-gray-900 border-gray-700"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="hasBreakfast"
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center gap-2">
                <input
                  id="hasBreakfast"
                  disabled={isCreating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  type="checkbox"
                  className="min-w-[15px] min-h-[20px] "
                />
                <p> Includes breakfast?</p>
              </div>
            )}
          />
        </div>
        <div>
          {/* <Controller
            control={control}
            name="hasBreakfast"
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center gap-2">
                <input
                  id="isPaid"
                  disabled={isCreating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  type="checkbox"
                  className="min-w-[15px] min-h-[20px]  "
                />
                <p> Was Paid?</p>
              </div>
            )}
          /> */}

          <div className="flex gap-4 justify-end">
            <button
              type="reset"
              onClick={handleReset}
              className={`transition-colors duration-500 ${
                isDarkMode
                  ? "border text-gray-100 rounded-lg hover:bg-gray-400 border-gray-300 px-3 py-2"
                  : "border text-gray-500 rounded-lg hover:bg-gray-200 border-gray-300 px-3 py-2"
              }`}
            >
              Cancel
            </button>

            <button
              disabled={isCreating}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
            >
              Create Cabin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
