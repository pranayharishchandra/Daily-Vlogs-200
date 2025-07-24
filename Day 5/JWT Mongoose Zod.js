/*
* hashing passwords, jwt token, MongoDB (NoSql), Zod 

* npm install express jsonwebtoken mongoose zod bcryptjs dotenv express
    - mongoose: A library that makes working with MongoDB databases easy.
    - zod: The library for validating incoming data against a schema.
    - bcryptjs: A library to hash passwords securely before saving them to the database.
    - dotenv: You need a package to load the variables from your .env file into Node.js. T
              he standard package for this is dotenv
 */





import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// --- Basic Setup ---
const app = express();
app.use(express.json());

// --- Constants (should be in a .env file) ---
//! const JWT_SECRET = 'your-super-secret-key-that-is-very-long';
//! const MONGO_URI = 'mongodb+srv://pranay:pranay@cluster0.dprg5ql.mongodb.net/';
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI  = process.env.MONGO_URI;

const PORT = 3001;

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error', err));

// --- Zod Schema for Input Validation ---
const userRegistrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."), //  custom error message
  email   : z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

// --- Mongoose Schema for Database ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email   : { type: String, required: true, unique: true },
  password: { type: String, required: true },                 // This will store the hashed password
});

/*
* const User = mongoose.model('User', userSchema);

Though, this code will not keep making the User model if it has already been created. However, in some environments (like when using hot-reloading in development, or running code multiple times in a REPL), trying to create a Mongoose model with the same name ('User') more than once can cause an error: 
* "Cannot overwrite User model once compiled."

* mongoose.models.User checks if the model already exists
*/
const User = mongoose.models.User || mongoose.model('User', userSchema);


// --- ROUTES ---

// 1. User Registration Route
app.post('/register', async (req, res) => {
  try {
    // a. Validate input using Zod
    const { username, email, password } = userRegistrationSchema.parse(req.body);

    // b. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User with this email already exists.');
    }

    // c. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // d. Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send('User registered successfully.');

  } catch (error) {
    if (error instanceof z.ZodError) { //!z.ZodError is the error thrown by Zod when validation fails.
      // If validation fails, send back Zod's error "messages"
      return res.status(400).json({ errors: error }); 
      // return res.status(400).json({ errors: error.message }); 
    }
    res.status(500).send('An internal server error occurred.');
  }
});

// 2. Login Route (Now checks against the database)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // a. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials.');
    }

    // b. Compare the provided password with the stored hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send('Invalid credentials.');
    }

    // c. User is authenticated, create and sign the token
    const payload = { sub: user._id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {
    res.status(500).send('An internal server error occurred.');
  }
});


// --- MIDDLEWARE & PROTECTED ROUTE (Unchanged from previous example) ---
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).send('A token is required.');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}

app.get('/profile', verifyToken, (req, res) => {
  res.send({decoded: req.user})
  res.send(`Welcome, ${req.user.username}! Your user ID is ${req.user.sub}.`);
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});