/* eslint-disable react/jsx-no-undef */
import { useStyles } from './Redeem.styles';
import { Box, Button, InputAdornment } from '@mui/material';
import { FormInputText } from '../../../components';
import { useRedeemEffects } from './Redeem.effects';
import { DialogContainer, DialogTitleProps, DialogAction } from '../../../components';

export const Redeem = () => {
  const classes = useStyles();
  const { control, handleSubmit, onSubmit, open, tokenBalance, onReset, amountWithdrawals, handleRedeemPartial } =
    useRedeemEffects();

  const titleProps: DialogTitleProps = {
    id: 'redeem-dialog-title',
    title: 'Redeem your SLT tokens',
    subtitle: 'EWT will be transferred to your account balance. You will be charged with gass fee.',
  };

  const dialogAction: DialogAction = {
    name: 'Redeem',
    type: 'submit',
    onAction: handleSubmit(onSubmit),
  };

  return (
    <form autoComplete='off'>
      <DialogContainer titleProps={titleProps} open={open} closeModal={onReset} dialogAction={dialogAction}>
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
              <Button key={`key-${value}`} type='button' variant='outlined' onClick={() => handleRedeemPartial(value)}>
                {value}%
              </Button>
            );
          })}
        </Box>
      </DialogContainer>
    </form>
  );
};
