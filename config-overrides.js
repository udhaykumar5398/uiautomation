// config-overrides.js
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    new InjectManifest({
      swSrc: './src/service-worker.js',
      swDest: 'service-worker.js',
    })
  );
  return config;
};