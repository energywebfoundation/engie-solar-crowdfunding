import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNotSyncedEffects } from './NotSynced.effects';
import { useStyles } from './NotSynced.styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const NotSynced: FC = () => {
  const classes = useStyles();
  const onAddRole = useNotSyncedEffects();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      <Box className={classes.info}>
        <CheckCircleIcon color={`primary`} />
        <Typography variant='body2'>Your email has been approved</Typography>
      </Box>
      <Box className={classes.disclaimer}>
        <Typography variant='body2'>
          To complete your staking authorization, you must add an on-chain role to your EW Chain staking wallet. Please,
          do this by clicking “ADD ROLE” below and signing an EW Chain transaction.
        </Typography>
        <Typography variant='body2'>
          We respect your privacy, adding this role does not expose your email on-chain.
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper} mt={2}>
        <Button onClick={onAddRole} variant='contained' type='submit' color='primary' style={{ minWidth: '200px' }}>
          Add Role
        </Button>
      </Box>
    </Box>
  );
};
