import readInput from '../lib/readInput';

async function getInput(): Promise<string[]> {
  const file: string = await readInput(__dirname);
  return file.split('');
}

async function p1(): Promise<string> {
  const input: string[] = await getInput();
  for(let i: number = 3; i < input.length; i++) {
    const substring: string[] = input.slice(i - 3, i + 1);
    const deduped: Set<string> = new Set(substring);

    if([...deduped].join('') === substring.join('')) {
      return (i + 1).toString();
    }
  }

  throw new Error('Execution should not have reached here!');
}

async function p2(): Promise<string> {
  return '';
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 1723
   * p2:
   */
}
