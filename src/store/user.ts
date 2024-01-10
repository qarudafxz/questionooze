import { create } from 'zustand'

interface User {
	first_name: string
	last_name: string
	user_id: string
}

interface useUserStore {
	user: User
	setUser: (user: User) => void
}

export const useUserStore = create<useUserStore>(set => ({
	user: {
		first_name: '',
		last_name: '',
		user_id: ''
	},
	setUser: user => set({ user })
}))
