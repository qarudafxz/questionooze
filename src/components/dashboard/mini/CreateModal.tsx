/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, ChangeEvent, DragEvent } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useToggle } from '@/store/toggle'
import { motion, AnimatePresence } from 'framer-motion'
import { Input, Textarea } from '@chakra-ui/react'
import { useMedia } from '@/hooks/useMedia'
import { RiUploadCloud2Fill } from 'react-icons/ri'
import { toast, Toaster } from 'sonner'
import { createQuestionnaire } from '@/api/main/index'
import { useUserStore } from '@/store/user'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface FormState {
	title: string
	description: string
}

interface Props {
	getQuestions: () => void
}

const CreateModal: React.FC<Props> = ({ getQuestions }) => {
	// const navigate = useNavigate()
	const { user } = useUserStore()
	const isMobile = useMedia('(max-width: 640px)')
	const { isCreate, setIsCreate } = useToggle()
	const [form, setForm] = useState<FormState>({
		title: '',
		description: ''
	})
	const [isDragOver, setDragOver] = useState(false)
	const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
	const allowedFiles = ['pdf', 'pptx']
	const createModal = useRef<HTMLDivElement>(null)
	const fileInput = useRef<HTMLInputElement>(null)
	const [dataOfFile, setDataOfFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	const handleCloseModal = (e: React.MouseEvent) => {
		if (e.target === createModal.current) {
			setIsCreate(false)
		}
	}

	const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setDragOver(true)
	}

	const onDragLeave = () => {
		setDragOver(false)
	}

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setDragOver(false)

		const droppedFiles = Array.from(e.dataTransfer.files)

		droppedFiles.forEach(droppedFile => {
			const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase()

			if (allowedFiles.includes(fileExtension as string)) {
				handleFileRead(droppedFile)
			} else {
				toast.error('Invalid file format. Please upload a PDF or PPT file only.')
				console.error('Invalid file format. Please upload a PDF or PPTX file.')
			}
		})
	}

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]

		if (selectedFile) {
			const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()

			if (allowedFiles.includes(fileExtension as string)) {
				handleFileRead(selectedFile)
			} else {
				toast.error('Invalid file format. Please upload a PDF or PPT file only.')
				console.error('Invalid file format. Please upload a PDF or PPTX file.')
			}
		}
	}

	const handleFileRead = (file: File) => {
		setDataOfFile(file)
		setSelectedFileName(file.name)
	}

	const handleCreateQuestionnaire = async (e: React.MouseEvent) => {
		e.preventDefault()

		try {
			setLoading(true)
			const res = await createQuestionnaire(
				user.user_id,
				{
					title: form.title,
					description: form.description
				},
				dataOfFile as File,
				selectedFileName as string
			)

			if (res.status === 200) {
				setLoading(false)
				toast.success('Questionnaire created successfully')

				setTimeout(() => {
					getQuestions()
					setIsCreate(false)
					// navigate(`/dashboard/questionnaire/${res.data[0].id}`, {
					// 	replace: true,
					// 	state: { id: res.data[0].id }
					// })
				}, 1500)
			}
		} catch (err) {
			setLoading(false)
			console.error(err)
			toast.error('Failed to create questionnaire')
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
					<motion.div
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
								className={`relative text-center w-full ${
									isDragOver ? 'dragover' : ''
								}`}
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
										{selectedFileName ? (
											<span className="text-blue-950">{selectedFileName}</span>
										) : (
											<span>Drag and drop your file here</span>
										)}
									</p>
								</label>
							</div>
						</form>
						<button
							onClick={e => handleCreateQuestionnaire(e)}
							className={`bg-mid text-white py-2 rounded-md text-center font-bold w-full ${
								loading && 'flex gap-4 place-items-center justify-center opacity-50'
							}`}
						>
							{loading ? (
								<>
									<motion.div
										animate={{
											rotate: 360
										}}
										transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
									>
										<AiOutlineLoading3Quarters size={15} />
									</motion.div>
									Creating questionnaire
								</>
							) : (
								'Create new questionnare'
							)}
						</button>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

export default CreateModal
