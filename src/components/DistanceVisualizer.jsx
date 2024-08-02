import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const DistanceVisualizer = () => {
  const [distances, setDistances] = useState({ A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity, G: Infinity, H: Infinity });

  // Simulate an update to the distances array
  const updateDistances = () => {
    setDistances({
      A: 0,
      B: 1,
      C: 3,
      D: 4,
      E: 5,
      F: 4,
      G: 6,
      H: 8,
    });
  };

  useEffect(() => {
    // You can trigger updates based on certain events or after specific intervals
    // For demonstration, we'll call updateDistances after 2 seconds
    const timer = setTimeout(updateDistances, 2000);
    return () => clearTimeout(timer);
  }, []);

  const nodes = Object.keys(distances);
  const distanceValues = Object.values(distances).map(distance => distance === Infinity ? '∞' : distance);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell colSpan={nodes.length} align="center">Nodes</TableCell>
          </TableRow> */}
          <TableRow>
            {nodes.map(node => (
              <TableCell key={node} align="center" style={{ padding: '4px' }}>{node}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow>
            <TableCell colSpan={nodes.length} align="center">Distances</TableCell>
          </TableRow> */}
          <TableRow>
            {distanceValues.map((distance, index) => (
              <TableCell key={index} align="center" style={{ padding: '4px' }}>{distance}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      {/* <Button variant="contained" color="primary" onClick={updateDistances} style={{ margin: '10px' }}>
        Update Distances
      </Button> */}
    </TableContainer>
  );
};

export default DistanceVisualizer;
