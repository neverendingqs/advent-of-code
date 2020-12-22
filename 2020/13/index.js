const { promises: fs } = require('fs');

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
