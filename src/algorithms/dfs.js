import { ANIMATION_TIME_MS, STATE } from "../constants";
import {  animateEdge, animateNode } from "../utils/formatColor";

export const dfs = async(cy, graph, startNode,isDirected,isWeighted) =>{
    const visited = new Set();
    const stack = [{ node: startNode,parentNode : '#' , weight: 0 }];

    while (stack.length > 0) {
      const { node,parentNode, weight } = stack.pop();
  
      if (!visited.has(node)) {
        visited.add(node); 

        // console.log(`here : node ${node} , parent ${parentNode}`);
        
        await animateEdge(cy,parentNode,node,STATE.VISITED,ANIMATION_TIME_MS,isDirected);
        await animateNode(cy,node,STATE.VISITED,ANIMATION_TIME_MS);

        if(!graph[node]) continue;

        for (const [neighbor, edgeWeight] of graph[node]) {
          if (!visited.has(neighbor)) {
            
            stack.push({ node: neighbor,parentNode : node, weight: weight + edgeWeight });
          }
        }
      }
    }
  }