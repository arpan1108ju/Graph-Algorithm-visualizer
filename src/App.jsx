import React from 'react';
import Graph from './components/Graph';
import './index.css'; // Import Tailwind CSS
import CanvasState from './assets/context/CanvasState';

function App() {
  return (
    <CanvasState>
      <div className="App">
        <h1 className="text-2xl font-bold text-center my-4">GRAPH ALOGRITHM VISUALIZER</h1>
        <div className="mx-auto">
          <Graph />
        </div>
      </div>
    </CanvasState>
  );
}

export default App;
