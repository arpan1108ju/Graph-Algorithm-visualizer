import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  document.addEventListener('DOMContentLoaded', function() {
    var cy = cytoscape({
        container: document.getElementById('cy'),

        elements: [
            { data: { id: 'a' }, position: { x: 100, y: 100 } },
            { data: { id: 'b' }, position: { x: 200, y: 200 } },
            { data: { id: 'c' }, position: { x: 300, y: 300 } },
            { data: { id: 'd' }, position: { x: 400, y: 100 } },
            { data: { id: 'e' }, position: { x: 500, y: 200 } },
            { data: { id: 'ab', source: 'a', target: 'b' } },
            { data: { id: 'bc', source: 'b', target: 'c' } },
            { data: { id: 'cd', source: 'c', target: 'd' } },
            { data: { id: 'de', source: 'd', target: 'e' } }
        ],

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)',
                    'text-valign': 'center',
                    'color': '#fff',
                    'font-size': '10px',
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'unbundled-bezier',
                    'control-point-distances': 'data(controlPoints)',
                    'control-point-weights': 0.5,
                    'line-fill': 'solid',
                }
            },
            {
                selector: '.bubble',
                style: {
                    'width': 10,
                    'height': 10,
                    'background-color': 'data(bubbleColor)',
                    'border-width': 2,
                    'border-color': '#000',
                    'shape': 'ellipse',
                    'overlay-opacity': 0
                }
            }
        ],

        layout: {
            name: 'preset',
        }
    });

    // Function to calculate position along the edge
    function getEdgePosition(edge, t) {
        const sourcePos = edge.source().position();
        const targetPos = edge.target().position();
        const cp1 = edge.source().position();
        const cp2 = edge.target().position();
        const path = edge.renderedStyle('curve-style') === 'bezier' ? 
            cy.renderer().getBezierPath(sourcePos, targetPos, cp1, cp2) :
            [sourcePos, targetPos];
        
        const x = (1 - t) * sourcePos.x + t * targetPos.x;
        const y = (1 - t) * sourcePos.y + t * targetPos.y;
        
        return { x, y };
    }

    // Function to animate a bubble moving along an edge
    function animateBubble(edge, color, duration) {
        const animationSteps = 100; // Number of steps for the animation
        let step = 0;

        // Create a bubble element for the animation
        const bubble = cy.add({
            group: 'nodes',
            data: { id: 'bubble', bubbleColor: color },
            position: { x: edge.source().position('x'), y: edge.source().position('y') },
            classes: 'bubble'
        });

        const interval = setInterval(() => {
            if (step > animationSteps) {
                clearInterval(interval);
                bubble.remove(); // Remove bubble after animation is complete
                return;
            }

            // Calculate the intermediate position on the edge
            const t = step / animationSteps;
            const pos = getEdgePosition(edge, t);

            bubble.position(pos);

            step++;
        }, duration / animationSteps);
    }

    // Example usage: animate a red bubble along the edge 'ab' over 2 seconds
    animateBubble(cy.getElementById('ab'), '#ff0000', 2000);
});

  return (
    <>
      <h1>Graph algorithm visualizer</h1> 
    </>
  )
}

export default App
