/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["./src/hooks/__tests__ "],
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
