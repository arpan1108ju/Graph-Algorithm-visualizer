import React from 'react'
import edgeContext from './EdgeContext'
import { useState } from 'react'

export default function EdgeState(props) {
    const elements = [
        { data: { id: 'a' }, position: { x: 100, y: 100 } },
        { data: { id: 'b' }, position: { x: 200, y: 200 } },
        { data: { id: 'c' }, position: { x: 300, y: 150 } },
        { data: { id: 'd' }, position: { x: 400, y: 100 } },
        { data: { id: 'e' }, position: { x: 500, y: 200 } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'cd', source: 'c', target: 'd' } },
        { data: { id: 'de', source: 'd', target: 'e' } }
      ];
    const [edge, setEdge] = useState(elements);

    const addEdge = (id, source, target)=>{
      const newEdge = { data: { id: id, source: source, target: target
        } };
        setEdge([...edge, newEdge]);
    }
  return (
    <edgeContext.Provider value={{edge, addEdge}}>
        {props.children}
    </edgeContext.Provider>
  )
}
