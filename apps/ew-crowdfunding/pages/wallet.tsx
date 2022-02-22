import type { NextPage } from 'next';
import { Container, Divider } from '@mui/material';
import { Footer, InfoContainer, InfoPane, Lending, Navigation, Welcome } from '../containers';
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
      <Welcome />
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
        <Divider
          style={{ width: '100%', marginTop: '40px', marginBottom: '40px', borderColor: theme.palette.primary.dark }}
          light={false}
        />
        {authenticated && <Lending />}
      </Container>
      <Footer />
    </div>
  );
};

export default WalletPage;
