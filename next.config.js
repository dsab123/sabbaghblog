/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.afterCompile.tap('WatchPosts', (compilation) => {
            compilation.contextDependencies.add(
              path.join(__dirname, '_posts')
            );
          });
        },
      });
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
