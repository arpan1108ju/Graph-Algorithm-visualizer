import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export default function EdgeMenu({ cy,deleteEdge }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState({ mouseX: null, mouseY: null });
  const [deleteEdgeId,setDeleteEdgeId] = useState(null);

  useEffect(() => {
    
    cy?.on('tap', 'edge', (e) => {
      e.preventDefault();
      var edge = e.target;
      console.log(`To remove : `, edge.id());
      setContextMenu({
        mouseX: e.originalEvent.clientX + 100,
        mouseY: e.originalEvent.clientY + 100,
      });
      setAnchorEl(e.originalEvent);
      setDeleteEdgeId(edge.id());
    });
  }, [cy]);

  const handleClose = () => {
    setAnchorEl(null);
    setContextMenu({ mouseX: null, mouseY: null });
  };

  const handleDelete = () => {
      deleteEdge(deleteEdgeId);
      handleClose();
  }

  return (
    <div id="cy-container-menu">
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu.mouseY !== null && contextMenu.mouseX !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <IconButton aria-label='Edit' color="primary" size='small' onClick={handleClose}>
                <EditIcon /> Edit
          </IconButton>
        </MenuItem>
        <MenuItem >
        <IconButton aria-label='Delete' color="warning" size='small' onClick={handleDelete}>
              <DeleteIcon />  Delete
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
