/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			textColor: {
				docs: '#111827',
				primary: '#6519BA',
				mid: '#6938EF',
				secondary: '#F670C7'
			},
			backgroundColor: {
				primary: '#6519BA',
				mid: '#6938EF',
				secondary: '#F670C7',
				light: '#F9FAFB',
				dark: '#111827'
			},
			borderColor: {
				primary: '#6519BA',
				mid: '#6938EF',
				secondary: '#F670C7'
			},
			fontFamily: {
				main: ['Inter', 'sans-serif'],
				head: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: []
}
