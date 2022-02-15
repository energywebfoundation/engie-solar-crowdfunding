/* eslint-disable react/jsx-no-undef */
import { useStyles } from './Redeem.styles';
import { Box, Button, Dialog, DialogActions, DialogContent, InputAdornment } from '@mui/material';
import { BootstrapDialogTitle, FormInputText } from '../../../components';
import { useRedeemEffects } from './Redeem.effects';

export const Redeem = () => {
  const classes = useStyles();
  const { control, handleSubmit, onSubmit, open, tokenBalance, onReset, amountWithdrawals, handleRedeemPartial } =
    useRedeemEffects();

  return (
    <Dialog className={classes.dialog} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle
        id='redeem-dialog-title'
        title='Redeem your SLT tokens'
        subtitle='EWT will be transferred to your account balance. You will be charged with gass fee.'
      />
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <FormInputText
            name='amount'
            control={control}
            label='Withdraw Amount'
            type='number'
            hint={`Max. ${tokenBalance} SLT`}
            inputProps={{
              endAdornment: <InputAdornment position='end'>SLT</InputAdornment>,
            }}
          />
          <Box className={classes.redeemButtons}>
            {amountWithdrawals.map((value: number) => {
              return (
                <Button
                  key={`key-${value}`}
                  type='button'
                  variant='outlined'
                  onClick={() => handleRedeemPartial(value)}
                >
                  {value}%
                </Button>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='contained' type='submit' color='primary' style={{ width: '100%' }}>
            Redeem
          </Button>
          <Button type='reset' variant='outlined' autoFocus onClick={onReset} style={{ width: '100%' }}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
