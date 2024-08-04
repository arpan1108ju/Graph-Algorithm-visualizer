
import React, { useCallback, useContext, useEffect} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { GRAPH_ALGORITHM, layout } from '../constants';

import DropdownButtonEdge from './DropdownButtonEdge';

import DropdownButtonNode from './DropdownButtonNode';
import canvasContext from '../assets/context/CanvasContext';

import SelectAlgo from './SelectAlgo';
import SelectStartNode from './SelectStartNode';

import Switch from '@mui/material/Switch';
import Run from './Run';
import Reset from './Reset';
import ClearGraph from './ClearGraph';

import DistanceVisualizer from './DistanceVisualizer';
import NodeMenu from './NodeMenu';
import EdgeMenu from './EdgeMenu';

const Graph = () => {
  const context = useContext(canvasContext);
  const {algo, startNode, cy, setCy, elements, stylesheet, toggleWeighted, toggleDirected, createGraph, graph
    , isDirected, isWeighted , deleteNode,deleteEdge
  } = context;

  const showTable = ()=>{
    return (algo === GRAPH_ALGORITHM.DIJKSTRA || algo === GRAPH_ALGORITHM.FLOYD_WARSHALL || algo === GRAPH_ALGORITHM.BELLMAN_FORD);
  }

  const onCyReady = useCallback((cyGot) => {
      setCy(cyGot);
      // cy?.on('cxttap','node',(e) => {
      //   e.preventDefault();
      //   var node = e.target;
      //   console.log(`To remove : `,node.id());
      //   setAnchorEl(node);
      // })
  
      // cy?.on('cxttap','edge',(e) => {
      //   var edge = e.target;
      //   console.log(`To remove : `,edge.id());
        
      // })

  }, [cy]);

  useEffect(() => {

  }, [stylesheet]);

  



  const handleChangeDierectedness = () => {
    toggleDirected();
  }
  const handleChangeWeightedness = () => {
    toggleWeighted();
  }

  return (
    <div className="h-screen ">

       <div className='flex flex-row justify-between items-center bg-amber-400 py-4'>
        <NodeMenu cy={cy} deleteNode={deleteNode}/>
        <EdgeMenu cy={cy} deleteEdge={deleteEdge} />
        <DropdownButtonNode />
        <DropdownButtonEdge />
        <div><Switch checked={isDirected} onClick={handleChangeDierectedness}/>Directed</div>
        <div><Switch checked={isWeighted} onClick={handleChangeWeightedness}/>Weighted</div>
        <SelectAlgo/>
        <SelectStartNode />
        <Run />
        <ClearGraph />
        <Reset />
      </div>
      <div>
      </div>

      <div className="canvasComponent flex flex-row h-full w-full">
        {/* <h1>Cytoscape</h1> */}
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          layout={layout}
          style={{
            width: `${showTable()?'90%':'100%'}`,
            height: '100%',
            backgroundColor: '#9da1f3ba'
          }}
          cy={onCyReady}
          wheelSensitivity={0.05}
        />
        {showTable()?<DistanceVisualizer />:null}
      </div>
    </div>
  );
};

export default Graph;

