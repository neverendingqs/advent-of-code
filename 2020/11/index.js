const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split(''));
}

function p1NumAdjOccupiedSeats(input, row, column) {
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
function p2NumAdjOccupiedSeats(input, row, column) {
  /*
   * x x x      0 1 2
   * x x x  =>  3 4 5
   * x x x      6 7 8
   */
  const adj = {
    0: { row: row - 1, column: column - 1 },
    1: { row: row - 1, column },
    2: { row: row - 1, column: column + 1 },
    3: { row: row, column: column - 1 },
    5: { row: row, column: column + 1 },
    6: { row: row + 1, column: column - 1 },
    7: { row: row + 1, column: column },
    8: { row: row + 1, column: column + 1 },
  };

  const maxRows = input.length;
  const maxColumns = input[0].length;
  let numAdjOccupied = 0;

  function shouldContinue(key) {
    if(!adj[key]) {
      return false;
    }

    const { row, column } = adj[key];

    if(row < 0 || column < 0 || row === maxRows || column === maxColumns ) {
      delete adj[key];
      return false;
    }

    if(input[row][column] === '.') {
      return true;
    }

    if(input[row][column] === '#') {
      numAdjOccupied += 1;
      delete adj[key];
      return false;
    }

    delete adj[key];
    return false;
  }

  while(Object.keys(adj).length > 0) {
    let key = 0;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row - 1, column: column - 1 };
    }

    key = 1;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row - 1, column };
    }

    key = 2;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row - 1, column: column + 1 };
    }

    key = 3;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row, column: column - 1 };
    }

    key = 5;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row, column: column + 1 };
    }

    key = 6;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row + 1, column: column - 1 };
    }

    key = 7;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row + 1, column };
    }

    key = 8;
    if(shouldContinue(key)) {
      const { row, column } = adj[key];
      adj[key] = { row: row + 1, column: column + 1 };
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
          if(this.numAdjOccupiedSeats(input, row, column) === 0) {
            newIteration[row][column] = '#';
          }
          break;

        case '#':
          if(this.numAdjOccupiedSeats(input, row, column) >= this.emptyThreshold) {
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

async function solve(runIteration) {
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

async function p1() {
  return solve(
    runIteration.bind({
      emptyThreshold: 4,
      numAdjOccupiedSeats: p1NumAdjOccupiedSeats
    })
  );
}

async function p2() {
  return solve(
    runIteration.bind({
      emptyThreshold: 5,
      numAdjOccupiedSeats: p2NumAdjOccupiedSeats
    })
  );
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 2265
   * p2: 2045
   */
};
