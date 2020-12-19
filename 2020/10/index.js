const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(i => parseInt(i));
}

async function p1() {
  const input = await getInput();
  const adapters = input.sort((a, b) => a - b);

  const joltDiffCounter = {};
  joltDiffCounter[adapters[0]] = 1;

  for(let i = 1; i < adapters.length; i++) {
    const joltDiff = adapters[i] - adapters[i - 1];
    joltDiffCounter[joltDiff] = (joltDiffCounter[joltDiff] ?? 0) + 1;
  }

  return joltDiffCounter[1] * (joltDiffCounter[3] + 1);
}

async function p2() {
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 2240
   * p2:
   */
};
