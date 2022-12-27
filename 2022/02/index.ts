import readInput from '../lib/readInput';

async function getInput(): Promise<string[][]> {
  const file: string = await readInput(__dirname);

  return file
    .split('\n')
    .map((round: string) => round.split(' '));
}

async function p1(): Promise<string> {
  enum MyMove {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z',
  }

  enum OpponentMove {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
  }

  const selectionScore: { [key in MyMove]: number } = {
    [MyMove.Rock]: 1,
    [MyMove.Paper]: 2,
    [MyMove.Scissors]: 3,
  };

  const opponentToYourMove: { [key in OpponentMove]: MyMove } = {
    [OpponentMove.Rock]: MyMove.Rock,
    [OpponentMove.Paper]: MyMove.Paper,
    [OpponentMove.Scissors]: MyMove.Scissors,
  };

  const input: Array<[OpponentMove, MyMove]> = await getInput() as Array<[OpponentMove, MyMove]>;

  const score: number =  input.reduce(
    (acc: number, [opponentMove, myMove]: [OpponentMove, MyMove]) => {
      const totalScore: number = acc + selectionScore[myMove];

      if(opponentToYourMove[opponentMove] === myMove) {
        return totalScore + 3;
      }

      if(
        (opponentMove === OpponentMove.Rock && myMove === MyMove.Paper) ||
        (opponentMove === OpponentMove.Paper && myMove === MyMove.Scissors) ||
        (opponentMove === OpponentMove.Scissors && myMove === MyMove.Rock)
      ) {
        return totalScore + 6;
      }

      return totalScore;
    },
    0
  );

  return score.toString();
}

async function p2(): Promise<string> {
  enum Move {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
  }

  enum EndState {
    Lose = 'X',
    Tie = 'Y',
    Win = 'Z',
  }

  const selectionScore: { [key in Move]: number } = {
    [Move.Rock]: 1,
    [Move.Paper]: 2,
    [Move.Scissors]: 3,
  };

  const loseMap: { [key in Move]: Move } = {
    [Move.Rock]: Move.Scissors,
    [Move.Paper]: Move.Rock,
    [Move.Scissors]: Move.Paper,
  };

  const winMap: { [key in Move]: Move } = {
    [Move.Rock]: Move.Paper,
    [Move.Paper]: Move.Scissors,
    [Move.Scissors]: Move.Rock,
  };

  const input: Array<[Move, EndState]> = await getInput() as Array<[Move, EndState]>;

  const solution: number = input.reduce(
    (acc: number, [opponentMove, endState]: [Move, EndState]) => {

      if(endState === EndState.Lose) {
        const myMove: Move = loseMap[opponentMove];
        return acc + selectionScore[myMove];
      }

      if (endState === EndState.Tie) {
        return acc + 3 + selectionScore[opponentMove];
      }

      if (endState === EndState.Win) {
        const myMove: Move = winMap[opponentMove];
        return acc + 6 + selectionScore[myMove];
      }

      throw new Error('Should not reach here!');
    },
    0
  );

  return solution.toString();
}

export async function solution(): Promise<void> {
  const [p1a, p2a]: string[] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a);
  console.log('p2:', p2a);

  /*
   * p1: 10941
   * p2: 13071
   */
}
