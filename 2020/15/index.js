const { promises: fs } = require('fs');

async function getInput(parseMask) {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split(',')
    .map(x => parseInt(x));
}

async function run(numTurns) {
  // Used hint to pre-allocate the number of slots in the array from
  // https://www.reddit.com/r/adventofcode/comments/kdf85p/2020_day_15_solutions/ggqmh0m/
  const lastSpokenLookup = Array(numTurns);

  let lastSpoken = 0;
  let turn = 1;

  const input = await getInput();
  input.forEach(x => {
    lastSpokenLookup[x] = [turn, turn];
    lastSpoken = x;
    turn++;
  });

  for(; turn <= numTurns; turn++) {
    lastSpoken = !!lastSpokenLookup[lastSpoken]
      ? lastSpokenLookup[lastSpoken][1] - lastSpokenLookup[lastSpoken][0]
      : 0;

    if(lastSpokenLookup[lastSpoken]) {
      lastSpokenLookup[lastSpoken].shift();
      lastSpokenLookup[lastSpoken].push(turn);
    } else {
      lastSpokenLookup[lastSpoken] = [turn, turn];
    }
  }

  return lastSpoken;
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
   * p1:
   * p2:
   */
};
