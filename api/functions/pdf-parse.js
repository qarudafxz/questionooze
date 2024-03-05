import axios from 'axios'
import pdf from 'pdf-parse/lib/pdf-parse.js'

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
		const { url } = request.query

		try {
			const axiosResponse = await axios.get(url, { responseType: 'arraybuffer' })

			// eslint-disable-next-line no-undef
			const dataBuffer = Buffer.from(axiosResponse.data)

			const data = await pdf(dataBuffer)
			const text = data.text.replace(/\/n/g, '\n')

			return response.status(200).json({ context: text })
		} catch (err) {
			console.error(err)
			response.status(500).send('Internal Server Error')
		}
	} catch (err) {
		console.error(err)
		response.status(500).send('Internal Server Error')
	}
}
