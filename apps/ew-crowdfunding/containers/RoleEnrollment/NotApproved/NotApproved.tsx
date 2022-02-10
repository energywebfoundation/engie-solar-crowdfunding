import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './NotApproved.styles';
import { shortenAddress } from '../../../utils';
import InfoIcon from '@mui/icons-material/Info';
import { useNotApprovedEffects } from './NotApproved.effects';

export const NotApproved: FC = () => {
  const classes = useStyles();
  const { address, onCancel } = useNotApprovedEffects();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      <Box className={classes.info}>
        <InfoIcon color={`warning`} />
        <Typography variant='body2'>
          You haven`t verified your email for the current wallet <strong>{shortenAddress(address)}</strong>. If this is
          not your lending wallet, change wallets in Metamask and refresh the page
        </Typography>
      </Box>
      <Box className={classes.disclaimer}>
        <Typography variant='body2'>
          You have 24 hours to click the confirmation link in your inbox. Return to this page after you confirm your
          email. If you accidentally entered the wrong email or ran out of time, click “Cancel” and try again.
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper} mt={2}>
        <Button onClick={onCancel} variant='contained' type='submit' color='primary' style={{ minWidth: '200px' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
