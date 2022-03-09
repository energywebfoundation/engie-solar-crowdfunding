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
          You have not verified your email for the current wallet <strong>{shortenAddress(address)}</strong>
        </Typography>
        <Typography align='center' variant='h5'>
          If this is not your staking wallet, change to the correct wallet in MetaMask and refresh the page
        </Typography>
      </Box>
      <Box>
        <Typography align='center' variant='h5'>
          To verify your email, please click the confirmation link in your inbox within the next 24 hours
        </Typography>
        <Typography align='center' variant='h5'>
          If you accidentally entered a wrong email or ran out of time, click “Cancel” and try again.
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
