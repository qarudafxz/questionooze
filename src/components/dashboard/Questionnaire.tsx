/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import { useQuestionnaireStore } from '@/store/questions'
import Nav from './mini/Nav'
import UserDetails from './mini/UserDetails'
import { getSpecificQuestionnaire } from '@/api/main'
import ConfigPanel from './ConfigPanel'
import PDFPPTViewer from './mini/PDFPPTViewer'
import { build } from '@/utils/build'
import { formatter } from '@/libs/generatedQuestionFormatter'
import StreamingFormattedQuestions from './mini/StreamingFormattedQuestions'
import { FiEdit } from 'react-icons/fi'
import { AiFillWarning } from 'react-icons/ai'
import { useSession } from '@/hooks/useSession'
import { GrDocumentDownload } from 'react-icons/gr'
import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Questionnaire } from '@/types/global'
import jsPDF from 'jspdf'
import logo from '@/assets/logo.png'

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
	const formattedQuestions = formatter(
		generatedQuestion || question?.questions || ''
	)

	const handleGeneratePDF = () => {
		const pdf = new jsPDF()

		pdf.addImage(logo, 'PNG', 20, 10, 15, 15)
		pdf.setFontSize(18)
		pdf.text('Questionnaire', 20, 50)
		pdf.setFontSize(12)
		pdf.text('Created on: ' + new Date().toLocaleDateString(), 20, 60)
		pdf.setFontSize(14)
		pdf.text('Questions:', 20, 90)

		let yPos = 100 // Initial vertical position for questions
		const pageWidth = pdf.internal.pageSize.width - 40 // Adjust for margins

		/* eslint-disable-next-line*/
		/* @ts-ignore */
		const splitTextToLines = (text, maxWidth) => {
			return pdf.splitTextToSize(text, maxWidth)
		}

		const questionSpacing = 5
		const optionSpacing = 0.5
		const additionalSpacing = 5

		const formattedQuestionsArray = formattedQuestions.split('<br>')
		formattedQuestionsArray.forEach((question, _index) => {
			const lines = splitTextToLines(question, pageWidth)
			let isFirstOption = true

			/* eslint-disable-next-line*/
			/* @ts-ignore */
			lines.forEach((line, lineIndex) => {
				if (yPos > pdf.internal.pageSize.height - 10) {
					pdf.addPage()
					yPos = 20
				}
				pdf.text(line, 20, yPos)

				if (lineIndex === 0) {
					yPos += questionSpacing
				} else {
					if (isFirstOption) {
						isFirstOption = false
						yPos += questionSpacing
					} else {
						yPos += optionSpacing
					}
				}
			})

			yPos += additionalSpacing
		})

		pdf.save(
			`Questionnaire_${new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}.pdf`
		)
	}

	const extractPdf = async () => {
		try {
			const response = await axios.get(
				build(`/pdf-parse/?url=${question?.file_path}`),
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token?.token}`,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
					}
				}
			)

			const data = response.data

			if (typeof data.context === 'string') {
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
							<ConfigPanel extracted={extractedPdf} questionnaire_id={id} />
						</div>
						{/* For pdf/ppt preview */}
						<div className="col-span-5">
							<PDFPPTViewer pdf_ppt={question?.file_path} />
						</div>
						{/* For generated questions */}
						<div className="col-span-3 h-screen overflow-y-auto border border-zinc-400 rounded-md p-3">
							<div className={`${theme === 'dark' ? 'bg-white' : ''} p-4 rounded-md`}>
								<div className="flex justify-between items-center mb-4">
									<h1
										className={`font-bold font-head ${isMobile ? 'text-md' : 'text-xl'}`}
									>
										{editQuestions && 'Editing '}Generated Questions
									</h1>
									<div className="flex gap-5 items-center">
										<Tooltip title="Download Questionnaire" placement="top">
											<button onClick={handleGeneratePDF}>
												<GrDocumentDownload />
											</button>
										</Tooltip>
										<Tooltip title="Edit Questionnaire" placement="top">
											<button
												onClick={() => {
													if (!editQuestions) setEditQuestions(true)
												}}
											>
												<FiEdit />
											</button>
										</Tooltip>
									</div>
								</div>

								{!editQuestions && formattedQuestions ? (
									<div>
										<StreamingFormattedQuestions
											formattedQuestions={formattedQuestions}
										/>
									</div>
								) : (
									<div className="flex flex-col gap-2">
										<div className="flex justify-between items-center w-full bg-dark p-3 rounded-md">
											<AiFillWarning className="text-red-600" />
											<h1 className="text-sm text-white font-main font-bold">
												Don't delete the br tags{' '}
											</h1>
										</div>
										<textarea
											readOnly={!editQuestions}
											className="w-full h-screen"
											defaultValue={formattedQuestions}
											onChange={e => setGeneratedQuestion(e.target.value)}
										/>
										<div className="flex justify-between gap-4 items-center w-full">
											<button className="bg-dark py-2 w-2/4 px-4 text-center text-white rounded-md">
												Confirm
											</button>

											<button
												onClick={() => setEditQuestions(false)}
												className="bg-red-500 py-2 w-2/4 px-4 text-center text-white rounded-md"
											>
												Cancel
											</button>
										</div>
									</div>
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
