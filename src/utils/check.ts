import { User } from '@supabase/supabase-js'

export const check = (data: User, method: string) => {
	console.log(data)
	if (typeof data !== 'object') {
		return {
			error: true,
			message: data
		}
	}

	return method === 'signUp'
		? { data, error: false, message: 'User created successfully.' }
		: { data, error: false, message: 'User logged in successfully.' }
}
