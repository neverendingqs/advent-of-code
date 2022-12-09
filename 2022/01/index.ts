import readInput from '../lib/readInput';

async function getInput(): Promise<number[][]> {
  const file = await readInput(__dirname);

  const inventories = file
    .split('\n\n')
    .map(inventory => inventory.split('\n').map(calories => parseInt(calories)));

  return inventories;
}

function sumArray(arr: number[]): number {
  return arr.reduce(
    (acc, element) => acc + element,
    0
  );
}

async function getSumCalories(): Promise<number[]> {
  const inventories = await getInput();
  return inventories.map(inventory => sumArray(inventory));
}

async function p1(): Promise<string> {
  const sumCalories = await getSumCalories();
  return Math.max(...sumCalories).toString();
}

async function p2(): Promise<string> {
  const sumCalories = await getSumCalories();
  const topThree = sumCalories
    .sort((a, b) => b - a)
    .slice(0, 3);

  return sumArray(topThree).toString();
}

export async function solution(): Promise<void> {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 72070
   * p2: 211805
   */
};
