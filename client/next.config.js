/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '45.146.164.174',
        port: '5000',
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
