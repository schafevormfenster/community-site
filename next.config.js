const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfigs = {
  poweredByHeader: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.minimize = true;
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de/));
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfigs);
