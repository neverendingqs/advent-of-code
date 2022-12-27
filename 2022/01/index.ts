import readInput from '../lib/readInput';

async function getInput(): Promise<number[][]> {
  const file: string = await readInput(__dirname);

  const inventories: number[][] = file
    .split('\n\n')
    .map((inventory: string) =>
      inventory.split('\n').map((calories: string) => parseInt(calories))
    );

  return inventories;
}

function sumArray(arr: number[]): number {
  return arr.reduce(
    (acc: number, element: number) => acc + element,
    0
  );
}

async function getSumCalories(): Promise<number[]> {
  const inventories: number[][] = await getInput();
  return inventories.map((inventory: number[]) => sumArray(inventory));
}

async function p1(): Promise<string> {
  const sumCalories: number[] = await getSumCalories();
  return Math.max(...sumCalories).toString();
}

async function p2(): Promise<string> {
  const sumCalories: number[] = await getSumCalories();
  const topThree: number[] = sumCalories
    .sort((a: number, b: number) => b - a)
    .slice(0, 3);

  return sumArray(topThree).toString();
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 72070
   * p2: 211805
   */
}
