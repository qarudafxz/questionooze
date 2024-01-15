import React, { useEffect, useRef } from 'react'
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

const QuestionsCards: React.FC<Props> = ({
	title,
	description,
	file_path,
	created_at
}) => {
	const isMobile = useMedia('(max-width: 640px)')
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')
			const img = new Image()
			img.src = file_path as string

			img.onload = function () {
				if (ctx) {
					ctx.drawImage(img, 0, 0)
				}
			}
		}
	}, [file_path])
	return (
		<div className="w-full h-full rounded-md font-main bg-white flex flex-col justify-center items-center py-2">
			<div className="w-full h-1/2">
				<canvas ref={canvasRef} className="w-full h-full" />
			</div>
			<h1 className="font-bold text-2xl">{title}</h1>
			<p>{description}</p>
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
