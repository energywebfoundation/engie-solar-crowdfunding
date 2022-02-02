/* eslint-disable @next/next/no-img-element */
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { ProviderType } from 'iam-client-lib';
import { useLoginEffects } from './Login.effects';
import { useStyles } from './Login.styles';
import { BootstrapDialogTitle } from '../../../components';

export const Login = () => {
  const classes = useStyles();
  const {
    open,
    closeModal,
    isConnectedToRightNetwork,
    isMetamaskPresent,
    login,
    importMetamaskConf,
    handleInstall,
    noMetamaskInstalled,
  } = useLoginEffects();

  return (
    <Dialog className={classes.dialog} onClose={closeModal} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle id='login-dialog-title' onClose={closeModal}>
        Connect to your wallet
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box className={classes.buttonContainer}>
          {noMetamaskInstalled ? (
            <Button
              className={classes.button}
              variant='outlined'
              color='primary'
              onClick={() => {
                handleInstall();
                closeModal();
              }}
              startIcon={<img width={40} height={40} src='/metamask-logo.svg' alt='Metamask logo' />}
            >
              <Box style={{ width: '100%' }}>Install Metamask</Box>
            </Button>
          ) : (
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
          )}
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
          {!isConnectedToRightNetwork && !noMetamaskInstalled && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} mt={2}>
              <Typography variant='h5' color='textSecondary'>
                You are not connected to {process.env.NEXT_PUBLIC_NETWORK_NAME}
              </Typography>
              <Button variant='text' onClick={importMetamaskConf}>
                Import configuration
              </Button>
            </Box>
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
