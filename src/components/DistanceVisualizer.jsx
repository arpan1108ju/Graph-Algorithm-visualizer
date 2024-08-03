import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import canvasContext from '../assets/context/CanvasContext';

const DistanceVisualizer = () => {
  const context = useContext(canvasContext);
  const {nodes, distanceArray,tableRowBgColor,activeTableRowId} = context;
  
  useEffect(()=>{

  },[activeTableRowId]);

  // const [isUpdating,setIs]


  // console.log("distanceArray in visualizer: ", distanceArray);
  
  return (
    <div className=' w-full bg-purple-300'>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ padding: '4px' }}>Node</TableCell>
              <TableCell align="center" sx={{ padding: '4px' }}>Distance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node, index) => {
              // if(activeTableRowId === node) console.log('rendering ',activeTableRowId);
              return (
                <TableRow key={node} sx={ activeTableRowId === node ? { backgroundColor : tableRowBgColor } : {}} >
                  <TableCell align="center" sx={{ padding: '4px', minWidth: 'auto'}}>{node}</TableCell>
                  <TableCell align="center" sx={{ padding: '4px', minWidth: 'auto'}}>{distanceArray[node] === Infinity?'∞':distanceArray[node]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default DistanceVisualizer;
