import { create } from "zustand";
import { devtools } from "zustand/middleware";

type RequiredStore = Pick<Store, "name" | "slug" | "description">;

interface CreateStoreState {
  store: Partial<RequiredStore>;
  setStoreName: (name: string) => void;
  setStoreSlug: (slug: string) => void;
  setStoreDescription: (description?: string) => void;
}

export const useCreateStoreStore = create<CreateStoreState>()((set) => ({
  store: {
    name: "",
    slug: "",
    description: "",
  },
  setStoreName: (name) => set((state) => ({ store: { ...state.store, name } })),
  setStoreDescription: (description) =>
    set((state) => ({ store: { ...state.store, description } })),
  setStoreSlug: (slug) => set((state) => ({ store: { ...state.store, slug } })),
}));
