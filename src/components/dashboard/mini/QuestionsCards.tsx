import React, { useEffect, useRef } from 'react'

interface Props {
	id?: string
	title: string
	description?: string
	context?: string
	questions?: string
	type_of_question?: string
	file_id?: string
	file_url?: string
}

const QuestionsCards: React.FC<Props> = ({ title, description, file_url }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')
			const img = new Image()
			img.src = file_url as string
			console.log(img)
			img.onload = function () {
				if (ctx) {
					ctx.drawImage(img, 0, 0)
				}
			}
		}
	}, [file_url])
	return (
		<div className="w-full h-full rounded-md font-main bg-white flex flex-col justify-center items-center">
			<canvas ref={canvasRef} className="w-full h-1/2"></canvas>
			<h1 className="font-bold text-2xl">{title}</h1>
			<p>{description}</p>
		</div>
	)
}

export default QuestionsCards
