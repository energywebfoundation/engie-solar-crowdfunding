import { FC } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { useStyles } from './EmailVerification.styles';
import { useEmailVerificationEffects } from './EmailVerification.effects';
import InfoIcon from '@mui/icons-material/Info';
import { shortenAddress } from '../../utils';
import { FormInputText } from '../../components';

export const EmailVerification: FC = () => {
  const classes = useStyles();
  const { address, notEnrolled, control, handleSubmit, onSubmit, onEmailChange, errorMessage } =
    useEmailVerificationEffects();

  return (
    <Box className={`${classes.wrapper} ${notEnrolled ? 'warningBorder' : 'gradientBorder'}`}>
      {address && (
        <Box className={classes.info}>
          <InfoIcon color={`${notEnrolled ? 'warning' : 'primary'}`} />
          <Typography variant='body2'>
            You haven`t verified your email for the current wallet <strong>{shortenAddress(address)}</strong>. If this
            is not your lending wallet, change wallets in Metamask and refresh the page
          </Typography>
        </Box>
      )}
      <Box className={classes.info}>
        <InfoIcon color={`${notEnrolled ? 'warning' : 'primary'}`} />
        <Typography variant='body2'>You myst verify your email to lend</Typography>
      </Box>
      <form className={classes.form} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          name='email'
          control={control}
          label='Email'
          type='email'
          valueChanged={onEmailChange}
          errorMessage={errorMessage}
        />
        <Box className={classes.disclaimer}>
          <Typography variant='body2'>
            By clicking &quot;SUBMIT&quot;, you acknowledge{' '}
            <Link href='#' variant='body2' target='_blank' color='primary' underline='hover'>
              this disclaimer
            </Link>
          </Typography>
        </Box>
        <Box className={classes.buttonWrapper} mt={2}>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ minWidth: '200px' }}
            disabled={!!errorMessage}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
