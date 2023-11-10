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