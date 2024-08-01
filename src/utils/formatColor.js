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

export const animateNode = (cy,nodeId,state,duration) => {

    const nodeUi = cy.getElementById(nodeId);

    if(!nodeUi) return;

    return new Promise(resolve => {
        setTimeout(()=>{
            var color;
            if(state === STATE.VISITED){
                color = VISITED_COLOR_NODE;
            }
            else if(state === STATE.UNVISITED){
                color = UNVISITED_COLOR_NODE;
            }
            colorNode(nodeUi,color);
            resolve();
    },duration);
    })
}

export const animateEdge = (cy,sourceId,targetId,state,duration,isDirected) => {

    var edgeUi = cy.getElementById(formEdgeId(sourceId,targetId));
    if(!isDirected && !edgeUi.length){
        edgeUi = cy.getElementById(formEdgeId(targetId,sourceId));
    }    

    if(!edgeUi.length) return;

    return new Promise(resolve => {
        setTimeout(()=>{
            var color;
            if(state === STATE.VISITED){
                color = VISITED_COLOR_EDGE;
            }
            else if(state === STATE.UNVISITED){
                color = UNVISITED_COLOR_EDGE;
            }
            colorEdge(edgeUi,color);
            if(isDirected) colorEdgeArrow(edgeUi,color);
            resolve();
    },duration);
    })
}


export const generateRandomPosition = () => {
    const x = parseInt(Math.floor(Math.random() * 500),10);
    const y = parseInt(Math.floor(Math.random() * 300),10);
    return { x, y };
 }  

export function formEdgeId(source,target){
    return source + "-" + target; 
}