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
  arguments: string | undefined,
  command: string,
  output: FileDetails[],
}

async function getInput(): Promise<any> {
  const file: string = await readInput(__dirname);
  const lines: string[] = file.split('\n');

  const execs: Exec[] = [];
  for(let i: number = 0; i < lines.length; i++) {
    const [dollarSign, command, args]: string[] = lines[i].split(' ');
    if(dollarSign !== '$') {
      throw new Error(`Parsing error: ${JSON.stringify({ line: lines[i], i, execs })}`);
    }

    const exec: Exec = {
      arguments: args,
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

  console.log(JSON.stringify(execs, null, 2))
}

async function p1(): Promise<string> {
  await getInput();
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
