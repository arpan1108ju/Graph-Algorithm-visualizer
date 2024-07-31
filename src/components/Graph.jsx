import { Button } from '@mui/material';
import React, { useCallback, useContext, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { animateFlowNode, animateFlowEdge } from '../utils/formatColor';
import { layout, STATE} from '../constants';

import DropdownButtonEdge from './DropdownButtonEdge';
import DropdownButtonNode from './DropdownButtonNode';
import canvasContext from '../assets/context/CanvasContext';

const Graph = () => {
  const context = useContext(canvasContext);
  const {cy,setCy,elements, stylesheet,toggleWeighted } = context;
  

  const onCyReady = useCallback((cyGot) => {
    setCy(cyGot);
  }, []);

  useEffect(()=>{
      console.log(`Changed : `,stylesheet);
  },[stylesheet]);


  const onClick = async() => {

    toggleWeighted();

    if(!cy) return;

// update the "json" object

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
        elements={elements}
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

