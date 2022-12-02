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
  const selectionScore = {
    'A': 1, // rock
    'B': 2, // paper
    'C': 3, // scissors
  };

  const loseMap = {
    'A': 'C', // rock - scissors
    'B': 'A', // paper - rock
    'C': 'B', // scissors - paper
  }

  const winMap = {
    'A': 'B', // rock - paper
    'B': 'C', // paper - scissors
    'C': 'A', // scissors - rock
  }

  const input = await getInput();

  return input.reduce(
    (acc, [opponentMove, endState]) => {
      let myMove;

      if(endState === 'X') {
        myMove = loseMap[opponentMove];
        return acc + selectionScore[myMove];
      }

      if (endState === 'Y') {
        return acc + 3 + selectionScore[opponentMove];
      }

      if (endState === 'Z') {
        myMove = winMap[opponentMove];
        return acc + 6 + selectionScore[myMove];
      }

      throw new Error('Should not reach here!');
    },
    0
  );
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 10941
   * p2: 13071
   */
};
