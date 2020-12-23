const { promises: fs } = require('fs');

async function getInput(parseMask) {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split(',')
    .map(x => parseInt(x));
}

async function p1() {
  const input = await getInput();
  let lastSpoken = 0;
  let turn = 1;
  const lastSpokenLookup = input.reduce(
    (acc, x) => {
      acc = Object.assign(acc, { [x]: [turn, turn] });
      lastSpoken = x;
      turn++;
      return acc;
    },
    {}
  );

  for(; turn <= 2020; turn++) {
    //console.log({ lastSpoken, turn, lastSpokenLookup })

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

async function p2() {
  const input = await getInput();
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
