import React, { useState } from 'react'
import { useToggle } from '@/store/toggle'
import { IoAddOutline } from 'react-icons/io5'
import { FaClipboardQuestion } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const CreateButton: React.FC = () => {
	const [hovered, setHovered] = useState(false)

	const { theme } = useToggle()
	return (
		<div
			className={`p-3 flex flex-col gap-2 place-content-center items-center text-center border rounded-md ${
				theme === 'light' ? 'border-zinc-400' : 'border-blue-950'
			} duration-150`}
		>
			<FaClipboardQuestion
				size={40}
				className={`${
					theme === 'light' ? 'text-zinc-700' : 'text-white'
				} duration-150`}
			/>
			<h1
				className={`text-[15px] font-semibold leading-[20px] mt-4 ${
					theme === 'light' ? 'text-docs' : 'text-white'
				} duration-150`}
			>
				Create a new questionnaire
			</h1>
			<p
				className={`${
					theme === 'light' ? 'text-docs' : 'text-zinc-400'
				} text-xs duration-150`}
			>
				Get started by uploading a new document.
			</p>
			<button
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="bg-mid px-4 py-2 rounded-md flex gap-4 items-center text-white mt-4"
			>
				<motion.div
					animate={{ rotate: hovered ? 180 : 0 }}
					transition={{ duration: 0.5 }}
				>
					<IoAddOutline size={25} />
				</motion.div>
				<h1 className="text-md font-bold">Create</h1>
			</button>
		</div>
	)
}

export default CreateButton
