import React from 'react'
import { useMedia } from '@/hooks/useMedia'

const Landing: React.FC = () => {
	const isMobile = useMedia('(max-width: 640px)')
	return <>{isMobile ? <div>Mobile</div> : <div>Desktop</div>}</>
}

export default Landing
