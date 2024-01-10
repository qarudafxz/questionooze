/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useMedia } from '@/hooks/useMedia'
import { useToggle } from '@/store/toggle'

interface DescriptionCounterProps {
	description: string
}

const DescriptionCounter: React.FC<DescriptionCounterProps> = ({
	description
}): React.ReactElement => {
	const isMobile = useMedia('(max-width: 640px)')
	const { theme } = useToggle()
	const maximumText = 255
	const [textCounter, setTextCounter] = useState(maximumText)

	const handleCount = () => {
		const currentTextCount = maximumText - description.length
		if (currentTextCount > -1) {
			setTextCounter(currentTextCount)
		}
	}

	useEffect(() => {
		handleCount()
	}, [description])

	return (
		<div
			className={`absolute border border-zinc-100 px-2 py-1 rounded-md shadow-xl ${
				isMobile ? 'top-[228px] left-[190px]' : 'top-[250px] left-[420px]'
			} ${theme === 'light' && 'bg-dark'}`}
		>
			<h1
				className={` ${
					textCounter > 50
						? 'text-green-500'
						: textCounter >= 11 && textCounter < 50
						? 'text-yellow-500'
						: 'text-red-500'
				}`}
			>
				{textCounter}
			</h1>
		</div>
	)
}

export default DescriptionCounter
