const { promises: fs } = require('fs');

class NegativeIndexArray {
  constructor(initial) {
    this.positive = [...(initial ?? [])];
    this.negative = [];

    // https://stackoverflow.com/a/57634753/2687324
    return new Proxy(this, {
      get: (obj, key) => {
        const i = typeof key === 'string' && Number(key);
        if (Number.isInteger(i)) {
          if(i < 0 && this.negative[Math.abs(i) - 1] === undefined) {
            this.negative[Math.abs(i) - 1] = new NegativeIndexArray();
          } else if (i >= 0 && this.positive[i] === undefined) {
            this.positive[i] = new NegativeIndexArray();
          }

          return i < 0
            ? this.negative[Math.abs(i) - 1]
            : this.positive[i];
        }

        return obj[key];
      },
      set: (obj, key, value) => {
        const i = typeof key === 'string' && Number(key);
        if (Number.isInteger(i)) {
          return i < 0
            ? this.negative[Math.abs(i) - 1] = value
            : this.positive[i] = value;
        }

        return obj[key] = value;
      }
    });
  }

  get maxIndex() {
    return this.positive.length - 1;
  }

  get minIndex() {
    return -this.negative.length;
  }

  get length() {
    return this.negative.length + this.positive.length;
  }

  * [Symbol.iterator]() {
		for(const value of this.negative.reverse().concat(this.positive)) {
      yield value;
    }
	}

  get[Symbol.toStringTag]() {
    return this.toString();
  }

  toJSON() {
    return this.toString();
  }

  toString() {
    const negative = this.negative.reverse().join(',');
    const separator = negative
      ? ','
      : '';
    const positive = this.positive.join(',');

    return `[${negative}${separator}${positive}]`;
  }
}

async function getInput() {
  const yx = new NegativeIndexArray(
    (await fs.readFile(`${__dirname}/input.txt`))
      .toString()
      .trim()
      .split('\n')
      .map(xAxis => new NegativeIndexArray(xAxis.split('')))
  );

  const zyx = new NegativeIndexArray([yx]);
  return zyx;
}

function runCycle(zyx) {
  const newZyx = new NegativeIndexArray(
    new NegativeIndexArray(
      new NegativeIndexArray()
    )
  );

  for(let zi = zyx.minIndex; zi <= zyx.maxIndex; zi++) {
    const yx = zyx[zi];

    for(let yi = yx.minIndex; yi <= yx.maxIndex; yi++) {
      const x = yx[yi];

      for(let xi = x.minIndex; xi <= x.maxIndex; xi++) {
        newZyx[zi][yi][xi] = zyx[zi][yi][xi];
        console.log(newZyx[zi][yi][xi]);
      }
    }
  }
}

async function p1() {
  const zyx = await getInput();
  runCycle(zyx);
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
