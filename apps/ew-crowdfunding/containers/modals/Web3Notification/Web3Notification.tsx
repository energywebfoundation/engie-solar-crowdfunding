import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useWeb3NotificationEffects } from './Web3Notification.effects';
import { useStyles } from './Web3Notification.styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

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
