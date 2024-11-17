"use client";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  createStore as zustandCreateStore,
  StoreApi as ZustandStoreApi,
  useStore as useZustandStore,
} from "zustand";

type StoresStore = {
  userStores: Store[];
  selectedStore: Store | null;
  setSelectedStore: (store: Store) => void;
};

const StoresContext = createContext<ZustandStoreApi<StoresStore> | undefined>(
  undefined
);

type StoresProviderProps = PropsWithChildren & {
  initialStores: [];
  selectedStore: Store | null;
};

export default function StoresProvider({
  children,
  initialStores,
}: StoresProviderProps) {
  const queryClient = new QueryClient();

  const initialData = queryClient.getQueryData<Store[]>(["stores"]);
  const userStores = initialData ? initialData : initialStores;
  const initialSelectedStore = userStores[0] || null;

  const [store] = useState(() =>
    zustandCreateStore<StoresStore>((set) => ({
      userStores,
      selectedStore: initialSelectedStore,
      setSelectedStore: (userSelectedStore: Store) =>
        set(() => ({ selectedStore: userSelectedStore })),
    }))
  );

  return (
    <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
  );
}

export function useStores<T>(selector: (state: StoresStore) => T) {
  const context = useContext(StoresContext);

  if (!context) {
    throw new Error("StoresContext.Provider is missing");
  }

  return useZustandStore(context, selector);
}
