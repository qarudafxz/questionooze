/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/libs/supabase'

interface SignUpParams {
	first_name?: string
	last_name?: string
	email?: string
	password?: string
}

export const signUp = async (params: SignUpParams): Promise<any> => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email: params.email ?? '',
			password: params.password ?? '',
			options: {
				data: {
					first_name: params.first_name ?? '',
					last_name: params.last_name ?? ''
				}
			}
		})

		if (error) {
			return error?.message
		}

		return data
	} catch (error) {
		throw new Error('An error occurred during sign up.')
	}
}

export const logIn = async (params: SignUpParams): Promise<any> => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: params.email ?? '',
			password: params.password ?? ''
		})

		if (error) {
			return error?.message
		}

		return data
	} catch (err) {
		throw new Error('An error occurred during login.')
	}
}

export const logInWithOAuth = async (): Promise<any> => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'https://mribsngufluuvvgltfpj.supabase.co/auth/v1/callback'
			}
		})

		if (error) {
			return error?.message
		}

		return data
	} catch (err) {
		throw new Error('An error occurred during login.')
	}
}
