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

		if (error) throw Error('Error getting questionnaires')

		return data
	} catch (err) {
		console.error(err)
	}
}

const createQuestionnaire = async (
	userId: string,
	questionnaireData: Questionnaire,
	file: File
) => {
	let loading = false
	try {
		loading = true

		// Upload file first, then grab its file id
		const { data: fileData, error: fileError } = await supabase.storage
			.from('files')
			.upload(`${userId}/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false
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
				file_id: fileData?.path || null
			})
			.select()

		if (insertError) {
			throw new Error('Error inserting questionnaire')
		}

		loading = false

		return { data, loading }
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default createQuestionnaire
