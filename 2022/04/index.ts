import readInput from '../lib/readInput';

async function getInput(): Promise<string[]> {
  const file: string = await readInput(__dirname);
  return file.split('\n');
}

async function p1(): Promise<string> {
  interface Section {
    start: number,
    end: number,
  }

  interface Assignment {
    left: Section,
    right: Section,
  }

  const assignments: Assignment[] = (await getInput())
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

  return assignments
    .filter(({ left, right }: Assignment) =>
      // `right` is inside `left`
      left.start <= right.start && left.end >= right.end ||
      // `left` is inside `right
      left.start >= right.start && left.end <= right.end
    )
    .length
    .toString();
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
