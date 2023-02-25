/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.MAIN_PORT,
        port: process.env.API_PORT,
        pathname: '/productImages/**',
      },
    ],
  },
}

module.exports = nextConfig
module.exports = {
  // ... rest of the configuration.
  output: 'standalone',
}
