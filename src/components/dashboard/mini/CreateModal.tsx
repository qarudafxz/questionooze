import React from 'react'
import { useToggle } from '@/store/toggle'

const CreateModal: React.FC = () => {
	const { isCreate } = useToggle()
	return <>{isCreate}</>
}

export default CreateModal
