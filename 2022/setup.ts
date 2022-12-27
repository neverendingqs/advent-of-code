import { promises as fs } from 'fs';

async function main(): Promise<void> {
  await Promise.all(
    [...Array(25).keys()].map((i: number) => {
      let dir: string = (i + 1).toString();
      if(dir.length === 1) {
        dir = `0${dir}`;
      }

      return fs.copyFile(
        `${__dirname}/00/index.ts`,
        `${__dirname}/${dir}/index.ts`
      );
    })
  );
}

main().catch((err: Error) => {
  console.log(err);
  process.exit(-1);
})
