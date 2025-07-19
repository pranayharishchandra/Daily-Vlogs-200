// ASYNC function - promise and callback under the hood


// ========= Using Promise =========
const fs = require('fs');

// my own "asynchronous" function, you could have also used - setTimeout 
function pranaysReadFile() {
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

// pranaysReadFile().then(onDone);

const promisePlaceholder = pranaysReadFile()  // promise returned immediately
// The data that fulfills the promise arrives asynchronously later
promisePlaceholder.then(onDone) // .then() to handle data when promise is resolved



// ======== Using async/await ===========
const fs = require('fs');

// my own "asynchronous" function, you could have also used - setTimeout 
function pranaysReadFile() {
  return new Promise(function(resolve) {
    fs.readFile("a.txt", "utf-8", function(err, data) {
      resolve(data);
    })
  })
}

/*
// callback function to call
function onDone(data) {
  console.log(data)
}


const promisePlaceholder = pranaysReadFile()  // promise returned immediately
// The data that fulfills the promise arrives asynchronously later
promisePlaceholder.then(onDone) // .then() to handle data when promise is resolved
*/

async function nameOfFunction() {
  const data = await pranaysReadFile();
  // const data = pranaysReadFile(); // Promise { pending }
  console.log("this code waits for the promise to resolve")
  console.log(data)
}

nameOfFunction()
console.log("this code runs before the async function")


/*
* The "await" keyword is the operator that unwraps the promise to give you its resolved value. Without it, you are just holding onto the promise object itself, which is a placeholder for the future value.
*/









