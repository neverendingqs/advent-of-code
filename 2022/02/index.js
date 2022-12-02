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

  const input = await getInput();

  return input.reduce(
    (acc, [opponentMove, endState]) => {
      let myMove;

      if(endState === 'X') {
        // lose
        if(opponentMove === 'A') {
          myMove = 'C';
        } else if (opponentMove === 'B') {
          myMove = 'A';
        } else if(opponentMove === 'C') {
          myMove = 'B';
        } else {
          throw new Error('Should not reach here!');
        }
      } else if (endState === 'Y') {
        // tie
        myMove = opponentMove;
        acc += 3;
      } else if (endState === 'Z') {
        // win
        if(opponentMove === 'A') {
          myMove = 'B';
        } else if (opponentMove === 'B') {
          myMove = 'C';
        } else if(opponentMove === 'C') {
          myMove = 'A';
        } else {
          throw new Error('Should not reach here!');
        }
        acc += 6;
      } else {
        throw new Error('Should not reach here!');
      }

      return acc + selectionScore[myMove];
    },
    0
  );
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
