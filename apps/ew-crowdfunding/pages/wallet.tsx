import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import { Footer, InfoContainer, InfoPane, Lending, Navigation, Welcome } from '../containers';
import { theme } from '../dsla-theme';
import { AppContainer } from '../components';
import { useFetching } from '../hooks';

const WalletPage: NextPage = () => {
  useFetching();

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
        <Lending />
      </AppContainer>
      <Footer />
    </div>
  );
};

export default WalletPage;
