const { promises: fs } = require('fs');

const {
  generateXArray,
  generateYXArray,
  generateZYXArray,
  generateWZYXArray
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

  const wzyx = [
    ...generateWZYXArray(padding, zyx.length, yx.length, numXValues),
    zyx,
    ...generateWZYXArray(padding, zyx.length, yx.length, numXValues)
  ];

  return wzyx;
}

function getNumActiveNeighbours(wzyx, { wi, zi, yi, xi }) {
  const wStart = wi < 1
    ? 0
    : wi - 1;

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
  for(let w = wStart; w <= wi + 1; w++) {
    for(let z = zStart; z <= zi + 1; z++) {
      for(let y = yStart; y <= yi + 1; y++) {
        for(let x = xStart; x <= xi + 1; x++) {
          if(w === wi && z === zi && y === yi && x === xi) {
            continue;
          }

          numActiveNeighbours += wzyx[w]?.[z]?.[y]?.[x] === '#'
            ? 1
            : 0;
        }
      }
    }
  }

  return numActiveNeighbours;
}

function runCycle(wzyx) {
  const numW = wzyx.length;
  const numZ = wzyx[0].length;
  const numY = wzyx[0][0].length;
  const numX = wzyx[0][0][0].length;

  const newWzyx = generateWZYXArray(numW, numZ, numY, numX);

  for(let wi = 0; wi < numW; wi++) {
    const zyx = wzyx[wi];

    for(let zi = 0; zi < numZ; zi++) {
      const yx = zyx[zi];

      for(let yi = 0; yi < numY; yi++) {
        const x = yx[yi];

        for(let xi = 0; xi < numX; xi++) {
          const cube = wzyx[wi][zi][yi][xi];
          const numActiveNeighbours = getNumActiveNeighbours(wzyx, { wi, zi, yi, xi });

          if(cube === '#') {
            newWzyx[wi][zi][yi][xi] = (numActiveNeighbours === 2 || numActiveNeighbours === 3)
              ? '#'
              : '.'
          } else {
            newWzyx[wi][zi][yi][xi] = numActiveNeighbours === 3
              ? '#'
              : '.';
          }
        }
      }
    }
  }

  return newWzyx;
}

function getNumActive(wzyx) {
  const numW = wzyx.length;
  const numZ = wzyx[0].length;
  const numY = wzyx[0][0].length;
  const numX = wzyx[0][0][0].length;

  let numActive = 0;

  for(let wi = 0; wi < numW; wi++) {
    const zyx = wzyx[wi];

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
  }

  return numActive;
}

async function p2() {
  let wzyx = await getInput();
  for(let iForLoopOnly = 0; iForLoopOnly < 6; iForLoopOnly++) {
    wzyx = runCycle(wzyx);
  }

  return getNumActive(wzyx);
}

module.exports = p2;
