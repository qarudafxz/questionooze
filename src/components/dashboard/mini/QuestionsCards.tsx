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
					></div>
				))}
		</div>
	)
}

export default QuestionsCards
