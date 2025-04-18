/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "rgb(68, 5, 34)",
        "primary2" : "rgb(116, 44, 77)",
        "primary3" : "rgb(176, 163, 169)",
        "primaryHover" : "rgb(239, 233, 236)", 
      },
      fontSize: {
        "course-details-heading-small": ['26px', '36px'],
        "course-details-heading-large": ['36px', '44px'],
        "home-heading-small": ['28px', '34px'],
        "home-heading-large": ['48px', '56px'],
        "default": ['15px', '21px'],
      },
      gridTemplateColumns : {
        'auto' : 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      spacing: {
        'section-height' : "500px"
      },
      maxWidth: {
        'course-card' : '424px',
      },
      boxShadow: {
        'custom-card' : '0px 4px 15px 2px rgba(0,0,0,0.1)',
      },
      animation: {
        grow: 'grow 30s ease-in-out',
      },
      keyframes: {
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
