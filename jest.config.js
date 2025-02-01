module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-reanimated|react-redux|react-native-actions-sheet|@react-native|react-native-gesture-handler|react-native-skeleton-placeholder|@react-native-masked-view)/)',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.png$': '<rootDir>/__mocks__/imageMock.js',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
