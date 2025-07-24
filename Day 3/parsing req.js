// Before Parsing
// Before the middleware runs, the server has information about the request's headers and method, but the body has not been processed. Therefore, req.body is undefined.



// A simplified view of the `req` object
req = {
  method: 'POST',
  url: '/api/users',
  headers: {
    'host': 'localhost:3000',
    'content-type': 'application/json',
    // ... other headers
  },
  body: undefined // <-- The body is not yet parsed
};
// After Parsing
// After the express.json() middleware runs, it reads the raw request stream, converts the JSON string into a JavaScript object, and attaches it to the req.body property.


// The `req` object after express.json() has run
req = {
  method: 'POST',
  url: '/api/users',
  headers: {
    'host': 'localhost:3000',
    'content-type': 'application/json',
    // ... other headers
  },
  body: { // <-- The body is now a usable JavaScript object
    username: 'jane_doe',
    email: 'jane@example.com'
  }
};
// The middleware transforms the raw request into a ready-to-use JavaScript object for your route handlers.