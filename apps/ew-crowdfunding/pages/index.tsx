import { Container, Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { Web3Context } from '../web3';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';

export function Index() {
  const { provider, address, chainId, login, logout, signer } = useContext(Web3Context);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' align='center' color='primary'>
        Welcome ew-crowdfunding 👋
      </Typography>
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
          <Button variant='contained' onClick={() => login({ providerType: ProviderType.MetaMask })}>
            Login with Metamask
          </Button>
          <Button variant='contained' onClick={() => login({ providerType: ProviderType.WalletConnect })}>
            Login with Wallet Connect
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Index;
