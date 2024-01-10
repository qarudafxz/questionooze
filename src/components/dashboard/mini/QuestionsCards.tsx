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
							<div className="w-full h-full flex items-center justify-center">
								<h1>Loading</h1>
							</div>
						) : (
							<>
								<div className="w-full h-full flex items-center justify-center">
									<h1 className="text-2xl font-bold">{question.title}</h1>
								</div>
								<div className="w-full h-full flex items-center justify-center">
									<p className="text-lg">{question.description}</p>
								</div>
							</>
						)}
						)
					</div>
				))}
		</div>
	)
}

export default QuestionsCards
