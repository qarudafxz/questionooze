import { questionGenerator } from '../lib/ai.js'

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
		try {
			const result = await questionGenerator(config, context, blooms_taxonomy)
			return response.status(200).json(result)
		} catch (err) {
			console.error(err)
			response.status(500).send('Internal Server Error')
		}
	} catch (err) {
		console.error(err)
		response.status(500).send('Internal Server Error')
	}
}
