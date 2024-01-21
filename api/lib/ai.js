/**
 * TODO:
 * Testing the question generator
 *
 * @param config
 * @param context
 *
 * @returns
 * string | undefined
 */

import { OpenAI } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
	// eslint-disable-next-line no-undef
	apiKey: process.env.VITE_OPENAI_API_KEY
})

export const questionGenerator = async (config, context, blooms_taxonomy) => {
	try {
		console.log('Generating questions...')
		const { numberOfQuestions, category, typeOfQuestion } = config

		const keywords = blooms_taxonomy?.map(item => {
			return item?.keywords?.map(keyword => {
				return keyword
			})
		})

		const prompt = `This is a custom prompt:
				Can you create me a questionnaire with the use of Bloom's Taxonomy guidelines? The context as well as the configuration of the generated questions will be provided below.

			Number of Questions to generate: ${numberOfQuestions}
			Bloom's Taxonomy Category: ${category}
			Type of Question: ${typeOfQuestion}

			Additional Information to create a precise questionnaire is to follow the Bloom's Taxonomy guidelines. The keywords are based on the selected category: ${keywords}
			
			If the selected type of question is Situational, the question must be a situation based on the context being provided

			Focus on the context, The context is:
	 	${context}

			P.S. Always return the question in the following format:
			1. example...
		 2. example...

			and so on, Thanks.
		`

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 1200,
			temperature: 0.7
		})

		console.log('Questions generated successfully!')
		return response?.choices[0]?.message
	} catch (err) {
		throw new Error('Error generating quesstions')
	}
}
