/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
        '45.146.164.174'
    ]
  },
}

module.exports = nextConfig
module.exports = {
  // ... rest of the configuration.
  output: 'standalone',
}
