import { Button } from '@mui/material'
import React, { useContext } from 'react'
import canvasContext from '../assets/context/CanvasContext';

import { ResetColor } from '../utils/formatColor';
import { FaRandom } from "react-icons/fa";
const RandomGraph = ({disabled}) => {

    const context = useContext(canvasContext);
    const { cy,elements,setDistanceToInfinity 
     } = context;

   
   const onClick = () => {
       if(!cy) return;
       ResetColor(cy,elements);
       setDistanceToInfinity();
   };  

  return (

      <Button disabled={disabled} onClick={onClick}  sx={{ width : '120px',margin : '10px 0px 10px 0px' }} className='flex flex-row justify-right items-center'  variant='contained'>
        <FaRandom className='mr-0' />
        <span className='ml-2'>Random</span>
      </Button>
  )
}

export default RandomGraph