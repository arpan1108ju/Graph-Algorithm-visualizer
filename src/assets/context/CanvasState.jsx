import React, { useSyncExternalStore } from 'react'
import canvasContext from './CanvasContext'
import { useState } from 'react'
import { initalStylesheet, initialElements } from '../../constants';
import { generateRandomPosition } from '../../utils/formatColor';

export default function CanvasState(props) {

  const [cy, setCy] = useState(null);
  const [stylesheet, setStylesheet] = useState(initalStylesheet);
  const [algo, setAlgo] = useState('dfs');
  const [elements, setElements] = useState(initialElements);
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [startNode, setStartNode] = useState('');

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


  const addEdge = (id, source, target, weight) => {
    const newEdge = { data: { id: id, source: source, target: target, weight: weight } };
    setElements([...elements, newEdge]);
  }

  const addNode = (id) => {
    const { x, y } = generateRandomPosition();
    const newNode = { data: { id: id }, position: { x: x, y: y } };
    setElements([...elements, newNode]);
    console.log('new element', elements);

  }

  const toggleWeighted = () => {
    const newWeighted = !isWeighted;
    setIsWeighted(newWeighted);
    //  setIsDirected(!isDirected);
    const newStyleSheet = stylesheet.map((sheet) => {
      if (sheet.selector === 'edge') {
        sheet.style.label = newWeighted ? `data(weight)` : '';
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
      setStartNode(node);
      console.log('start node changed', startNode);
  }


  return (
    <canvasContext.Provider value={{ startNode, changeStartNode, algo, setAlgo, createGraph, graph, cy, setCy, toggleWeighted, stylesheet, toggleDirected, isDirected, isWeighted, elements, addEdge, addNode }}>
      {props.children}
    </canvasContext.Provider>
  )
}

