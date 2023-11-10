// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module");
const calac1 = new C();
console.log(calac1.multiply(9, 9));

// exports
// const calac2 = require("./test-module-2");
// console.log(calac2.add(9, 9));

// using destructring
const { add, multiply, divide, subtract} = require("./test-module-2");
console.log(add(9, 9));

// caching
require("./test-module-3")();

// other 2 logged again came from cache ehiche is stored somewhere in nodes processes cache.
require("./test-module-3")();
require("./test-module-3")();