import { Button } from '@mui/material'
import React, { useContext } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';
import { GRAPH_ALGORITHM } from '../constants';
import { toast } from 'react-toastify';
import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/dijkstra';
import { bellmanFord } from '../algorithms/bellmanFord';
import { aStar } from '../algorithms/aStar';
import { floydWarshall } from '../algorithms/floydWarshall';
import { kruskal } from '../algorithms/kruskal';
import { prim } from '../algorithms/prim';
import { topologicalSort } from '../algorithms/topologicalSort';
import { tarjan } from '../algorithms/tarjan';
import { kosaraju } from '../algorithms/kosaraju';

const Run = () => {

    const context = useContext(canvasContext);
    const {elements, startNode, cy,createGraph,algo
      ,isDirected,isWeighted, changeDistance, nodes
     } = context;


   const onClick = () => {
    if(!cy) return;
        createGraph((updatedGraph) => {

            switch(algo) {
                case GRAPH_ALGORITHM.DEPTH_FIRST_SEARCH:
                    dfs(cy,updatedGraph,startNode,isDirected,isWeighted);
                    break;

                case GRAPH_ALGORITHM.BREADTH_FIRST_SEARCH:
                    bfs(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.DIJKSTRA:
                    dijkstra(cy, updatedGraph, startNode, isDirected, isWeighted, changeDistance).then((value)=>{
                      if(!value) toast.error("Negative cycle present in this graph!");
                    });
                    break;
              
                  case GRAPH_ALGORITHM.BELLMAN_FORD:
                    bellmanFord(cy, updatedGraph, startNode, isDirected, isWeighted, changeDistance, nodes).then((value)=>{
                      if(!value) toast.error("Negative cycle present in this graph!");
                    })
                    break;
              
                  case GRAPH_ALGORITHM.A_STAR:
                    aStar(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.FLOYD_WARSHALL:
                    floydWarshall(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.KRUSKAL:
                    kruskal(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.PRIM:
                    prim(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.TOPOLOGICAL_SORT:
                    topologicalSort(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.TARJAN:
                    tarjan(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.KOSARAJU:
                    kosaraju(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
                default:
                    toast.error("Invalid algorithm selected");
            }
            

        })
   };  

  return (
      <div className='px-4'>
      <Button onClick={onClick} variant='contained' className='flex flex-row justify-between items-center'>
        <PlayArrowRoundedIcon className=''  />
        <span className='ml-1'>Run</span>
      </Button>
    </div>
  )
}

export default Run