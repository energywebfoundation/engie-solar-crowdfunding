import { FC, useContext } from 'react';
import { Web3Context } from '../../context/web3';
import { Container, Box, Button, Typography } from '@mui/material';
import { ProviderType } from 'iam-client-lib';
import { useStyles } from './LoginComponent.styles';
/* eslint-disable @next/next/no-img-element */

export const LoginComponent: FC = () => {
  const classes = useStyles();
  const { address, isConnectedToRightNetwork, isMetamaskPresent, login, logout } = useContext(Web3Context);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
      }}
    >
      {address ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
          mt={3}
        >
          <Button variant='contained' onClick={logout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box className={classes.buttonContainer}>
          <Button
            className={classes.button}
            disabled={!isMetamaskPresent || !isConnectedToRightNetwork}
            variant='outlined'
            color='primary'
            onClick={() => login({ providerType: ProviderType.MetaMask })}
            startIcon={<img width={40} height={40} src='/metamask-logo.svg' alt='Metamask logo' />}
          >
            <Box style={{ width: '100%' }}>Use Metamask</Box>
          </Button>
          <Button
            className={classes.button}
            disabled={!isConnectedToRightNetwork}
            variant='outlined'
            color='primary'
            onClick={() => login({ providerType: ProviderType.WalletConnect })}
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
      )}
    </Container>
  );
};
