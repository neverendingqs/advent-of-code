const { promises: fs } = require('fs');

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const requiredSet = new Set(required);
const optional = 'cid';

const validEyeColours = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

async function getInput() {
  return input = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n\n')
    .map(line => line
      .split(/\s/)
      .reduce(
        (acc, pair) => {
          const [key, value] = pair.split(':');
          return Object.assign(acc, { [key]: value })
        },
        {}
      )
    );
}

function isValidPassport(passport) {
  const keys = Object.keys(passport);
  const keysSet = new Set(keys);

  return keys.every(key => requiredSet.has(key) || key === optional)
    && required.every(key => keysSet.has(key));
}

async function p1() {
  const input = await getInput();
  const numValid = input
    .filter(passport => isValidPassport(passport))
    .length;

  return numValid;
}

async function p2() {
  const input = await getInput();
  const numValid = input
    .filter(passport => {
      const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
      if(!hgt) { return false; }

      const birthYear = parseInt(byr);
      const issueYear = parseInt(iyr);
      const expirationYear = parseInt(eyr);

      const height = parseInt(hgt.slice(0, -2));
      const heightUnit = hgt.slice(-2);
      const validHeight = heightUnit === 'cm'
        ? height >= 150 && height <= 193
        : height >= 59 && height <= 76;

      const isValid = !!(
        isValidPassport(passport)
        && birthYear >= 1920 && birthYear <= 2002
        && issueYear >= 2010 && issueYear <= 2020
        && expirationYear >= 2020 && expirationYear <= 2030
        && validHeight
        && hcl && hcl.match(/^#[0-9a-f]{6}$/)
        && validEyeColours.has(ecl)
        && pid && pid.match(/^[0-9]{9}$/)
      );

      return isValid
    })
    .length;

  return numValid;
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 245
   * p2: 133
   */
};
