import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { ConnectCard } from '../components';
import { Footer, InfoContainer, InfoPane, Welcome, Lending, Navigation, RoleEnrollment } from '../containers';
import { theme } from '../dsla-theme';
import { useDispatch, useSelector } from 'react-redux';
import { getWeb3, selectAuthenticated } from '../redux-store';
import { useEffect } from 'react';
import { useDSLAModalsDispatch } from '../context';

const WalletPage: NextPage = () => {
  const dispatch = useDispatch();
  const dispatchModals = useDSLAModalsDispatch();
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    dispatch(getWeb3(dispatchModals));
  });

  return (
    <div>
      <Navigation />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '25px',
          },
          gap: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: '100px',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              gap: '40px',
            },
          }}
        >
          <Welcome />
          {authenticated ? <RoleEnrollment /> : <ConnectCard />}
        </Box>
      </Container>
      <InfoContainer />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '25px',
          },
          gap: '40px',
        }}
      >
        <InfoPane />
        <Lending />
      </Container>
      <Footer />
    </div>
  );
};

export default WalletPage;
