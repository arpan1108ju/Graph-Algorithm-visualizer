import React, {  useTransition } from 'react'
import canvasContext from './CanvasContext'
import { useState } from 'react'
import { GRAPH_ALGORITHM, initalStylesheet, initialElements } from '../../constants';
import { generateRandomPosition } from '../../utils/formatColor';
import { toast } from 'react-toastify';

export default function CanvasState(props) {

  const [cy, setCy] = useState(null);
  const [stylesheet, setStylesheet] = useState(initalStylesheet);
  const [algo, setAlgo] = useState(GRAPH_ALGORITHM.DEFAULT);
  const [elements, setElements] = useState(initialElements);
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [startNode, setStartNode] = useState(elements.length > 0? elements[0].data.id:'');

  const [isPending,startTransition] = useTransition();

  const [graph, setGraph] = useState({});

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

  const checkNodeExistence = (node)=>{
    var found = false;
      elements.forEach((e)=>{
        if(e.data.id === node){
          found = true;
          return ;
          }
      })
      return found;
  }

  const addEdge = (id, source, target, weight) => {
    const newEdge = { data: { id: id, source: source, target: target, weight: weight } };

    if (checkNodeExistence(source) && checkNodeExistence(target)) setElements([...elements, newEdge]);
    else toast.error("Node does not exist!");
  }

  const addNode = (id) => {
    const { x, y } = generateRandomPosition();
    const newNode = { data: { id: id }, position: { x: x, y: y } };
    setElements([...elements, newNode]);
    setTimeout(() => {
      console.log('new element', elements);
      
    }, 1000);

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
    if(check) setStartNode(node);
    else{
        toast.error("Node does not exist!")
    }
  }


  return (
    <canvasContext.Provider value={{isPending,startTransition, startNode, changeStartNode, algo, setAlgo, createGraph, graph, cy, setCy, toggleWeighted, stylesheet, toggleDirected, isDirected, isWeighted, elements, addEdge, addNode }}>
      {props.children}
    </canvasContext.Provider>
  )
}
