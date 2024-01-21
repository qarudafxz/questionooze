import supabase from '@/libs/supabase'
import { Questionnaire } from '@/types/global'

export const getQuestionnaires = async (id: string) => {
	if (!id) {
		throw new Error('No user id provided')
	}

	try {
		const { data, error } = await supabase
			.from('questionnaires')
			.select()
			.eq('user_id', id)

		if (error) {
			throw new Error(error.message)
		}

		const fileData = await Promise.all(
			data.map(async questionnaire => {
				//eslint-disable-next-line
				//@ts-ignore
				const { data: fileData, error: fileError } = await supabase.storage
					.from('files')
					.getPublicUrl(questionnaire.file_path)

				if (fileError) {
					console.log(fileError)
					throw new Error('Error downloading file')
				}

				const fileUrl = fileData?.publicUrl?.replace('/files', '')

				return { ...questionnaire, file_url: fileUrl }
			})
		)

		return { fileData }
	} catch (err) {
		console.error(err)
	}
}

export const createQuestionnaire = async (
	userId: string,
	questionnaireData: Questionnaire,
	file: File | null,
	fileName: string
) => {
	try {
		const type = fileName.split('.').pop()

		const { data: fileData, error: fileError } = await supabase.storage
			.from(`${type === 'pdf' ? 'pdfs' : 'ppts'}`)
			.upload(`${userId}/${fileName}`, file!, {
				upsert: false,
				contentType:
					type === 'pdf'
						? 'application/pdf'
						: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			})

		if (fileError) {
			console.log(fileError)
			throw new Error()
		}

		const pdfUrl = `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${
			type === 'pdf' ? 'pdfs/' : 'ppts/'
		}${fileData?.path || ''}`

		const { data, error: insertError } = await supabase
			.from('questionnaires')
			.insert({
				title: questionnaireData.title,
				description: questionnaireData.description,
				user_id: userId,
				//eslint-disable-next-line
				//@ts-ignore
				file_path: pdfUrl
			})
			.select()

		if (insertError) {
			console.log(insertError)
			throw new Error('Error inserting questionnaire')
		}

		return { data, pdfUrl, status: 200 }
	} catch (error) {
		console.error(error)
		throw error
	}
}

//similar to createQuestionnaire but with update
export const updateQuestionnaire = async (
	userId: string,
	questionnaire_id: string,
	questionnaireData: Questionnaire,
	file: File | null,
	fileName: string
) => {
	try {
		const type = fileName.split('.').pop()

		const { data, error: selectError } = await supabase
			.from('questionnaires')
			.select('file_path')
			.eq('id', questionnaire_id)

		if (selectError) {
			throw new Error(selectError.message)
		}

		const filePath = data[0].file_path
		const path = filePath.split('pdfs/')[1]

		const { error: removeError } = await supabase.storage
			.from('pdfs')
			.remove([path])

		if (removeError) {
			throw new Error(removeError.message)
		}

		const { data: fileData, error: uploadError } = await supabase.storage
			.from(`${type === 'pdf' ? 'pdfs' : 'ppts'}`)
			.upload(`${userId}/${fileName}`, file!, {
				upsert: false,
				contentType:
					type === 'pdf'
						? 'application/pdf'
						: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			})

		if (uploadError) {
			console.log(uploadError)
			throw new Error()
		}

		const pdfUrl = `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${
			type === 'pdf' ? 'pdfs/' : 'ppts/'
		}${fileData?.path || ''}`

		const { data: updateData, error: updateError } = await supabase
			.from('questionnaires')
			.update({
				title: questionnaireData.title,
				description: questionnaireData.description,
				user_id: userId,
				// eslint-disable-next-line
				//@ts-ignore
				file_path: pdfUrl
			})
			.eq('id', questionnaire_id)
			.select()

		if (updateError) {
			console.log(updateError)
			throw new Error('Error updating questionnaire')
		}

		return { data: updateData, pdfUrl, status: 200 }
	} catch (err) {
		console.error(err)
	}
}

export const getSpecificQuestionnaire = async (id: string) => {
	try {
		const { data, error } = await supabase
			.from('questionnaires')
			.select()
			.eq('id', id)

		if (error) {
			throw new Error(error.message)
		}

		return { data }
	} catch (err) {
		console.error(err)
	}
}

export const addGeneratedQuestionToQuestionnaire = async (
	id: string,
	context: string,
	question: string
) => {
	console.log(id, context, question)
	try {
		const { data, error } = await supabase
			.from('questionnaires')
			.update({ context: context, questions: question })
			.eq('id', id)
			.select()

		if (error) {
			throw new Error(error.message)
		}

		return { data }
	} catch (err) {
		console.error(err)
	}
}

export const deleteQuestionnaire = async (id: string) => {
	try {
		const { data, error } = await supabase
			.from('questionnaires')
			.select('file_path')
			.eq('id', id)

		if (error) {
			throw new Error(error.message)
		}

		const filePath = data[0].file_path

		const path = filePath.split('pdfs/')[1]

		console.log(path)

		const { error: fileError } = await supabase.storage
			.from('pdfs')
			.remove([path])

		if (fileError) {
			throw new Error(fileError.message)
		}

		const { data: deleteData, error: deleteError } = await supabase
			.from('questionnaires')
			.delete()
			.eq('id', id)

		if (deleteError) {
			throw new Error(deleteError.message)
		}

		return { data: deleteData, success: true }
	} catch (err) {
		console.error(err)
	}
}
