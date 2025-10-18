const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure NativeWind CSS support
config.transformer.babelTransformerPath = require.resolve('react-native-css-transformer');
config.resolver.assetExts.push('css');

module.exports = config;
