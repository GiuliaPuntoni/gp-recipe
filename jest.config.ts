// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/hooks/.*\\.(ts|tsx)$",
    "/src/store/.*\\.(ts|tsx)$",
  ],
};

module.exports = createJestConfig(customJestConfig);
