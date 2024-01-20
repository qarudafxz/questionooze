/* eslint-disable no-dupe-else-if */
//eslint-disable-next-line
//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import HorizontalSteps from './mini/HorizontalSteps'
import { AnimatePresence, motion } from 'framer-motion'
import data from '@/data/blooms_taxonomy.json'
import { Checkbox, Slider } from '@mui/material'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { build } from '@/utils/build'
import { useQuestionnaireStore } from '@/store/questions'
import { useSession } from '@/hooks/useSession'
import { toast, Toaster } from 'sonner'

interface Props {
	extracted: string | null
}

const ConfigPanel: React.FC<Props> = ({ extracted }) => {
	const { setGeneratedQuestion } = useQuestionnaireStore()
	const [active, setActive] = useState(0)
	const { theme } = useToggle()
	const isMobile = useMedia('(max-width: 640px)')
	const token = useSession()
	const [configuration, setConfiguration] = useState({
		numberOfQuestions: 0,
		category: [],
		typeOfQuestion: []
	})

	const [loading, setLoading] = useState(false)

	const typeOfQuestion = [
		'Multiple choice',
		'Fill in the blanks',
		'True or False',
		'Situational'
	]

	const handleGenerateQuestionnaire = async () => {
		try {
			setLoading(true)

			await fetch(build('/question-generator'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					config: { ...configuration },
					context: extracted
				})
			}).then(async res => {
				const data = await res.json()

				if (!res.status === 200) {
					throw new Error(data?.message || 'An error occured')
				}

				setGeneratedQuestion(data?.content)
				toast.success('Questions generated successfully')
			})
		} catch (err) {
			toast.error(err.message)
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const { numberOfQuestions, category, typeOfQuestion } = configuration || {}

		if (
			category.length > 0 &&
			typeOfQuestion.length > 0 &&
			numberOfQuestions > 0
		) {
			setActive(3)
		} else if (category.length > 0 && typeOfQuestion.length > 0) {
			setActive(2)
		} else if (numberOfQuestions > 0) {
			setActive(1)
		} else {
			setActive(0)
		}
	}, [configuration])

	return (
		<div className="flex flex-col gap-4">
			<Toaster position="top-center" />
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
						max={20}
						aria-label="Default"
						valueLabelDisplay="auto"
						color="secondary"
					/>
				</div>
			</div>
			<AnimatePresence>
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
							className={`font-head font-semibold ${
								isMobile ? 'text-lg' : 'text-xl'
							} ${
								theme === 'light' ? 'bg-docs text-white' : 'bg-zinc-650 text-zinc-300'
							}`}
						>
							Category
						</h1>
						{/* Blooms */}
						<div className={`grid  ${isMobile ? 'grid-cols-2' : 'grid-cols-2'}`}>
							{data?.map((item, index) => {
								return (
									<div key={index} className="flex items-center gap-2">
										<Checkbox
											onChange={e => {
												if (e?.target?.checked) {
													setConfiguration({
														...configuration,
														category: [
															...((configuration?.category || []) as string[]),
															item?.category || ''
														]
													})
												} else {
													setConfiguration({
														...configuration,
														category: configuration?.category?.filter(
															(i: string) => i !== item?.category
														)
													})
												}
											}}
											inputProps={{ 'aria-label': 'controlled' }}
										/>
										<h1 className="font-head text-[10px]">{item?.category}</h1>
									</div>
								)
							})}
						</div>
						<div className="mt-4">
							<h1 className="font-head font-bold">Type of Question</h1>
							<div className="grid grid-cols-2">
								{typeOfQuestion?.map((item, index) => {
									return (
										<div key={index} className="flex items-center gap-2">
											<Checkbox
												onChange={e => {
													if (e?.target?.checked) {
														setConfiguration({
															...configuration,
															typeOfQuestion: [
																...((configuration?.typeOfQuestion || []) as string[]),
																item as string
															]
														})
													} else {
														setConfiguration({
															...configuration,
															typeOfQuestion: configuration?.typeOfQuestion?.filter(
																(i: string) => i !== item
															)
														})
													}
												}}
												inputProps={{ 'aria-label': 'controlled' }}
											/>
											<h1 className="font-head text-[10px]">{item}</h1>
										</div>
									)
								})}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{active >= 3 && (
					<motion.button
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						onClick={e => handleGenerateQuestionnaire(e)}
						className={`bg-mid text-white py-2 rounded-md text-center font-bold w-full ${
							loading &&
							'flex gap-4 place-items-center justify-center bg-[#9068ff] opacity-5'
						}`}
					>
						{loading ? (
							<>
								<motion.div
									animate={{
										rotate: 360
									}}
									transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
								>
									<AiOutlineLoading3Quarters size={15} />
								</motion.div>
								Generating questions
							</>
						) : (
							'Generate Questions'
						)}
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ConfigPanel
