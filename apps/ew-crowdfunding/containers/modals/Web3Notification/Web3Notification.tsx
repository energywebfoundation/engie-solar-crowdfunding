import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useWeb3NotificationEffects } from './Web3Notification.effects';
import { useStyles } from './Web3Notification.styles';
import { BootstrapDialogTitle } from '../../../components';
import { Divider } from '@mui/material';

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
      <BootstrapDialogTitle id='web3-notification-dialog-title' title={config?.title} subtitle={config?.text} />
      <Divider/>
      <DialogActions>
        <Button variant='outlined' color='primary' style={{ width: '100%' }} autoFocus onClick={closeModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
