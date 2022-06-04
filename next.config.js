const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfigs = {
  poweredByHeader: false,
  env: {
    TZ: 'Asia/Calcutta',
  },
  images: {
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
    domains: ['drive.google.com', 'upload.wikimedia.org'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.minimize = true;
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfigs);
