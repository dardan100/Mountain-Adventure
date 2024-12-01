// import React from "react";
// import Stat from "./Stat";
// import {
//   HiCurrencyEuro,
//   HiOutlineBriefcase,
//   HiOutlineCalendar,
//   HiOutlineChartBar,
// } from "react-icons/hi2";
// import { formatCurrency } from "../../utils/helpers";

// export default function Stats() {
//   return (
//     <div className="w-full flex flex-col md:flex-row gap-4 md:gap-4 xl:gap-10 mt-6">
//       <Stat
//         icon={<HiOutlineBriefcase />}
//         color="text-blue-700"
//         bgColor="bg-blue-100"
//         value={20}
//         title="bookings"
//       />
//       <Stat
//         icon={<HiCurrencyEuro />}
//         color="text-green-500"
//         bgColor="bg-green-200"
//         value={formatCurrency(20)}
//         title="sales"
//       />
//       <Stat
//         icon={<HiOutlineCalendar />}
//         color="text-indigo-700"
//         bgColor="bg-indigo-200"
//         value={20}
//         title="check ins"
//       />
//       <Stat
//         icon={<HiOutlineChartBar />}
//         color="text-yellow-700"
//         bgColor="bg-yellow-200"
//         value={20}
//         title="Occupations"
//       />
//     </div>
//   );
// }

import React from "react";
import Stat from "./Stat";
import {
  HiCurrencyEuro,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function Stats({
  cabinCount,
  confirmedStays,
  bookings,
  numDays,
}) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className="flex md:gap-4 items-center justify-center flex-col md:flex-row w-full">
      {/* Fixed width for uniformity */}
      <Stat
        icon={<HiOutlineBriefcase />}
        color={"text-blue-700"}
        bgColor={"bg-blue-100"}
        value={numBookings}
        title="bookings"
      />{" "}
      {/* Fixed width for uniformity */}
      <Stat
        icon={<HiCurrencyEuro />}
        color={"text-green-500"}
        bgColor={"bg-green-200"}
        value={formatCurrency(sales)}
        title="sales"
      />{" "}
      {/* Fixed width for uniformity */}
      <Stat
        icon={<HiOutlineCalendar />}
        color={"text-indigo-700"}
        bgColor={"bg-indigo-200"}
        value={checkins}
        title="checkins"
      />{" "}
      {/* Fixed width for uniformity */}
      <Stat
        icon={<HiOutlineChartBar />}
        color={"text-yellow-700"}
        bgColor={"bg-yellow-200"}
        value={Math.round(occupation * 100) + "%"}
        title="Occupations"
      />
    </div>
  );
}
