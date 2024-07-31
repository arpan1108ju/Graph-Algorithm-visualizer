import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const Graph = () => {

    const [cy,setCy] = useState(null);

  const elements = [
    { data: { id: 'a' }, position: { x: 100, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 150 } },
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
        'width' : 25,
        'height' : 25
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'unbundled-bezier',
        'control-point-distances': 50, // Control distances can be adjusted dynamically
        'control-point-weights': 0.5,
        'line-fill': 'solid',
        'line-color': '#ccc'
      }
    },
    {
      selector: '.bb',
      style: {
        'width': 25,
        'height': 25,
        'background-color': '#ff0000',
        'shape': 'circle',
        'overlay-opacity': 0
      }
    }
  ];

  const layout = {
    name: 'preset',
  };

  const getEdgePosition = (edge, t) => {
    // Get the control points defined by Cytoscape for the edge
    const controlPoints = edge.controlPoints();
    const sourcePos = edge.source().position();
    const targetPos = edge.target().position();
  
    // If there are no control points, default to a straight line
    if (controlPoints.length === 0) {
      const x = (1 - t) * sourcePos.x + t * targetPos.x;
      const y = (1 - t) * sourcePos.y + t * targetPos.y;
      return { x, y };
    }
  
    // Use quadratic Bezier curve for a single control point
    if (controlPoints.length === 1) {
      const controlPoint = controlPoints[0];
      const x = (1 - t) * (1 - t) * sourcePos.x +
                2 * (1 - t) * t * controlPoint.x +
                t * t * targetPos.x;
      const y = (1 - t) * (1 - t) * sourcePos.y +
                2 * (1 - t) * t * controlPoint.y +
                t * t * targetPos.y;
      return { x, y };
    }
  
    // Use cubic Bezier curve for two control points
    if (controlPoints.length === 2) {
      const controlPoint1 = controlPoints[0];
      const controlPoint2 = controlPoints[1];
      const x = Math.pow(1 - t, 3) * sourcePos.x +
                3 * Math.pow(1 - t, 2) * t * controlPoint1.x +
                3 * (1 - t) * Math.pow(t, 2) * controlPoint2.x +
                Math.pow(t, 3) * targetPos.x;
      const y = Math.pow(1 - t, 3) * sourcePos.y +
                3 * Math.pow(1 - t, 2) * t * controlPoint1.y +
                3 * (1 - t) * Math.pow(t, 2) * controlPoint2.y +
                Math.pow(t, 3) * targetPos.y;
      return { x, y };
    }
  
    // For more complex curves or splines, a more detailed implementation is needed
    // For simplicity, handle only up to cubic Bezier here
    return { x: sourcePos.x, y: sourcePos.y };
  };
  
  
  
  const animateBubble = (edge, color, duration) => {
    const animationSteps = 100;
    let step = 0;

    const bubble = cy.add({
      group: 'nodes',
      data: { id: 'bb', bubbleColor: color },
      position: { x: edge.source().position('x'), y: edge.source().position('y') },
      classes: 'bb'
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

  
  
  const onCyReady = useCallback((cy) => {
      setCy(cy);
      
      
    }, []);

    
  const onClick = () => {
    animateBubble(cy.getElementById('ab'), '#ff0000', 2000);
  }

  return (
    <div className="p-4 h-screen">
      <Button onClick={onClick} variant='contained'>
         click 
      </Button>
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        cy={onCyReady}
      />
    </div>
  );
};

export default Graph;
