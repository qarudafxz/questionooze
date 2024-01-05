import React, { useState } from 'react'
import { Navbar } from '@/components/landing'
import { useNavStore } from '@/store/nav'
import bg from '@/assets/bg.png'
import { useMedia } from '@/hooks/useMedia'
import { FaArrowRightLong } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Landing: React.FC = () => {
	const [hovered, setHovered] = useState(false)
	const isMobile = useMedia('(max-width: 640px)')
	const { navReference } = useNavStore()

	return (
		<div>
			{/* Hero */}
			<div
				ref={navReference}
				className={``}
				style={{
					backgroundImage: `url(${bg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100%',
					height: '100vh'
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
						} font-bold font-head text-docs`}
					>
						Quality Questions, here we go!
					</h1>
					<p
						className={`font-main text-zinc-500 ${
							isMobile
								? 'text-md text-center mt-4'
								: 'text-xl mt-4 w-3/4 text-center leading-[50px]'
						}`}
					>
						Experience a smarter way of generating questions, supercharged with AI.
						Take your questions to the next level with Questionooze, Bloom's Taxonomy
						aline.
					</p>
					<div className={`flex justify-center items-center gap-8 font-main mt-10`}>
						<button className="bg-mid text-white px-4 py-2 rounded-md font-semibold">
							Get Started
						</button>

						<button
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							className="flex gap-2 items-center"
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
			</div>
			{/* Product */}
		</div>
	)
}

export default Landing
