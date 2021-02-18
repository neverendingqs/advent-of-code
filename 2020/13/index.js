const { promises: fs } = require('fs');
const { exit } = require('process');

const DIRECTIONS = ['E', 'S', 'W', 'N'];

async function getInput() {
  const [earliest, buses] = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n');

  return { earliest: parseInt(earliest), buses: buses.split(',') };
}

async function p1() {
  const { earliest, buses } = await getInput();
  const availableBuses = buses
    .filter(bus => bus !== 'x')
    .map(bus => parseInt(bus));

  const { bus, waitTime } = availableBuses
    .reduce(
      ({ bus, waitTime }, currBus) => {
        const currBusWaitTime = currBus - (earliest % currBus);
        return currBusWaitTime < waitTime
          ? { bus: currBus, waitTime: currBusWaitTime }
          : { bus, waitTime };
      },
      { bus: Number.MAX_VALUE, waitTime: Number.MAX_SAFE_INTEGER }
    );

  return bus * waitTime;
}

// Brute force took too long
// Based on https://www.reddit.com/r/adventofcode/comments/kc4njx/2020_day_13_solutions/ggdxufd/
// Possible alternative: Chinese Remainder Theorem
async function p2() {
  let { buses } = await getInput();
  buses = buses.map(bus =>
    bus === 'x'
      ? 1n
      : BigInt(bus)
  );

  let period = buses[0];
  let timestamp = 0n;
  for(let i = 1n; i < buses.length; i++) {
    while((timestamp + i) % buses[i] !== 0n) {
      timestamp += period;
    }
    period *= buses[i];
  }

  return timestamp.toString();
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 2095
   * p2: 598411311431841
   */
};
