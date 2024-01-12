import React from 'react'
import { useMedia } from '@/hooks/useMedia'
import { useToggle } from '@/store/toggle'

type Props = {
	index: number
}

const HorizontalSteps: React.FC<Props> = ({ index }) => {
	const { theme } = useToggle()
	const isMobile = useMedia('(max-width: 640px)')
	const steps = [
		'Input number of questions',
		'Select category in Blooms',
		'Generate questions'
	]
	return (
		<div className="font-main flex gap-10 items-center justify-center ">
			{steps.map((step, i) => (
				<div key={i} className="flex gap-4 items-center">
					<div className="flex flex-col gap-4">
						<div
							className={`${
								i <= index ? `bg-mid text-white` : 'bg-zinc-400 text-zinc-700'
							} duration-150 h-10 w-10 rounded-full flex justify-center items-center font-bold`}
						>
							<h1>{i + 1}</h1>
						</div>
						<h1
							className={`${
								i <= index
									? `${theme === 'light' ? 'text-docs' : 'text-white'}`
									: 'text-zinc-400'
							} duration-150 ${isMobile ? 'text-[9px]' : 'text-[10px]'}`}
						>
							{step}
						</h1>
					</div>
					{i !== steps.length - 1 && (
						<div className="h-[0.2px] w-10 bg-zinc-400"></div>
					)}
				</div>
			))}
		</div>
	)
}

export default HorizontalSteps
