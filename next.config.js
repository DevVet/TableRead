/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    isDevelopment: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
