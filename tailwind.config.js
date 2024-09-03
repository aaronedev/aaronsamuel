/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#100f15",
				primary: {
					blue: "#5339FF",
					cyan: "#80ffee",
				},
				text: {
					muted: "#677590",
					lightMuted: "#9C9C9C",
					primary: "#FFFFFF",
				},
				accent: {
					blue: "#d6c5fb",
					purple: "#40279b",
					brightBlue: "#5EA2FF",
					yellow: "#685AFF",
				},
			},
			extend: {
				spacing: {
					128: "32rem",
					144: "36rem",
				},
				borderRadius: {
					"4xl": "2rem",
				},
			},
		},
	},
	plugins: [],
};
