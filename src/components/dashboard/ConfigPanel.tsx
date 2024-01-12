import React, { useState, useEffect } from 'react'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import HorizontalSteps from './mini/HorizontalSteps'
import { motion } from 'framer-motion'
import Slider from '@mui/material/Slider'

const ConfigPanel: React.FC = () => {
	const [active, setActive] = useState(0)
	const { theme } = useToggle()
	const isMobile = useMedia('(max-width: 640px)')
	const [configuration, setConfiguration] = useState({
		numberOfQuestions: 0,
		category: [],
		typeOfQuestion: [],
		difficulty: ''
	})

	useEffect(() => {
		if (configuration?.numberOfQuestions > 0) setActive(1)
		else if (
			configuration?.category.length > 0 &&
			configuration?.typeOfQuestion?.length > 0
		)
			setActive(2)
		else if (configuration?.difficulty !== '') setActive(3)
		else setActive(0)
	}, [configuration])

	return (
		<div className="flex flex-col gap-4">
			<h1
				className={`font-head font-bold ${isMobile ? 'text-xl' : 'text-2xl'} ${
					theme === 'light' ? 'text-mid' : 'text-white'
				} mb-7`}
			>
				Configure your{' '}
				<span className={`${theme === 'dark' ? 'text-mid' : 'text-docs'}`}>AI</span>
				-generated questionnaire
			</h1>
			<HorizontalSteps index={active} />
			<div className="mt-4 flex flex-col gap-2">
				<h1
					className={`font-head font-semibold ${isMobile ? 'text-lg' : 'text-xl'} ${
						theme === 'light' ? 'text-docs' : 'text-zinc-300'
					}`}
				>
					Slide to select number of questions
				</h1>

				<div
					className={`w-full ${
						theme === 'light' ? 'bg-zinc-300' : 'bg-[#090c15]'
					} pt-2 px-8 rounded-md`}
				>
					<Slider
						onChange={e =>
							setConfiguration({
								...configuration,
								numberOfQuestions: parseInt((e?.target as HTMLInputElement)?.value)
							})
						}
						defaultValue={0}
						aria-label="Default"
						valueLabelDisplay="auto"
						color="secondary"
					/>
				</div>
			</div>
			{active >= 1 && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className={`${
						theme === 'light' ? 'bg-dark text-white' : 'bg-zinc-700 text-zinc-300'
					} rounded-lg p-4`}
				>
					<h1
						className={`font-head font-semibold ${isMobile ? 'text-lg' : 'text-xl'} ${
							theme === 'light' ? 'bg-docs text-white' : 'bg-zinc-650 text-zinc-300'
						}`}
					>
						Category
					</h1>
					{/* Blooms */}
					<div className="grid grid-cols-4"></div>
					{/* Type of questionnaire ["Multiple choice", "Fill in the blanks", "True or False", "Situational"] */}
					<div className="mt-4">
						<h1>Type of Question</h1>
					</div>
				</motion.div>
			)}
		</div>
	)
}

export default ConfigPanel
