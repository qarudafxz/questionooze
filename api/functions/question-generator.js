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

		console.log('Number of Questions: ', numberOfQuestions)
		console.log('Category: ', category)
		console.log('Type of Question: ', typeOfQuestion)

		const keywords = blooms_taxonomy?.map(item => {
			return item?.keywords?.map(keyword => {
				return keyword
			})
		})

		const prompt = `Create a questionnaire with ${numberOfQuestions} questions that align with the Bloom's Taxonomy category of ${category} and the type of question of ${typeOfQuestion}. Use the following context to create the questions:

			${context}
			
			When creating the questions, keep in mind the following guidelines:
			
			Use the keywords provided in ${keywords} to create the questions.
			If ${typeOfQuestion} is "Situational", create a situation that relates to the context.
			If ${typeOfQuestion} is "Multiple Choices", provide 4 choices for each question.
			If ${typeOfQuestion} is "True or False", provide a statement that can be answered with "True" or "False".
			Always return the question in the following format:
			${numberOfQuestions}. question text
			
			For example, if {numberOfQuestions} is 3, {category} is "Understanding", {typeOfQuestion} is "Multiple Choices", and {keywords} is ["keyword1", "keyword2"], here are some possible questions that could be generated:
			
			What is the definition of keyword1 in the context of ${context}? a) Definition 1 b) Definition 2 c) Definition 3 d) Definition 4
			How does keyword1 relate to keyword2 in ${context}? a) Answer 1 b) Answer 2 c) Answer 3 d) Answer 4
			Is the following statement true or false: ${category}? a) True b) False

			After the question, provide also its answer in the following format:
			<br>Answer: ${numberOfQuestions}. answer text

			I hope this updated prompt helps improve the accuracy of the generated questions! Let me know if you have any further questions or concerns.

			P.S. Please follow to the number of questions you want to generate. For example, if you want to generate 5 questions, replace ${numberOfQuestions} with 5.
		`

		const result = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.2,
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
