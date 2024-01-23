import React from 'react'
import adrian_l from '@/assets/authors/light/adrian.png'
import adrian_d from '@/assets/authors/dark/adrian.png'
import hans_l from '@/assets/authors/light/hans.png'
import hans_d from '@/assets/authors/dark/hans.png'
import yul_l from '@/assets/authors/light/yul.png'
import yul_d from '@/assets/authors/dark/yul.png'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'

interface Props {
	idx: number
	name: string
}

const Authors: React.FC<Props> = ({ idx, name }) => {
	const isMobile = useMedia('(max-width: 640px)')
	const { theme } = useToggle()
	return (
		<div
			key={idx}
			className="flex flex-col items-center justify-center place-content-center place-items-center gap-4"
		>
			{/* Dynamic changing of images of the authors*/}
			<img
				src={
					theme === 'light'
						? name === 'Adrian M. Solen'
							? adrian_d
							: name === 'Hans Ira P. Yap'
							? hans_d
							: yul_d
						: name === 'Adrian M. Solen'
						? adrian_l
						: name === 'Hans Ira P. Yap'
						? hans_l
						: yul_l
				}
				className={`${isMobile ? 'w-10 h-10' : 'w-24 h-24'} rounded-full`}
			/>
			<h1
				className={`${theme === 'light' ? 'text-white' : 'text-docs'} ${
					isMobile ? 'text-[10px]' : 'text-md'
				}`}
			>
				{name}
			</h1>
		</div>
	)
}

export default Authors
