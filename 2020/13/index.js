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

async function p2() {
  let { buses } = await getInput();
  buses = buses.map(bus =>
    bus === 'x'
      ? 1
      : parseInt(bus)
  );

  const period = BigInt(Math.max(...buses));
  buses = buses.map(bus => BigInt(bus));
  const iPeriod = BigInt(buses.indexOf(period));

  for(let timestamp = period; ; timestamp += period) {
    const earliestTimestamp = timestamp - iPeriod;
    const isGoldCoin = buses.every((bus, i) => (timestamp - iPeriod + BigInt(i)) % bus === 0n);
    if(isGoldCoin) {
      return earliestTimestamp;
    }

    if(timestamp % (period * 1000000n) === 0n) {
      console.log({ timestamp, earliestTimestamp, isGoldCoin, isGoldCoinArray: buses.map((bus, i) => (timestamp - iPeriod + BigInt(i)) % bus) });
    }
  }
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
