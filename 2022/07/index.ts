import readInput from '../lib/readInput';

enum Command {
  cd = 'cd',
  ls = 'ls',
}

interface FileDetails {
  isDirectory: boolean,
  name: string,
  size: number,
}

interface Exec {
  args: string | undefined,
  command: string,
  output: FileDetails[],
}

type DirectorySizes = { [key: string]: number };

async function getInput(): Promise<Exec[]> {
  const file: string = await readInput(__dirname);
  const lines: string[] = file.split('\n');

  const execs: Exec[] = [];
  for(let i: number = 0; i < lines.length; i++) {
    const [dollarSign, command, args]: string[] = lines[i].split(' ');
    if(dollarSign !== '$') {
      throw new Error(`Parsing error: ${JSON.stringify({ line: lines[i], i, execs })}`);
    }

    const exec: Exec = {
      args,
      command,
      output: []
    }

    for(let j: number = i + 1; j < lines.length; j++) {
      if(lines[j].startsWith('$')) {
        break;
      }

      const [prefix, name]: string[] = lines[j].split(' ');
      if(prefix === 'dir') {
        exec.output.push({
          isDirectory: true,
          name,
          size: 0,
        });
      } else {
        exec.output.push({
          isDirectory: false,
          name,
          size: parseInt(prefix),
        });
      }

      i += 1;
    }

    execs.push(exec);
  }

  return execs;
}

async function getDirectorySizes(): Promise<DirectorySizes> {
  const execs: Exec[] = await getInput();

  const cwd: string[] = [];
  const dirSizes: DirectorySizes = {};

  for(const { args, command, output } of execs) {
    if(command === Command.cd) {
      if(args === undefined) {
        throw new Error(`Did not expect undefined: ${JSON.stringify({ cwd, dirSizes })}`);
      }
      if(args === '..') {
        cwd.pop();
      } else {
        cwd.push(args as string);
      }

      continue;
    }

    const bytesToAdd: number = output.reduce(
      (acc: number, fileDetails: FileDetails) => fileDetails.isDirectory
        ? acc
        : acc + fileDetails.size,
      0
    );

    for(let i: number = 1; i <= cwd.length; i++) {
      const dir: string = cwd.slice(0, i).join('/');
      dirSizes[dir] = (dirSizes[dir] ?? 0) + bytesToAdd;
    }
  }

  return dirSizes;
}

async function p1(): Promise<string> {
  const dirSizes: DirectorySizes = await getDirectorySizes();

  return Object.values(dirSizes)
    .filter((bytes: number) => bytes <= 100000)
    .reduce(
      (acc: number, bytes: number) => acc + bytes,
      0
    )
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
   * p1: 1915606
   * p2:
   */
}
