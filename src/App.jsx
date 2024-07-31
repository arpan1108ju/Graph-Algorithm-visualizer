import React from 'react';
import Graph from './components/Graph';
import './index.css'; // Import Tailwind CSS

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Cytoscape.js with React and Tailwind CSS</h1>
      <div className="mx-auto h-full w-full">
        <Graph />
      </div>
    </div>
  );
}

export default App;
