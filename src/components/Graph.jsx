import React, { useCallback } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const Graph = () => {
  const elements = [
    { data: { id: 'a' }, position: { x: 100, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 300 } },
    { data: { id: 'd' }, position: { x: 400, y: 100 } },
    { data: { id: 'e' }, position: { x: 500, y: 200 } },
    { data: { id: 'ab', source: 'a', target: 'b' } },
    { data: { id: 'bc', source: 'b', target: 'c' } },
    { data: { id: 'cd', source: 'c', target: 'd' } },
    { data: { id: 'de', source: 'd', target: 'e' } }
  ];

  const stylesheet = [
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
        'control-point-distances': 50,
        'control-point-weights': 0.5,
        'line-fill': 'solid',
        'line-color': '#ccc'
      }
    },
    {
      selector: '.bubble',
      style: {
        'width': 10,
        'height': 10,
        'background-color': '#ff0000',
        'shape': 'ellipse',
        'overlay-opacity': 0
      }
    }
  ];

  const layout = {
    name: 'preset',
  };

  const onCyReady = useCallback((cy) => {
    const getEdgePosition = (edge, t) => {
      const sourcePos = edge.source().position();
      const targetPos = edge.target().position();
      const x = (1 - t) * sourcePos.x + t * targetPos.x;
      const y = (1 - t) * sourcePos.y + t * targetPos.y;
      return { x, y };
    };

    const animateBubble = (edge, color, duration) => {
      const animationSteps = 100;
      let step = 0;

      const bubble = cy.add({
        group: 'nodes',
        data: { id: 'bubble', bubbleColor: color },
        position: { x: edge.source().position('x'), y: edge.source().position('y') },
        classes: 'bubble'
      });

      const interval = setInterval(() => {
        if (step > animationSteps) {
          clearInterval(interval);
          bubble.remove();
          return;
        }

        const t = step / animationSteps;
        const pos = getEdgePosition(edge, t);

        bubble.position(pos);
        step++;
      }, duration / animationSteps);
    };

    animateBubble(cy.getElementById('ab'), '#ff0000', 2000);
  }, []);

  return (
    <div className="p-4 ">
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        style={{ width: '100%', height: '400px' }}
        cy={onCyReady}
      />
    </div>
  );
};

export default Graph;
