import { STATE, UNVISITED_COLOR_EDGE, UNVISITED_COLOR_NODE, VISITED_COLOR_EDGE, VISITED_COLOR_NODE } from "../constants";

export const colorNode = (cyNode,color) => {
    cyNode.style({ 'background-color': color});
}

export const colorEdge = (cyEdge,color) => {
    cyEdge.style({'line-color': color});
}

export const colorEdgeArrow = (cyEdge,color) => {
    cyEdge.style({'target-arrow-color': color});
}


export  const animateFlowEdge = (edge, duration) => {

    return new Promise(resolve => {
        
        setTimeout(()=>{
            let step = 0;
            const colors = [UNVISITED_COLOR_EDGE,VISITED_COLOR_EDGE];
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


export const animateFlowNode = (node,duration) => {

    return new Promise(resolve => {
        setTimeout(()=>{
            let step = 0;
            var colors;
            if(node.state === STATE.VISITED){
                colors = [VISITED_COLOR_NODE];
            }
            else if(node.state === STATE.UNVISITED){
               colors = [UNVISITED_COLOR_NODE,VISITED_COLOR_NODE];
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

export const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 300);
    return { x, y };
 }  