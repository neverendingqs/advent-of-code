const { promises: fs } = require('fs');

function convertToBinary(bsp) {
  const binary = bsp
    .split('')
    .map(i =>
      i === 'F' || i === 'L'
        ? 0
        : 1
    )
    .join('');

  return parseInt(binary, 2);
}

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(seat => {
      const row = convertToBinary(seat.slice(0, 7));
      const column = convertToBinary(seat.slice(7));

      return { column, row };
    });
}

async function getIds() {
  const input = await getInput();
  return input
    .map(({ column, row }) => row * 8 + column);
}

async function p1() {
  const maxId = Math.max(...(await getIds()));
  return maxId;
}

async function p2() {
  const ids = (await getIds())
    .sort((a, b) => a - b);

  for(let i = 1; i < ids.length; i++) {
    if(ids[i] - ids[i - 1] !== 1) {
      return ids[i] - 1;
    }
  }
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 245
   * p2: 133
   */
};
