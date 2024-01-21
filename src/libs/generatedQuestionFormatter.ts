export const formatter = (question: string): string => {
	// Split the input string into an array of lines
	const lines = question.split('\n')

	// Add <br> tags before each line starting with a number
	//Add <br> tags before each line starting with "a." or "b." or "c." or "d."
	const formattedLines = lines.map((line, index) => {
		if (line.match(/^\d+\./)) {
			// Format question line with additional spaces before choices
			return `${index > 0 ? '<br><br>' : ''}${line}`
		} else if (line.match(/^\w\)/)) {
			// Format choice line with line breaks
			return `${line.charAt(0)}. ${line.slice(3)}<br>`
		} else {
			return line
		}
	})

	// Join the lines back into a formatted string
	const formattedQuestion = formattedLines.join('\n')

	return formattedQuestion
}
