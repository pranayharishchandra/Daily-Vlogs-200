// * STATE LIFT UP

import React, { useState } from 'react';

// --- Child Component 1: Temperature Input ---
// This is a reusable input component. It doesn't know if it's Celsius or Fahrenheit.
// It receives the current temperature and a function to call when it changes.
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
  };

  return (
    <fieldset className = "p-4 border border-gray-600 rounded-lg">
      <legend className = "px-2 text-lg font-semibold text-cyan-400">
        Enter temperature in {scaleNames[scale]}: 
      </legend>
      <input
        value     = {temperature}
        onChange  = {(e) => onTemperatureChange(e.target.value)}
        className = "w-full px-3 py-2 text-xl bg-gray-700 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </fieldset>
  );
}

// --- Boiling Verdict Component ---
// A simple component that just displays a message based on a prop.
function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p className = "text-xl font-bold text-red-500">The water would boil.</p>;
  }
  return <p className = "text-xl font-bold text-blue-400">The water would not boil.</p>;
}

// --- Parent Component: The Calculator ---
// This component holds the state and orchestrates everything.
export default function Calculator() {
  // --- STATE IS LIFTED UP HERE ---
  // We store the current temperature and the scale ('c' or 'f') in the parent.
  const [temperature, setTemperature] = useState('');
  const [scale, setScale]             = useState('c');

  // Handlers to update the state when a child input changes.
  const handleCelsiusChange = (temp) => {
    setScale('c');
    setTemperature(temp);
  };

  const handleFahrenheitChange = (temp) => {
    setScale('f');
    setTemperature(temp);
  };

  // --- Conversion Logic ---
  // Based on the single source of truth, we calculate the other value.
  const celsius    = scale === 'f' ? tryConvert(temperature, toCelsius)    : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div className = "bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className = "w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6 text-white">
        <h1 className = "text-3xl font-bold text-center">Temperature Converter</h1>
        
        {/* The parent passes down the state and the update functions as props */}
        <TemperatureInput
          scale               = "c"
          temperature         = {celsius}
          onTemperatureChange = {handleCelsiusChange}
        />
        <TemperatureInput
          scale               = "f"
          temperature         = {fahrenheit}
          onTemperatureChange = {handleFahrenheitChange}
        />
        
        <div className = "text-center pt-4">
          <BoilingVerdict celsius = {parseFloat(celsius)} />
        </div>
      </div>
    </div>
  );
}

// --- Helper Conversion Functions ---
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output  = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
