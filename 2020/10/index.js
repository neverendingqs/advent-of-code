const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(i => parseInt(i));
}

async function getAdapters() {
  const input = await getInput();
  return [
    0,
    ...input.sort((a, b) => a - b),
    Math.max(...input) + 3
  ];
}

async function p1() {
  const adapters = await getAdapters();
  const joltDiffCounter = {};
  for(let i = 1; i < adapters.length; i++) {
    const joltDiff = adapters[i] - adapters[i - 1];
    joltDiffCounter[joltDiff] = (joltDiffCounter[joltDiff] ?? 0) + 1;
  }

  return joltDiffCounter[1] * joltDiffCounter[3];
}

/*
 * I thought Dynamic Programming would work here, but ended up reading
 * https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfzp6rt/
 * to iron out the details.
 */
async function p2() {
  const adapters = await getAdapters();

  const numPathsDp = [1, 1];
  for(let i = 2; i < adapters.length; i++) {
    let numPaths = numPathsDp[i - 1];

    if(adapters[i] - adapters[i - 2] <= 3) {
      numPaths += numPathsDp[i - 2];
    }

    if(adapters[i] - adapters[i - 3] <= 3) {
      numPaths += numPathsDp[i - 3];
    }

    numPathsDp.push(numPaths);
  }

  return numPathsDp[numPathsDp.length - 1];
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 2240
   * p2: 99214346656768
   */
};
