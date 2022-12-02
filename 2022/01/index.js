const { promises: fs } = require('fs');

async function getInput() {
  const input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim();
  const inventories = input
    .split('\n\n')
    .map(inventory => inventory.split('\n').map(calories => parseInt(calories)));

  return inventories;
}

function sumArray(arr) {
  return arr.reduce(
    (acc, element) => acc + element,
    0
  );
}

async function getSumCalories() {
  const inventories = await getInput();
  const sumCalories = inventories.reduce(
    (acc, inventory) => acc.concat(sumArray(inventory)),
    []
  );

  return sumCalories;
}

async function p1() {
  const sumCalories = await getSumCalories();
  return Math.max(...sumCalories);
}

async function p2() {
  const sumCalories = await getSumCalories();
  const topThree = sumCalories
    .sort((a, b) => b - a)
    .slice(0, 3);

  return sumArray(topThree);
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
