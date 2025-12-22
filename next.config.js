/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;
