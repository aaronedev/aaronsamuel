/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	mode: "jit",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#100f15",
				textPrimary: "#c7dcd5",
				textSecondary: "#9C9C9C",
				primary: "#d6c5fb",
				secondary: "#60F8DE",
				error: "#d71d1d",
				warning: "#fdba6d",
				link: "#04fbb5d9",
				selection: "#2c0547b5",
				neutral: "#FFFFFF",
			},
			accent: {
				blue: "#3d3ad4",
				cyan: "#60F8DE",
				purple: "#40279b",
				brightBlue: "#7ac6ff",
				yellow: "#ffdb94",
			},
			sidebar: {
				background: "#110e17",
				text: "#ffffff",
			},
			statusbar: {
				background: "#1a1421",
				text: "#c7dcd5",
			},
			tab: {
				inactive: {
					background: "#1a14213e",
					border: "#1a1421",
					text: "#7FA0C1",
				},
			},
			dark: {
				primary: "#333",
				secondary: "#444",
				background: "#222",
				text: "#fff",
				// ... other dark theme colors ...
			},
			fontFamily: {
				sans: ["Ubuntu Sans Mono", "sans-serif"],
			},
		},
	},
	plugins: [],
};
