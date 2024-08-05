// DeleteConfirmationModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditWeightModal = ({ openModal, onClose, onConfirm,setWeight,disabled }) => {
  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
      className={`relative transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 300ms ease-in-out' }}
    >
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0'} z-10`} />
      <div className={`relative z-20 p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 transform ${openModal ? 'translate-y-0' : '-translate-y-10'}`}>
        <DialogContent>
        <TextField id="outlined-basic" label="New Weight" variant="outlined"
         onChange={(e) => setWeight(e.target.value)} />
        </DialogContent>
        <DialogActions >
          <Button disabled={disabled} onClick={onClose} color="secondary">
            CANCEL
          </Button>
          <Button disabled={disabled} onClick={onConfirm} color="primary" variant="contained">
            UPDATE
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EditWeightModal;
