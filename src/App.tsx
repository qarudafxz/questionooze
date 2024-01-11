import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContextProvider, AuthContext } from '@/context/AuthContextProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Login, Signup } from '@/pages'
import Dashboard from '@/components/dashboard/Dashboard'
import Questionnaire from '@/components/dashboard/Questionnaire'

const Protected = () => {
	const { authenticated } = useContext(AuthContext)

	if (!authenticated) {
		setTimeout(() => {
			return <Navigate to="/login" replace />
		}, 1200)
	}

	return <Outlet />
}

const App = () => {
	return (
		<AuthContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route element={<Protected />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/dashboard/questionnaire/:id" element={<Questionnaire />} />
					</Route>
				</Routes>
			</Router>
		</AuthContextProvider>
	)
}

export default App
