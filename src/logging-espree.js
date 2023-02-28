import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  // Fill in the code here
}

/**
 * @description Adds logging statements at the beginning of any function.
 *
 * @param {string} code The code to process.
 * @returns {string} The JavaScript code with logging statements added
 */
function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 2020 });
  estraverse.traverse(ast, {
    enter: function(node, _) {
      if (/\w*Function\w*/.test(node.type)) addBeforeCode(node);
    }
  });
  return escodegen.generate(ast);
}

/**
 * @description Adds logging code to the beginning of a function.
 *
 * @param {Node} node The node to add the logging code to.
 */
function addBeforeCode(node) {
  const name = node.id?.name ?? '<anonymous function>';
  const params = node.params.map((p) => `\${ ${p.name} }`).join(', ');
  const beforeCode = `console.log('Entering ${name}(${params})');`; // :) <- Estela made this
  const beforeNodes = espree.parse(beforeCode).body;
  node.body.body = [ ...beforeNodes, ...node.body.body ];
}
