import { Button } from '@mui/material'
import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
const Run = () => {
  return (
      <div className='px-4'>
      <Button variant='contained' className='flex flex-row justify-between items-center'>
        <PlayArrowRoundedIcon className=''  />
        <span className='ml-1'>Run</span>
      </Button>
    </div>
  )
}

export default Run