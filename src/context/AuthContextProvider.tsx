import { createContext, ReactNode, useState, useEffect } from 'react'
import { useSession } from '@/hooks/useSession'

type Props = {
	children: ReactNode
}

type IAuthContext = {
	authenticated: boolean
	setAuthenticated: (newState: boolean) => void
}

const initial: IAuthContext = {
	authenticated: false,
	setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initial)

const AuthContextProvider = ({ children }: Props) => {
	const { token } = useSession()
	const [authenticated, setAuthenticated] = useState(initial.authenticated)

	useEffect(() => {
		if (token) {
			setAuthenticated(true)
		}
	}, [token])

	return (
		<AuthContext.Provider value={{ authenticated, setAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider, AuthContext }
