/* eslint-disable react/jsx-no-undef */
import { useStyles } from './Lend.styles';
import { Button, Dialog, DialogActions, Divider } from '@mui/material';
import { BootstrapDialogTitle } from '../../../components';
import { useLendEffects } from './Lend.effects';

export const Lend = () => {
  const classes = useStyles();
  const { open, amount, onLend, closeModal } = useLendEffects();

  return (
    <Dialog className={classes.dialog} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle
        id='lend-dialog-title'
        title='Lending process'
        subtitle={`Do you want to lend ${amount} EWT?`}
      />
      <Divider />
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='contained'
          color='primary'
          style={{ width: '100%' }}
          autoFocus
          onClick={() => {
            onLend(amount);
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
