/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { data } from '@/data/data'
import authors from '@/data/authors.json'
import Authors from '@/components/landing/Authors'

const Landing: React.FC = () => {
	const { theme } = useToggle()
	const navigate = useNavigate()
	const [hovered, setHovered] = useState(false)
	const [active, setActive] = useState('first')
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
				className={`${theme === 'light' ? 'bg-[#111827]' : 'bg-white'} ${
					isMobile ? 'px-10 py-24' : 'px-16 py-32'
				} w-full flex flex-col items-center justify-center gap-8`}
			>
				<h1
					id="product"
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
			<div
				className={`font-main flex flex-col justify-center items-center gap-4 ${
					isMobile ? 'px-14 py-24' : 'px-36 py-44'
				} ${theme === 'light' ? 'bg-white' : 'bg-dark'}`}
			>
				<h1
					className={`text-center font-semibold ${
						isMobile ? 'text-2xl' : 'text-4xl'
					} ${theme === 'light' ? 'text-docs' : 'text-white'}`}
				>
					Supercharge your question crafting with AI
				</h1>
				<p
					className={`font-main text-zinc-500 ${
						isMobile
							? 'text-md text-center mt-4'
							: 'text-md text-center leading-[50px]'
					} ${theme === 'light' ? 'text-docs' : 'text-zinc-200'} duration-150`}
				>
					Features built to help you create questionnaires faster, more accurate, and
					efficiently.
				</p>
				<div
					className={`py-4 w-full mt-4 ${
						isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-3 gap-8'
					} items-center`}
				>
					{data?.map((item: any, idx: number) => {
						return (
							<div key={idx} className="font-main flex flex-col gap-3">
								{item?.icon}
								<p className="text-mid">{item?.subtitle}</p>
								<h1
									className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} ${
										theme === 'light' ? 'text-docs' : ' text-zinc-200'
									}`}
								>
									{item?.title}
								</h1>
								<p
									className={`${theme === 'light' ? 'text-zinc-500' : 'text-zinc-500'}`}
								>
									{item?.description}
								</p>
							</div>
						)
					})}
				</div>
			</div>
			{/* About */}
			<div
				className={`font-main flex flex-col gap-4 justify-between items-center ${
					isMobile ? 'px-14' : 'px-36'
				} ${theme === 'light' ? 'bg-dark' : 'bg-white'} py-20`}
			>
				<h1
					id="about"
					className={`${
						theme === 'light' ? 'text-zinc-300' : 'text-docs'
					} font-bold ${isMobile ? 'text-lg' : 'text-3xl'}`}
				>
					About Questionooze
				</h1>
				<p
					className={`font-main text-zinc-500 text-justify ${
						isMobile ? 'text-sm mt-4' : 'text-md leading-[25px] mt-8'
					} ${theme === 'light' ? 'text-docs' : 'text-zinc-200'} duration-150`}
				>
					<span className="font-bold">Questionooze</span> is a web application that
					can generate questionnaires based on Bloom's Taxonomy using generative
					artificial intelligence. This application aims to streamline and improve
					the process of question generation for educational assessments. <br></br>
					<br></br> This application will focus on creating questions that align with
					the Bloom's Taxonomy categories: remember, understand, apply, analyze,
					evaluate, and create. The study aims to create a user-friendly web
					application, making it accessible to a wide range of users, including
					students, teachers, and educational institutions. It includes the
					implementation of PDF content extraction technology to extract pdf content
					to text, thus streamlining the question generation process. The research is
					also focused on improving learning outcomes by promoting critical thinking,
					deep understanding, and retention of information through thought-provoking
					questions. Time efficiency, accessibility to high-quality questions, and
					alignment with learning objectives are key objectives of this study.
					Moreover, it extends to addressing challenges faced by educators in
					creating challenging and thought-provoking questions.
				</p>

				<div className="mt-36">
					<h1
						className={`${
							theme === 'light' ? 'text-zinc-500' : 'text-docs'
						} text-center ${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}
					>
						Authors of Questionooze
					</h1>

					<div className="flex gap-10 items-center mt-10">
						{authors?.map((author: any, idx: number) => {
							return <Authors key={idx} idx={idx} name={author?.name} />
						})}
					</div>
				</div>
			</div>
			{/* Footer */}
			<div
				className={`font-main flex flex-col gap-4 justify-between items-center ${
					isMobile ? 'px-14' : 'px-36'
				} ${theme === 'light' ? 'bg-dark' : 'bg-white'} py-36`}
			>
				<div className="w-2/4 text-center">
					<div className="flex flex-col gap-3 justify-center place-items-center">
						<h1
							className={`${
								theme === 'light' ? 'text-white' : 'text-docs'
							} font-bold ${isMobile ? 'text-2xl' : 'text-4xl'}`}
						>
							Generate questions now.
						</h1>
						<h1
							className={`${
								theme === 'light' ? 'text-white' : 'text-docs'
							} font-bold ${isMobile ? 'text-2xl' : 'text-4xl'}`}
						>
							Start using Questionooze today.
						</h1>
						<p
							className={`font-main text-justify ${
								isMobile ? 'text-sm mt-4' : 'text-md leading-[25px] mt-8'
							} ${theme === 'light' ? 'text-zinc-300' : 'text-docs'} duration-150`}
						>
							Signing up is as easy as pie. It literally takes less than a minute.
						</p>
						<button
							onClick={() => navigate('/signup')}
							className="bg-mid text-white px-4 py-2 rounded-md font-semibold mt-10 w-1/4"
						>
							Get Started
						</button>
					</div>
				</div>
				<div className="mt-10 w-full">
					<div
						className={`w-full h-[1px] ${
							theme === 'light' ? 'bg-[#2f3a50]' : 'bg-zinc-300'
						}`}
					/>
					<div
						className={`mt-4 ${
							isMobile
								? 'grid grid-cols-2 justify-between items-center'
								: 'flex justify-between items-center'
						}`}
					>
						<h1
							className={`font-bold ${theme === 'light' ? 'text-mid' : 'text-docs'} ${
								isMobile ? 'text-lg' : 'text-2xl'
							}`}
						>
							Questionooze
						</h1>
						<h1
							className={`${isMobile ? 'text-md' : 'text-lg'} ${
								theme === 'light' ? 'text-zinc-200' : 'text-zinc-500'
							}`}
						>
							All rights reserved 2024
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
