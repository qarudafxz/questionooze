/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import { Tooltip } from '@mui/material'
import logo from '@/assets/logo.png'
import { IoIosArrowForward } from 'react-icons/io'
const Nav: React.FC = () => {
	const { theme } = useToggle()
	const [isOpen, setIsOpen] = useState(false)
	const handleToggle = (e: KeyboardEvent) => {
		if (e.key === '/') {
			setIsOpen(!isOpen)
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			handleToggle(e)
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	const isMobile = useMedia('(max-width: 640px)')
	return (
		<div>
			<motion.div
				initial={{ x: isOpen ? 0 : isMobile ? -240 : -140 }}
				animate={{ x: isOpen ? (isMobile ? -120 : 0) : isMobile ? -240 : -140 }}
				transition={{ duration: 0.2 }}
				className={`${
					isMobile ? 'ml-2' : 'px-6'
				} py-10 h-screen shadow-2xl w-64 absolute z-10 ${
					theme === 'light'
						? 'bg-[#dfdfdf] border-zinc-400 duration-100'
						: 'bg-[#0b0f19] duration-100'
				}`}
			>
				<div
					className={`flex flex-col gap-2 justify-items-center items-center ${
						theme === 'light' ? 'bg-light' : 'bg-dark'
					}}`}
				>
					<Tooltip
						title="Toggle Nav"
						placement="right-end"
						className={`p-3 rounded-full text-xs font-thin ${
							theme === 'light' ? 'bg-dark' : 'bg-light'
						}}`}
					>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className={`border-4 relative left-[125px] ${
								theme === 'light' ? 'bg-dark' : 'bg-light'
							}`}
						>
							<IoIosArrowForward
								size={20}
								className={`${isOpen && 'transform rotate-180 duration-100'} ${
									theme === 'light' ? 'text-white' : 'text-black'
								}`}
							/>
						</button>
					</Tooltip>
					<div className={`${!isOpen && 'pl-32'} mt-10`}>
						<img
							src={logo}
							alt="WTF Logo"
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-6'
							} h-6`}
						/>
						<div
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-6'
							} h-[1.5px] bg-zinc-300 mt-10`}
						></div>
						<div
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-6'
							} h-6 mt-12`}
						></div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Nav
