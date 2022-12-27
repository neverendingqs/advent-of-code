import readInput from '../lib/readInput';

interface Instruction {
  destination: number,
  numCrates: number,
  source: number,
}

interface Input {
  instructions: Instruction[],
  stacks: string[][],
}

async function getInput(): Promise<Input> {
  const file: string = await readInput(__dirname);
  const lines: string[] = file.split('\n');

  const instructionsIndex: number = lines.findIndex((line: string) => line.startsWith('move'));
  const numStacksIndex: number = instructionsIndex - 2;

  const numStacks: number = lines[numStacksIndex]
    .replaceAll(' ', '')
    .length;

  const stacks: string[][] = [...Array(numStacks).keys()]
    .map(() => []);

  for(let lineIndex: number = numStacksIndex - 1; lineIndex >= 0; lineIndex--) {
    const row: string[] = lines[lineIndex]
      .split('')
      .filter((char: string, i: number) => ((i - 1) % 4) === 0);

    for(let stackIndex: number = 0; stackIndex < row.length; stackIndex++) {
      const possibleCrate: string = row[stackIndex];
      if(possibleCrate !== ' ') {
        stacks[stackIndex].push(possibleCrate);
      }
    }
  }

  const instructions: Instruction[] = lines
    .slice(instructionsIndex)
    .map((unparsedInstruction: string) => {
      const found: RegExpMatchArray | null = unparsedInstruction.match(/move (?<numCrates>\d+) from (?<source>\d+) to (?<destination>\d+)/);

      if(!found?.groups) {
        throw new Error(`Unexpected instruction '${unparsedInstruction}'`);
      }

      return {
        destination: parseInt(found.groups.destination) - 1,
        numCrates: parseInt(found.groups.numCrates),
        source: parseInt(found.groups.source) - 1,
      }
    });

  return { instructions, stacks };
}

async function solve(
  updateStacksInPlace: (instruction: Instruction, stacks: string[][]) => void
) {
  const { instructions, stacks }: Input = await getInput();

  for(const instruction of instructions) {
    updateStacksInPlace(instruction, stacks);
  }

  return stacks.reduce(
    (acc: string, stack: string[]) => acc + stack.pop(),
    ''
  );
}

async function p1(): Promise<string> {
  function updateStacksInPlace(instruction: Instruction, stacks: string[][]) {
    const { destination, numCrates, source }: Instruction = instruction;

    for(let i: number = 0; i < numCrates; i++) {
      const crate: string | undefined = stacks[source].pop();

      if(!crate) {
        throw new Error(`Invalid instruction: ${JSON.stringify({ instruction, stacks }, null, 2)}`);
      }

      stacks[destination].push(crate);
    }
  }

  return solve(updateStacksInPlace);
}

async function p2(): Promise<string> {
  function updateStacksInPlace(instruction: Instruction, stacks: string[][]) {
    const { destination, numCrates, source }: Instruction = instruction;
    stacks[destination].push(...stacks[source].splice(-numCrates))
  }

  return solve(updateStacksInPlace);
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: VJSFHWGFT
   * p2: LCTQFBVZV
   */
}
