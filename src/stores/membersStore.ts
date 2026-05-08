import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type Member from '../models/Member'

type MembersState = {
  members: Member[]
  setMembers: (data: Member[]) => void
  reset: () => void
}

export const useMembersStore = create<MembersState>()(
  persist(
    (set) => ({
      members: [],
      setMembers: (data) => set({ members: data }),
      reset: () => set({ members: [] }),
    }),
    {
      name: 'members',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
