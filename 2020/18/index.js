const { promises: fs } = require('fs');

async function getInput() {
  return (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(''))
    .map(symbols => symbols.filter(symbol => symbol !== ' '));
}

async function p1() {
  function solve(expression, iStart = 0) {
    let result;
    let lastOperator;

    function partialEvaluation(value) {
      switch(lastOperator) {
        case undefined:
          result = value;
          break;

        case '+':
          result += value;
          break;

        case '*':
          result *= value;
          break;

        default:
          throw new Error('Should not have reached here.');
      }
    }

    for(let i = iStart; i < expression.length; i++) {
      switch(expression[i]) {
        case '(':
          const { iEnd, result: expressionValue } = solve(expression, i + 1);
          i = iEnd;
          partialEvaluation(expressionValue);
          break;

        case ')':
          return { iEnd: i, result };

        case '+':
        case '*':
          lastOperator = expression[i];
          break;

        default:
          const value = parseInt(expression[i]);
          partialEvaluation(value);
          break;
      }
    }

    return {
      iEnd: expression.length,
      result
    };
  }

  const input = await getInput();
  return input.reduce(
    (acc, expression) => acc + solve(expression).result,
    0
  );
}

async function p2() {
  function solve(expression, iStart = 0) {
    let lastEvaluatedIndexExclusive = expression.length;
    const flattened = [];

    for(let i = iStart; i < expression.length; i++) {
      const symbol = expression[i];

      if(symbol === '(') {
        const { iEnd, result: expressionValue } = solve(expression, i + 1);
        i = iEnd;
        flattened.push(expressionValue);
      } else if(symbol === ')') {
        lastEvaluatedIndexExclusive = i;
        break;
      } else {
        flattened.push(expression[i]);
      }
    }

    const product = [];
    for(let i = 0; i < flattened.length; i++) {
      if(flattened[i] === '*') {
        continue;
      }

      let currentSum = parseInt(flattened[i]);
      while(flattened[i + 1] === '+') {
        currentSum += parseInt(flattened[i + 2]);
        i += 2
      }

      product.push(currentSum);
    }

    const result = product.reduce(
      (acc, x) => acc * x,
      1
    );

    return {
      iEnd: lastEvaluatedIndexExclusive,
      result
    };
  }

  const input = await getInput();
  return input.reduce(
    (acc, expression) => acc + solve(expression).result,
    0
  );
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 5374004645253
   * p2: 88782789402798
   */
};
