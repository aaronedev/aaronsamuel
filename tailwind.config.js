/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#100f15",
				blue: "#5339FF",
				cyan: "#80ffee",
				lightBlue: "#6D5DFF",
				darkBlue: "#3423B5",
				muted: "#677590",
				dark: "#1A1A1A",
				light: "#F5F5F5",
				lightMuted: "#9C9C9C",
				accent: {
					blue: "#d6c5fb",
					purple: "#40279b",
					brightBlue: "#5EA2FF",
					yellow: "#685AFF",
					cyan: "#80ffee",
					lightCyan: "#b3fff6",
					darkCyan: "#4dffff",
				},
			},
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
			fontSize: {
				"2xs": ".65rem",
				"3xs": ".5rem",
			},
			fontWeight: {
				light: 300,
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
			},
		},
	},
	plugins: [],
};
