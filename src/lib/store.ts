import { create } from 'zustand'

import type { AppStore } from '@/types'

export const useAppStore = create<AppStore>((set) => ({
  alert: null,
  setAlert: (alert) => set({ alert }),
}))
