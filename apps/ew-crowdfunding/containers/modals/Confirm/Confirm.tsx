import { useConfirmEffects } from './Confirm.effects';
import { useStyles } from './Confirm.styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialogTitle } from '../../../components';
import { Typography } from '@mui/material';

export const Confirm = () => {
  const classes = useStyles();
  const { open, title, onConfirm, text, closeModal } = useConfirmEffects();

  return (
    <Dialog
      className={classes.dialog}
      onClose={closeModal}
      aria-labelledby='web3-notification-dialog-title'
      open={open}
    >
      {title && (
        <BootstrapDialogTitle id='web3-notification-dialog-title' onClose={closeModal}>
          {title}
        </BootstrapDialogTitle>
      )}
      <DialogContent dividers>
        <Typography gutterBottom>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Close
        </Button>
        <Button
          autoFocus
          onClick={() => {
            onConfirm();
            closeModal();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
