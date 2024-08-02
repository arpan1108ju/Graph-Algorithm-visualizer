import { Button } from '@mui/material';
import React, { useCallback, useContext, useEffect, useTransition } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { layout} from '../constants';

import DropdownButtonEdge from './DropdownButtonEdge';
import DropdownButtonNode from './DropdownButtonNode';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';


const Graph = () => {
  const context = useContext(canvasContext);
  const {cy,setCy,elements, stylesheet,toggleWeighted,createGraph,graph
    ,isDirected,isWeighted
   } = context;
  
  const [isPending,startTransition] = useTransition(); 

  const onCyReady = useCallback((cyGot) => {
    setCy(cyGot);

    

  }, []);

  useEffect(()=>{
    
     

  },[stylesheet]);


  const onClick = () => {
    if(!cy) return;
    
    
    startTransition(()=> {

      createGraph((updatedGraph) => {
        dfs(cy,updatedGraph,'d',isDirected,isWeighted);
      })
    })
     
  };

  return (
    <div className="h-screen ">

       <div className='flex flex-row justify-between items-center bg-amber-400 py-4'>
        <Button onClick={onClick} variant='contained' className='bg-red-300' disabled={isPending}>
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
        wheelSensitivity={0.05}
      />
    </div>
  );
};

export default Graph;

