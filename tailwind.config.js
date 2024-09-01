/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"background-dark": "#0E0D11", // Background color
				"text-muted": "#7FA0C1", // Muted text (black)
				"primary-blue": "#5339FF", // Primary blue color
				"text-light-muted": "#9C9C9C", // Light muted text (brightBlack)
				"highlight-blue": "#7B69E1", // Highlight blue (brightBlue)
				"accent-cyan": "#60F8DE", // Accent cyan (brightCyan)
				"accent-purple": "#7B5AFF", // Accent purple (brightGreen)
				"bright-accent-blue": "#5EA2FF", // Bright accent blue (brightPurple)
				"error-red": "#B14A4A", // Error red (brightRed)
				"bright-white": "#FFFFFF", // Bright white
				"warning-yellow": "#685AFF", // Warning yellow (brightYellow)
				"cursor-red": "#550A0A", // Cursor color
				"primary-cyan": "#02E4DC", // Primary cyan
				"text-foreground": "#FFFFFF", // Foreground text
				"secondary-purple": "#B892FF", // Secondary purple (green in terminal)
				"link-blue": "#2883FF", // Link blue (purple in terminal)
				"danger-red": "#CA4242", // Danger red
				"selection-purple": "#4B1279", // Selection background
				"neutral-white": "#FFFFFF", // Neutral white
				"warning-muted-yellow": "#766DD2", // Muted warning yellow (yellow in terminal)
			},
			fontFamily: {
				sans: ["Ubuntu Sans Mono", "sans-serif"],
			},
		},
	},
	plugins: [],
};
