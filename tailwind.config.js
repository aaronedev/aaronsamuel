/** @type {import('tailwindcss').Config} */
export default {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{vue,js}"],
	theme: {
		extend: {
			colors: {
				background: "#100f15",
				text: {
					muted: "#677590",
					lightMuted: "#9C9C9C",
					primary: "#FFFFFF",
				},
				accent: {
					blue: "#d6c5fb",
					cyan: "#60F8DE",
					purple: "#40279b",
					brightBlue: "#5EA2FF",
					yellow: "#685AFF",
				},
				primary: {
					blue: "#5339FF",
					cyan: "#02E4DC",
				},
				error: "#B14A4A",
				warning: "#CA4242",
				link: "#42e0b4c7",
				selection: "#5a297d",
				neutral: "#FFFFFF",
				editor: {
					background: "#0E0D11",
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
				terminal: {
					cursor: "#FF338C",
				},
				titlebar: {
					background: "#0E0D11",
					text: "#a89fc0",
				},
			},
			fontFamily: {
				sans: ["Ubuntu Sans Mono", "sans-serif"],
			},
			fontSize: {
				h1: ["42px", { lineHeight: "1.2", fontWeight: "900" }],
				h2: ["26px", { lineHeight: "1.3", fontWeight: "800" }],
				h3: ["18px", { lineHeight: "1.4", fontWeight: "700" }],
				h4: ["14px", { lineHeight: "1.5", fontWeight: "600" }],
				h5: ["12px", { lineHeight: "1.6", fontWeight: "500" }],
				h6: ["10px", { lineHeight: "1.7", fontWeight: "500" }],
			},
			animation: {
				fadeIn: "fadeIn 1s ease-in",
				slideUp: "slideUp 0.5s ease-in-out",
				fadeInDown: "fadeInDown 0.8s ease-in-out",
				fadeInUp: "fadeInUp 0.8s ease-in-out",
				slideInLeft: "slideInLeft 0.7s ease-in-out",
				blink: "blink 1.5s step-end infinite",
			},
			keyframes: {
				blink: {
					"0%, 50%": { opacity: 1 },
					"50.01%, 100%": { opacity: 0 },
				},
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				slideUp: {
					from: { transform: "translateY(10px)", opacity: 0 },
					to: { transform: "translateY(0)", opacity: 1 },
				},
				fadeInDown: {
					from: { opacity: 0, transform: "translateY(-10px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				fadeInUp: {
					from: { opacity: 0, transform: "translateY(10px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				slideInLeft: {
					from: { transform: "translateX(-100%)", opacity: 0 },
					to: { transform: "translateX(0)", opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
