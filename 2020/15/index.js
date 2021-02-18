const { promises: fs } = require('fs');

async function getInput(parseMask) {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split(',')
    .map(x => parseInt(x));
}

async function run(numTurns) {
  // My initial solution looked very similar to the one linked, but I couldn't transition off of the
  // starting numbers properly, so I went with the solution in 82647f6b6b0fcc51c79f4de0a5eb752b85446f8b
  // After seeing https://www.reddit.com/r/adventofcode/comments/kdf85p/2020_day_15_solutions/ggqmh0m/,
  // this solution was updated to look something very similar
  const lastSpokenLookup = Array(numTurns);

  (await getInput())
    .slice(0, -1)
    .forEach((x, i) => lastSpokenLookup[x] = i + 1);

  let currentSpoken = input[input.length - 1];
  for(let turn = input.length; turn < numTurns; turn++) {
    const lastSpoken = lastSpokenLookup[currentSpoken];
    lastSpokenLookup[currentSpoken] = turn;
    currentSpoken = !!lastSpoken
      ? turn - lastSpoken
      : 0;
  }

  return currentSpoken;
}

async function p1() {
  return run(2020);
}

async function p1() {
  return run(2020);
}

async function p2() {
  return run(30000000);
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 206
   * p2: 955
   */
};
