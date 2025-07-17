const myPromise = new Promise((resolve, reject) => {
  // Perform an asynchronous operation
  let operationSuccessful = true;

  if (operationSuccessful) {
    resolve("Operation was a success!");
  } else {
    reject("Operation failed.");
  }
});


myPromise
  .then((successMessage) => {
    // onFulfilled: a function to run when the promise resolves
    console.log(successMessage); // "Operation was a success!"
  })
  .catch((errorMessage) => {
    // onRejected: a function to run when the promise is rejected
    console.error(errorMessage);
  })
  .finally(() => {
    // onFinally: a function to run after the promise is settled
    console.log("Promise settled.");
  });