import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/landing'
import { useNavStore } from '@/store/nav'
import bg from '@/assets/bg.png'
import { useMedia } from '@/hooks/useMedia'
import { FaArrowRightLong } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { useToggle } from '@/store/toggle'
import first from '@/assets/1.gif'
import second from '@/assets/2.gif'
import third from '@/assets/3.gif'
import features from '@/data/features.json'

const Landing: React.FC = () => {
	const { theme } = useToggle()
	const navigate = useNavigate()
	const [hovered, setHovered] = useState(false)
	const [active, setActive] = useState('_1')
	const isMobile = useMedia('(max-width: 640px)')
	const { navReference } = useNavStore()

	return (
		<div>
			{/* Hero */}
			<div
				ref={navReference}
				id="home"
				className={`${theme === 'light' ? 'bg-light ' : 'bg-dark'} duration-150`}
				style={{
					backgroundImage: `url(${bg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100%'
				}}
			>
				<Navbar />
				<div
					className={`grid justify-center place-items-center ${
						isMobile ? 'px-10' : 'px-16 mt-16'
					}`}
				>
					<h1
						className={`text-center ${
							isMobile ? 'text-5xl' : 'text-[58px]'
						} font-bold font-head ${theme === 'light' ? 'text-docs' : 'text-white'}`}
					>
						Quality Questions Made Easy
					</h1>
					<p
						className={`font-main ${
							isMobile
								? 'text-md text-center mt-4'
								: 'text-xl mt-4 w-3/4 text-center leading-[50px]'
						} ${theme === 'light' ? 'text-docs' : 'text-zinc-200'} duration-150`}
					>
						Experience a smarter way of generating questions, supercharged with AI.
						Take your questions to the next level with Questionooze,{' '}
						<span className="italic font-semibold">Bloom's Taxonomy</span> aline.
					</p>
					<div className={`flex justify-center items-center gap-8 font-main mt-10`}>
						<button
							onClick={() => navigate('/login')}
							className="bg-mid text-white px-4 py-2 rounded-md font-semibold"
						>
							Get Started
						</button>

						<button
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							className={`${
								theme === 'light' ? 'text-docs' : 'text-white'
							} duration-150 flex gap-2 items-center`}
						>
							Demo
							<motion.div
								initial={{ x: 0 }}
								animate={{ x: hovered ? 10 : 0 }}
								transition={{ duration: 0.2 }}
							>
								<FaArrowRightLong />
							</motion.div>
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-10 items-center justify-center mt-24">
					<img src={third} className="w-3/4 rounded-t-[20px] shadow-2xl" />
				</div>
			</div>

			{/* Product */}
			<div
				id="product"
				className={`${theme === 'light' ? 'bg-[#111827]' : 'bg-white'} ${
					isMobile ? 'px-10 py-24' : 'px-16 py-32'
				} w-full flex flex-col items-center justify-center gap-8`}
			>
				<h1
					className={`text-center font-bold ${isMobile ? 'text-2xl' : 'text-5xl'} ${
						theme === 'light' ? 'text-white' : 'text-docs'
					}`}
				>
					Create your questionnaires with ease
				</h1>
				<p
					className={`font-main text-zinc-500 ${
						isMobile
							? 'text-md text-center mt-4'
							: 'text-xl mt-4 w-3/4 text-center leading-[50px]'
					} ${theme === 'light' ? 'text-docs' : 'text-zinc-200'} duration-150`}
				>
					Embrace the power of AI to generate questions for your questionnaires—all
					you need to do is upload your PDF or PPT file, configure a few settings,
					and Questionooze will takethe rest.
				</p>
				<div
					className={`mt-5 ${
						isMobile
							? 'flex flex-col gap-4 px-4 items-center'
							: 'grid grid-cols-8 px-20 items-center'
					}`}
				>
					<div className="col-span-3 flex flex-col">
						{features?.map(feature => {
							return (
								<button
									onClick={() => setActive(feature.image)}
									key={feature.image}
									className={`text-left flex flex-col gap-2 justify-left items-left rounded-md p-4  ${
										active === feature.image && theme === 'light'
											? 'bg-[#161f33] border border-[#2d3f66] text-white'
											: active === feature.image && theme === 'dark'
											? 'bg-[#ebebeb] border border-[#b0b0b0] text-primary'
											: 'text-zinc-500'
									} duration-150'
									}`}
								>
									<h1
										className={`font-bold text-xl  ${isMobile ? 'text-lg' : 'text-xl'} `}
									>
										{feature?.title}
									</h1>
									<p>{feature?.description}</p>
								</button>
							)
						})}
					</div>
					<div className="col-span-5">
						<img
							src={active === 'first' ? first : active === 'second' ? second : third}
							className="w-full rounded-md shadow-2xl"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
