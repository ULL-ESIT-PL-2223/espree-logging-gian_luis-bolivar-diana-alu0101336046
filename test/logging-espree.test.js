import { transpile } from '../src/logging-espree.js';
import { removeSpaces, addTestPath } from '../src/util.js';

import * as fs from 'fs/promises';

'use strict';

describe('Transpile function', () => {
  describe('Should transpile a simple JS file', () => {
    it.each([
      { input: 'test1.js', output: 'correct-logged1.js' },
      { input: 'test2.js', output: 'correct-logged2.js' },
      { input: 'test3.js', output: 'correct-logged3.js' },
    ])('The file $input should be transpiled to the contente inside $output', async ({ input, output }) => {
      const expected = await fs.readFile(addTestPath(output), 'utf-8');
      const actual = await transpile(addTestPath(input));
      expect(removeSpaces(actual)).toEqual(removeSpaces(expected));
    });
  });

  describe('Should creates an JS file with the JS code', () => {
    xit.each([
      { input: 'test/data/test1.js', output: 'test/data/logged-out1.txt' },
      { input: 'test/data/test2.js', output: 'test/data/logged-out2.txt' },
      { input: 'test/data/test3.js', output: 'test/data/logged-out3.txt' },
    ])('The file $input (when piped with node) should log $output', async ({ input, output }) => {
      const expected = await fs.readFile(output, 'utf-8');
      const actual = await transpile(input);
      expect(eval(actual)).toEqual(expected);
    });
  });

  describe('Should create a file with the JS code if the parameter is provided', () => {
    it.each([
      { input: 'test1.js', output: 'correct-logged1.js' },
      { input: 'test2.js', output: 'correct-logged2.js' },
      { input: 'test3.js', output: 'correct-logged3.js' },
    ])('The file $input should generate a file with the content expected in $output', async ({ input, output }) => {
      const FILE_GENERATED = 'generated.js';
      const expected = await fs.readFile(addTestPath(output), 'utf-8');
      await transpile(addTestPath(input), addTestPath(FILE_GENERATED));
      const actual = await fs.readFile(addTestPath(FILE_GENERATED), 'utf-8');
      expect(removeSpaces(actual)).toEqual(removeSpaces(expected));
    });
  });
});