//eslint-disable-next-line
//@ts-nocheck
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from 'react'
import { useToggle } from '@/store/toggle'
import { motion, AnimatePresence } from 'framer-motion'
import { Input, Textarea } from '@chakra-ui/react'
import DescriptionCounter from './DescriptionCounter'
import { useMedia } from '@/hooks/useMedia'
import { RiUploadCloud2Fill } from 'react-icons/ri'
import { toast, Toaster } from 'sonner'

const CreateModal: React.FC = () => {
	const isMobile = useMedia('(max-width: 640px)')
	const { isCreate, setIsCreate } = useToggle()
	const [form, setForm] = useState({
		title: '',
		description: ''
	})
	const createModal = useRef(null)
	const fileInput = useRef(null)
	const fileContainer = useRef(null)
	const allowedFiles = ['pdf', 'pptx']

	const handleCloseModal = (e: React.MouseEvent) => {
		if (e.target === createModal.current) {
			setIsCreate(false)
		}
	}

	const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const fileContainer = useRef<HTMLDivElement | null>(null)
		fileContainer.current?.classList?.add('dragover')
	}

	const onDragLeave = () => {
		const fileContainer = useRef<HTMLDivElement | null>(null)
		fileContainer.current?.classList?.remove('dragover')
	}

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const fileContainer = useRef<HTMLDivElement>(null)

		fileContainer.current?.classList?.remove('dragover')

		const droppedFiles = Array.from(e.dataTransfer.files)

		droppedFiles.forEach(droppedFile => {
			const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase()

			if (allowedFiles.includes(fileExtension as string)) {
				const reader = new FileReader()
				reader.onload = () => {
					const fileData = reader.result
					console.log(fileData)
				}
				reader.readAsDataURL(droppedFile)
			} else {
				toast.error('Invalid file format. Please upload a PDF or PPT file only.')
				console.error('Invalid file format. Please upload a PDF or PPTX file.')
			}
		})
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]

		if (selectedFile) {
			const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()

			if (allowedFiles.includes(fileExtension as string)) {
				const reader = new FileReader()
				reader.onload = () => {
					const fileData = reader.result
					console.log(fileData)
				}
				reader.readAsDataURL(selectedFile)
			} else {
				toast.error('Invalid file format. Please upload a PDF or PPT file only.')
				console.error('Invalid file format. Please upload a PDF or PPTX file.')
			}
		}
	}

	return (
		<AnimatePresence>
			{isCreate && (
				<div
					onClick={handleCloseModal}
					ref={createModal}
					className={`font-main fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
				>
					<Toaster position="top-center" />
					<motion.form
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{
							duration: 0.8,
							type: 'spring',
							ease: [0, 0.71, 0.2, 0]
						}}
						className={`flex flex-col gap-4 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-lg ${
							isMobile ? 'p-4' : 'p-10 w-4/12'
						}`}
					>
						<>
							<h1 className="font-semibold">Questionnaire Title</h1>
							<Input
								type="text"
								onChange={e => setForm({ ...form, title: e.target.value })}
								className="w-full border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</>
						<>
							<h1 className="font-semibold">Questionnaire Description</h1>
							<DescriptionCounter description={form.description} />
							<Textarea
								onChange={e => setForm({ ...form, description: e.target.value })}
								className={`w-full border border-zinc-300 rounded-md pl-3 py-1 h-[120px] ${
									isMobile ? 'text-sm' : 'text-md'
								}`}
								variant="flushed"
								size="lg"
							/>
						</>
						<form>
							<div
								ref={fileContainer}
								className="relative text-center w-full"
								onDragEnter={onDragEnter}
								onDragLeave={onDragLeave}
								onDrop={onDrop}
							>
								<label
									htmlFor="file"
									className="relative cursor-pointer p-10 flex flex-col items-center justify-center border border-zinc-300 rounded"
									onDragOver={e => e.preventDefault()}
								>
									<RiUploadCloud2Fill size={80} className="text-blue-950" />
									<input
										type="file"
										name="file"
										ref={fileInput}
										className="opacity-0 text-xs pointer-events-none"
										id="file"
										onChange={handleFileInputChange}
									/>
									<p className="text-blue-900 text-xs">
										{fileInput && fileInput.current?.files?.length > 0 ? (
											<span className="text-blue-950">
												{fileInput?.current?.files?.[0]?.name}
											</span>
										) : (
											<span>Drag and drop your file here</span>
										)}
									</p>
								</label>
							</div>
						</form>
						<button className="bg-mid text-white py-2 rounded-md text-center font-bold w-full">
							Create new questionnaire
						</button>
					</motion.form>
				</div>
			)}
		</AnimatePresence>
	)
}

export default CreateModal
