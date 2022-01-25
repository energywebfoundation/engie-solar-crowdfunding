import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { useWeb3NotificationEffects } from './Web3Notification.effects';
import { useStyles } from './Web3Notification.styles';
import { BootstrapDialogTitle } from '../../../components';

export const Web3Notification = () => {
  const { open, config, closeModal } = useWeb3NotificationEffects();
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      onClose={closeModal}
      aria-labelledby='web3-notification-dialog-title'
      open={open}
    >
      <BootstrapDialogTitle id='web3-notification-dialog-title' onClose={closeModal}>
        {config?.title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{config?.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
