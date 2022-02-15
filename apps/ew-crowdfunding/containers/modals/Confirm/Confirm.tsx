import { useConfirmEffects } from './Confirm.effects';
import { useStyles } from './Confirm.styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialogTitle } from '../../../components';
import { Divider } from '@mui/material';

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
      <BootstrapDialogTitle id='confirm-notification-dialog-title' title={title} subtitle={text} />
      <Divider />
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='contained'
          color='primary'
          style={{ width: '100%' }}
          autoFocus
          onClick={() => {
            onConfirm();
            closeModal();
          }}
        >
          Confirm
        </Button>
        <Button variant='outlined' color='primary' style={{ width: '100%' }} autoFocus onClick={closeModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
