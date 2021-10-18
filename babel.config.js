module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: 
  ['react-native-reanimated/plugin',
    ['dotenv-import', {
      'moduleName': '@env',
      'path': '.env',
    }]
  ],
};
