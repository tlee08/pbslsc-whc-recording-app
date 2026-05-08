import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type MemberShort from "../models/MemberShort";
import type ResultsStructure from "../models/ResultsStructure";

type ResultsState = {
  results: ResultsStructure;
  setResults: (data: ResultsStructure) => void;
  setResultsForScope: (
    date: string,
    event: string,
    gender: string,
    items: MemberShort[],
  ) => void;
  reset: () => void;
};

export const useResultsStore = create<ResultsState>()(
  persist(
    (set) => ({
      results: {},
      setResults: (data) => set({ results: data }),
      setResultsForScope: (date, event, gender, items) =>
        set((state) => ({
          results: {
            ...state.results,
            [date]: {
              ...state.results[date],
              [event]: {
                ...(state.results[date]?.[event] ?? {}),
                [gender]: items,
              },
            },
          },
        })),
      reset: () => set({ results: {} }),
    }),
    {
      name: "results",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
