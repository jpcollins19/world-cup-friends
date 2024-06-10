const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/*.{html,js, tsx}", "./src/**/*.{html,js,tsx}"],
  theme: {
    boxShadow: {
      routesNotSelected: "0 0 6px 0 #e5e7eb",
      routesSelected: "0 0 6px 0 #0369a1",
      routesHover: "0 0 6px 0 #0ea5e9",
      payoutBorder: "0 0 3px 0 #cbd5e1",
    },
    extend: {
      boxShadow: ["active"],
      // keyframes: {
      //   enter: {
      //     "0%": { transform: "scale(0.9)", opacity: 0 },
      //     "100%": { transform: "scale(1)", opacity: 1 },
      //   },
      //   leave: {
      //     "0%": { transform: "scale(1)", opacity: 1 },
      //     "100%": { transform: "scale(0.9)", opacity: 0 },
      //   },
      //   "slide-in": {
      //     "0%": { transform: "translateY(-100%)" },
      //     "100%": { transform: "translateY(0)" },
      //   },
      // },
      // backgroundPosition: {
      //   "top-4": "center top 4rem",
      // },
      // borderRadius: {
      //   5: "5px",
      //   10: "10px",
      // },
      // rotate: {
      //   3: "3deg",
      // },
      // boxShadow: {
      //   "b-1": "0 8px 9px rgba(0, 0 , 0, 0.06)",
      //   1: "0 1px 12px rgba(0, 0 , 0, 0.06)",
      //   2: "0 2px 10px rgba(0,0, 0, 0.08)",
      //   5: "0px 0.375rem 1rem 0px rgba(0, 0, 0, 0.32)",
      //   lg: "0 0px 20px -10px rgba(0, 0, 0, 0.02), 0 4px 7px -4px rgba(0,0,0,0.2)",
      // },
      // colors: {
      //   transparent: "transparent",
      //   "light-grey": "#FAFAFA",
      //   "dark-grey": "#545465",
      //   "muted-white": "#F3F6F5",
      //   "muted-white2": "#FFFAF1",
      //   "off-white": "#FFFBF2",
      //   "dark-navy": "#1E2749",
      //   navy: "#455387",
      //   saffron: "#E9BD20",
      //   grey2: "#E6E9EB",
      //   grey3: "#DDDFE5",
      //   grey4: "#939DA8",
      // },
      fontFamily: {
        sans: "Helvetica, Arial, sans-serif",
        // sans: ["Craftworkgrotesk", ...defaultTheme.fontFamily.sans],
        //serif: ["Craftworkgrotesk", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        vw2XLg: "3vw",
        vwXLg: "2vw",
        vwLg: "1.5vw",
        vwBase: "1vw",
        vwSm: ".8vw",
      },
      margin: {
        "17vw": "17vw",
        // "groupDetailsColumn": "17vw",
      },
      textShadow: {
        sm: "0 1.5px 1.5px #020617",
        smWhite: "0 1.5px 1.5px #fff",
        med: "3px 3px 3px #020617",
      },
      width: {
        payoutPlace: "4vw",
        payoutAmount: "8vw",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
