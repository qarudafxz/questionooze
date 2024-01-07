import { create } from 'zustand'

interface UseToggleProps {
	theme: string
	setTheme: (theme: string) => void
}

export const useToggle = create<UseToggleProps>(set => ({
	theme: 'light',
	setTheme: theme => set({ theme })
}))
