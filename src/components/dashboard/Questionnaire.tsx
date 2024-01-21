/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-semi */
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
import { build } from '@/utils/build'
import { formatter } from '@/libs/generatedQuestionFormatter'
import StreamingFormattedQuestions from './mini/StreamingFormattedQuestions'
import { addGeneratedQuestionToQuestionnaire } from '@/api/main'
import { FiEdit } from 'react-icons/fi'
import { useSession } from '@/hooks/useSession'

const Questionnaire: React.FC = () => {
	const token = useSession()
	const { generatedQuestion, setGeneratedQuestion } = useQuestionnaireStore()
	const location = useLocation()
	const { id } = location.state as { id: string }
	const { theme } = useToggle()
	const { questions } = useQuestionnaireStore()
	const isMobile = useMedia('(max-width: 640px)')
	const [question, setQuestion] = useState<Questionnaire>()
	const [extractedPdf, setExtractedPdf] = useState<string>('')
	const [editQuestions, setEditQuestions] = useState(false)
	const formattedQuestions = formatter(generatedQuestion)

	const extractPdf = async () => {
		try {
			const response = await fetch(
				build(`/pdf-parse/?url=${question?.file_path}`),
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token?.token}`
					}
				}
			)

			const data = await response.json()

			if (typeof data.context === 'string') {
				console.log('Extracted content from PDF: ', data.context)
				return data.context
			}

			return null
		} catch (err) {
			console.error(err)
			return null
		}
	}

	useEffect(() => {
		const getQuestions = async () => {
			const res = await getSpecificQuestionnaire(id)
			setQuestion(res?.data[0])
		}

		if (id) getQuestions()
	}, [id])

	useEffect(() => {
		if (question?.file_path)
			extractPdf().then(data => {
				setExtractedPdf(data as string)
			})
	}, [question?.file_path])

	useEffect(() => {
		const update = async () => {
			await addGeneratedQuestionToQuestionnaire(
				id,
				extractedPdf,
				formattedQuestions
			)
		}
		if (formattedQuestions && extractedPdf) update()
	}, [formattedQuestions, extractedPdf, id])

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
							<ConfigPanel extracted={extractedPdf} />
						</div>
						{/* For pdf/ppt preview */}
						<div className="col-span-5">
							<PDFPPTViewer pdf_ppt={question?.file_path} />
						</div>
						{/* For generated questions */}
						<div className="col-span-3 h-screen overflow-y-auto bg-">
							<div className={`${theme === 'dark' ? 'bg-white' : ''} p-4 rounded-md`}>
								<div className="flex justify-between items-center mb-4">
									<h1
										className={`font-bold font-head ${isMobile ? 'text-md' : 'text-xl'}`}
									>
										Generated Questions
									</h1>
									<button onClick={() => setEditQuestions(!editQuestions)}>
										<FiEdit />
									</button>
								</div>

								{!editQuestions && generatedQuestion ? (
									<StreamingFormattedQuestions formattedQuestions={formattedQuestions} />
								) : (
									<textarea
										readOnly={!editQuestions}
										className="w-full h-screen"
										defaultValue={formattedQuestions}
										onChange={e => setGeneratedQuestion(e.target.value)}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Questionnaire
