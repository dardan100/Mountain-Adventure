import React from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constans";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex mt-4 justify-between items-center ">
      <p>
        Showing
        <span className="font-bold">
          {" "}
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : PAGE_SIZE * currentPage}
        </span>{" "}
        of <span className="font-bold">{count} </span>
        results
      </p>

      <div className="flex xl:gap-10">
        <button
          className={`flex focus:outline-none focus:ring focus:ring-blue-400 mx-2 bg-gray-0 px-2  rounded-lg hover:bg-blue-600 hover:text-white items-center justify-center ${
            currentPage === 1 && "hover:bg-red-600"
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button
          className={`flex focus:outline-none focus:ring focus:ring-blue-400 mx-2 bg-gray-0 px-2  rounded-lg hover:bg-blue-600 hover:text-white items-center justify-center ${
            currentPage === pageCount && "hover:bg-red-600"
          }`}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
