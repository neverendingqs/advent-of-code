const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n\n')
    .map(group => group.split('\n'));
}

async function p1() {
  const input = await getInput();
  return input.reduce(
    (total, group) => total + [...new Set(group.flatMap(response => response.split('')))].length,
    0
  );
}

async function p2() {
  const input = await getInput();

    return input.reduce(
      (total, group) => {
        const responsesCounter = group
          .flatMap(answers => answers.split(''))
          .reduce(
            (acc, answer) => {
              acc[answer] = (acc[answer] || 0) + 1;
              return acc;
            },
            {}
          );

        const numAllAnswered = Object
          .entries(responsesCounter)
          .filter(([, numResponses]) => numResponses === group.length)
          .length;

        return total + numAllAnswered;
      },
      0
    );
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 6387
   * p2: 3039
   */
};
