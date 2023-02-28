import { transpile } from '../src/logging-espree.js';
import * as fs from 'fs/promises';

describe('Transpile function', () => {
  describe('Should transpile a simple JS file', () => {
    it.each([
      { input: 'test/data/test1.js', output: 'test/data/correct-logged1.js' },
      { input: 'test/data/test2.js', output: 'test/data/correct-logged2.js' },
      { input: 'test/data/test3.js', output: 'test/data/correct-logged3.js' },
    ])('The file $input should be transpiled to $output', async ({ input, output }) => {
      const expected = await fs.readFile(output, 'utf-8');
      const actual = await transpile(input, output);
      expect(actual).toEqual(expected);
    });
  });

  describe('Should creates an JS file with the JS code', () => {
    it.each([
      { input: 'test/data/test1.js', output: 'test/data/logged-out1.txt' },
      { input: 'test/data/test2.js', output: 'test/data/logged-out2.txt' },
      { input: 'test/data/test3.js', output: 'test/data/logged-out3.txt' },
    ])('The file $input (when piped with node) should log $output', async ({ input, output }) => {
      const OLD_LOG = console.log;
      console.log = (x) => x;
      const expected = await fs.readFile(output, 'utf-8');
      const actual = await transpile(input);
      expect(eval(actual)).toEqual(expected);
      console.log = OLD_LOG;
    });
  });
});