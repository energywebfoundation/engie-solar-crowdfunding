import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './NotApproved.styles';
import { shortenAddress } from '../../../utils';
import { useNotApprovedEffects } from './NotApproved.effects';
import { WalletCard } from '../../../components';

export const NotApproved: FC = () => {
  const classes = useStyles();
  const { address, onCancel, isLoading } = useNotApprovedEffects();

  return (
    <WalletCard icon='/ShieldWarning.png' colorClass='bg-warning' step='step 2'>
      <Box>
        <Typography align='center' variant='h5'>
          Thank you for submitting your email. To verify your email for the connected wallet, please click the
          confirmation link in your inbox within 24 hours. Return to this page after you confirm your email.
        </Typography>
        <Typography align='center' variant='h5'>
          If you accidentally entered a wrong email or ran out of time, click “Cancel” and try again.
        </Typography>
      </Box>
      <Box>
        <Typography align='center' variant='h5'>
          One email address can be used only for one blockchain wallet - if you haven’t received an email, you must have
          used it for another wallet. Change to the correct wallet in MetaMask and refresh the page.
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper}>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button onClick={onCancel} variant='contained' type='submit' color='primary' style={{ width: '100%' }}>
            Cancel
          </Button>
        )}
      </Box>
    </WalletCard>
  );
};
