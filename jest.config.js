module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testRegex: '\\.test\\.jsx$',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}']
};
