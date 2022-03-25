/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from '@mui/material';
import { ProviderType } from 'iam-client-lib';
import { useLoginEffects } from './Login.effects';
import { useStyles } from './Login.styles';
import { DialogContainer, DialogTitleProps } from '../../../components';

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

  const titleProps: DialogTitleProps = {
    id: 'login-dialog-title',
    title: 'Connect to your wallet',
  };

  return (
    <DialogContainer titleProps={titleProps} open={open} closeModal={closeModal}>
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
            startIcon={<img width={30} height={30} src='/metamask-logo.svg' alt='Metamask logo' />}
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
              login(ProviderType.MetaMask);
              closeModal();
            }}
            startIcon={<img width={30} height={30} src='/metamask-logo.svg' alt='Metamask logo' />}
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
            login(ProviderType.WalletConnect);
            closeModal();
          }}
          startIcon={<img width={30} height={30} src='/walletconnect-logo.svg' alt='Wallet connect logo' />}
        >
          <Box style={{ width: '100%' }}>Use Wallet Connect</Box>
        </Button>
        {!isConnectedToRightNetwork && !noMetamaskInstalled && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }} mt={2}>
            <Typography variant='h5' color='textSecondary'>
              You are not connected to {process.env.NEXT_PUBLIC_NETWORK_NAME}
            </Typography>
            <Button variant='text' onClick={importMetamaskConf}>
              Import configuration to connect
            </Button>
          </Box>
        )}
      </Box>
    </DialogContainer>
  );
};
