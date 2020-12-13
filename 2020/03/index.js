const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(''));
}

async function p1(input, iIncrement = 3, jIncrement = 1) {
  const tree = '#';
  input = input
    ? await Promise.resolve(input)
    : await getInput();

  let i = 0;
  let numTrees = 0;
  for(let j = 0; j < input.length; j += jIncrement) {
    const row = input[j];
    if(row[i % row.length] === tree) {
      numTrees += 1;
    }

    i += iIncrement;
  }

  return numTrees;
}

async function p2() {
  const input = await getInput();
  const [a, b, c, d, e] = await Promise.all([
    p1(input, 1, 1),
    p1(input, 3, 1),
    p1(input, 5, 1),
    p1(input, 7, 1),
    p1(input, 1, 2)
  ]);

  return a * b * c * d * e;
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 625
   * p2: 391
   */
};
