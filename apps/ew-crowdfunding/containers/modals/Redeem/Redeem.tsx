/* eslint-disable react/jsx-no-undef */
import { useStyles } from './Redeem.styles';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { BootstrapDialogTitle, FormInputText } from '../../../components';
import { useRedeemEffects } from './Redeem.effects';

export const Redeem = () => {
  const classes = useStyles();
  const { control, handleSubmit, onSubmit, open, closeModal, tokenBalance, onReset, redeemAll, handleRedeemAll } =
    useRedeemEffects();

  return (
    <Dialog className={classes.dialog} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle id='login-dialog-title' onClose={closeModal}>
        Redeem your reward
      </BootstrapDialogTitle>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <FormInputText
            name='amount'
            disabled={redeemAll}
            control={control}
            label='SLT Reward Amount'
            type='number'
            hint={`Max. ${tokenBalance} SLT`}
            inputProps={{
              endAdornment: <InputAdornment position='end'>SLT</InputAdornment>,
            }}
          />
          <FormControlLabel control={<Checkbox checked={redeemAll} onChange={handleRedeemAll} />} label='Max value' />
        </DialogContent>
        <DialogActions>
          <Button type='reset' autoFocus onClick={onReset} style={{ minWidth: '200px' }}>
            Cancel
          </Button>
          <Button variant='contained' type='submit' color='primary' style={{ minWidth: '200px' }}>
            Redeem
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
