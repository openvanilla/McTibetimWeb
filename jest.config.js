module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json', 'html', 'clover', 'json-summary'],
  moduleNameMapper: {
    '^tibetan-ewts-converter/EwtsConverter$': '<rootDir>/src/test_support/EwtsConverterMock.ts',
  },
};
