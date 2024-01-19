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

export const questionGenerator = async (config, context) => {
	try {
		const { numberOfQuestions, category, typeOfQuestion } = config

		const prompt = `This is a custom prompt:
				Can you create me a questionnaire with the use of Bloom's Taxonomy guidelines? The context as well as the configuration of the generated questions will be provided below.

			Number of Questions to generate: ${numberOfQuestions}
			Bloom's Taxonomy Category: ${category}
			Type of Question: ${typeOfQuestion}


			The context is:
	 	${context}

			P.S. Always return the question in the following format:
			1. example...
		 2. example...

			and so on, Thanks.
		`

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 900,
			temperature: 0.7
		})

		return response?.choices[0]?.message
	} catch (err) {
		throw new Error('Error generating quesstions')
	}
}
