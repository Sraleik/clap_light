var exports = module.exports = {};

exports.hexa_to_int = function(hex) {
  var num = 0;
  for(var x=0;x<hex.length;x++) {
    var hexdigit = parseInt(hex[x],16);
    num = (num << 4) | hexdigit;
  }
  return num;
}

exports.get_random = function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
