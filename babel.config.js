module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        'root': ['./src'],
        'alias': {
          '@common': './components/common',
          '@components': './components',
          '@screens': './screens',
          '@utils': './utils',
          '@reducers': './redux/reducers',
          '@epics': './redux/epics',
          '@actions': './redux/actions'
        }
      }]
    ]
  };
};
