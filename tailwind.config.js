/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				body: ["Inter", "sans-serif"],
			},
			colors: {
				primary: "#4b6580",
				info: "#11c5db",
				strike: "#d1d2db",
				icon: "#3b3e66",
				error: "#EB5757",
				danger: "#f83245",
			},
			boxShadow: {
				invalid: "0 0 0 0.2rem #eb575733",
				dangers: "0 0.25rem 0.55rem rgba(248,50,69,.35)",
				dangers_hover:
					"0 0.22rem 0.525rem rgba(248,50,69,.4), 0 0.0625rem 0.385rem rgba(248,50,69,.54)",
			},
		},
	},
	plugins: [],
};
