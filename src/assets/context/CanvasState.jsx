import React from 'react'
import canvasContext from './CanvasContext'
import { useState } from 'react'
import { initalStylesheet, initialElements } from '../../constants';
import { generateRandomPosition } from '../../utils/formatColor';

export default function CanvasState(props) {
    
    

    const [cy,setCy] = useState(null);
    const [stylesheet, setStylesheet] = useState(initalStylesheet);

    const [elements, setElements] = useState(initialElements);
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    const addEdge = (id, source, target,weight)=>{
      const newEdge = { data: { id: id, source: source, target: target , weight : weight} };
        setElements([...elements, newEdge]);
    }

    


    const addNode = (id) => {
      const {x , y} = generateRandomPosition();
      const newNode = { data : { id: id } , position : { x : x, y : y}};
      setElements([...elements,newNode]);
      console.log('new element', elements);
      
    }

    const toggleWeighted = () => {
       setIsWeighted(!isWeighted);
      //  setIsDirected(!isDirected);
       const newStyleSheet = stylesheet.map((sheet) => {
          if(sheet.selector === 'edge'){
              sheet.style.label = isWeighted ? `data(weight)` :  '';
          }
          return sheet;
        });

      setStylesheet(newStyleSheet);
     
      cy?.style().clear().fromJson(stylesheet).update();
    }

    const toggleDirected = () => {
      setIsDirected(!isDirected);
      const newStyleSheet = stylesheet.map((sheet) => {
         if(sheet.selector === 'edge'){
             sheet.style['target-arrow-shape'] = isDirected ? 'triangle' : '';
         }
         return sheet;
       });

     setStylesheet(newStyleSheet);
    
     cy?.style().clear().fromJson(stylesheet).update();
   }



  return (
    <canvasContext.Provider value={{cy,setCy,toggleWeighted,stylesheet,toggleDirected, isDirected,isWeighted,elements ,addEdge , addNode}}>
        {props.children}
    </canvasContext.Provider>
  )
}
 
