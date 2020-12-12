const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(line => {
      const [range, char, password] = line.split(' ');
      const [left, right] = range.split('-');
      return { char: char[0], left, right, password };
    });
}

function getNumOccurrences(letter, word) {
  return word
    .split('')
    .reduce(
      (num, currChar) => letter === currChar
        ? num + 1
        : num,
      0
    );
}

async function p1() {
  const input = await getInput();
  const numValid = input
    .map(({ char, left: min, right: max, password }) => {
      const numOccurrences = getNumOccurrences(char, password);
      return numOccurrences >= min && numOccurrences <= max;
    })
    .filter(x => x)
    .length;

  return numValid;
}

async function p2() {
  const input = await getInput();
  const numValid = input
    .map(({ char, left, right, password }) => {
      const i = parseInt(left) - 1;
      const j = parseInt(right) - 1;

      const isLeft = password[i] === char;
      const isRight = password[j] === char;

      // XOR
      return isLeft ? !isRight : isRight;
    })
    .filter(x => x)
    .length;

  return numValid;
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
