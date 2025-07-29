import React from 'react';
import Assignment1 from './Assignment 1.jsx'
import Assignment2 from './Assignment 2.jsx'
import Assignment3 from './Assignment 3.jsx'
import Assignment4 from './Assignment 4.jsx'
import Assignment5 from './Assignment 5-Parent.jsx'

export function App(props) {
  return (
    <div className='App'>
        <h1>Assignment 1</h1>
        <Assignment1/>
        <h1>Assignment 2</h1>
        <Assignment2/>
        <h1>Assignment 3</h1>
        <Assignment3/>
        <h1>Assignment 4</h1>
        <Assignment4/>
        <h1>Assignment 5 - LifecycleLogger</h1>
        <Assignment5/>
    </div>
  );
}
