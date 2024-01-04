/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMedia } from '@/hooks/useMedia'
import logo from '@/assets/logo.png'
import menu from '@/data/menu.json'
import { Link } from 'react-scroll'
import { Button } from '@chakra-ui/react'
import { IoIosMenu } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavStore } from '@/store/nav'

const Navbar: React.FC = () => {
	const { setNavReference } = useNavStore()
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const isMobile = useMedia('(max-width: 640px)')
	const navbarRef = useRef(null)

	const handleClickOutside = useCallback(
		(event: { target: any }) => {
			if (
				navbarRef.current &&
				!(navbarRef.current as HTMLElement).contains(event.target)
			) {
				setShow(false)
			}
		},
		[setShow]
	)

	useEffect(() => {
		if (show) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [show, handleClickOutside])

	useEffect(() => {
		setNavReference(navbarRef)
	}, [])

	return (
		<div className="font-main">
			<div
				className={`flex justify-between ${
					isMobile ? 'px-6 items-start ' : 'px-20 items-center'
				} py-10`}
			>
				<div className="flex gap-3 items-center">
					<img
						src={logo}
						alt="Questionooze logo"
						className={`${isMobile ? 'w-6' : 'w-10'}`}
					/>
					<h1
						className={`font-extrabold text-mid ${isMobile ? 'text-md' : 'text-2xl'}`}
					>
						Questionooze
					</h1>
				</div>

				{isMobile && (
					<Button onClick={() => setShow(!show)}>
						<IoIosMenu size={30} />
					</Button>
				)}

				<AnimatePresence>
					{(!isMobile || show) && (
						<motion.div
							initial={{ x: 1000 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
							exit={{ x: 1000 }}
							className={`${
								isMobile
									? `flex flex-col items-left gap-y-10 border-left h-full border-zinc-300 pl-10`
									: 'flex items-center gap-x-10'
							} `}
						>
							{menu?.map((item, idx) => {
								return (
									<Link
										key={idx}
										to={item.path}
										smooth={true}
										spy={true}
										offset={-50}
										duration={500}
									>
										<span className="font-semibold text-[15px] cursor-pointer hover:text-mid duration-150 hover">
											{item?.label}
										</span>
									</Link>
								)
							})}
							<Button
								onClick={() => navigate('/login')}
								className="font-bold text-white bg-mid px-4 py-2 rounded-md text-[15px]"
							>
								Try now
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default Navbar
