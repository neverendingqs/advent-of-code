const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(instruction => {
      const [operation, argument] = instruction.split(' ');
      return { operation, argument: parseInt(argument) };
    })
}

function runProgram(input) {
  let acc = 0;
  let pointer = 0;
  const visitedIndexes = new Set();
  while(!visitedIndexes.has(pointer)) {
    visitedIndexes.add(pointer);

    const { argument, operation } = input[pointer];

    switch(operation) {
      case 'acc':
        acc += argument;
      case 'nop':
        pointer += 1;
        break;
      case 'jmp':
        pointer += argument;
        break;
      default:
        throw new Error(`Unknown argument '${argument}`);
    }

    if(pointer >= input.length) {
      return { acc, hasLoop: false };
    }
  }

  return { acc, hasLoop: true };
}

async function p1() {
  const input = await getInput();
  return runProgram(input).acc;
}

async function p2() {
  const input = await getInput();
  for(let i = 0; i < input.length; i++) {
    const { argument, operation } = input[i];
    const newOperation = operation === 'nop'
      ? 'jmp'
      : operation === 'jmp'
        ? 'nop'
        : operation;

    const newInput = [
      ...input.slice(0, i),
      { argument, operation: newOperation },
      ...input.slice(i + 1)
    ];

    const { acc, hasLoop } = runProgram(newInput);

    if(!hasLoop) {
      return acc;
    }
  }

  throw new Error('Should not have reached here.')
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1:
   * p2:
   */
};
