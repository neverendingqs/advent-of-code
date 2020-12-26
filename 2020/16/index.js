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

    return {
      name,
      leftMin: parseInt(leftMin),
      leftMax: parseInt(leftMax),
      rightMin: parseInt(rightMin),
      rightMax: parseInt(rightMax)
    };
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

function getIsValidLookup(rules) {
  return rules.reduce(
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
}

async function p1() {
  const { nearby, rules } = await getInput();
  const isValidLookup = getIsValidLookup(rules);

  let invalidValuesSum = 0;
  for(const value of nearby.flat()) {
    invalidValuesSum += isValidLookup[value]
      ? 0
      : value;
  }

  return invalidValuesSum;
}

async function p2() {
  function getValidNearbyTickets(rules, nearby) {
    const isValidLookup = getIsValidLookup(rules);
    return nearby.filter(
      nearbyTicket => nearbyTicket.every(value => isValidLookup[value])
    );
  }

  function isValid(value, { leftMin, leftMax, rightMin, rightMax }) {
    return (leftMin <= value && value <= leftMax)
      || (rightMin <= value && value <= rightMax);
  }

  function getNumRulesMatchedPerIndexLookup(rules, numIndexes, validTickets) {
    const ruleNames = rules.map(({ name }) => name);
    const matched = [...Array(numIndexes)]
      .map(() => ruleNames.reduce(
        (acc, name) => Object.assign(acc, { [name]: 0 }),
        {}
      ));

    for(const nearbyTicket of validTickets) {
      for(let i = 0; i < nearbyTicket.length; i++) {
        rules.forEach(rule => {
          if(isValid(nearbyTicket[i], rule)) {
            matched[i][rule.name] += 1;
          }
        });
      }
    };

    return matched;
  }

  const { nearby, rules, ticket } = await getInput();
  const validNearbyTickets = getValidNearbyTickets(rules, nearby);
  const matched = getNumRulesMatchedPerIndexLookup(rules, ticket.length, validNearbyTickets);

  // Assumes that for exactly one index, one and only one of the field's rules matched all the tickets at that index.
  // If multiple rules match that criteria, we can never narrow down which field it represents.
  const names = Array(ticket.length);
  for(let iForLoopOnly = 0; iForLoopOnly < rules.length; iForLoopOnly++) {
    for(let i = 0; i < matched.length; i++) {
      const rulesThatMatchedAllNearby = Object
        .entries(matched[i])
        .filter(([, numMatched]) => numMatched === validNearbyTickets.length)
        .map(([rule]) => rule);

      if(rulesThatMatchedAllNearby.length === 1) {
        names[i] = rulesThatMatchedAllNearby[0];
        // We no longer want to consider this field rule, as we already found which index it represents.
        // This should cause another rule to match our stated assumption above.
        // Otherwise, we run into the same problem of never being able to narrow down which field an index represents.
        matched.forEach(m => delete m[names[i]]);
      }
    }
  }

  return ticket.reduce(
    (acc, value, i) => names[i].startsWith('departure')
      ? acc * value
      : acc,
    1
  );
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 22977
   * p2: 998358379943
   */
};
