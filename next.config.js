const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, './src/');
    return config;
  },
  images: {
    domains: ['i.scdn.co'],
  },
};

module.exports = nextConfig;
