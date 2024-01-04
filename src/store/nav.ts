/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface useNavStore {
	navReference: any
	setNavReference: (navReference: any) => void
}

export const useNavStore = create<useNavStore>(set => ({
	navReference: null,
	setNavReference: navReference => set({ navReference })
}))
