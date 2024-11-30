import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Succfully deleted booking");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  return { deleteBooking, isLoading };
}
