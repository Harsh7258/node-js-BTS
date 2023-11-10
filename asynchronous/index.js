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
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
        console.log(res.body.message);
    
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('randomdog image saved to file');
    } catch(err) {
        console.log(err.message);
    }
};
getDogPic();

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