import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CatState = {
  meetingId: string;
  event: string;
  gender: string;
  setMeetingId: (value: string) => void;
  setEvent: (value: string) => void;
  setGender: (value: string) => void;
  reset: () => void;
};

export const useCatStore = create<CatState>()(
  persist(
    (set) => ({
      meetingId: "",
      event: "",
      gender: "",
      setMeetingId: (value) => set({ meetingId: value, event: "", gender: "" }),
      setEvent: (value) => set({ event: value, gender: "" }),
      setGender: (value) => set({ gender: value }),
      reset: () => set({ meetingId: "", event: "", gender: "" }),
    }),
    {
      name: "cat",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
