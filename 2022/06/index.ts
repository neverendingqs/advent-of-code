import readInput from '../lib/readInput';

async function getInput(): Promise<string[]> {
  const file: string = await readInput(__dirname);
  return file.split('');
}

async function solve(numUniqueChars: number) {
  const input: string[] = await getInput();
  for(let i: number = numUniqueChars; i < input.length; i++) {
    const substring: string[] = input.slice(i - numUniqueChars, i);
    const deduped: string[] = [...new Set(substring)];

    if(deduped.join('') === substring.join('')) {
      return i.toString();
    }
  }

  throw new Error('Execution should not have reached here!');

}

async function p1(): Promise<string> {
  return solve(4);
}

async function p2(): Promise<string> {
  return solve(14);
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 1723
   * p2: 3708
   */
}
