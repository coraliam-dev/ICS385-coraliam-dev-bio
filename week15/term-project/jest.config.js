module.exports = {
  // Restrict Jest to this project folder to avoid scanning the whole workspace
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.js'],
  testEnvironment: 'node',
  // Ignore parent folders
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/../'],
  moduleDirectories: ['node_modules'],
};
