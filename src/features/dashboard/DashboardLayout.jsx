import React from "react";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useBookings } from "../bookings/useBookings";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import { useRecentBookings } from "./useRecentBookings";
import SalesChart from "./SalesChart";

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <>
      <div className="grid gap-10">
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins.length}
        />
        <div className="xl:grid xl:grid-cols-[1fr_1fr] xl:gap-4">
          <TodayActivity />

          <DurationChart confirmedStays={confirmedStays} />
          <SalesChart bookings={bookings} numDays={numDays} />
        </div>
      </div>
    </>
  );
}
