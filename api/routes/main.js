/* eslint-disable no-undef */
import express from 'express'
import pdfParse from '../functions/pdf-parse.js'
import generator from '../functions/question-generator.js'

const router = express.Router()

router.get('/pdf-parse', pdfParse)
router.post('/question-generator', generator)

export default router
