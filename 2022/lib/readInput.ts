import { promises as fs } from 'fs';

export default async function(dir: string) {
  return (await fs.readFile(`${dir}/input.txt`))
    .toString()
    .trim();
};
