module.exports = {
    testEnvironment: 'node',
    roots: ['__tests__'],
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: ['**/__tests__/**/*.test.(js|jsx)'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  };