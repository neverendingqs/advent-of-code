const { promises: fs } = require('fs');

class NegativeIndexArray {
  constructor(initial) {
    this.positive = [...initial];
    this.negative = [];

    // https://stackoverflow.com/a/57634753/2687324
    return new Proxy(this, {
      get: (obj, key) => {
        const i = Number(key);
        if (Number.isInteger(i)) {
          return i < 0
            ? this.negative[Math.abs(i) - 1]
            : this.positive[i];
        }

        return obj[key];
      },
      set: (obj, key, value) => {
        const i = Number(key);
        if (Number.isInteger(i)) {
          return i < 0
            ? this.negative[Math.abs(i) - 1] = value
            : this.positive[i] = value;
        }

        return obj[key] = value;
      }
    });
  }

  get[Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    return `[${this.negative.join(',')}][${this.positive.join(',')}]`;
  }
}

async function getInput() {
  return (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n');
}

async function p1() {
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
