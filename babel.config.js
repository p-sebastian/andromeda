module.exports = function(api) {
  const isTest = api.env('test')
  // const isTest = false

  const presets = [
    'module:metro-react-native-babel-preset'
    // isTest ? 'metro-react-native-babel-preset' : ''
  ].filter(Boolean)

  api.cache(false)
  return {
    presets,
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@routes': './src/app.routes',
            '@common': './src/components/common',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@reducers': './src/redux/reducers',
            '@epics': './src/redux/epics',
            '@actions': './src/redux/actions',
            '@hooks': './src/hooks',
            '@interfaces': './src/interfaces'
          }
        }
      ]
    ]
  }
}
