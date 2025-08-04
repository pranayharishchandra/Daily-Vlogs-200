  /*
 * Clock in which you can change color of background and text
 */
import React, { useState, useEffect } from 'react';

// Main App Component
export default function Assignment5() {
  // State to hold the current time
  const [time, setTime] = useState(new Date());
  
                                                                    // State for the background and text colors
  const [backgroundColor, setBackgroundColor] = useState('#2d3748');// Initial: gray-800
  const [textColor, setTextColor] = useState('#e2e8f0');            // Initial: gray-200

  // useEffect hook to set up the clock interval
  useEffect(() => {
    // Set an interval to update the time every 1000ms (1 second)
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function: This will be called when the component unmounts.
    // It's crucial to clear the interval to prevent memory leaks.
    return () => {
      clearInterval(timerId);
    };
  }, []); // The empty dependency array means this effect runs only once on mount

  return (
    <div className = "bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className = "w-full max-w-2xl p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        <h1 className = "text-3xl font-bold text-center text-cyan-400">Customizable Clock</h1>
        
        {/* The Clock Display */}
        <div 
          className = "p-10 rounded-lg text-center transition-colors duration-500"
          style     = {{ backgroundColor: backgroundColor }}
        >
          <h2 
            className = "text-6xl font-mono font-bold transition-colors duration-500"
            style     = {{ color: textColor }}
          >
            {time.toLocaleTimeString()}
          </h2>
        </div>

        {/* The Color Controls */}
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Background Color Picker */}
          <div className = "flex flex-col items-center space-y-2">
            <label htmlFor = "bg-color" className = "text-lg font-medium text-gray-300">
              Background Color
            </label>
            <input
              id        = "bg-color"
              type      = "color"
              value     = {backgroundColor}
              onChange  = {(e) => setBackgroundColor(e.target.value)}
              className = "w-24 h-12 p-1 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* Text Color Picker */}
          <div className = "flex flex-col items-center space-y-2">
            <label htmlFor = "text-color" className = "text-lg font-medium text-gray-300">
              Text Color
            </label>
            <input
              id        = "text-color"
              type      = "color"
              value     = {textColor}
              onChange  = {(e) => setTextColor(e.target.value)}
              className = "w-24 h-12 p-1 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
