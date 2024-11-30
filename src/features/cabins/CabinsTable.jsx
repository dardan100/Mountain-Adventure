import React from "react";
import useCabins from "./useCabins";
import CabinItem from "./CabinItem";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CabinsTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const getParams = searchParams.get("discount") || "all";
  const { isDarkMode } = useDarkMode();

  if (isLoading) return <Spinner />;
  let filterCabins;
  if (getParams === "all") filterCabins = cabins;
  if (getParams === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (getParams === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "mt-10 font-medium text-gray-600 uppercase rounded-sm"
          : "mt-10 font-medium text-gray-600 uppercase bg-white border-gray-200   rounded-sm"
      }`}
    >
      <section
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "hidden bg-gray-800 xl:grid xl:grid-cols-[1.5fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] xl:px-4 xl:gap-4 xl:items-center md:grid md:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:px-4 py-4 md:gap-4 md:items-center text-gray-200"
            : "hidden bg-gray-300 xl:grid xl:grid-cols-[1.5fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] xl:px-4 xl:gap-4 xl:items-center md:grid md:grid-cols-[1.3fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:px-4 py-4 md:gap-4 md:items-center"
        }`}
      >
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </section>
      {sortedCabins.map((cabin) => (
        <CabinItem cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
