/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
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
