import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'poppins-semibold': ["Poppins SemiBold", "sans-serif"],
  			'poppins-regular': ["Poppins Regular", "sans-serif"],
  			'poppins-light': ["Poppins Light", "sans-serif"],
  			'poppins-medium': ["Poppins Medium", "sans-serif"]
  		},
  		colors: {
  			'custom-black': '#242529',
  			'custom-gray-dark': '#37373F',
  			'custom-lavender': '#A6ABFD',
  			'custom-peach': '#FF9F75',
  			'custom-gray': '#7A7A89',
  			'custom-silver': '#ECEAEA',
  			'custom-purple': '#696C9A',
  			'custom-orange': '#FF7538',
  			'custom-gray-light': '#D7D2D2',
  			'custom-neon': '#4DFF49',
  			'custom-red': '#FF4949'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			gradient: 'gradient 8s linear infinite'
  		},
  		keyframes: {
  			gradient: {
  				to: {
  					backgroundPosition: 'var(--bg-size) 0'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
