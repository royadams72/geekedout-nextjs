import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/", // Ignore node_modules
    "<rootDir>/.next/", // Ignore Next.js build files
    "<rootDir>/dist/", // Ignore build output
    "<rootDir>/coverage/", // Ignore coverage reports
    "<rootDir>/logs/", // Ignore log files
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: "tsconfig.json",
    },
  },
};

export default createJestConfig(config);
