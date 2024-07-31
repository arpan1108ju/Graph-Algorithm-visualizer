import React from 'react'
import edgeContext from './EdgeContext'
import { useState } from 'react'

export default function EdgeState(props) {
    const initialElements = [
        { data: { id: 'a' }, position: { x: 100, y: 100 } },
        { data: { id: 'b' }, position: { x: 200, y: 200 } },
        { data: { id: 'c' }, position: { x: 300, y: 150 } },
        { data: { id: 'd' }, position: { x: 400, y: 100 } },
        { data: { id: 'e' }, position: { x: 500, y: 200 } },
        { data: { id: 'ab', source: 'a', target: 'b' , weight : 0} },
        { data: { id: 'bc', source: 'b', target: 'c' , weight : 0} },
        { data: { id: 'cd', source: 'c', target: 'd' , weight : 0} },
        { data: { id: 'de', source: 'd', target: 'e' , weight : 0} }
      ];

    const edgeList = {};
    
    const initalStylesheet = [
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)',
          'text-valign': 'center',
          'color': '#fff',
          'font-size': '10px',
          'width': 25,
          'height': 25
        }
      },
      {
        selector: 'edge',
        style: {
          'label' : 'data(weight)',
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'unbundled-bezier',
          'control-point-distances': 50, // Control distances can be adjusted dynamically
          'control-point-weights': 0.5,
          'line-fill': 'solid'
        }
      }
    ];
    
    const layout = {
      name: 'preset',
    };
    

    const [cy,setCy] = useState(null);
    const [stylesheet, setStylesheet] = useState(initalStylesheet);

    const [elements, setElements] = useState(initialElements);
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    const addEdge = (id, source, target,weight)=>{
      const newEdge = { data: { id: id, source: source, target: target , weight : weight} };
        setElements([...elements, newEdge]);
        // edgeList[id] = newEdge;
    }

    function generateRandomPosition() {
       const x = Math.floor(Math.random() * 500);
       const y = Math.floor(Math.random() * 300);
       return { x, y };
    }


    const addNode = (id) => {
      const {x , y} = generateRandomPosition();
      const newNode = { data : { id: id } , position : { x : x, y : y}};
      console.log('new node', newNode);
      setElements([...elements,newNode]);
      
    }

    const toggleWeighted = () => {
       setIsWeighted(!isWeighted);
      //  setIsDirected(!isDirected);
       const newStyleSheet = stylesheet.map((sheet) => {
        if(sheet.selector === 'edge'){
            console.log(`label is : `,sheet.style.label);
            sheet.style.label = isWeighted ? `data(weight)` :  '';
            sheet.style['target-arrow-shape'] = isDirected ? 'triangle' : '';
            console.log(`is weight : `,isWeighted);
            console.log(`label after : `,sheet.style.label);
        }
        return sheet;
     });

     setStylesheet(newStyleSheet);
     
     cy?.style().clear().fromJson(stylesheet).update();

    }


  return (
    <edgeContext.Provider value={{cy,setCy,toggleWeighted,layout,stylesheet, isDirected,isWeighted,elements ,addEdge , addNode}}>
        {props.children}
    </edgeContext.Provider>
  )
}
 
