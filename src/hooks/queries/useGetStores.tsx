import React from "react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/stores/user-store";

async function getUserStores(): Promise<GetStoresResponse> {
  const res = await api.get("/stores");
  return res.data;
}

export default function useGetStores() {
  const query = useQuery({
    queryKey: ["stores"],
    queryFn: getUserStores,
  });
  return query;
}
