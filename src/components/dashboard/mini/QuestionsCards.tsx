import React, { useState } from 'react'
import { useMedia } from '@/hooks/useMedia'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import Modal from './Modal'

interface Props {
	id?: string
	title: string
	description?: string
	context?: string
	questions?: string
	type_of_question?: string
	file_id?: string
	file_url?: string
	created_at?: Date
	file_path?: string
	getQuestions: () => void
}

const QuestionsCards: React.FC<Props> = ({
	id,
	title,
	description,
	file_url,
	created_at,
	getQuestions
}) => {
	const [toggleModal, setToggleModal] = useState(false)
	const isMobile = useMedia('(max-width: 640px)')

	return (
		<div className="w-full h-full rounded-md font-main bg-white flex flex-col justify-center items-center py-2">
			{/* Get the first page of the pdf and make it as the thumbnail */}
			<Link
				key={id}
				to={`/dashboard/questionnaire/${id}`}
				state={{ id: id }}
				className="text-center"
			>
				<div className="w-full overflow-hidden">
					<iframe
						src={file_url}
						title={title}
						className="w-full h-[120px]"
						loading="lazy"
						style={{ overflow: 'hidden' }}
					/>
				</div>
				<Tooltip
					arrow
					title={`Open ${title}`}
					placement="top"
					className="font-bold text-2xl mt-4"
				>
					<h1 className={'font-bold text-2xl mt-4'}>
						{title?.length > 5 ? title.slice(0, 7) + '...' : title}
					</h1>
				</Tooltip>
			</Link>
			<div className="flex items-center gap-4 px-3 bg-white pb-4 rounded-b-lg w-full">
				<p className={`mt-2 ${isMobile ? 'text-sm' : 'text-[11px]'}`}>
					Uploaded on{' '}
					{created_at &&
						new Date(created_at).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
				</p>
				<button onClick={() => setToggleModal(!toggleModal)}>
					<HiOutlineDotsVertical size={20} />
				</button>
				<Modal
					title={title}
					description={description || ''}
					question_id={id ?? ''}
					toggleModal={toggleModal}
					setToggleModal={setToggleModal}
					getQuestions={getQuestions}
				/>
			</div>
		</div>
	)
}

export default QuestionsCards
