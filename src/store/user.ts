import { create } from 'zustand'

interface User {
	first_name: string
	last_name: string
}

interface useUserStore {
	user: User
	setUser: (user: User) => void
}

export const useUserStore = create<useUserStore>(set => ({
	user: {
		first_name: '',
		last_name: ''
	},
	setUser: user => set({ user })
}))
