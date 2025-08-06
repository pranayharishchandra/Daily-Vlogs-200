//* updating objects
import React, { useState } from 'react';

function UserProfile() {
    // Initialize state with an object
  const [user, setUser] = useState({
    name   : 'Alex',
    age    : 25,
    address: {
      city: 'New York',
      zip : '10001',
    },
  });

    // --- Handler Functions to Update State ---

    // Updates a top-level property ('age')
  const handleIncrementAge = () => {
    /*
    *The parentheses tell JavaScript "this entire object literal is what I want to return from this arrow function." 
    Without them, JavaScript would try to interpret each line as a separate statement, which would cause a syntax error. */
    setUser(prevUser => ({
      ...prevUser,                     // Copy all properties from the previous user object
      age        : prevUser.age + 1,   // Overwrite the 'age' property
    }));
  };

    // Updates a top-level property from an input field
  const handleNameChange = (event) => {
    setUser(prevUser => ({
      ...prevUser,                       // Copy all properties
      name       : event.target.value,   // Overwrite the 'name' with the input's value
    }));
  };

    // Updates a NESTED property ('city')
  const handleCityChange = (event) => {
    setUser(prevUser => ({
      ...prevUser,  // 1. Copy all top-level properties
      address: {
        ...prevUser.address,                       // 2. Copy all nested properties from the 'address' object
        city               : event.target.value,   // 3. Overwrite the nested 'city' property
      },
    }));
  };

  return (
    <div className = "bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className = "w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6 text-white">
        <h1 className = "text-3xl font-bold text-center text-cyan-400">User Profile</h1>

        {/* Displaying the State */}
        <div className = "p-4 bg-gray-700 rounded-lg space-y-2">
          <p><strong>Name: </strong> {user.name}</p>
          <p><strong>Age : </strong> {user.age}</p>
          <p><strong>City: </strong> {user.address.city}</p>
        </div>

        {/* Controls to Update State */}
        <div className = "space-y-4">
          <button
            onClick   = {handleIncrementAge}
            className = "w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Increment Age
          </button>

          <div>
            <label htmlFor = "name-input" className = "block mb-1 text-sm font-medium">Edit Name:</label>
            <input
              id        = "name-input"
              type      = "text"
              value     = {user.name}
              onChange  = {handleNameChange}
              className = "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor = "city-input" className = "block mb-1 text-sm font-medium">Edit City:</label>
            <input
              id        = "city-input"
              type      = "text"
              value     = {user.address.city}
              onChange  = {handleCityChange}
              className = "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
