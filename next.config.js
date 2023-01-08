/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: "/compile/:path*", destination: "/api/:path*" }
    ];
  },
}

module.exports = nextConfig;
