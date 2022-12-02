const { promises: fs } = require('fs');

async function getInput() {
  const input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim();

  return input
    .split('\n')
    .map(round => round.split(' '));
}

async function p1() {
  const selectionScore = {
    'X': 1, // rock
    'Y': 2, // paper
    'Z': 3, // scissors
  };

  const opponentToYourMove = {
    'A': 'X', // rock
    'B': 'Y', // paper
    'C': 'Z', // scissors
  }

  const input = await getInput();
  return input.reduce(
    (acc, [opponentMove, myMove]) => {
      let totalScore = acc + selectionScore[myMove];

      if(opponentToYourMove[opponentMove] === myMove) {
        return totalScore + 3;
      }

      if(
        (opponentMove === 'A' && myMove === 'Y') ||
        (opponentMove === 'B' && myMove === 'Z') ||
        (opponentMove === 'C' && myMove === 'X')
      ) {
        return totalScore + 6;
      }

      return totalScore;
    },
    0
  );
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
