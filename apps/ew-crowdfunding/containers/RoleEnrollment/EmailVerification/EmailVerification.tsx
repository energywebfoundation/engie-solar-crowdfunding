import { FC } from 'react';
import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, Link, Typography } from '@mui/material';
import { useStyles } from './EmailVerification.styles';
import { useEmailVerificationEffects } from './EmailVerification.effects';
import { shortenAddress } from '../../../utils';
import { FormInputText, WalletCard } from '../../../components';
import { RoleEnrollmentStatus } from '../../../redux-store';

export const EmailVerification: FC<{ roleEnrolmentStatus: RoleEnrollmentStatus }> = ({ roleEnrolmentStatus }) => {
  const classes = useStyles();
  const {
    address,
    control,
    handleSubmit,
    onSubmit,
    onEmailChange,
    errorMessage,
    acknowledged,
    setAcknowledge,
    isLoading,
    isEnrollmentDisabled,
  } = useEmailVerificationEffects(roleEnrolmentStatus);

  return (
    <WalletCard icon='/ShieldWarning.png' colorClass='bg-warning' step='step 2'>
      <Typography align='center' variant='h5' style={{ fontWeight: 500 }}>
        You must verify your email to stake EWT in The Clean Energy Fund
      </Typography>

      {address && (
        <Box>
          <Typography align='center' variant='h5'>
            You have not verified your email for the connected wallet <strong>{shortenAddress(address)}</strong>.
          </Typography>
          <Typography align='center' variant='h5' mt={2}>
            If this is not your staking wallet, change to the correct wallet in MetaMask and refresh the page
          </Typography>
        </Box>
      )}

      <form className={classes.form} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          name='email'
          control={control}
          label='Email'
          disabled={!acknowledged}
          type='email'
          valueChanged={onEmailChange}
          errorMessage={errorMessage}
        />
        <Divider className={classes.divider} style={{ marginTop: '20px' }} />
        <FormControlLabel
          control={<Checkbox checked={acknowledged} onChange={() => setAcknowledge(!acknowledged)} />}
          label={
            <Typography variant='h5'>
              I  accept and acknowledge{' '}
              <Link href='#' variant='h5' target='_blank' color='primary' underline='hover'>
                this disclaimer
              </Link>
            </Typography>
          }
        />
        <Divider className={classes.divider} style={{ marginBottom: '20px' }} />
        <Box className={classes.buttonWrapper}>
          {isLoading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant='contained'
              type='submit'
              color='primary'
              style={{ width: '100%' }}
              // disabled={!!errorMessage || isEnrollmentDisabled} // TODO: Uncomment this for prod
              disabled={!!errorMessage}
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </WalletCard>
  );
};
