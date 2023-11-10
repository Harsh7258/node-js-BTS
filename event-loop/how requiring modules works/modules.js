// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-module");
const calac1 = new C();
console.log(calac1.divide(9, 9));