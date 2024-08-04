import { Button } from '@mui/material'
import React, { useContext } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { ResetColor } from '../utils/formatColor';
const Reset = ({disabled}) => {

    const context = useContext(canvasContext);
    const { cy,elements,setDistanceToInfinity 
     } = context;

   
   const onClick = () => {
       if(!cy) return;
       ResetColor(cy,elements);
       setDistanceToInfinity();
   };  

  return (

      <Button disabled={disabled} onClick={onClick}  sx={{ width : '120px',margin : '10px 0px 10px 0px' }} className='flex flex-row justify-between items-center'  variant='contained'>
        <RotateLeftOutlinedIcon className='h-4 w-4' />
        <span className='ml-1'>Reset</span>
      </Button>
  )
}

export default Reset