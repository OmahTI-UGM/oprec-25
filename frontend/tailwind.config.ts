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
      screens: {
        'xxs': '360px',
		'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
		'2xl': '1536px',
		'3xl': '1800px'
      },
  		fontFamily: {
  			'poppins-semibold': ["Poppins SemiBold", "sans-serif"],
  			'poppins-regular': ["Poppins Regular", "sans-serif"],
  			'poppins-light': ["Poppins Light", "sans-serif"],
  			'poppins-medium': ["Poppins Medium", "sans-serif"]
  		},
		fontSize: {
			xxs : '0.5rem',
			xs : '0.6rem',
			sm: '0.8rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
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
  			'custom-red': '#FF4949',
				'custom-blue': '#6069FF'
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
