/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#121212',
                'dark-surface': '#1e1e1e',
                'dark-card': '#252525',
                'brand-blue': '#2563eb', // Electric blue
                'status-yellow': '#eab308', // Yellow for "On Hold"
                'text-primary': '#e5e7eb', // Light gray for primary text
                'text-secondary': '#9ca3af', // Darker gray for secondary text
            }
        },
    },
    plugins: [],
}
