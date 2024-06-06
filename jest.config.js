module.exports = {
    preset: '@shelf/jest-mongodb',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
      '^@middleware/(.*)$': '<rootDir>/middleware/$1', // Add this line
    },
  };