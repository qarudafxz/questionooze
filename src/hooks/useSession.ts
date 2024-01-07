import { useState, useEffect } from 'react'

export const useSession = () => {
	const [token, setToken] = useState('')

	const getToken = (): string => {
		try {
			const sessionValue = localStorage.getItem(import.meta.env.VITE_SESSION_KEY)
			const value = JSON.parse(sessionValue || '{}')
			setToken(value.access_token || '')
			return value.access_token || ''
		} catch (error) {
			console.error('Error while retrieving token:', error)
			return ''
		}
	}

	useEffect(() => {
		getToken()
	}, [])

	return { token }
}
