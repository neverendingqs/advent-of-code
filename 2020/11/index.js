const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split(''));
}

function numAdjOccupiedSeats(input, row, column) {
  const rows = [row];
  if(row - 1 >= 0) {
    rows.push(row - 1);
  }
  if(row + 1 < input.length) {
    rows.push(row + 1);
  }

  const columns = [column];
  if(column - 1 >= 0) {
    columns.push(column - 1);
  }
  if(column + 1 < input[0].length) {
    columns.push(column + 1);
  }

  let numAdjOccupied = 0;

  for(const i of rows) {
    for(const j of columns) {
      if(i === row && j === column) {
        continue;
      }

      numAdjOccupied += input[i][j] === '#'
        ? 1
        : 0;
    }
  }

  return numAdjOccupied;
}

function runIteration(input) {
  // Deep clone one level deep
  const newIteration = input.map(columns => [...columns]);

  for(let row = 0; row < input.length; row++) {
    for(let column = 0; column < input[row].length; column++) {
      switch(input[row][column]) {
        case 'L':
          if(numAdjOccupiedSeats(input, row, column) === 0) {
            newIteration[row][column] = '#';
          }
          break;

        case '#':
          if(numAdjOccupiedSeats(input, row, column) >= 4) {
            newIteration[row][column] = 'L';
          }
          break;
      }
    }
  }

  //console.log(newIteration.map(columns => columns.join('')).join('\n'), '\n')
  return newIteration;
}

function checksum(input) {
  return input
    .flatMap(row => row.join(''))
    .join('');
}

async function p1() {
  let input = await getInput();
  let currChecksum = checksum(input);

  while(true) {
    const prevChecksum = currChecksum;
    input = runIteration(input);
    currChecksum = checksum(input);

    if(prevChecksum === currChecksum) {
      break;
    }
  }

  return currChecksum
    .split('')
    .filter(position => position === '#')
    .length;
}

async function p2() {
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 2265
   * p2:
   */
};
