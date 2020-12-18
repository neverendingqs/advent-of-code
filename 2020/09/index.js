const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(i => parseInt(i));
}

class OrderedSet {
  #queue
  #set

  constructor(initial) {
    this.#queue = [...initial];
    this.#set = initial.reduce(
      (acc, i) => Object.assign(acc, { [i]: true }),
      {}
    );
  }

  getAll() {
    return this.#queue;
  }

  has(x) {
    return !!this.#set[x];
  }

  push(x) {
    this.#queue.push(x);
    this.#set[x] = (this.#set[x] ?? 0) + 1;
  }

  shift() {
    const x = this.#queue.shift();
    this.#set[x] = this.#set[x] - 1;
    return x;
  }
}

function isValid(os, x) {
  for(const left of os.getAll()) {
    if(os.has(x - left)) {
      return true;
    }
  }
  return false;
}

async function p1() {
  const input = await getInput();
  const os = new OrderedSet(input.slice(0, 25));

  for(let i = 25; i < input.length; i++) {
    if(!isValid(os, input[i])) {
      return input[i];
    }

    os.push(input[i]);
    os.shift();
  }

  throw new Error('Should not have reached here.');
}

async function p2() {
  const [invalid, input] = await Promise.all([p1(), getInput()]);

  let left = 0;
  let right = 0;
  let currSum = input[0];
  while (right < input.length) {
    if(currSum === invalid) {
      const contiguous = input.slice(left, right + 1);
      return Math.min(...contiguous) + Math.max(...contiguous);
    } else if(currSum < invalid || right - left <= 1) {
      currSum += input[++right];
    } else {
      currSum -= input[left++];
    }
  }

  throw new Error('Should not have reached here.');
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 50047984
   * p2: 5407707
   */
};
