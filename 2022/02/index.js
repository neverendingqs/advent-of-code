const { promises: fs } = require('fs');

async function getInput() {
  const input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString();
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
