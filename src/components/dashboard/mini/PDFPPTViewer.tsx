import React from 'react'

interface Props {
	pdf_ppt?: string
}

const PDFPPTViewer: React.FC<Props> = ({ pdf_ppt }) => {
	if (!pdf_ppt) {
		return null
	}

	return (
		<div className="pdf-ppt-viewer">
			<iframe
				title="PDF/PPT Viewer"
				src={pdf_ppt}
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
