const { promises: fs } = require('fs');

function parseRules(rulesString) {
  return rulesString
  .split('\n')
  .map(ruleString => {
    const [
      ,
      name,
      leftMin,
      leftMax,
      rightMin,
      rightMax
    ] = ruleString.match(/^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/);

    return { name, leftMin, leftMax, rightMin, rightMax };
  });
}

function parseTicket(ticketString) {
  return ticketString
    .split('\n')
    [1]
    .split(',')
    .map(x => parseInt(x));
}

function parseNearby(nearbyString) {
  return nearbyString
    .split('\n')
    .slice(1)
    .map(ticket =>
      ticket
        .split(',')
        .map(x => parseInt(x))
    );
}

async function getInput() {
  const [
    rulesString,
    ticketString,
    nearbyString
  ] = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n\n');

  return {
    nearby: parseNearby(nearbyString),
    rules: parseRules(rulesString),
    ticket: parseTicket(ticketString)
  };
}

async function p1() {
  const { nearby, rules } = await getInput();
  const validValues = rules.reduce(
    (acc, { leftMin, leftMax, rightMin, rightMax }) => {
      for(let i = leftMin; i <= leftMax; i++) {
        acc[i] = true;
      }

      for(let i = rightMin; i <= rightMax; i++) {
        acc[i] = true;
      }

      return acc;
    },
    []
  );

  let invalidValuesSum = 0;
  for(const value of nearby.flat()) {
    invalidValuesSum += validValues[value] === true
      ? 0
      : value;
  }

  return invalidValuesSum;
}

async function p2() {
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 22977
   * p2:
   */
};
