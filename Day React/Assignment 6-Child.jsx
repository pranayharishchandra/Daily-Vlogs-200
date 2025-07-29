/*
*LifecycleLogger
*/


import React, { useState, useEffect } from 'react';

// --- Child Component ---
// This component contains all the lifecycle logic and logs to the console.
export default function LifecycleLogger({ message }) {
  const [count, setCount] = useState(0);

  // --- 1. MOUNTING & UNMOUNTING ---
  // This effect runs only ONCE when the component mounts, and its cleanup 
  // function runs only ONCE when it unmounts.
  useEffect(() => {
    // This code runs when the component is first added to the DOM.
    console.log('%cMOUNTING: Component has mounted!', 'color: green; font-weight: bold;');

    // The returned function is the "cleanup" function.
    // It runs when the component is about to be removed from the DOM.
    return () => {
      console.log('%cUNMOUNTING: Component is about to unmount.', 'color: red; font-weight: bold;');
    };
  }, []); // The empty dependency array [] is the key to making this run only once.


  // --- 2. UPDATING (due to state change) ---
  // This effect runs on the initial mount AND every time the `count` state changes.
  useEffect(() => {
    // We add a check to avoid logging on the initial mount.
    if (count > 0) {
      console.log(`%cUPDATING: Count state changed to: ${count}`, 'color: orange;');
    }
  }, [count]); // The dependency array [count] tells React to re-run this effect when `count` changes.


  // --- 3. UPDATING (due to prop change) ---
  // This effect runs on the initial mount AND every time the `message` prop changes.
  useEffect(() => {
    console.log(`%cUPDATING: Message prop changed to: "${message}"`, 'color: cyan;');
  }, [message]); // The dependency array [message] tells React to re-run this effect when `message` changes.


  // This effect runs after EVERY render (mount and all updates).
  // Use this sparingly, as it can cause performance issues.
  useEffect(() => {
    console.log('--- A render cycle has completed. ---');
  });

  return (
    <div className="p-6 bg-gray-700 rounded-lg border border-cyan-500 space-y-4">
      <h3 className="text-xl font-bold text-cyan-300">Child Component</h3>
      <p>Prop from parent: <span className="font-semibold">"{message}"</span></p>
      <p>Internal state: <span className="font-semibold">{count}</span></p>
      <button
        onClick={() => setCount(c => c + 1)}
        className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
      >
        Increment Child State (Count)
      </button>
    </div>
  );
}


// --- Parent Component ---
// This component controls the lifecycle of the Child Component.
export default function App() {
  const [showChild, setShowChild] = useState(true);
  const [message, setMessage] = useState('Hello World');

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">React Lifecycle Demo</h1>
        
        {/* Controls for the parent component */}
        <div className="p-4 bg-gray-700 rounded-lg space-y-4">
          <h3 className="text-xl font-bold text-gray-300">Parent Controls</h3>
          <button
            onClick={() => setShowChild(prev => !prev)}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            {showChild ? 'Hide Child (Unmount)' : 'Show Child (Mount)'}
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        
        {/* Conditionally render the child component to trigger mounting/unmounting */}
        {showChild && <LifecycleLogger message={message} />}
      </div>
    </div>
  );
}
