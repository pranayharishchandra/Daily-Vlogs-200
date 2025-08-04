  /*
- make 4 check boxes
- display
  - value of checked boxes
  - remove the value of unchecked boxes
*/

import React, { useState } from 'react';

// Main App Component
export default function Assignment2() {
  
  // State for the checkboxes. We'll store the values of the checked items in an array.
  const [checkedItems, setCheckedItems] = useState([]);

  // Data for our checkboxes
  const checkboxOptions = [
    { id: 'check1', value: 'React', label: 'React' },
    { id: 'check2', value: 'Vue', label: 'Vue' },
    { id: 'check3', value: 'Angular', label: 'Angular' },
    { id: 'check4', value: 'Svelte', label: 'Svelte' },
  ];

  // Event handler for checkbox changes
  const handleCheckboxChange = (event) => {
    console.log(event.target)
    const { value, checked } = event.target;

    if (checked) {
      // If the checkbox is checked, add its value to our state array.
      setCheckedItems(prev => [...prev, value]);
    } else {
      // If the checkbox is unchecked, remove its value from the state array.
      setCheckedItems(prev => prev.filter(item => item !== value));
    }
  };

  return (
    <div className = "bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans">
      <div className = "w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        


        {/* --- Checkbox Section --- */}
        <div className = "space-y-4">
            <h2  className = "text-xl font-bold text-center text-cyan-400">Select Frameworks</h2>
            <div className = "p-4 bg-gray-700 rounded-lg grid grid-cols-2 gap-4">
                {checkboxOptions.map((option) => (
                    <label key = {option.id} htmlFor = {option.id} className = "flex items-center space-x-3 cursor-pointer">
                        <input
                            id        = {option.id}
                            type      = "checkbox"
                            value     = {option.value}
                            onChange  = {handleCheckboxChange}
                            checked   = {checkedItems.includes(option.value)}                                            /* optional to use, but good if initally something checked */
                            className = "h-5 w-5 rounded bg-gray-800 border-gray-600 text-cyan-500 focus:ring-cyan-600"
                        />
                        <span className = "text-gray-200">{option.label}</span>
                    </label>
                ))}
            </div>
            <div className = "p-4 bg-gray-900 rounded-lg min-h-[80px] border border-gray-700">
                <p className = "text-gray-400 text-sm">Selected values:</p>
                <p className = "text-lg text-green-400 break-words">
                    {checkedItems.length > 0 ? checkedItems.join(', ') : 'None selected'}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
}
