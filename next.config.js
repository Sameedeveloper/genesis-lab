/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: "assets.coingecko.com" },
          { hostname: "e7.pngegg.com" },
          { hostname: "w7.pngwing.com" },

        ],
      },
}

module.exports = nextConfig
