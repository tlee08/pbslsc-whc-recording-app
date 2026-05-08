import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type EventStructure from "../models/EventStructure";

type EventStructureState = {
  eventStructure: EventStructure;
  setEventStructure: (data: EventStructure) => void;
  reset: () => void;
};

export const useEventStructureStore = create<EventStructureState>()(
  persist(
    (set) => ({
      eventStructure: { dates: [] },
      setEventStructure: (data) => set({ eventStructure: data }),
      reset: () => set({ eventStructure: { dates: [] } }),
    }),
    {
      name: "eventStructure",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
