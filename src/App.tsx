import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContextProvider, AuthContext } from '@/context/AuthContextProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Login, Signup } from '@/pages'
import Dashboard from '@/components/dashboard/Dashboard'

const Protected = () => {
	const { authenticated } = useContext(AuthContext)

	if (!authenticated) return <Navigate to="/login" replace />

	return <Outlet />
}

const App = () => {
	return (
		<AuthContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route element={<Protected />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</Router>
		</AuthContextProvider>
	)
}

export default App
