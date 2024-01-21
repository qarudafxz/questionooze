/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import axios from 'axios'
import dotenv from 'dotenv'
import { questionGenerator } from './lib/ai.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	})
)

app.get('/api/pdf-parse', async (req, res) => {
	const { url } = req.query

	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' })

		const dataBuffer = Buffer.from(response.data)

		const data = await pdf(dataBuffer)
		const text = data.text.replace(/\/n/g, '\n')

		return res.status(200).json({ context: text })
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

app.post('/api/question-generator', async (req, res) => {
	const { config, context } = req.body
	try {
		const response = await questionGenerator(config, context)
		return res.status(200).json(response)
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

export default app
