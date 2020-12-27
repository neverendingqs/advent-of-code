function generateXArray(numX) {
  return [...Array(numX)].map(() => '.');
}

function generateYXArray(numY, numX) {
  return [...Array(numY)].map(() => generateXArray(numX));
}

function generateZYXArray(numZ, numY, numX) {
  return [...Array(numZ)].map(() => generateYXArray(numY, numX));
}

module.exports = {
  generateXArray,
  generateYXArray,
  generateZYXArray
};
