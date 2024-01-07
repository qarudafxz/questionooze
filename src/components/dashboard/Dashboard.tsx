import React from 'react'
import { useMedia } from '@/hooks/useMedia'
import Nav from './mini/Nav'

const Dashboard: React.FC = () => {
	const isMobile = useMedia('(max-width: 640px)')

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
