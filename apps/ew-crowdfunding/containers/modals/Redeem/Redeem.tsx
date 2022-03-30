import { useStyles } from './Redeem.styles';
import { Box, Button, InputAdornment } from '@mui/material';
import { FormInputText } from '../../../components';
import { useRedeemEffects } from './Redeem.effects';
import { DialogContainer, DialogTitleProps, DialogAction } from '../../../components';

export const Redeem = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    onSubmit,
    open,
    tokenBalance,
    onReset,
    amountWithdrawals,
    handleRedeemPartial,
    releaseRewardsDate,
  } = useRedeemEffects();

  const titleProps: DialogTitleProps = {
    id: 'redeem-dialog-title',
    title: 'Redeem your SLT tokens',
    subtitle: 'SLTs will be burnt and EWT will be transferred to your account balance. You will be charged a small gas fee.',
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
          label='Withdraw amount SLT'
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
                disabled={new Date() > releaseRewardsDate && value !== 100}
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
      </DialogContainer>
    </form>
  );
};
