import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { useConnectCardEffects } from './ConnectCard.effects';
import { WalletCard } from '../WalletCard';

export const ConnectCard: FC = () => {
  const { onConnect, isLoading } = useConnectCardEffects();

  return (
    <WalletCard icon='/LockKey.png' colorClass='bg-warning' step='step 1'>
      <Typography variant='h5'>
        You need to connect your wallet to see your current balance and interact with The Clean Energy Fund.
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Button style={{ width: '100%' }} onClick={onConnect} variant='contained'>
          Connect to wallet
        </Button>
      )}
    </WalletCard>
  );
};
