/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: '.',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^#/(.*)$': '<rootDir>/src/test/$1',
  },

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/app/services/**/*.ts',
    '<rootDir>/src/app/dto/request/**/*.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/src/test/setup-tests.ts'],
};
