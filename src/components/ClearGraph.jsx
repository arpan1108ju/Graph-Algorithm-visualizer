import React from 'react'
import { Button } from '@mui/material'
import canvasContext from '../assets/context/CanvasContext'
import { useState, useContext } from 'react'
import { FaEraser } from "react-icons/fa6";


export default function ClearGraph({disabled}) {
    const context = useContext(canvasContext);
    const {clearGraph} = context;
    const handleClearGraph = ()=>{
        clearGraph();
    }
  return (
      <Button disabled={disabled} sx={{ width : '120px',margin : '10px 0px 10px 0px' }} className='flex flex-row justify-between items-center' onClick={handleClearGraph} variant='contained'>
       <FaEraser className=' mr-1'/>
        <span className='ml-1'>Clear</span>
      </Button>
  )
}
