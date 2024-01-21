import React, { useState } from 'react'
import { useMedia } from '@/hooks/useMedia'
import { AnimatePresence, motion } from 'framer-motion'
import { LiaTrashAlt } from 'react-icons/lia'
import { BiSolidEdit } from 'react-icons/bi'
import { deleteQuestionnaire } from '@/api/main/index'
import { toast, Toaster } from 'sonner'
import CreateModal from './CreateModal'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Props {
	title: string | null
	description: string | null
	question_id: string | null
	toggleModal: boolean
	setToggleModal: (arg: boolean) => void
	getQuestions: () => void
}

const Modal: React.FC<Props> = ({
	title,
	description,
	question_id,
	toggleModal,
	setToggleModal,
	getQuestions
}) => {
	const isMobile = useMedia('(max-width: 640px)')
	const [edit, setIsEdit] = useState(false)

	const handleDelete = async () => {
		await deleteQuestionnaire(question_id || '').then(res => {
			if (res?.success === true) {
				toast.success(`${title} has been deleted successfully`)
				setTimeout(() => {
					getQuestions()
				}, 1200)
			}
		})
	}
	return (
		<>
			<Toaster position="top-center" />
			<AnimatePresence>
				{toggleModal && (
					<div
						className={`font-main fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-30 z-50`}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{
								duration: 0.4,
								type: 'spring',
								ease: [0, 0.71, 0.2, 0]
							}}
							className={`flex flex-col gap-4 place-items-center bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-lg ${
								isMobile ? 'p-4' : 'py-4 w-2/12'
							}`}
						>
							<div className="flex w-full justify-end px-4">
								<button onClick={() => setToggleModal(false)}>
									<AiOutlineCloseCircle size={20} />
								</button>
							</div>
							<button
								onClick={handleDelete}
								className="py-2 px-4 flex gap-4 items-center hover:bg-zinc-300 hover:py-2 hover:px-4 rounded-md"
							>
								<LiaTrashAlt />
								Delete {title}
							</button>
							<button
								onClick={() => setIsEdit(true)}
								className="py-2 px-4 flex gap-4 items-center hover:bg-zinc-300 hover:py-2 hover:px-4 rounded-md"
							>
								<BiSolidEdit />
								Edit {title}
							</button>
						</motion.div>
						{edit && (
							<CreateModal
								mode="edit"
								title={title || ''}
								description={description || ''}
								questionnaire_id={question_id || ''}
								getQuestions={getQuestions}
								edit={edit}
								setIsEdit={setIsEdit}
							/>
						)}
					</div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Modal
