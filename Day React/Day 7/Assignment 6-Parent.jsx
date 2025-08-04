/*
*LifecycleLogger
*/
import React, { useState } from 'react';

import LifecycleLogger from './Assignment 6-Child'
// --- Parent Component ---
// This component controls the lifecycle of the Child Component.
export default function Assignment5() {
  const [showChild, setShowChild] = useState(true);
  const [message, setMessage]     = useState('Hello World');

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
            type      = "text"
            value     = {message}
            onChange  = {(e) => setMessage(e.target.value)}
            className = "w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Conditionally render the child component to trigger mounting/unmounting */}
        {showChild && <LifecycleLogger message={message} />}
      </div>
    </div>
  );
}
