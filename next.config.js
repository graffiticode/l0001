/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: '/compile/:path*', destination: '/api/:path*' }
    ];
  },
}

module.exports = nextConfig;
