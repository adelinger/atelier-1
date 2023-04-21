import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({showConfirm, handleConfirm, confirmButton = 'Delete' ,message='Are you sure you want to delete this item?'}) {


  const handleClose = () => {
    handleConfirm(false, false);
  };

  const handleConfirmAnswer = () => {
    handleConfirm(false, true);
  }
  

  return (
    <div>
      <Dialog
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmAnswer}>
            {confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

