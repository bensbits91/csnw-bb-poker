import type { Config } from 'jest';

const config: Config = {
   preset: 'ts-jest', // Use ts-jest for TypeScript files
   testEnvironment: 'node', // Set the test environment to Node.js
   transform: {
      '^.+\\.tsx?$': 'ts-jest' // Use ts-jest to transform TypeScript files
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize TypeScript files
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // Map @/ to the src/ directory
   }
};

export default config;
