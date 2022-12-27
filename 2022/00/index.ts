import readInput from '../lib/readInput';

async function getInput(): Promise<any> {
  const file: string = await readInput(__dirname);
}

async function p1(): Promise<string> {
  return '';
}

async function p2(): Promise<string> {
  return '';
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1:
   * p2:
   */
}
