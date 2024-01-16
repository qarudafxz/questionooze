import React, { useState } from 'react'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import { useMedia } from '@/hooks/useMedia'
import { Input, Button } from '@chakra-ui/react'
import { logIn, logInWithOAuth } from '@/api/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { check } from '@/utils/check'
import { toast, Toaster } from 'sonner'
import { useUserStore } from '@/store/user'
import LoadingBar from 'react-top-loading-bar'
import bg from '@/assets/bg.jpg'

const Login: React.FC = () => {
	const [progress, setProgress] = useState(0)
	const { setUser } = useUserStore()
	const navigate = useNavigate()
	const isMobile = useMedia('(max-width: 640px)')
	const [payload, setPayload] = useState({
		email: '',
		password: ''
	})

	return (
		<div className="font-main">
			<LoadingBar
				color="#6938EF"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={3}
			/>
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
							Welcome back
						</h1>
						<p className={`${isMobile ? 'text-sm' : 'text-md'} text-zinc-400 mt-1`}>
							Login to your account
						</p>
						<div className="mt-4">
							<Button
								onClick={logInWithOAuth}
								className=" w-full text-docs text-center py-2 rounded-md mt-5 flex gap-6 items-center border border-zinc-300 hover:bg-zinc-200 duration-150"
							>
								<FcGoogle />
								Sign up with Google
							</Button>
						</div>

						<div className="flex items-center mt-5">
							<div className="w-full h-[1px] bg-zinc-300" />
							<p className="mx-3 text-zinc-300 text-xs">OR</p>
							<div className="w-full h-[1px] bg-zinc-300" />
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
								logIn(payload).then(res => {
									setProgress(30)
									if (check(res, 'logIn').error) {
										toast.error(check(res, 'logIn').message)
									} else {
										toast.success(check(res, 'logIn').message)

										setUser({
											first_name: res?.user?.user_metadata?.first_name,
											last_name: res?.user?.user_metadata?.last_name,
											user_id: res.user?.id
										})
										setProgress(100)
										setTimeout(() => {
											navigate('/dashboard')
										}, 1900)
									}
								})
							}}
							className="bg-primary w-full text-white text-center py-2 rounded-md mt-5"
						>
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
						backgroundImage: `url(${bg})`,
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
