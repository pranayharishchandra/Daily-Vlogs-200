/*
1. create radio button, and show the output
2. create select-options, and show the output
*/

import React, { useState } from 'react';

// Main App Component
export default function Assignment3() {
  // --- State Management ---
  // State for the selected radio button value.
  const [selectedFruit, setSelectedFruit] = useState('Apple'); 
  // State for the selected dropdown option value.
  const [selectedCountry, setSelectedCountry] = useState('USA');

  // --- Data for our controls ---
  const fruitOptions = ['Apple', 'Banana', 'Orange'];
  const countryOptions = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'GBR', label: 'United Kingdom' },
    { value: 'IND', label: 'India' },
  ];

  // --- Event Handlers ---
  const handleRadioChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg space-y-8">
        
        {/* --- Radio Button Section --- */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-cyan-400">Radio Button Example</h2>
          <p className="text-center text-gray-400">Select your favorite fruit.</p>
          
          {/* Radio Group Container */}
          <div className="p-4 bg-gray-700 rounded-lg flex justify-around">
            {fruitOptions.map((fruit) => (
              <label key={fruit} htmlFor={fruit} className="flex items-center space-x-2 cursor-pointer text-lg">
                <input
                  id={fruit}
                  type="radio"
                  name="fruit" // 'name' groups them together
                  value={fruit}
                  checked={selectedFruit === fruit} // Control which is checked
                  onChange={handleRadioChange}
                  className="h-5 w-5 bg-gray-800 border-gray-600 text-cyan-500 focus:ring-cyan-600"
                />
                <span className="text-gray-200">{fruit}</span>
              </label>
            ))}
          </div>

          {/* Output Display */}
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Selected Fruit:</p>
            <p className="text-xl font-semibold text-green-400">{selectedFruit}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700" />

        {/* --- Select/Option Dropdown Section --- */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-cyan-400">Select Dropdown Example</h2>
          <p className="text-center text-gray-400">Choose a country.</p>
          
          {/* Select Input */}
          <select
            value={selectedCountry} // Control the selected option
            onChange={handleSelectChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 text-white"
          >
            {countryOptions.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>

          {/* Output Display */}
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Selected Country:</p>
            <p className="text-xl font-semibold text-green-400">{selectedCountry}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
