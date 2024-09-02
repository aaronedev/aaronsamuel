export default {
	plugins: {
		tailwindcss: {},
		"postcss-import": {},
		"tailwindcss/nesting": "postcss-nesting",
		autoprefixer: {},
		...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
	},
};
