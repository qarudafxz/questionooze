import { create } from 'zustand'

interface User {
	first_name: string
	last_name: string
	email: string
}

interface useUserStore {
	user: User
	setUser: (user: User) => void
}

const useUserStore = create<useUserStore>(set => ({
	user: {
		first_name: '',
		last_name: '',
		email: ''
	},
	setUser: user => set({ user })
}))
