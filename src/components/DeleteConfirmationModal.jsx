// DeleteConfirmationModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import '../styles/modalStyles.css'; // Ensure this file contains your animation styles

const DeleteConfirmationModal = ({ openModal, onClose, onConfirm }) => {
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
        <DialogTitle id="delete-confirmation-title" className="text-lg font-semibold text-gray-900">
          Confirm Deletion
        </DialogTitle>
        <DialogContent dividers>
          <p className="text-gray-700">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions >
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
