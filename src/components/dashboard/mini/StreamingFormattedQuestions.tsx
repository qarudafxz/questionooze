import React, { useState, useEffect } from 'react'

const StreamingFormattedQuestions: React.FC<{ formattedQuestions: string }> = ({
	formattedQuestions
}) => {
	const [streamedText, setStreamedText] = useState<string>('')

	useEffect(() => {
		let index = 0
		const interval = setInterval(() => {
			setStreamedText(prevText => prevText + formattedQuestions[index])
			index += 1

			if (index === formattedQuestions.length) {
				clearInterval(interval)
			}
		}, 10)

		return () => clearInterval(interval)
	}, [formattedQuestions])

	return <div dangerouslySetInnerHTML={{ __html: streamedText }} />
}

export default StreamingFormattedQuestions
