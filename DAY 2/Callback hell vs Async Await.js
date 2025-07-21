/* 
* The .then() Method (Promise Chaining) 

This is the traditional way of handling promises.

  - fetch() returns a promise.

  - The first .then() runs after the initial network request is complete. It receives a response object.

  - response.json() is then called to parse the response body as JSON. This method also returns a promise.

  - The second, nested .then() runs after the JSON parsing is complete, finally giving you the finalData.

* Promises are always about async operations.
* response.json() is async and returns a Promise,
*/

function getApiData() {
  fetch("https://fakerapi.it/api/v1/persons")
    .then(response => {
      // This returns a Promise that resolves to the parsed JSON
      return response.json();
    })
    .then(finalData => {
      // finalData is the parsed JSON object
      console.log(finalData);
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
    });
}

// Call the function to run it
getApiData();





/*
* async / await
await: The await keyword pauses the function's execution until the promise is resolved. It "unwraps" the promise and gives you the final result directly. This avoids the need for nested .then() blocks.
 */

async function getApiData() {
  try {
    const response = await fetch("https://fakerapi.it/api/v1/persons");
    const finalData = await response.json();
    console.log(finalData);
  } 
  catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Call the function to run it
getApiData();



/*
* Which is Better?
For modern JavaScript development, async/await is considered the best practice.

  - Readability: It looks like synchronous code, which is much easier to read and understand.

  - Error Handling: It allows you to use standard try...catch blocks for error handling, which is often more intuitive.
*/


