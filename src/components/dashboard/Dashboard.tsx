/* eslint-disable react-hooks/exhaustive-deps */
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
import CreateModal from './mini/CreateModal'
import Skeleton from '@mui/material/Skeleton'
import { useQuestionnaireStore } from '@/store/questions'

const Dashboard: React.FC = () => {
	const { setQuestions, questions, generatedQuestion, setGeneratedQuestion } =
		useQuestionnaireStore()
	const { user, setUser } = useUserStore()
	const [loading, setLoading] = useState(false)

	const isMobile = useMedia('(max-width: 640px)')
	const { theme } = useToggle()

	const getQuestions = () => {
		setLoading(true)
		getQuestionnaires(user?.user_id)
			.then(res => {
				setQuestions(res?.fileData || ([] as Questionnaire[]))
				setTimeout(() => {
					setLoading(false)
				}, 1200)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}

	useEffect(() => {
		if (!user.first_name && !user.last_name && !user.user_id) {
			const userDetails = JSON.parse(
				localStorage.getItem(import.meta.env.VITE_SESSION_KEY) || '{}'
			)

			setUser({
				first_name: userDetails?.user?.user_metadata?.first_name,
				last_name: userDetails?.user?.user_metadata?.last_name,
				user_id: userDetails?.user?.id
			})
		}
		setLoading(true)
		getQuestions()
	}, [user])

	useEffect(() => {
		if (generatedQuestion) {
			setGeneratedQuestion('')
		}
	}, [generatedQuestion])

	return (
		<div
			className={`${theme === 'light' ? 'bg-white' : 'bg-dark'} ${
				!isMobile && 'min-h-[130vh]'
			}`}
		>
			<div>
				{/* Navbar */}
				<Nav questions={questions} />
				{/* Content */}
				<div className="flex flex-col gap-4">
					<UserDetails label={'Questionnaires'} description="" />
					<div
						className={`${
							isMobile
								? 'px-10 flex flex-col gap-28'
								: 'px-40 grid grid-cols-6 gap-5 items-center'
						} mt-4`}
					>
						<CreateButton />
						{questions.length > 0 &&
							questions.map((question, index) => (
								<div
									key={index}
									className="w-full h-40 rounded-md shadow-md flex items-center justify-center"
								>
									{loading ? (
										<Skeleton variant="rectangular" width={'100%'} height={'100%'} />
									) : (
										<QuestionsCards
											id={question?.id}
											title={question?.title}
											description={question?.description}
											questions={question?.questions}
											file_id={question?.file_id}
											file_url={question?.file_path}
											created_at={question?.created_at}
											getQuestions={getQuestions}
										/>
									)}
								</div>
							))}
					</div>
					<CreateModal mode="create" getQuestions={getQuestions} />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
