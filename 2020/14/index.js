const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(line => {
      if(line.startsWith('mask')) {
        const mask = line.substring(7);

        let staticBits = [];
        let wildcardBits = [];
        for(const bit of mask.split('')) {
          if(bit === 'X') {
            wildcardBits.push('1');
            staticBits.push('0');
          } else {
            wildcardBits.push('0');
            staticBits.push(bit);
          }
        }

        return {
          mask: {
            staticBits: BigInt(parseInt(staticBits.join(''), 2)),
            wildcardBits: BigInt(parseInt(wildcardBits.join(''), 2))
          }
        };
      } else {
        const [, address, value] = line.match(/^mem\[(\d+)\] = (\d+)$/);
        return {
          address: parseInt(address),
          value: BigInt(parseInt(value))
        };
      }
    });
}

/* Had assistance from
 * https://www.reddit.com/r/adventofcode/comments/kcr1ct/2020_day_14_solutions/gfvh9q4/
 * to realize that I needed to use BigInt instead of Number
 */
async function p1() {
  const input = await getInput();

  let memory = [];
  let currMask;
  for(const instruction of input) {
    const { address, mask, value } = instruction;

    if(mask) {
      currMask = mask;
    } else {
      const { staticBits, wildcardBits } = currMask;
      const unmaskedBits = (value & wildcardBits);
      const finalValue = (staticBits | unmaskedBits);
      memory[address] = finalValue;
    }
  }

  console.log(memory
    .filter(value => !!value))

  return memory
    .filter(value => !!value)
    .reduce(
      (acc, value) => acc + value,
      0n
    )
    .toString();
}

async function p2() {
  const input = await getInput();
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 7440382076205
   * p2:
   */
};
