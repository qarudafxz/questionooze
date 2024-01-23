import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
	// eslint-disable-next-line no-undef
	apiKey: process.env.VITE_OPENAI_API_KEY
})

export default async (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)

	try {
		const { config, context, blooms_taxonomy } = request.body
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

		const result = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			max_tokens: 1000,
			n: 1
		})

		console.log('Questions generated successfully!')
		return response
			?.status(200)
			.json({ questions: result?.choices[0]?.message?.content })
	} catch (err) {
		console.error(err)
		return response.status(500).send('Internal Server Error')
	}
}
