import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CatState = {
  date: string
  event: string
  gender: string
  setDate: (value: string) => void
  setEvent: (value: string) => void
  setGender: (value: string) => void
  reset: () => void
}

export const useCatStore = create<CatState>()(
  persist(
    (set) => ({
      date: '',
      event: '',
      gender: '',
      setDate: (value) => set({ date: value, event: '', gender: '' }),
      setEvent: (value) => set({ event: value, gender: '' }),
      setGender: (value) => set({ gender: value }),
      reset: () => set({ date: '', event: '', gender: '' }),
    }),
    {
      name: 'cat',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
