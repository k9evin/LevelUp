/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;
