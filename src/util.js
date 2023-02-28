'use strict';

/**
 * @description Removes spaces from a string
 *
 * @param {string} string The string to reformat
 * @returns {string} The string without spaces
 */
export function removeSpaces(string) {
  return string.replace(/\s/g, '');
}

/**
 * @description Adds 'test/data' to the path
 *
 * @param {string} path The path to add the test/data folder
 * @returns {string} The path inside the test/data
 */
export function addTestPath(path) {
  return `test/data/${path}`;
}