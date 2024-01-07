import React from 'react'
import { Navigate } from 'react-router-dom'
import Nav from './mini/Nav'
import { useSession } from '@/hooks/useSession'

const Dashboard: React.FC = () => {
	const { token } = useSession()

	return (
		<div className="font-main">
			<div className="">
				{/* Navbar */}
				<Nav />
				{/* Content */}
			</div>
		</div>
	)
}

export default Dashboard
