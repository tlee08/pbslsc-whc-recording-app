import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type ResultsStructure from "../models/ResultsStructure";

type ResultsState = {
  results: ResultsStructure;
  setResults: (data: ResultsStructure) => void;
  setResultsForScope: (
    meetingId: string,
    event: string,
    gender: string,
    items: string[],
  ) => void;
  reset: () => void;
};

export const useResultsStore = create<ResultsState>()(
  persist(
    (set) => ({
      results: {},
      setResults: (data) => set({ results: data }),
      setResultsForScope: (meetingId, event, gender, items) =>
        set((state) => ({
          results: {
            ...state.results,
            [meetingId]: {
              ...state.results[meetingId],
              [event]: {
                ...(state.results[meetingId]?.[event] ?? {}),
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
