import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMedia } from '@/hooks/useMedia'
import Thumb from '@/components/landing/Thumb'
import { useToggle } from '@/store/toggle'
import { useUserStore } from '@/store/user'
import { IoMdLogOut } from 'react-icons/io'
import { logOut } from '@/api/auth'
import LoadingBar from 'react-top-loading-bar'

const UserDetails: React.FC<{ label: string; description: string }> = ({
	label,
	description
}) => {
	const navigate = useNavigate()
	const storage = localStorage.getItem(import.meta.env.VITE_SESSION_KEY)
	const token = JSON.parse(storage as string)?.access_token
	const { user } = useUserStore()
	const { theme } = useToggle()
	const isMobile = useMedia('(max-width: 640px)')
	const [progress, setProgress] = useState(0)

	return (
		<div>
			<LoadingBar
				color="#6938EF"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={3}
			/>
			{isMobile ? (
				<div className="flex justify-between items-center pl-10 px-4 py-4">
					<div className=""></div>
					<div className="flex gap-4 items-center">
						<Thumb />
						<button
							onClick={() =>
								logOut(token).then(res => {
									setProgress(30)
									if (res) {
										setProgress(100)
										setTimeout(() => {
											navigate('/login')
										}, 1500)
									}
								})
							}
						>
							<IoMdLogOut
								size={30}
								className={`${theme === 'light' ? 'text-docs' : 'text-white'}`}
							/>
						</button>
					</div>
				</div>
			) : (
				<div
					className={`flex justify-between items-center py-4 px-20  border-b ${
						theme === 'light' ? 'border-zinc-300' : 'border-[#1e2844]'
					}`}
				>
					<div className="flex flex-col gap-2">
						<h1
							className={`${
								theme === 'light' ? 'text-primary' : 'text-white'
							} font-bold pl-24 font-head text-3xl`}
						>
							{label}
						</h1>
						{description && (
							<p
								className={`${
									theme === 'light' ? 'text-docs' : 'text-white'
								} font-thin pl-24 font-head text-sm`}
							>
								{description}
							</p>
						)}
					</div>
					<div
						className={`flex gap-4 items-center ${
							theme === 'light' ? 'bg-zinc-200' : 'bg-[#090c14]'
						} duration-150 py-2 px-5 rounded-full`}
					>
						<h1
							className={`font-head font-medium ${
								theme === 'light' ? 'text-docs' : 'text-white'
							} duration-150`}
						>
							{user.first_name + ' ' + user.last_name}
						</h1>
						<Thumb />
						<button
							onClick={() =>
								logOut(token).then(res => {
									if (res) {
										navigate('/login')
									}
								})
							}
						>
							<IoMdLogOut
								size={30}
								className={`${
									theme === 'light' ? 'text-white bg-mid' : 'text-dark bg-mid'
								} rounded-full p-2`}
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserDetails
