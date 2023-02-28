import { transpile } from '../src/logging-espree.js';
import { removeSpaces, addTestPath } from '../src/util.js';

import * as fs from 'fs/promises';

'use strict';

describe('Transpile function', () => {
  describe('Should return the code generated', () => {
    it.each([
      { input: 'test1.js', output: 'correct1.js' },
      { input: 'test2.js', output: 'correct2.js' },
      { input: 'test3.js', output: 'correct3.js' },
      { input: 'test_rest.js', output: 'correct_rest.js' },
      { input: 'test_optional.js', output: 'correct_opt.js' },
    ])('The file $input should be transpiled to the contente inside $output', async ({ input, output }) => {
      const expected = await fs.readFile(addTestPath(`expected/${output}`), 'utf-8');
      const actual = await transpile(addTestPath(`input/${input}`));
      expect(removeSpaces(actual)).toEqual(removeSpaces(expected));
    });
  });

  xdescribe('Should creates an JS file with the JS code', () => {
    it.each([
      { input: 'test1.js', output: 'logged1.txt' },
      { input: 'test2.js', output: 'logged2.txt' },
      { input: 'test3.js', output: 'logged3.txt' },
      { input: 'test_rest.js', output: 'logged_rest.js' },
      { input: 'test_optional.js', output: 'logged_opt.js' },
    ])('The file $input (when piped with node) should log $output', async ({ input, output }) => {
      const expected = await fs.readFile(addTestPat(`logs/${output}`), 'utf-8');
      const actual = await transpile(addTestPath(`input/${input}`));
      expect(eval(actual)).toEqual(expected);
    });
  });

  describe('Should create a file with the JS code if the parameter is provided', () => {
    it.each([
      { input: 'test1.js', output: 'correct1.js' },
      { input: 'test2.js', output: 'correct2.js' },
      { input: 'test3.js', output: 'correct3.js' },
      { input: 'test_rest.js', output: 'correct_rest.js' },
      { input: 'test_optional.js', output: 'correct_opt.js' },
    ])('The file $input should generate a file with the content expected in $output', async ({ input, output }) => {
      const FILE_GENERATED = 'generated.js';
      const expected = await fs.readFile(addTestPath(`expected/${output}`), 'utf-8');
      await transpile(addTestPath(`input/${input}`), addTestPath(FILE_GENERATED));
      const actual = await fs.readFile(addTestPath(FILE_GENERATED), 'utf-8');
      expect(removeSpaces(actual)).toEqual(removeSpaces(expected));
    });
  });
});