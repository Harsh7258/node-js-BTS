const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject('I could not find that file 😢');
        resolve(data);
      });
    });
  };

  const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if (err) reject('Could not write file 😢');
        resolve('success');
      });
    });
  };

const getDogPic = async() => {
    try{
        const dogBreed = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${dogBreed}`);
    
        const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
        const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
        const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => 
            el.body.message
        );
        console.log(imgs);
    
        await writeFilePro('dog-img.txt', imgs.join('/n'));
        console.log('random dog image saved to file');
    } catch(err) {
        console.log(err);

        throw err;
    }

    return '2: READY 🐶';
};

// using async await to handle promises
(async() => {
    try {
        console.log('1: Will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics!');
      } catch (err) {
        console.log('ERROR 💥');
      }
})();

// handling promises with then and catch
/*
getDogPic().then((x) => {
    console.log(x);
    console.log('3: done getting dog pics');
}).catch(err => console.log('ERROR 💥'));
*/

/*
readFilePro(`${__dirname}/dog.txt`)
.then(dogBreed => {
    console.log(`Breed: ${dogBreed}`);

    // pending promise
    return superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
     })
        .then((res) => {
            console.log(res.body.message);
            return writeFilePro('dog-img.txt', res.body.message);

            //  fs.writeFile('dog-img.txt', res.body.message, err => {
            //      if(err) return console.log(err.message);
            //     console.log('randomdog image saved to file')

                // then --> handles successfull case
       })
       .then(() => {
        console.log('Random dog image saved to file');
       }).catch(err => {
      console.log(err.message);
   });
   // catch --> handles unsuccessfull case

   // resolved promise
*/