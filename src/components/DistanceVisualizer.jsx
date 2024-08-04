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
              return (
                <TableRow key={node} sx={ activeTableRowId === node ? { backgroundColor : tableRowBgColor } : {}} >
                  <TableCell align="center" sx={{ padding: '4px'}}>{node}</TableCell>
                  <TableCell align="center" sx={{ padding: '4px'}}>{distanceArray[node] === Infinity?'∞':distanceArray[node]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default DistanceVisualizer;
