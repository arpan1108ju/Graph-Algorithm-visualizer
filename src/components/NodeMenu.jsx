import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteSureModal from './DeleteSureModal';

export default function NodeMenu({ cy,deleteNode }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState({ mouseX: null, mouseY: null });
  const [deleteNodeId,setDeleteNodeId] = useState(null);
  const [sureDelete,setSureDelete] = useState(false);

  useEffect(() => {
    
    cy?.on('tap', 'node', (e) => {
      e.preventDefault();
      var node = e.target;
      console.log(`To remove : `, node.id());
      setContextMenu({
        mouseX: e.originalEvent.clientX + 100,
        mouseY: e.originalEvent.clientY + 100,
      });
      setAnchorEl(e.originalEvent);
      setDeleteNodeId(node.id());
    });
  }, [cy]);

  const handleClose = () => {
    setAnchorEl(null);
    setContextMenu({ mouseX: null, mouseY: null });
  };

  const handleDelete = () => {
      
      deleteNode(deleteNodeId);
      handleClose();
  }

  return (
    <div id="cy-container-menu">
      <DeleteSureModal sureDelete={sureDelete} setSureDelete={setSureDelete}/>
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
