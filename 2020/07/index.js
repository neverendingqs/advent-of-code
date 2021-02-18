const { promises: fs } = require('fs');

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n');
}

async function p1() {
  // alt: something something all leaves of an acyclic graph
  const input = await getInput();
  const insideToOut = input
    .reduce(
      (acc, rule) => {
        const [, out, insidesStr] = rule.match(/^(.*) bags contain (.*).$/);
        if(insidesStr === 'no other bags') {
          return acc;
        }

        const insides = insidesStr
          .split(',')
          .map(insideStr => {
            const matches = insideStr
              .trim()
              .match(/^\d (.*) bag[s]?$/);

            const [, inside] = matches;
            return inside;
          });

        insides.forEach(inside => {
          acc[inside] = (acc[inside] || []).concat(out);
        });

        return acc;
      },
      {}
    );

    const queue = ['shiny gold'];
    const outsideBags = new Set();

    do {
      const bag = queue.pop();
      if(!outsideBags.has(bag) || insideToOut[bag]) {
        insideToOut[bag].forEach(out => {
          outsideBags.add(out);
          queue.push(out);
        });
      }
    } while (queue.length > 0);

    return outsideBags.size;
}

async function p2() {
  // alt: something something all leaves of an acyclic graph
  const input = await getInput();
  const outToInside = input
    .reduce(
      (acc, rule) => {
        const [, inside, outStrs] = rule.match(/^(.*) bags contain (.*).$/);
        if(outStrs === 'no other bags') {
          return acc;
        }

        acc[inside] = outStrs
          .split(',')
          .reduce(
            (acc, outStr) => {
              const matches = outStr
                .trim()
                .match(/^(\d) (.*) bag[s]?$/);

              const [, amount, inside] = matches;
              acc[inside] = parseInt(amount);
              return acc;
            },
            {}
          );

        return acc;
      },
      {}
    );

    function getNumInsideBags(bag) {
      let numInsideBags = 0;
      Object
        .entries(outToInside[bag] ?? {})
        .forEach(([insideBag, numInsideBag]) => {
          numInsideBags += numInsideBag * getNumInsideBags(insideBag) + numInsideBag;
        });

      return numInsideBags;
    }

    return getNumInsideBags('shiny gold');
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 337
   * p2: 50100
   */
};
