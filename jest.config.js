'use strict';

/** @type {import('jest').Config} */
const config = {
  coveragePathIgnorePatterns: [
  ],
  coverageDirectory: 'docs',
  coverageReporters: [
    'html',
    'text',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  displayName: {
    name: 'Espree Logging Tests',
    color: 'cyan',
  },
  verbose: false,
};

export default config;