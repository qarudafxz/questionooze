import { create } from 'zustand'

interface UseToggleProps {
	theme: 'light' | 'dark'
	setTheme: (theme: 'light' | 'dark') => void
	isCreate: boolean
	setIsCreate: (isCreate: boolean) => void
}

export const useToggle = create<UseToggleProps>(set => {
	const initialTheme =
		(localStorage.getItem('theme') as 'light' | 'dark') || 'light'

	return {
		theme: initialTheme,
		setTheme: theme => {
			set({ theme })
			localStorage.setItem('theme', theme)
		},
		isCreate: false,
		setIsCreate: isCreate => set({ isCreate })
	}
})
