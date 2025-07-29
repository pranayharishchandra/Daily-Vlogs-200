import React, { useState, useEffect, useRef } from 'react';

function UseRefCompleteDemo() {
  // --- Use Case 1: Accessing a DOM Element ---
  // Create a ref to hold the reference to the input DOM element.
  // Initially, `inputRef.current` is `null`.
  const inputRef = useRef(null);

  // --- Use Case 2: Storing a Mutable Value ---
  // Create a ref to count renders. We initialize it to 0.
  // This value will persist across renders, but changing it won't cause a re-render.
  const renderCountRef = useRef(0);

  // A regular state variable to trigger re-renders
  const [text, setText] = useState('');

  // This effect runs after EVERY render, incrementing our ref counter.
  // Because updating a ref doesn't trigger a re-render, this does NOT cause an infinite loop.
  useEffect(() => {
    renderCountRef.current = renderCountRef.current + 1;
  });

  // Function to demonstrate focusing the input
  const handleFocusClick = () => {
    // After the component mounts, `inputRef.current` will point to the <input> DOM node.
    // We can then call any standard DOM API method on it, like .focus().
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Function to demonstrate changing the DOM element's style directly
  const handleChangeBorderClick = () => {
    if (inputRef.current) {
      inputRef.current.style.borderColor = 'cyan';
      inputRef.current.style.boxShadow   = '0 0 10px cyan';
    }
  };

  return (
    <div className = "bg-gray-800 text-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
      <h1 className = "text-2xl font-bold text-center">useRef Complete Demo</h1>

      {/* Attach the ref to the input element */}
      <input
        ref         = {inputRef}
        type        = "text"
        value       = {text}
        onChange    = {(e) => setText(e.target.value)}
        placeholder = "Type here to trigger re-renders..."
        className   = "w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none transition-all duration-300"
      />

      <div className = "flex space-x-4">
        <button
          onClick   = {handleFocusClick}
          className = "flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Focus Input
        </button>
        <button
          onClick   = {handleChangeBorderClick}
          className = "flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Change Border
        </button>
      </div>

      <div className = "text-center bg-gray-900 p-4 rounded-lg">
        <p className = "text-lg">
          The component has rendered{' '}
          <span className = "font-bold text-2xl text-cyan-400">
            {renderCountRef.current}
          </span>{' '}
          times.
        </p>
        <p className = "text-sm text-gray-400">
          (This count persists without causing new renders itself)
        </p>
      </div>
    </div>
  );
}

export default UseRefCompleteDemo;