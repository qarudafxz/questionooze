import React from 'react'
import { Questionnaire } from '@/types/global'

interface Props {
	questions: Questionnaire[]
	loading: boolean
}

const QuestionsCards: React.FC<Props> = ({ questions, loading }) => {
	return (
		<div className="font-main">
			{questions.length > 0 &&
				questions.map((question, index) => (
					<div
						key={index}
						className="w-full h-40 bg-white rounded-md shadow-md flex items-center justify-center"
					>
						{loading ? (
							<div className="animate-pulse">
								<div className="h-3 bg-gray-400 rounded w-3/4"></div>
								<div className="h-3 bg-gray-400 rounded w-3/4"></div>
								<div className="h-3 bg-gray-400 rounded w-3/4"></div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center">
								<h1 className="text-2xl font-bold">{question.title}</h1>
								<p className="text-sm">{question.description}</p>
							</div>
						)}
					</div>
				))}
		</div>
	)
}

export default QuestionsCards
