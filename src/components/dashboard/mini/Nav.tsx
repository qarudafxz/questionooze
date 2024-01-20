/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useToggle } from '@/store/toggle'
import { useMedia } from '@/hooks/useMedia'
import { Tooltip } from '@mui/material'
import logo from '@/assets/logo.png'
import { IoIosArrowForward } from 'react-icons/io'
import { FaFolderOpen } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Questionnaire } from '@/types/global'
import { FiFile } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface Props {
	questions: Questionnaire[]
}

const Nav: React.FC<Props> = ({ questions }) => {
	const navigate = useNavigate()
	const [collapse, setCollapse] = useState(true)
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
					isMobile ? 'ml-2 w-64 h-[1000px]' : 'px-6 w-[300px]  min-h-[945px]'
				} font-main py-10 shadow-2xl absolute z-10 ${
					theme === 'light'
						? 'bg-[#dfdfdf] border-zinc-400 duration-100'
						: 'bg-[#0b0f19] duration-100'
				}`}
			>
				<div
					className={`${
						isMobile ? 'flex flex-col gap-2 items-center' : ' items-left'
					} ${theme === 'light' ? 'bg-light' : 'bg-dark'}} p-6`}
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
							className={`border-4 relative  ${
								theme === 'light' ? 'bg-dark' : 'bg-light'
							} ${isMobile ? 'left-[125px]' : 'left-[220px]'}`}
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
							onClick={() => {
								navigate('/dashboard')
							}}
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-10 h-auto'
							} h-6 hover:cursor-pointer`}
						/>
						<div
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-full'
							} h-[1.5px] bg-zinc-300 mt-10`}
						/>
						<div
							className={`${
								isOpen && isMobile ? 'w-34 relative left-[55px]' : 'w-6'
							} h-6 mt-12`}
						>
							<div className={`grid grid-cols-6 gap-x-5 items-center`}>
								<FaFolderOpen
									onClick={() => setCollapse(!collapse)}
									size={25}
									className={`col-span-2 ${
										theme === 'light' ? 'text-mid' : 'text-white'
									} hover:cursor-pointer`}
								/>
								<h1
									onClick={() => setCollapse(!collapse)}
									className={`col-span-2 flex gap-4 font-semibold ${
										isMobile && 'hidden'
									} ${theme === 'light' ? 'text-primary' : 'text-white'} ${
										isOpen ? 'block' : 'hidden'
									} text-[15px] hover:cursor-pointer`}
								>
									Questionnaires
								</h1>
								<IoMdArrowDropdown
									size={30}
									className={`col-span-2 ${!isOpen && 'hidden'}  ${
										theme === 'light' ? 'text-primary' : 'text-white'
									} ${
										collapse ? 'rotate-180' : 'rotate-0'
									} relative left-[115px] duration-150`}
								/>
							</div>
							{collapse && (
								<div
									className={`${
										isMobile ? '' : isOpen ? 'ml-10' : 'ml-4'
									} flex flex-col gap-5 mt-4 w-full`}
								>
									{questions?.map(question => {
										return (
											<Link
												key={question?.id}
												to={`/dashboard/questionnaire/${question?.id}`}
												state={{ id: question?.id }}
												className="grid grid-cols-5 gap-4 w-full items-center hover:cursor-pointer"
											>
												<FiFile
													size={20}
													className={`${!isOpen && 'block'} ${
														theme === 'light' ? 'text-mid' : 'text-white'
													} col-span-3`}
												/>
												<h1
													className={`${theme === 'light' ? 'text-mid' : 'text-white'} ${
														!isOpen && 'hidden'
													} col-span-2 ${!isMobile && 'text-[12px] w-[140px]'}`}
												>
													{question?.title}
												</h1>
											</Link>
										)
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Nav
