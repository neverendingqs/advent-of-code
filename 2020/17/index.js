const { promises: fs } = require('fs');

function generateXArray(numX) {
  return [...Array(numX)].map(() => '.');
}

function generateYXArray(numY, numX) {
  return [...Array(numY)].map(() => generateXArray(numX));
}

function generateZYXArray(numZ, numY, numX) {
  return [...Array(numZ)].map(() => generateYXArray(numY, numX));
}

async function getInput(padding = 1) {
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
}

function getNumActiveNeighbours(zyx, { zi, yi, xi }) {
  zi = zi < 1
    ? 1
    : zi;

  yi = yi < 1
    ? 1
    : yi;

  xi = xi < 1
    ? 1
    : xi;

  let numActiveNeighbours = 0;
  for(let z = zi - 1; z <= zi + 1; z++) {
    for(let y = yi - 1; y <= yi + 1; y++) {
      for(let x = xi - 1; x <= xi + 1; x++) {
        if(z === 0 && y === 0 && x === 0) {
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
  logZyx(zyx);
  for(let iForLoopOnly = 0; iForLoopOnly < 2; iForLoopOnly++) {
    zyx = runCycle(zyx);
    logZyx(zyx);
  }

  return getNumActive(zyx);
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
