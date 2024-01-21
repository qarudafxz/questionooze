import { ReactNode } from 'react'
import { GiTargetPoster, GiStack, GiBrain } from 'react-icons/gi'

interface Props {
	icon: ReactNode
	title: string
	subtitle: string
	description: string
}

export const data: Props[] = [
	{
		icon: <GiTargetPoster className="text-4xl text-mid" />,
		subtitle: 'Questions from AI',
		title:
			'Retrieve generated questions from uploaded pdf precisely, accurately and efficiently',
		description:
			'The AI will generate questions from the uploaded pdf. Questionooze also allows you to edit the questions based on the context of the pdf'
	},
	{
		icon: <GiStack className="text-4xl text-mid" />,
		subtitle: 'Broad AI Knowledge Based',
		title:
			"Harness AI and it's knowledge base and critical-thinking capabilities.",
		description:
			'Questionooze provides you with a broad knowledge base of AI to help you understand the AI generated questions and answers.'
	},
	{
		icon: <GiBrain className="text-4xl text-mid" />,
		subtitle: "Bloom's Taxonomy Aligned",
		title: "Align your questions to Bloom's Taxonomy",
		description:
			"Questionooze's AI generated questions are aligned to Bloom's Taxonomy. This helps you to understand the cognitive levels of the questions and answers."
	}
]
