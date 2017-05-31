var exports = module.exports = {};

exports.get_random = function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
