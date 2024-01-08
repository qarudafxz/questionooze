import React from 'react'
import Nav from './mini/Nav'
import UserDetails from './mini/UserDetails'
import { useToggle } from '@/store/toggle'

const Dashboard: React.FC = () => {
	const { theme } = useToggle()

	return (
		<div className={`${theme === 'light' ? 'bg-white' : 'bg-dark'}`}>
			<div className="">
				{/* Navbar */}
				<Nav />
				{/* Content */}
				<div className="flex flex-col gap-4">
					<UserDetails />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
