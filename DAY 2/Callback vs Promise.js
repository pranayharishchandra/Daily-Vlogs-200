// promise also use the same callback concept under the hood

//=============== CALLBACK VERSION (UGLY WAY)===============

const fs = require('fs');

// my own asynchronous function
function pranayReadFile(cb) {
  fs.readFile("a.txt", "UTF-8", function(err, data) {
    cb(data);
  });
}

// callback function to call
function onDone(data) {
  console.log(data)
}

pranayReadFile(onDone)


///=============== PROMISE VERSION (GOOD WAY)===============

const fs = require('fs');

// my own "asynchronous" function, you could have also used - setTimeout 
function pranayReadFile() {
  return new Promise(function(resolve) {
    fs.readFile("a.txt", "utf-8", function(err, data) {
      resolve(data);
    })
  })
}

// callback function to call
function onDone(data) {
  console.log(data)
}

// pranayReadFile().then(onDone);

const promisePlaceholder = pranayReadFile()  // promise returned immediately
// The data that fulfills the promise arrives asynchronously later
promisePlaceholder.then(onDone) // .then() to handle data when promise is resolved

