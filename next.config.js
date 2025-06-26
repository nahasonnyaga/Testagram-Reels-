/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // required for static export
  images: {
    unoptimized: true
  },
  reactStrictMode: true
};

module.exports = nextConfig;
