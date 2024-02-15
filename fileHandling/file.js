const fs = require("fs");
const os = require("os");

// console.log(`Number of cpu in this device: ${os.cpus().length}`) // maximum thread size according to cpu numbers

// sync -
// fs.writeFileSync('./text.txt', 'hello!!');

// async -
// fs.writeFile('./text.txt', 'hello async!!', (err) => {});

// BLOCKING operation....
// console.log("This will run in order: 1st")
// sync -
// const result = fs.readFileSync('./text.txt', "utf-8");
// console.log("This will run in order: 2nd:", result)
// console.log("This will run in order: 3rd")
// console.log("This will run in order: 4th")

// NON-BLOCKING operations....
// console.log("This will run in non-order: 1st")
// async -
// fs.readFile('./text.txt', "utf-8", (err, result) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log("This will run in non-order: 2nd:", result)
//     }
// });
// console.log("This will run in non-order: 3rd")
// console.log("This will run in non-order: 4th")

// append -
// fs.appendFileSync('./text.txt', `${ Date.now()} hello!!\n`);

// copy -
// fs.cpSync('./text.txt', './copy.txt');

// delete -
// fs.unlinkSync('./copy.txt');

// create -
// fs.mkdirSync('./folder/nest', { recursive: true });

// stats about file -
// console.log(fs.statSync("./text.txt"));