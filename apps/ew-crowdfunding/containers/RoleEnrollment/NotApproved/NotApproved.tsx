import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './NotApproved.styles';
import { shortenAddress } from '../../../utils';
import { useNotApprovedEffects } from './NotApproved.effects';
import { WalletCard } from '../../../components';

export const NotApproved: FC = () => {
  const classes = useStyles();
  const { address, onCancel } = useNotApprovedEffects();

  return (
    <WalletCard icon='/ShieldWarning.png' colorClass='bg-warning' step='step 2'>
      <Box>
        <Typography align='center' variant='body2'>
          You haven`t verified your email for the current wallet <strong>{shortenAddress(address)}</strong>
        </Typography>
        <Typography align='center' variant='body2'>
          If this is not your lending wallet, change wallets in Metamask and refresh the page
        </Typography>
      </Box>
      <Box>
        <Typography align='center' variant='body2'>
          You have 24 hours to click the confirmation link in your inbox. Return to this page after you confirm your
          email.
        </Typography>
        <Typography align='center' variant='body2'>
          If you accidentally entered the wrong email or ran out of time, click “Cancel” and try again.
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper}>
        <Button onClick={onCancel} variant='contained' type='submit' color='primary' style={{ width: '100%' }}>
          Cancel
        </Button>
      </Box>
    </WalletCard>
  );
};
