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
	file: string,
	fileName: string
) => {
	try {
		const type = fileName.split('.').pop()

		const { data: fileData, error: fileError } = await supabase.storage
			.from('files')
			.upload(`${userId}/${fileName}`, file, {
				cacheControl: '3600',
				upsert: false,
				contentType:
					type === 'pdf' ? 'application/pdf' : 'application/vnd.ms-powerpoint'
			})

		if (fileError) {
			throw new Error('Error uploading file')
		}

		const { data, error: insertError } = await supabase
			.from('questionnaires')
			.insert({
				title: questionnaireData.title,
				description: questionnaireData.description,
				user_id: userId,
				//eslint-disable-next-line
				//@ts-ignore
				file_path: fileData?.fullPath || ''
			})
			.select()

		if (insertError) {
			console.log(insertError)
			throw new Error('Error inserting questionnaire')
		}

		return { data, status: 200 }
	} catch (error) {
		console.error(error)
		throw error
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
