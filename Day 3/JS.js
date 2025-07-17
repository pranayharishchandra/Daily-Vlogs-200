
///=============== CALLBACK VERSION (UGLY WAY)===============

const fs = require('fs');

// my own asynchronous function
function kiratsReadFile(cb) {
  fs.readFile("a.txt", "UTF-8", function(err, data) {
    cb(data);
  });
}

// callback function to call
function onDone(data) {
  console.log(data)
}

kiratsReadFile(onDone)


///=============== PROMISE VERSION (GOOD WAY)===============

const fs = require('fs');

// my own "asynchronous" function, you could have also used - setTimeout 
function kiratsReadFile() {
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

// kiratsReadFile().then(onDone);

const promisePlaceholder = kiratsReadFile()  // promise returned immediately
// The data that fulfills the promise arrives asynchronously later
promisePlaceholder.then(onDone) // .then() to handle data when promise is resolved

