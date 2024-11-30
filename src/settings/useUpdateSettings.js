import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isLoading };
}
