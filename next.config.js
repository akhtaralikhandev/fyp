// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://6427bd07e28005414b4c0751--resonant-dolphin-61e8b3.netlify.app/:path*",
      },
    ];
  },
};
