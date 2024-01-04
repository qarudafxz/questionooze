import React from 'react'
import { Navbar } from '@/components/landing'
import { useNavStore } from '@/store/nav'

const Landing: React.FC = () => {
	const { navReference } = useNavStore()

	return (
		<div ref={navReference} className={``}>
			<Navbar />
		</div>
	)
}

export default Landing
