/* eslint-disable no-undef */
import express from 'express'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import axios from 'axios'
import { questionGenerator } from '../lib/ai.js'

const router = express.Router()

router.get('/pdf-parse', async (req, res) => {
	res.header('*')
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	try {
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
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

router.post('/question-generator', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	try {
		const { config, context, blooms_taxonomy } = req.body
		try {
			const response = await questionGenerator(config, context, blooms_taxonomy)
			return res.status(200).json(response)
		} catch (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
		}
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

export default router
