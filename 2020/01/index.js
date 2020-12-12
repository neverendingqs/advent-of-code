const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(i => parseInt(i));
}

async function p1() {
  const input = (await getInput())
    .sort((a, b) => a - b);

  for(let i = 0; i < input.length; i++) {
    for(let j = i + 1; j < input.length; j++) {
      const sum = input[i] + input[j];
      if(sum === 2020) {
        return input[i] * input[j];
      } else if(sum > 2020) {
        break;
      }
    }
  }

  throw new Error('Should not have reached here');
}

async function p2() {
  const input = await getInput();
  for(let i = 0; i < input.length; i++) {
    for(let j = i + 1; j < input.length; j++) {
      for(let k = j + 1; k < input.length; k++) {
        if(input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }

  throw new Error('Should not have reached here');
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 63616
   * p2: 67877784
   */
};
