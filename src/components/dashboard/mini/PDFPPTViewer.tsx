import React from 'react'

interface Props {
	pdf_ppt?: string
}

const PDFPPTViewer: React.FC<Props> = ({ pdf_ppt }) => {
	console.log(pdf_ppt)
	if (!pdf_ppt) {
		return null
	}

	return (
		<div className="pdf-ppt-viewer">
			<iframe
				title="PDF/PPT Viewer"
				src={`https://docs.google.com/gview?url=${pdf_ppt}&embedded=true`}
				loading="lazy"
				style={{
					width: '100%',
					height: '100vh',
					border: 'none'
				}}
			/>
		</div>
	)
}

export default PDFPPTViewer
