const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${[
      '@react-native',
      '@react-navigation',
      'react-native-reanimated',
      'react-native-gesture-handler',
      '@react-native-community',
      'react-native',
      'react-native-modal',
      'react-native-flash-message',
      'react-native-vector-icons',
    ].join('|')})/)`,
  ],
  moduleNameMapper: {
    '^~api(.*)$': '<rootDir>/src/api$1',
    '^~hooks(.*)$': '<rootDir>/src/hooks$1',
    '^~assets(.*)$': '<rootDir>/src/assets$1',
    '^~lib(.*)$': '<rootDir>/src/lib$1',
    '^~navigation(.*)$': '<rootDir>/src/navigation$1',
    '^~components(.*)$': '<rootDir>/src/components$1',
    '^~screens(.*)$': '<rootDir>/src/screens$1',
    '^~store(.*)$': '<rootDir>/src/store$1',
    '^~theme(.*)$': '<rootDir>/src/theme$1',
    '^~utils(.*)$': '<rootDir>/src/utils$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './jest.setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
