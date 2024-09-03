/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#100f15",
				purple: "#40279b",
				cyan: "#80ffee",
				muted: "#677590",
				dark: "#1A1A1A",
				light: "#F5F5F5",
				lightMuted: "#9C9C9C",
				accent: {
					cyan: "#8ffff0",
					lightCyan: "#d1fffa",
					darkCyan: "#0cbbbb",
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
			keyframes: {
				"bounce-in-up": {
					"0%, 100%": {
						transform: "translateY(0)",
						animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
			},
			animation: {
				"bounce-in-up-fast": "bounce-in-up 0.1s infinite",
				"bounce-in-up-slow": "bounce-in-up 1s infinite",
			},
		},
	},
	plugins: [],
};
