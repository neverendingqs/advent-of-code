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
  const input = await getInput();
  console.log(input);
}

async function p2() {
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
