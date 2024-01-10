import React, { useState, useEffect } from 'react'
import Nav from './mini/Nav'
import UserDetails from './mini/UserDetails'
import { useMedia } from '@/hooks/useMedia'
import QuestionsCards from './mini/QuestionsCards'
import { Questionnaire } from '@/types/global'
import { getQuestionnaires } from '@/api/main/index'
import { useToggle } from '@/store/toggle'
import { useUserStore } from '@/store/user'
import CreateButton from './mini/CreateButton'

const Dashboard: React.FC = () => {
	const { user } = useUserStore()
	const [loading, setLoading] = useState(false)
	const [questions, setQuestions] = useState<Questionnaire[]>([])

	const isMobile = useMedia('(max-width: 640px)')
	const { theme } = useToggle()

	useEffect(() => {
		setLoading(true)
		getQuestionnaires(user?.user_id).then(res => {
			if (res) {
				setQuestions(res)
				setTimeout(() => {
					setLoading(false)
				}, 1500)
			}
		})
	}, [user?.user_id])

	return (
		<div className={`${theme === 'light' ? 'bg-white' : 'bg-dark'} h-screen`}>
			<div className="">
				{/* Navbar */}
				<Nav />
				{/* Content */}
				<div className="flex flex-col gap-4">
					<UserDetails />
					<div
						className={`${
							isMobile ? 'px-10 flex flex-col gap-4' : 'px-40 grid grid-cols-6 gap-4'
						} mt-4`}
					>
						<CreateButton />
						<QuestionsCards questions={questions} loading={loading} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
