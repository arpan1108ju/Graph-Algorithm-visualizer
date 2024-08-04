import React, { useTransition } from 'react'
import canvasContext from './CanvasContext'
import { useState } from 'react'
import { GRAPH_ALGORITHM, initalStylesheet, initialElements, TABLE_ROW_BG_COLOR, TABLE_ROW_BG_FLASH_COLOR } from '../../constants';
import { generateRandomPosition } from '../../utils/formatColor';
import { toast } from 'react-toastify';

export default function CanvasState(props) {
  const [cy, setCy] = useState(null);
  const [stylesheet, setStylesheet] = useState(initalStylesheet);
  const [algo, setAlgo] = useState(GRAPH_ALGORITHM.DEFAULT);
  const [elements, setElements] = useState(initialElements);
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [startNode, setStartNode] = useState(elements.length > 0 ? elements[0].data.id : '');

  const [isPending, startTransition] = useTransition();
  const [nodes, setNodes] = useState(elements.filter((e)=> e.data.source === undefined).map((f)=>f.data.id));
  const [graph, setGraph] = useState({});
  const [tableRowBgColor,setTableRowBgColor] = useState(TABLE_ROW_BG_COLOR);
  const [activeTableRowId,setActiveTableRowId] = useState(null);
  const [distanceArray, setDistanceValue] = useState(nodes.reduce((acc, node) => {
    acc[node] = Infinity;
    return acc;
  }, {}));


  



  const createGraph = (callback) => {
    var graphObj = {};
    elements.map((element) => {
      // element is node
      if (element.position) {
        graphObj[element.data.id] = [];
      }
      // element is edge
      else if (element.data.source) {
        graphObj[element.data.source].push([element.data.target, element.data.weight]);
        if (!isDirected) {
          graphObj[element.data.target].push([element.data.source, element.data.weight]);
        }
      }
      return element;
    })

    // console.log('local ',graphObj);
    setGraph((g) => graphObj);

    if (callback) {
      callback(graphObj);
    }

  }

  const checkNodeExistence = (node) => {
    var found = false;
    nodes.forEach((e) => {
      if (e === node) {
        found = true;
        return;
      }
    })
    return found;
  }

  const addEdge = (id, source, target, weight) => {
    const newEdge = { data: { id: id, source: source, target: target, weight: weight } };

    if (checkNodeExistence(source) && checkNodeExistence(target)){
      
    } 
    else toast.error("Node does not exist!");
    setElements([...elements, newEdge]);
  }

  const addNode = (id) => {
    console.log("node id at add node: ",id);
    let found = checkNodeExistence(id);
    if (!found) {
      setNodes([...nodes, id]);
    
      const { x, y } = generateRandomPosition();
      const newNode = { data: { id: id }, position: { x: x, y: y } };
      setElements([...elements, newNode]);

      setDistanceValue((prev) => ({
        ...prev,
        [id]:Infinity,
      }));
    }
    else{
      toast.error("Node already exists!");
    }
  }

  const toggleWeighted = () => {
    const newWeighted = !isWeighted;
    setIsWeighted(newWeighted);
    //  setIsDirected(!isDirected);
    const newStyleSheet = stylesheet.map((sheet) => {
      if (sheet.selector === 'edge') {
        sheet.style.label = newWeighted ? 'data(weight)' : '';
      }
      return sheet;
    });

    setStylesheet(newStyleSheet);

    cy?.style().clear().fromJson(stylesheet).update();
  }

  const toggleDirected = () => {
    const newDirected = !isDirected;
    setIsDirected(newDirected);
    const newStyleSheet = stylesheet.map((sheet) => {
      if (sheet.selector === 'edge') {
        sheet.style['target-arrow-shape'] = newDirected ? 'triangle' : '';
      }
      return sheet;
    });

    setStylesheet(newStyleSheet);

    cy?.style().clear().fromJson(stylesheet).update();
  }



  const changeStartNode = (node) => {
    const check = checkNodeExistence(node);
    if (check){
      setStartNode(node);
      changeDistance(node, 0);
    } 
    else {
      toast.error("Node does not exist!")
    }
  }

  const clearGraph = () => {
    setElements([]);
    setDistanceValue({});
    setNodes([])
    setStartNode(null);
    setNodes([]);
  }

  const changeDistance = (id, newDistance) => {   
    setDistanceValue((prev) => ({
      ...prev,
      [id]: newDistance,
    }));
  }

  const setDistanceToInfinity = ()=>{
    setDistanceValue((prev) => ({
      ...prev,
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = Infinity;
        return acc;
        }, {})}))
        }

  return (
    <canvasContext.Provider value={{setActiveTableRowId,setTableRowBgColor,activeTableRowId,tableRowBgColor,setDistanceToInfinity, nodes, distanceArray, changeDistance, clearGraph, isPending, startTransition, startNode, changeStartNode, algo, setAlgo, createGraph, graph, cy, setCy, toggleWeighted, stylesheet, toggleDirected, isDirected, isWeighted, elements, addEdge, addNode }}>
      {props.children}
    </canvasContext.Provider>
  )
}
