/** @type {import('next').NextConfig} */
const nextjsDistDir = join("src", require("./src/next.config.js").distDir);
const nextjsServer = next({
    dev: false,
    conf: {
        distDir: nextjsDistDir,
        images: {
            domains: ['smarthome16.ru'],
        }
    }
});
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: [
//         '45.146.164.174',
//         'smarthome16.ru'
//     ]
//   },
// }

module.exports = nextjsServer
module.exports = {
  // ... rest of the configuration.
  output: 'standalone',
}
