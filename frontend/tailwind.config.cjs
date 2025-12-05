module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orangeAccent: "#F08B3F",
        deepOrange: "#E36F2B",
        footerOrange: "#F08B3F"
      },
      fontFamily: {
        body: ["ui-sans-serif", "system-ui", "Helvetica", "Arial"]
      },
      container: { center: true, padding: "1rem" }
    }
  },
  plugins: []
};
