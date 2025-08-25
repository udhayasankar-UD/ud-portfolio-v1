
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"], // Enable class-based dark mode toggle
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'neu': '8px 8px 20px #191c23, -8px -8px 20px #232833', // Neumorphic shadow (light/dark)
				'neu-inset': 'inset 5px 5px 10px #191c23, inset -5px -5px 10px #232833',
				'glass': '0 8px 32px 0 rgba(31,38,135,0.37)',
				'soft-glow': '0 0 12px 2px #4096ff33',
			},
			colors: {
				'gray-verydark': '#181a20',
				'blue-glow': '#60a5fa',
			},
			scale: {
				'103': '1.03',
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, #181a20 0%, #232833 100%)',
				'section-layer': 'linear-gradient(110deg, #232833 60%, #232f40 100%)',
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.2, 0.7, 0.4, 1) both',
				'fade-slide': 'fade-slide 0.7s cubic-bezier(0.2, 0.7, 0.4, 1) both'
			},
			keyframes: {
				'fade-in-up': {
					'0%': { opacity: 0, transform: 'translateY(32px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' }
				},
				'fade-slide': {
					'0%': { opacity: 0, transform: 'translateX(-20px)' },
					'100%': { opacity: 1, transform: 'translateX(0)' }
				}
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
} satisfies Config;
