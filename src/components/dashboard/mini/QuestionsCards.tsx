import React from 'react'
import { useMedia } from '@/hooks/useMedia'

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
}

const QuestionsCards: React.FC<Props> = ({ title, file_url, created_at }) => {
	const isMobile = useMedia('(max-width: 640px)')

	return (
		<div className="w-full h-full rounded-md font-main bg-white flex flex-col justify-center items-center py-2">
			{/* Get the first page of the pdf and make it as the thumbnail */}
			<div className="w-full overflow-hidden">
				<iframe
					src={file_url}
					title={title}
					className="w-full h-[150px]"
					loading="lazy"
					style={{ overflow: 'hidden' }}
				/>
			</div>
			<h1 className={'font-bold text-2xl mt-4'}>
				{title?.length > 5 ? title.slice(0, 7) + '...' : title}
			</h1>
			<p className={`mt-2 ${isMobile ? 'text-sm' : 'text-[11px]'}`}>
				Uploaded on{' '}
				{created_at &&
					new Date(created_at).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
			</p>
		</div>
	)
}

export default QuestionsCards
