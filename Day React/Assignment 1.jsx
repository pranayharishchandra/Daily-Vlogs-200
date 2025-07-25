/*
16. - Make a input field
    - below it, show what we are writing in the input field
    - button, to erase all character 
 */
import React, { useState } from 'react';

// Main App Component
export default function App() {
  // useState hook to manage the input field's value.
  // 'inputValue' holds the current text.
  // 'setInputValue' is the function to update the text.
  // We initialize it with an empty string.
  const [inputValue, setInputValue] = useState('');

  // Event handler for the input field.
  // This function is called every time the user types something.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Event handler for the button.
  // This function clears the input field by resetting the state.
  const handleClearClick = () => {
    setInputValue('');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-cyan-400">Live Text Editor</h1>
        
        {/* Input Field */}
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-400 mb-2">
            Type something here:
          </label>
          <input
            id          = "text-input"
            type        = "text"
            value       = {inputValue}
            onChange    = {handleInputChange}
            placeholder = "Start typing..."
            className   = "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Display Area */}
        <div className="p-4 bg-gray-900 rounded-lg min-h-[80px] border border-gray-700">
          <p className="text-gray-400 text-sm">You are writing:</p>
          <p className="text-lg text-green-400 break-words">{inputValue}</p>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearClick}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-transform transform active:scale-95"
        >
          Erase All Characters
        </button>
        
      </div>
    </div>
  );
}
