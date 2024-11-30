import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useDeleteCabins() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
  return { deleteCabin, isLoading };
}
