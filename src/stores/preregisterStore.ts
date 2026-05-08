import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type Member from "../models/Member";

function dedupeAndSort(items: Member[]): Member[] {
  return items
    .filter((i, idx, self) => idx === self.findIndex((j) => j.id === i.id))
    .sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
}

type PreregisterState = {
  preregisterState: Member[];
  setPreregisterState: (items: Member[]) => void;
  addPreregisterItem: (item: Member | null) => void;
  removePreregisterItem: (index: number) => void;
  bulkAddPreregisterItems: (items: (Member | null)[]) => void;
  reset: () => void;
};

export const usePreregisterStore = create<PreregisterState>()(
  persist(
    (set, get) => ({
      preregisterState: [],
      setPreregisterState: (items) => set({ preregisterState: items }),
      addPreregisterItem: (item) => {
        if (!item) return;
        set({
          preregisterState: dedupeAndSort([...get().preregisterState, item]),
        });
      },
      removePreregisterItem: (index) => {
        set((state) => ({
          preregisterState: state.preregisterState.filter(
            (_, i) => i !== index,
          ),
        }));
      },
      bulkAddPreregisterItems: (items) => {
        const validItems = items.filter((i): i is Member => i != null);
        set({
          preregisterState: dedupeAndSort([
            ...get().preregisterState,
            ...validItems,
          ]),
        });
      },
      reset: () => set({ preregisterState: [] }),
    }),
    {
      name: "preregister",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
