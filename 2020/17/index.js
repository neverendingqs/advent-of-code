const p1 = require('./p1');
const p2 = require('./p2');

module.exports = async () => {
  const [p1a, p2a] = await Promise.all([p1(), p2()]);
  console.log('p1:', p1a)
  console.log('p2:', p2a);

  /*
   * p1: 255
   * p2:
   */
};
