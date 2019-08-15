const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')
const expoPreset = require('jest-expo/jest-preset')
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = Object.assign(expoPreset, {
  ...tsjPreset,
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      babelConfig: false,
      tsConfig: './tsconfig.jest.json'
    }
  },
  modulePaths: ['<rootDir>'],
  setupFiles: [...expoPreset.setupFiles],
  setupFilesAfterEnv: ['<rootDir>/jest.init.js'],
  transformIgnorePatterns: [
    `node_modules/(
      ?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|
      @testing-library/react-native|redux|react-redux|redux-observable|redux-persist|redux-thunk|rxjs|
      styled-components|typesafe-actions|react-native-safe-area-view
    )`
  ],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/jest_config/*'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/jest_config/*',
    '!**/fakeData.ts',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ]
})
