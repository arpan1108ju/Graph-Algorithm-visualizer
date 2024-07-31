import React from 'react';
import Graph from './components/Graph';
import './index.css'; // Import Tailwind CSS
import EdgeState from './assets/context/EdgeState';

function App() {
  return (
    <EdgeState>
      <div className="App">
        <h1 className="text-2xl font-bold text-center my-4">GRAPH ALOGRITHM VISUALIZER</h1>
        <div className="mx-auto">
          <Graph />
        </div>
      </div>
    </EdgeState>
  );
}

export default App;
