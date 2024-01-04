import React from 'react'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import { useMedia } from '@/hooks/useMedia'
import { Input, Button } from '@chakra-ui/react'

const Login: React.FC = () => {
	const isMobile = useMedia('(max-width: 640px)')

	return (
		<div className="font-main">
			<div
				className={`w-full h-screen ${
					isMobile ? 'px-6 grid place-items-center' : 'flex w-full'
				}`}
			>
				<div
					className={` ${
						!isMobile && 'flex flex-col items-start justify-center px-24 w-2/4'
					}`}
				>
					<div className="w-full">
						<img
							src={logo}
							alt="Questionooze logo"
							className={`${isMobile ? 'w-8' : 'w-10'} mb-6`}
						/>
						<h1
							className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-docs`}
						>
							Welcome back
						</h1>
						<p className={`${isMobile ? 'text-sm' : 'text-md'} text-zinc-400 mt-1`}>
							Login to your account
						</p>
						<div className="mt-4">
							<h1>Email</h1>
							<Input
								type="email"
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<div className="mt-4">
							<h1>Password</h1>
							<Input
								type="password"
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<Button className="bg-primary w-full text-white text-center py-2 rounded-md mt-5">
							Log In
						</Button>
						<p className="text-center mt-3 text-zinc-400 text-sm">
							Don't have an account?{' '}
							<Link
								to="/signup"
								className="font-semibold cursor-pointer text-[#111827]"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
				<div
					className=""
					style={{
						backgroundImage: `url(https://app.intellecs.ai/static/media/login.1ffae0de798488438d8b.jpg)`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '100%'
					}}
				></div>
			</div>
		</div>
	)
}

export default Login
