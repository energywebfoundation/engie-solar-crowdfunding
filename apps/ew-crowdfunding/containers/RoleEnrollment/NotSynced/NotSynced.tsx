import { FC } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useNotSyncedEffects } from './NotSynced.effects';
import { useStyles } from './NotSynced.styles';
import { WalletCard } from '../../../components';

export const NotSynced: FC = () => {
  const classes = useStyles();
  const { onAddRole, isLoading } = useNotSyncedEffects();

  return (
    <WalletCard icon='/IdentificationBadge.png' colorClass='bg-warning' step='step 3'>
      <Typography align='center' variant='body2'>
        Your email has been approved
      </Typography>
      <Typography align='center' variant='body2'>
        To complete your staking authorization, you must add an on-chain role to your EW Chain staking wallet.
      </Typography>
      <TextField disabled={true} label='Role' defaultValue='Community' style={{ width: '100%' }} />
      <Typography align='center' variant='body2'>
        We respect your privacy, adding this role does not expose your email on-chain.
      </Typography>
      <Box className={classes.buttonWrapper}>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button onClick={onAddRole} variant='contained' type='submit' color='primary' style={{ width: '100%' }}>
            Proceed
          </Button>
        )}
      </Box>
    </WalletCard>
  );
};
