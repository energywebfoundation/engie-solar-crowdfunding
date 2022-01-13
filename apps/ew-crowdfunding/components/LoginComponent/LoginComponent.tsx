import { FC, useContext } from 'react';
import { Web3Context } from '../../web3';
import { Container, Box, Button } from '@mui/material';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import Image from 'next/image';
import { useStyles } from './LoginComponent.styles';

export const LoginComponent: FC = () => {
  const classes = useStyles();
  const { address, chainId, login, logout } = useContext(Web3Context);

  return (
    <Container>
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
            variant='outlined'
            color='primary'
            onClick={() => login({ providerType: ProviderType.MetaMask })}
            startIcon={<Image width={40} height={40} src="/metamask-logo.svg" alt='Metamask logo' />}
          >
            <Box style={{ width: "100%" }}>Use Metamask</Box>
          </Button>
          <Button
            className={classes.button}
            variant='outlined'
            color='primary'
            onClick={() => login({ providerType: ProviderType.WalletConnect })}
            startIcon={<Image width={40} height={40} src="/walletconnect-logo.svg" alt='Wallet connect logo' />}
          >
            <Box style={{ width: "100%" }}>Use Wallet Connect</Box>
          </Button>
        </Box>
      )}
    </Container>
  );
};
