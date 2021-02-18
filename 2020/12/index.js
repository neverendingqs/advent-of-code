const { promises: fs } = require('fs');

const DIRECTIONS = ['E', 'S', 'W', 'N'];

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(instruction => {
      const action = instruction.substring(0, 1);
      const value = parseInt(instruction.substring(1));
      return { action, value };
    });
}

async function p1() {
  const input = await getInput();

  let iDirection = 0;
  const cumulative = DIRECTIONS.reduce(
    (acc, direction) => Object.assign(acc, { [direction]: 0 }),
    {}
  );

  for(const { action, value } of input) {
    switch(action) {
      case 'E':
      case 'N':
      case 'S':
      case 'W':
        cumulative[action] += value;
        break;

      case 'F':
        cumulative[DIRECTIONS[iDirection]] += value;
        break;

      case 'L':
        const newIDirection = iDirection - (value / 90);
        iDirection = newIDirection < 0
          ? newIDirection + 4
          : newIDirection;
          break;

      case 'R':
        iDirection = (iDirection + (value / 90)) % 4;
        break;

      default:
        throw new Error('Should not have reached here.');
    }
  }

  return Math.abs(cumulative['E'] - cumulative['W'])
    + Math.abs(cumulative['N'] - cumulative['S']);
}

async function p2() {
  const input = await getInput();

  const travelled = DIRECTIONS.reduce(
    (acc, direction) => Object.assign(acc, { [direction]: 0 }),
    {}
  );
  let waypoint = { 'E': 10, 'N': 1, 'S': 0, 'W': 0 };

  for(const { action, value } of input) {
    switch(action) {
      case 'E':
      case 'N':
      case 'S':
      case 'W':
        waypoint[action] += value;
        break;

      case 'F':
        Object
          .entries(waypoint)
          .forEach(([wpAction, wpValue]) => {
            travelled[wpAction] += wpValue * value;
          });
        break;

      case 'L':
        waypoint = Object
          .entries(waypoint)
          .reduce(
            (acc, [wpAction, wpValue]) => {
              const iDirection = DIRECTIONS.indexOf(wpAction);
              let newIDirection = iDirection - (value / 90);
              newIDirection = newIDirection < 0
                ? newIDirection + 4
                : newIDirection;

              return Object.assign(acc, { [DIRECTIONS[newIDirection]]: wpValue });
            },
            {}
          );
        break;

      case 'R':
        waypoint = Object
          .entries(waypoint)
          .reduce(
            (acc, [wpAction, wpValue]) => {
              const iDirection = DIRECTIONS.indexOf(wpAction);
              const newIDirection = (iDirection + (value / 90)) % 4;

              return Object.assign(acc, { [DIRECTIONS[newIDirection]]: wpValue });
            },
            {}
          );
        break;

      default:
        throw new Error('Should not have reached here.');
    }
  }

  return Math.abs(travelled['E'] - travelled['W'])
    + Math.abs(travelled['N'] - travelled['S']);
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 796
   * p2: 39446
   */
};
