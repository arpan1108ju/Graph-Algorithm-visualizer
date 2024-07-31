import { Button } from '@mui/material';
import React, { useCallback, useRef, useContext } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { colorEdge,colorNode, colorEdgeArrow } from '../utils/formatColor';
import { STATE, UNVISITED_COLOR_EDGE, UNVISITED_COLOR_NODE, VISITED_COLOR_EDGE, VISITED_COLOR_NODE, VISITING_COLOR_EDGE, VISITING_COLOR_NODE } from '../constants';
import { layout, stylesheet } from '../styles/cystyle';
import DropdownButtonEdge from './DropdownButtonEdge';
import DropdownButtonNode from './DropdownButtonNode';

const Graph = () => {
  const cyRef = useRef(null);
  const context = useContext(edgeContext);
  const {edge} = context;

  const onCyReady = useCallback((cy) => {
    console.log('ready');
    cyRef.current = cy;
  }, []);

  

  const animateFlowEdge = (edge, duration) => {

    return new Promise(resolve => {
        
        setTimeout(()=>{
            let step = 0;
            const colors = [UNVISITED_COLOR_EDGE,VISITING_COLOR_EDGE,VISITED_COLOR_EDGE];
            const animationSteps = colors.length;
            const interval = setInterval(() => {
            if (step > animationSteps) {
                clearInterval(interval);
                return;
            }
            colorEdge(edge,colors[step]);
            colorEdgeArrow(edge,colors[step]);
        
              step++;
            }, duration / animationSteps);
            resolve();
        },duration);

    })

  };


  const animateFlowNode = (node,duration) => {

    return new Promise(resolve => {
        setTimeout(()=>{
            let step = 0;
            var colors;
            if(node.state === STATE.VISITED){
                colors = [VISITED_COLOR_NODE];
            }
            else if(node.state === STATE.UNVISITED){
               colors = [UNVISITED_COLOR_NODE,VISITING_COLOR_NODE,VISITED_COLOR_NODE];
            }

            const animationSteps = colors.length;
            const interval = setInterval(() => {
            if (step > animationSteps) {
                clearInterval(interval);
                return;
            }
            colorNode(node,colors[step]);
            step++;
            }, duration / animationSteps);
            resolve();
    },duration);
  })

}


  const onClick = async() => {
    var cy = null;
    cy = cyRef?.current;

    if(!cy) return;

    const nodeStart = cy.getElementById('a');
    const edge = cy.getElementById('ab');
    const nodeEnd = cy.getElementById('b');

    nodeStart.state = STATE.UNVISITED;
    nodeEnd.state = STATE.UNVISITED;

    await animateFlowNode(nodeStart, 1000);
    await animateFlowEdge(edge, 1000);
    await animateFlowNode(nodeEnd, 1000);
     
  };

  return (
    <div className="h-screen ">

       <div className='flex flex-row justify-between items-center bg-amber-400 py-4'>
        <Button onClick={onClick} variant='contained' className='bg-red-300'>
            Start Animation
        </Button>
        <DropdownButtonNode />
        <DropdownButtonEdge />
       </div>

      <CytoscapeComponent
        elements={edge}
        stylesheet={stylesheet}
        layout={layout}
        style={{
         width: '100%',
         height: '100%',
         backgroundColor : '#9da1f3ba'
        }}
        cy={onCyReady}
      />
    </div>
  );
};

export default Graph;


/*

  colorNode(color,node)
  colorEdge(color,edge)
  


*/