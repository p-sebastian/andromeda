module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        'alias': {
          '@common': './src/components/common',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@reducers': './src/redux/reducers',
          '@epics': './src/redux/epics',
          '@actions': './src/redux/actions',
          '@hooks': './src/hooks'
        }
      }]
    ]
  };
};
