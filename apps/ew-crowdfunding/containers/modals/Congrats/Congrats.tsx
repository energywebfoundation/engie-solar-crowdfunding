import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useCongratsEffects } from './Congrats.effects';
import { useStyles } from './Congrats.styles';
import { BootstrapDialogTitle } from '../../../components';
import { Divider } from '@mui/material';

export const Congrats = () => {
  const { open, closeModal } = useCongratsEffects();
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      onClose={closeModal}
      aria-labelledby='web3-notification-dialog-title'
      open={open}
    >
      <BootstrapDialogTitle
        id='web3-notification-dialog-title'
        title='Congratulations!'
        subtitle='You just signed a new staking contract. EWT is now sent to the staking pool!'
        icon='/Confetti.png'
        colorClass='bg-success'
      />
      <Divider />
      <DialogActions>
        <Button variant='outlined' color='primary' style={{ width: '100%' }} autoFocus onClick={closeModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
