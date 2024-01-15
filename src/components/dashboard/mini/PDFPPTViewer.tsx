import React from 'react'

interface Props {
	pdf_ppt?: string
}
const PDFPPTViewer: React.FC<Props> = ({ pdf_ppt }) => {
	return (
		<div className="">
			<iframe
				src={`https://docs.google.com/gview?url=${pdf_ppt}&embedded=true`}
				style={{
					width: '100%',
					height: '100vh'
				}}
			/>
		</div>
	)
}

export default PDFPPTViewer
