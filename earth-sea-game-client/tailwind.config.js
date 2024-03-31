/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                clemenceau_cv: "url('/clemenceau_cv.webp')",
                submarine: "url('/submarine.webp')",
                rocket: "url('/rocket.webp')",
                aircraft: "url('/aircraft.webp')",
            },
        },
    },
    plugins: [require("daisyui")],
};
