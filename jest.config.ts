// jest.config.ts
import nextJest from "next/jest";
import type { Config } from "@jest/types";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/layout.tsx",
    "!src/app/page.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 50,
      lines: 55,
      statements: 54,
    },
  },
};

export default createJestConfig(customJestConfig);
