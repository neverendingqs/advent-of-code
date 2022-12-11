import readInput from '../lib/readInput';

async function getInput(): Promise<string[]> {
  const file = await readInput(__dirname);
  return file.split('\n');
}

function getPriority(letter: string): number {
  /*
    * 'A'.charCodeAt(0); => 65
    * 'a'.charCodeAt(0); => 97
  */
  const asciiValue: number = letter.charCodeAt(0);
  if (asciiValue >= 97) {
    // lower case
    return asciiValue - 97 + 1;
  }

  // upper case
  return asciiValue - 65 + 1 + 26;
}

function setIntersection(...sets: Set<string>[]) {
  let intersection: string[] = [...sets[0]];
  for(const set of sets.slice(1)) {
    intersection = intersection.filter(x => set.has(x));
  }

  return new Set(intersection);
}

async function p1(): Promise<string> {
  const splitInventories: String[][] = (await getInput())
    .map(bothInventories => {
      if(bothInventories.length % 2 !== 0) {
        throw new Error(`Invalid line '${bothInventories}'`);
      }
      const splitIndex = bothInventories.length / 2;
      return [
        bothInventories.slice(0, splitIndex),
        bothInventories.slice(splitIndex),
      ];
    });

  const sumPriorities: number = splitInventories.reduce(
    (acc, [firstCompartment, secondCompartment]) => {
      const firstCompartmentSet = new Set(firstCompartment.split(''));
      for(const item of secondCompartment.split('')) {
        if(firstCompartmentSet.has(item)) {
          return acc + getPriority(item);
        }
      }

      throw new Error(`Could not find common item type: ${JSON.stringify({ firstCompartment, secondCompartment }, null, 2)}`);
    },
    0
  );

  return sumPriorities.toString();;
}

async function p2(): Promise<string> {
  const input: string[] = await getInput();

  let sumPriorities = 0;
  for(let i = 0; i < input.length; i += 3) {
    const groupInventories: Set<string>[] = input
      .slice(i, i + 3)
      .map(rucksack => new Set(rucksack.split('')));

    const [badge, ...shouldBeEmpty] = [...setIntersection(...groupInventories)];

    if(shouldBeEmpty.length !== 0) {
      throw new Error(`Expected no extra badge types, but found '${JSON.stringify(shouldBeEmpty)}'. Expected only '${badge}'`);
    }

    sumPriorities += getPriority(badge);
  }
  return sumPriorities.toString();
}

export async function solution(): Promise<void> {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 8233
   * p2: 2821
   */
};
