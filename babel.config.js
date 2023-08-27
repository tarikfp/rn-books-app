/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.ios.js',
          '.android.js',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '*': '.',
          '~root': './',
          '~src': './src',
          '~api': './src/api',
          '~hooks': './src/hooks',
          '~assets': './src/assets',
          '~lib': './src/lib',
          '~navigation': './src/navigation',
          '~components': './src/components',
          '~screens': './src/screens',
          '~store': './src/store',
          '~theme': './src/theme',
          '~utils': './src/utils',
        },
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ],
};
