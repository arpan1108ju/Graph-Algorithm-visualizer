import React from 'react'
import { Button } from '@mui/material'
import canvasContext from '../assets/context/CanvasContext'
import { useState, useContext } from 'react'

export default function ClearGraph() {
    const context = useContext(canvasContext);
    const {clearGraph} = context;
    const handleClearGraph = ()=>{
        clearGraph();
    }
  return (
    <div className='px-4'>
      <Button onClick={handleClearGraph} variant='contained'>
        <span>Clear Graph</span>
      </Button>
    </div>
  )
}
