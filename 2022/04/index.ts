import readInput from '../lib/readInput';

interface Section {
  start: number,
  end: number,
}

interface Assignment {
  left: Section,
  right: Section,
}

async function getInput(): Promise<Assignment[]> {
  const file: string = await readInput(__dirname);

  const assignments: Assignment[] = file
    .split('\n')
    .map((assignment: string) => {
      const [left, right]: Section[] = assignment.split(',')
        .map((section: string) => {
          const [start, end]: string[] = section.split('-');
          return {
            start: parseInt(start),
            end: parseInt(end),
          };
        })

      return { left, right };
    });

  return assignments;
}

async function solve(
  filterFunction: (assignment: Assignment) => boolean)
: Promise<string> {
  return (await getInput())
    .filter(filterFunction)
    .length
    .toString();
}

async function p1(): Promise<string> {
  return solve(
    ({ left, right }: Assignment) =>
      // `right` is inside `left`
      left.start <= right.start && left.end >= right.end ||

      // `left` is inside `right
      left.start >= right.start && left.end <= right.end
  );
}

async function p2(): Promise<string> {
  return '';
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 496
   * p2:
   */
}
