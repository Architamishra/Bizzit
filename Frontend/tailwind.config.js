module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, and TSX files in the src folder
    "./public/index.html", // Include index.html if you're using Tailwind in the root HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
