import { FC } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useNotSyncedEffects } from './NotSynced.effects';
import { useStyles } from './NotSynced.styles';
import { WalletCard } from '../../../components';

export const NotSynced: FC = () => {
  const classes = useStyles();
  const { onAddRole, isLoading, isEnrollmentDisabled } = useNotSyncedEffects();

  return (
    <WalletCard icon='/IdentificationBadge.png' colorClass='bg-warning' step='step 3'>
      <Typography align='center' variant='h5'>
        Your email has been verified
      </Typography>
      <Typography align='center' variant='h5'>
        To complete your authorization for staking in The Clean Energy Fund, please add an on-chain role of a “Patron”
        to your EWT staking wallet. This creates a Decentralized Identifier on the Energy Web Chain.
      </Typography>
      <TextField disabled={true} label='Role' defaultValue='Community' style={{ width: '100%' }} />
      <Typography align='center' variant='h5'>
        We respect your privacy: adding this role does not expose your email on-chain or off-chain
      </Typography>
      <Box className={classes.buttonWrapper}>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            onClick={onAddRole}
            variant='contained'
            type='submit'
            color='primary'
            style={{ width: '100%' }}
            // disabled={isEnrollmentDisabled}  // TODO: Uncomment this for prod
          >
            Proceed as a Patron
          </Button>
        )}
      </Box>
    </WalletCard>
  );
};
