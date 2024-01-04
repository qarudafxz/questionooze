//eslint-disable-next-line
//@ts-nocheck
import { useEffect, useState } from 'react'

export const useMedia = (query: string): boolean => {
	console.log(query)
	const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query)

		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		handleChange(mediaQueryList)

		const mediaQueryListener = (event: MediaQueryListEvent) => handleChange(event)

		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener('change', mediaQueryListener)
		} else {
			mediaQueryList.addEventListener(mediaQueryListener)
		}

		return () => {
			if (mediaQueryList.removeEventListener) {
				mediaQueryList.removeEventListener('change', mediaQueryListener)
			} else {
				mediaQueryList.removeEventListener(mediaQueryListener)
			}
		}
	}, [query])

	return matches
}
