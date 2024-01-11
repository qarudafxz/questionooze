import React from 'react'

interface Props {
	id?: string
	title: string
	description?: string
	context?: string
	questions?: string
	type_of_question?: string
	file_id?: string
}

const QuestionsCards: React.FC<Props> = ({ title, description }) => {
	return (
		<div className="w-full h-full rounded-md font-main bg-white flex flex-col justify-center items-center">
			<h1 className="font-bold text-2xl">{title}</h1>
			<p>{description}</p>
		</div>
	)
}

export default QuestionsCards
