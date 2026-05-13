import { create } from "zustand";

export type AppError = {
  id: number;
  title: string;
  message: string;
};

type ErrorState = {
  errors: AppError[];
  addError: (title: string, message: string) => void;
  dismissError: (id: number) => void;
};

let nextId = 0;

export const useErrorStore = create<ErrorState>()((set) => ({
  errors: [],
  addError: (title, message) =>
    set((state) => ({
      errors: [...state.errors, { id: ++nextId, title, message }],
    })),
  dismissError: (id) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    })),
}));
