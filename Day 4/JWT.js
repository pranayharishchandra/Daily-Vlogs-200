/*
* The Structure of a JWT 📜
A JWT consists of three parts separated by dots (.): Header, Payload, and Signature.

xxxxx.yyyyy.zzzzz

1. Header: Contains metadata about the token, 
like the signing algorithm (alg) and token type (typ).

Example: {"alg": "HS256", "typ": "JWT"}

2. Payload: Contains the claims or data about the user,
 such as their ID and an expiration date. 
 This data is encoded,
 not encrypted,
 so do not store sensitive information like passwords here.

Example: {"sub": "12345",
 "name": "John Doe",
 "iat": 1516239022,
 "exp": 1516242622}

3. Signature: A cryptographic signature used to verify the token's integrity. 
 It's created by hashing the header,
 the payload,
 and a secret key known only to the server. 
 This ensures the token was not tampered with.

* ***********************************************************
* How JWT Authentication Works (The Flow):-
Login: The user sends their credentials (e.g., email and password) to the server.
(going to conference)

Validation: The server validates the credentials.
(at gate security they check if we were invited by checking our name in their register/DB)

Token Creation: If the credentials are valid, the server creates a JWT, signing it with a "secret key".
(our name was in their DB, we are verified, they make an "ID card", with our name and un-sensitive info)
(that ID card info can only be read/written when they put the ID card in their Machine)

Send Token: The server sends the JWT back to the client.
(give us ID card)

Token Storage: The client stores the JWT, typically in an HttpOnly "cookie" or "Local Storage".


Authenticated Requests: For every subsequent request to a protected resource, 
                        the client includes the JWT in the Authorization header.
(in conference, when we need to go to some re-stricted area where only i can go, 
i will show my ID card to get in)


Authorization: Bearer <your-jwt-here>


Verification: The server receives the request, extracts the JWT, 
              and verifies its signature using the secret key.
(they will take my ID card, put in their Machine (using secrte key), 
and verify - if our ID card is real(JWT not expired/tampered) && info in our ID card)


Access Granted: If the signature is valid and the token is not expired, the server processes the request and sends back the requested resource.




*/

/*
 * Step 1: Installation
npm install express jsonwebtoken
 * Step 2: Creating a Token (Login Route)
Create a route where a user can "log in" and receive a token.

 */


import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// IMPORTANT: Store this in an environment variable (.env file)
const JWT_SECRET = 'your-super-secret-key-that-is-very-long';

// Login route to generate a token
app.post('/login', (req, res) => {
  // In a real app, you'd validate req.body.username and req.body.password against a database
  const { username, password } = req.body;

  if (username === 'test' && password === 'pass') {
    // User is authenticated, create the payload
    const payload = {
      sub: 'user123', // 'sub' (subject) is standard for user ID
      username: username,
    };

    // Sign the token with an expiration time
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: token });

  } else {
    res.status(401).send('Invalid credentials');
  }
});


/*
* Step 3: Verifying a Token (Middleware)
Create a middleware function to protect routes. This function will check for a valid token on incoming requests.
*/

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request object
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next(); // Proceed to the next middleware or route handler
}


/*
* Step 4: Protecting a Route
Now, use the verifyToken middleware on any route you want to protect. 
*/

// A protected route
app.get('/profile', verifyToken, (req, res) => {
  // Because of the middleware, req.user is available here
  res.send(`Welcome, ${req.user.username}!`);
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















