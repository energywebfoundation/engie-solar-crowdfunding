import type { NextPage } from 'next';
import { Container, Divider } from '@mui/material';
import { Footer, InfoContainer, InfoPane, Lending, Navigation, Welcome } from '../containers';
import { theme } from '../dsla-theme';
import { useDispatch, useSelector } from 'react-redux';
import { getWeb3, selectAuthenticated } from '../redux-store';
import { useEffect } from 'react';
import { useDSLAModalsDispatch } from '../context';
import { AppContainer } from '../components';

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
      <AppContainer>
        <InfoPane />
        <Divider
          style={{ width: '100%', marginTop: '40px', marginBottom: '40px', borderColor: theme.palette.primary.dark }}
          light={false}
        />
        {authenticated && <Lending />}
      </AppContainer>
      <Footer />
    </div>
  );
};

export default WalletPage;
