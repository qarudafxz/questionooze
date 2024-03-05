/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/main.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: '*',
		credentials: true
	})
)

app.use('/api', routes)

export default app
