import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const queryClient = useQueryClient();

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { bookings, isLoading, error, count };
}
