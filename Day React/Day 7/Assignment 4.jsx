  /*create a table using loop*/

import React from 'react';

// Main App Component
export default function Assignment4() {

  // Data for our new table
  const frameworkData = [
    { id: 1, name: 'React', creator: 'Meta (Facebook)' },
    { id: 2, name: 'Angular', creator: 'Google' },
    { id: 3, name: 'Vue.js', creator: 'Evan You' },
    { id: 4, name: 'Svelte', creator: 'Rich Harris' }
  ];


  return (
    <div className = "bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans">
      <div className = "w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg space-y-8">
        
        {/* --- Table Section --- */}
        <div className = "space-y-4">
          <h2  className = "text-2xl font-bold text-center text-cyan-400">Table From Loop</h2>
          <div className = "overflow-x-auto rounded-lg border border-gray-700">
            <table className = "w-full text-left text-gray-300">
              <thead className = "bg-gray-700 text-sm uppercase text-gray-400">
                <tr>
                  <th scope = "col" className = "px-6 py-3">ID</th>
                  <th scope = "col" className = "px-6 py-3">Framework</th>
                  <th scope = "col" className = "px-6 py-3">Creator</th>
                </tr>
              </thead>
              <tbody>
                {frameworkData.map((item) => (
                  <tr key = {item.id} className = "bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                    <td className = "px-6 py-4 font-medium">{item.id}</td>
                    <td className = "px-6 py-4">{item.name}</td>
                    <td className = "px-6 py-4">{item.creator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
