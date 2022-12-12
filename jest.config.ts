import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src/test"],
  // modulePaths: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      {
        isolatedModules: true
      }
    ]
  },
  moduleNameMapper: {
    "^@businessGuard/(.*)$": "<rootDir>/src/businessGuard/$1",
    "^@app/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  testEnvironment: "node"
  // setupFiles: ['<rootDir>/src/test/init.ts']
};

export default config;
