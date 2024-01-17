import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import { useQuestionnaireStore } from '@/store/questions'
import Nav from './mini/Nav'
import UserDetails from './mini/UserDetails'
import { getSpecificQuestionnaire } from '@/api/main'
import { Questionnaire } from '@/types/global'
import ConfigPanel from './ConfigPanel'
import PDFPPTViewer from './mini/PDFPPTViewer'

const Questionnaire: React.FC = () => {
	const location = useLocation()
	const { id } = location.state as { id: string }
	const { theme } = useToggle()
	const { questions } = useQuestionnaireStore()
	const isMobile = useMedia('(max-width: 640px)')
	const [question, setQuestion] = useState<Questionnaire>()

	useEffect(() => {
		const getQuestions = async () => {
			const res = await getSpecificQuestionnaire(id)
			setQuestion(res?.data[0])
		}

		if (id) getQuestions()
	}, [id])

	return (
		<div
			className={`${theme === 'light' ? 'bg-white' : 'bg-dark'} w-full`}
			style={{
				minHeight: '130vh'
			}}
		>
			<div className="">
				<Nav questions={questions} />
				<div className="flex flex-col gap-4">
					<UserDetails
						label={question?.title ?? ''}
						description={question?.description ?? ''}
					/>
					<div
						className={`${
							isMobile
								? 'px-10 flex flex-col gap-4'
								: 'pl-44 pr-20 grid grid-cols-11 gap-5'
						} mt-4`}
					>
						{/* For Generation */}
						<div className="col-span-3">
							<ConfigPanel />
						</div>
						{/* For pdf/ppt preview */}
						<div className="col-span-5">
							<PDFPPTViewer pdf_ppt={question?.file_path} />
						</div>
						{/* For generated questions */}
						<div className="col-span-3">
							<div className={`${theme === 'dark' ? 'bg-white' : ''} p-4 rounded-md`}>
								<h1
									className={`font-bold font-head ${isMobile ? 'text-xl' : 'text-2xl'}`}
								>
									Generated Questions
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Questionnaire
