export const build = (path: string) => {
	return import.meta.env.DEV
		? `http://localhost:5000/api${path}`
		: `/api/${path}`
}
