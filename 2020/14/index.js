const { promises: fs } = require('fs');

async function getInput(parseMask) {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n')
    .map(line => {
      if(line.startsWith('mask')) {
        const mask = line.substring(7);
        return parseMask(mask);
      } else {
        const [, address, value] = line.match(/^mem\[(\d+)\] = (\d+)$/);
        return {
          address: BigInt(parseInt(address)),
          value: BigInt(parseInt(value))
        };
      }
    });
}

function getSumValueInMemory(memory) {
  return Object
    .values(memory)
    .filter(value => !!value)
    .reduce(
      (acc, value) => acc + value,
      0n
    )
    .toString();
}

/* Had assistance from
 * https://www.reddit.com/r/adventofcode/comments/kcr1ct/2020_day_14_solutions/gfvh9q4/
 * to realize that I needed to use BigInt instead of Number
 */
async function p1() {
  function parseMask(mask) {
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
  }

  const input = (await getInput(parseMask));

  let memory = {};
  let currMask;
  for(const instruction of input) {
    const { address, mask, value } = instruction;

    if(mask) {
      currMask = mask;
    } else {
      const { staticBits, wildcardBits } = currMask;
      const unmaskedBits = value & wildcardBits;
      const finalValue = staticBits | unmaskedBits;
      memory[address] = finalValue;
    }
  }

  return getSumValueInMemory(memory);
}

async function p2() {
  function parseMask(mask) {
    const masks = [{ additionalBits: [], allowedBits: [], staticBits: [] }];

    for(const bit of mask.split('')) {
      if(bit === 'X') {
        const numMasks = masks.length;
        for(let i = 0; i < numMasks; i++) {
          // We can push either a '0' or a '1' for both masks' `additionalBits`
          // It doesn't matter as the one in `staticBits` takes precedence

          const { additionalBits, allowedBits, staticBits } = masks[i];

          // Clone the entry, but set the latest bit in `staticBits` differently
          // This doubles the addresses to write to every time `X` appears in the mask (as desired)
          masks.push({
            additionalBits: [...additionalBits, '0'],
            allowedBits: [...allowedBits, '0'],
            staticBits: [...staticBits, '1']
          });

          additionalBits.push('0');
          allowedBits.push('0');
          staticBits.push('0');
        }
      } else {
        masks.forEach(({ additionalBits, allowedBits, staticBits }) => {
          additionalBits.push(bit);
          allowedBits.push('1');
          staticBits.push('0');
        });
      }
    }

    return {
      masks: masks.map(({ additionalBits, allowedBits, staticBits }) => ({
        additionalBits: BigInt(
          parseInt(additionalBits.join(''), 2)
        ),
        allowedBits: BigInt(
          parseInt(allowedBits.join(''), 2)
        ),
        staticBits: BigInt(
          parseInt(staticBits.join(''), 2)
        )
      }))
    };
  }

  const input = (await getInput(parseMask));

  let memory = {};
  let currMasks;
  for(const instruction of input) {
    const { address, masks, value } = instruction;

    if(masks) {
      currMasks = masks;
    } else {
      currMasks.forEach(({ additionalBits, allowedBits, staticBits }) => {
        const unmaskedBits = (address | additionalBits) & allowedBits;
        const finalAddress = staticBits | unmaskedBits;
        memory[finalAddress] = value;
      });
    }
  }

  return getSumValueInMemory(memory);
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 7440382076205
   * p2: 4200656704538
   */
};
