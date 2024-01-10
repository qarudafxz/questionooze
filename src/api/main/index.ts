import supabase from '@/libs/supabase'
import { Questionnaire } from '@/types/global'

export const getQuestionnaires = async (id: string) => {
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

export const createQuestionnaire = async (id: string, body: Questionnaire) => {
	try {
		const { data, error } = await supabase
			.from('questionnaires')
			.insert({
				title: body.title,
				description: body.description,
				user_id: id
			})
			.select()

		if (error) throw Error('Error getting questionnaires')

		return data
	} catch (err) {
		console.error(err)
	}
}
