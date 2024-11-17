import { api } from "@/stores/user-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function createStore(store: CreateStore) {
  try {
    const res = await api.post("/stores", store);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export function useCreateStore({
  onError,
  onSuccess,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-store"],
    mutationFn: createStore,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.refetchQueries({
        queryKey: ["stores"],
      });
    },
    onError: () => {
      onError && onError();
    },
  });
  return mutation;
}
