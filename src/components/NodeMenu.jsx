import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function NodeMenu({ cy,deleteNode,disabled }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState({ mouseX: null, mouseY: null });
  const [deleteNodeId,setDeleteNodeId] = useState(null);
  const [sureDelete,setSureDelete] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  useEffect(() => {
    
    cy?.on('tap', 'node', (e) => {
      if(disabled) return;
      e.preventDefault();
      var node = e.target;
      console.log(`To remove : `, node.id());
      setContextMenu({
        mouseX: e.originalEvent.clientX + 100,
        mouseY: e.originalEvent.clientY + 100,
      });
      if(!disabled) setAnchorEl(e.originalEvent);
      setDeleteNodeId(node.id());
    });
  }, [cy]);

  const handleClose = () => {
    setAnchorEl(null);
    setContextMenu({ mouseX: null, mouseY: null });
  };

  const handleDelete = () => {
      setOpenModal(true);
      handleClose();
  }

  const onCloseModal = ()=>{
     setSureDelete(false);
     setOpenModal(false);
  }

  const onConfirmModal = ()=>{
    const newSureDelete = true;
    setSureDelete(newSureDelete);
    if(newSureDelete){
      deleteNode(deleteNodeId);
      console.log('deleting ',deleteNodeId);
    }
    setOpenModal(false);
  }

  return (
    <div id="cy-container-menu">
      <DeleteConfirmationModal openModal={openModal} onClose={onCloseModal} onConfirm={onConfirmModal}
        disabled={disabled}
      />
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu.mouseY !== null && contextMenu.mouseX !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        open={Boolean(anchorEl) && !disabled}
        onClose={handleClose}
      >
        {/* <MenuItem>
          <IconButton aria-label='Edit' color="primary" size='small' onClick={handleClose}>
                <EditIcon /> Edit
          </IconButton>
        </MenuItem> */}
        <MenuItem >
        <IconButton disabled={disabled} aria-label='Delete' color="warning" size='small' onClick={handleDelete}>
              <DeleteIcon />  Delete
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
