const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const withImages = require('next-images');
const webpack = require('webpack');

module.exports = {
  ...withImages({
    swcMinify: true,
    esModule: true,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: require.resolve('browserify-fs'),
        };
      }

      config.plugins = [
        ...config.plugins,
        new NodePolyfillPlugin(),
        new webpack.ContextReplacementPlugin(/mocha|typescript|redspot|express/),
        new webpack.IgnorePlugin({
          resourceRegExp: /ts-node|perf_hooks/,
        }),
      ];

      return config;
    },
  }),
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
