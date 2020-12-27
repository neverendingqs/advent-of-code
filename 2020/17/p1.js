const { promises: fs } = require('fs');

const {
  generateXArray,
  generateYXArray,
  generateZYXArray
} = require('./utils');

async function getInput(padding = 10) {
  const y = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n');

  const numXValues = padding
    + y[0]
      .split('')
      .length
    + padding;

  const yx =
  [
    ...generateYXArray(padding, numXValues),
    ...y
      .map(xAxis => ([
        ...generateXArray(padding),
        ...xAxis.split(''),
        ...generateXArray(padding)
      ])),
    ...generateYXArray(padding, numXValues)
  ];

  const zyx = [
    ...generateZYXArray(padding, yx.length, numXValues),
    yx,
    ...generateZYXArray(padding, yx.length, numXValues)
  ];
  return zyx;
}

function logZyx(zyx) {
  for(let zi = 0; zi < zyx.length; zi++) {
    console.log(`z = ${zi}`);

    const yx = zyx[zi];
    console.log(
      yx
        .map(x => x.join(','))
        .join('\n')
    );
    console.log();
  }

  console.log('==========');
}

function getNumActiveNeighbours(zyx, { zi, yi, xi }) {
  const zStart = zi < 1
    ? 0
    : zi - 1;

  const yStart = yi < 1
    ? 0
    : yi - 1;

  const xStart = xi < 1
    ? 0
    : xi - 1;

  let numActiveNeighbours = 0;
  for(let z = zStart; z <= zi + 1; z++) {
    for(let y = yStart; y <= yi + 1; y++) {
      for(let x = xStart; x <= xi + 1; x++) {
        if(z === zi && y === yi && x === xi) {
          continue;
        }

        numActiveNeighbours += zyx[z]?.[y]?.[x] === '#'
          ? 1
          : 0;
      }
    }
  }

  return numActiveNeighbours;
}

function runCycle(zyx) {
  const numZ = zyx.length;
  const numY = zyx[0].length;
  const numX = zyx[0][0].length;

  const newZyx = generateZYXArray(numZ, numY, numX);

  for(let zi = 0; zi < numZ; zi++) {
    const yx = zyx[zi];

    for(let yi = 0; yi < numY; yi++) {
      const x = yx[yi];

      for(let xi = 0; xi < numX; xi++) {
        const cube = zyx[zi][yi][xi];
        const numActiveNeighbours = getNumActiveNeighbours(zyx, { zi, yi, xi });

        if(cube === '#') {
          newZyx[zi][yi][xi] = (numActiveNeighbours === 2 || numActiveNeighbours === 3)
            ? '#'
            : '.'
        } else {
          newZyx[zi][yi][xi] = numActiveNeighbours === 3
            ? '#'
            : '.';
        }
      }
    }
  }

  return newZyx;
}

function getNumActive(zyx) {
  const numZ = zyx.length;
  const numY = zyx[0].length;
  const numX = zyx[0][0].length;

  let numActive = 0;

  for(let zi = 0; zi < numZ; zi++) {
    const yx = zyx[zi];

    for(let yi = 0; yi < numY; yi++) {
      const x = yx[yi];

      for(let xi = 0; xi < numX; xi++) {
        numActive += zyx[zi][yi][xi] === '#'
          ? 1
          : 0;
      }
    }
  }

  return numActive;
}

async function p1() {
  let zyx = await getInput();
  for(let iForLoopOnly = 0; iForLoopOnly < 6; iForLoopOnly++) {
    zyx = runCycle(zyx);
    // logZyx(zyx);
  }

  return getNumActive(zyx);
}

module.exports = p1;
