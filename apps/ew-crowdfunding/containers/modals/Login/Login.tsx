/* eslint-disable @next/next/no-img-element */
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { useLoginEffects } from './Login.effects';
import { useStyles } from './Login.styles';
import { BootstrapDialogTitle } from '../../../components';

export const Login = () => {
  const classes = useStyles();
  const { open, closeModal, isConnectedToRightNetwork, isMetamaskPresent, login } = useLoginEffects();

  return (
    <Dialog className={classes.dialog} onClose={closeModal} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle id='login-dialog-title' onClose={closeModal}>
        Connect to your wallet
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box className={classes.buttonContainer}>
          <Button
            className={classes.button}
            disabled={!isMetamaskPresent || !isConnectedToRightNetwork}
            variant='outlined'
            color='primary'
            onClick={() => {
              login({ providerType: ProviderType.MetaMask });
              closeModal();
            }}
            startIcon={<img width={40} height={40} src='/metamask-logo.svg' alt='Metamask logo' />}
          >
            <Box style={{ width: '100%' }}>Use Metamask</Box>
          </Button>
          <Button
            className={classes.button}
            disabled={!isConnectedToRightNetwork}
            variant='outlined'
            color='primary'
            onClick={() => {
              login({ providerType: ProviderType.WalletConnect });
              closeModal();
            }}
            startIcon={<img width={40} height={40} src='/walletconnect-logo.svg' alt='Wallet connect logo' />}
          >
            <Box style={{ width: '100%' }}>Use Wallet Connect</Box>
          </Button>
          {!isConnectedToRightNetwork && (
            <Typography variant='h5' color='textSecondary'>
              You are not connected to {process.env.NEXT_PUBLIC_NETWORK_NAME}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
