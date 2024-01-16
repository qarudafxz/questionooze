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
import { QuestionConfig } from '@/types/global'

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

export const questionGenerator = async (
	config: QuestionConfig,
	context: string
) => {
	try {
		const prompt = `${config} ${context}`

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
