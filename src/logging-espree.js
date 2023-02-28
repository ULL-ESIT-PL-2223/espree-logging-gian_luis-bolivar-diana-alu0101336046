import * as escodegen from 'escodegen';
import * as espree from 'espree';
import * as estraverse from 'estraverse';
import * as fs from 'fs/promises';

/**
 * @description Transpile a js file, adding logging statements to the
 *   beginning of each function.
 *
 * @param {string} inputFile The file where the input is stored.
 * @param {string} outputFile The file to output the new code generated.
 * @returns {string} The JS code generated.
 */
export async function transpile(inputFile, outputFile) {
  const input = await fs.readFile(inputFile, 'utf-8');
  const output = addLogging(input);
  if (outputFile) await fs.writeFile(outputFile, output);
  return output;
}

/**
 * @description Adds logging statements at the beginning of any function.
 *
 * @param {string} code The code to process.
 * @returns {string} The JavaScript code with logging statements added
 */
function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 2020, loc: true });
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
  const params = node.params.map((p) => {
    if (p.type === 'Identifier') return `\${ ${p.name} }`;
    else if (p.type === 'RestElement') return `...\${ ${p.argument.name} }`;
    else if (p.type === 'AssignmentPattern') return `\${ ${p.left.name} } = ${p.right.value}`;
  }).join(', ');
  const { line } =  node.loc.start;
  const beforeCode = `console.log(\`Entering ${name}(${params}) at line ${line}\`);`; // :) <- Estela made this
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 2020 }).body;
  node.body.body = [ ...beforeNodes, ...node.body.body ];
}
