import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import { useMedia } from '@/hooks/useMedia'
import { Input, Button } from '@chakra-ui/react'
import { signUp } from '@/api/auth'
import { toast, Toaster } from 'sonner'
import { check } from '@/utils/check'

const Signup: React.FC = () => {
	const navigate = useNavigate()
	const isMobile = useMedia('(max-width: 640px)')
	const [payload, setPayload] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	})

	return (
		<div className="font-main">
			<Toaster position="bottom-left" />
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
							Hello World
						</h1>
						<p className={`${isMobile ? 'text-sm' : 'text-md'} text-zinc-400 mt-1`}>
							Create a new account
						</p>

						<div className="mt-4">
							<h1>First Name</h1>
							<Input
								type="text"
								onChange={e => setPayload({ ...payload, first_name: e.target.value })}
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<div className="mt-4">
							<h1>Last Name</h1>
							<Input
								type="text"
								onChange={e => setPayload({ ...payload, last_name: e.target.value })}
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<div className="mt-4">
							<h1>Email</h1>
							<Input
								type="email"
								onChange={e => setPayload({ ...payload, email: e.target.value })}
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<div className="mt-4">
							<h1>Password</h1>
							<Input
								type="password"
								onChange={e => setPayload({ ...payload, password: e.target.value })}
								className="w-full mt-2 border border-zinc-300 rounded-md pl-3 py-1"
								variant="flushed"
								size="lg"
							/>
						</div>
						<Button
							onClick={() => {
								signUp(payload).then(res => {
									console.log(check(res, 'signUp').error)
									if (check(res, 'signUp').error) {
										toast.error(check(res, 'signUp').message as ReactNode)
									} else {
										setTimeout(() => navigate('/login'), 1200)
									}
								})
							}}
							className="bg-primary w-full text-white text-center py-2 rounded-md mt-5"
						>
							Signup
						</Button>
						<p className="text-center mt-3 text-zinc-400 text-sm">
							Already had an account?{' '}
							<Link
								to="/login"
								className="font-semibold cursor-pointer text-[#111827]"
							>
								Log in
							</Link>
						</p>
					</div>
				</div>
				<div className="bg-black w-full" />
			</div>
		</div>
	)
}

export default Signup
