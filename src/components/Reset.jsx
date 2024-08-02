import { Button } from '@mui/material'
import React, { useContext } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';
import { ResetColor } from '../utils/formatColor';
const Reset = () => {

    const context = useContext(canvasContext);
    const { cy,elements, 
     } = context;

   
   const onClick = () => {
       if(!cy) return;
       ResetColor(cy,elements);
   };  

  return (
      <div className='px-4'>
      <Button onClick={onClick} variant='contained'>
        <span>Reset</span>
      </Button>
    </div>
  )
}

export default Reset