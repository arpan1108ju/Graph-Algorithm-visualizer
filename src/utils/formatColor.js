import { ANIMATION_TIME_MS_SPEED_HIGH, ANIMATION_TIME_MS_SPEED_LOW, INITIAL_COLOR_EDGE, INITIAL_COLOR_NODE, MAX_SPEED, MIN_SPEED, STATE, TABLE_ROW_BG_COLOR, TABLE_ROW_BG_FLASH_COLOR, UNVISITED_COLOR_EDGE, UNVISITED_COLOR_NODE, VISITED_COLOR_EDGE, VISITED_COLOR_NODE } from "../constants";

export const colorNode = (cyNode,color) => {
    cyNode.style({ 'background-color': color});
}

export const colorEdge = (cyEdge,color) => {
    cyEdge.style({'line-color': color});
}

export const colorEdgeArrow = (cyEdge,color) => {
    cyEdge.style({'target-arrow-color': color});
}

export const flashTableRowBgColor = (nodeId,duration,setActiveTableRowId,setTableRowBgColor) => {

    // console.log('i am outside : ',nodeId);
    setActiveTableRowId(nodeId);
    setTableRowBgColor(TABLE_ROW_BG_FLASH_COLOR);

    return new Promise(resolve => {
      setTimeout(() => {
            // console.log('i am inside : ',nodeId);
          setTableRowBgColor(TABLE_ROW_BG_COLOR);
        //   setActiveTableRowId(null);
       },duration);
       resolve();
    })

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

export const ResetColor = (cy,elements) => {
    elements.forEach((element) => {
        // element is node
        if (element.position) {
          colorNode(cy.getElementById(element.data.id),INITIAL_COLOR_NODE);
        }
        // element is edge
        else if (element.data.source) {
            var edgeUi = cy.getElementById(formEdgeId(element.data.source,element.data.target));
            if(!edgeUi.length){
                edgeUi = cy.getElementById(formEdgeId(element.data.target,element.data.source));
            }  
            colorEdge(edgeUi,INITIAL_COLOR_EDGE);
            colorEdgeArrow(edgeUi,INITIAL_COLOR_EDGE); 
        }
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

export const getAnimationTime = (speed) => {
    if(speed < MIN_SPEED || speed > MAX_SPEED){
        throw new Error("invalid speed");
    }

    const h = ANIMATION_TIME_MS_SPEED_HIGH;
    const l = ANIMATION_TIME_MS_SPEED_LOW;

    const time = l + ((h-l)* speed )/(MAX_SPEED - MIN_SPEED);

    return time;
}
