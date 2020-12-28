const { promises: fs } = require('fs');

async function getInput() {
  const [rulesString, messagesString] = (await fs.readFile(`${__dirname}/input.txt`))
    .toString()
    .trim()
    .split('\n\n');

  const rules = rulesString
    .split('\n')
    .reduce(
      (acc, line) => {
        const [index, rules] = line.split(':');
        return Object.assign(acc, { [index]: rules.trim() });
      },
      {}
    );

  const messages = messagesString
    .split('\n')
    .map(line => line.split(''));

  return { messages, rules };
}

async function p1() {
  const { messages, rules } = await getInput();
  const rulesEvaluator = Object
    .entries(rules)
    .reduce(
      (acc, [index, ruleString]) => {
        if(ruleString.startsWith('"')) {
          const letter = ruleString[1];
          return Object.assign(acc, {
            [index]: function(message, iStart) {
              return {
                iEnd: iStart + 1,
                isValid: letter === message[iStart]
              };
            }
          })
        }

        const subrules = ruleString
          .split('|')
          .map(subruleString => subruleString.trim().split(' '));

        return Object.assign(acc, {
          [index]: function(message, iStart) {
            for(let subrule of subrules) {
              let areAllValid = true;
              let i = iStart;

              for(let ruleToCheck of subrule) {
                const { iEnd, isValid } = this[ruleToCheck](message, i);
                if(isValid) {
                  i = iEnd;
                } else {
                  areAllValid = false;
                  break;
                }
              }

              if(areAllValid) {
                return {
                  iEnd: i,
                  isValid: true
                }
              }
            }

            return { isValid: false };
          }
        })
      },
      {}
    );

  return messages
    .filter(message => {
      const { iEnd, isValid } = rulesEvaluator[0](message, 0);
      return isValid && iEnd === message.length;
    })
    .length;
}

async function p2() {
}

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 198
   * p2:
   */
};
