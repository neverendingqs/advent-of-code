import readInput from '../lib/readInput';

async function getInput(): Promise<number[][]> {
  const file: string = await readInput(__dirname);
  return file
    .split('\n')
    .map((line: string) =>
      line
        .split('')
        .map((char: string) => parseInt(char))
    );
}

async function p1(): Promise<string> {
  const input: number[][] = await getInput();

  let numVisible: number = 0;
  for(let rowIndex: number = 0; rowIndex < input.length; rowIndex ++) {
    for(let columnIndex: number = 0; columnIndex < input[0].length; columnIndex ++) {
      if(rowIndex === 0 || rowIndex === input.length - 1 || columnIndex === 0 || columnIndex === input[0].length - 1) {
        numVisible += 1;
        continue;
      }

      const left: number[] = input[rowIndex].slice(0, columnIndex);
      const right: number[] = input[rowIndex].slice(columnIndex + 1);
      const top: number[] = input.slice(0, rowIndex).map((row: number[]) => row[columnIndex]);
      const bottom: number[] = input.slice(rowIndex + 1).map((row: number[]) => row[columnIndex]);

      if(
        input[rowIndex][columnIndex] > Math.min(
          Math.max(...left),
          Math.max(...right),
          Math.max(...top),
          Math.max(...bottom),
        )
      ) {
        numVisible += 1;
      }
    }
  }

  return numVisible.toString();
}

async function p2(): Promise<string> {
  return '';
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 1676
   * p2:
   */
}
