import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { ConnectCard } from '../components';
import { Footer, InfoContainer, InfoPane, Welcome, LendingDetails } from '../containers';
import { theme } from '../dsla-theme';

const Home: NextPage = () => {
  return (
    <div className='backgroundImage'>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          [theme.breakpoints.down('md')]: {
            padding: '20px',
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
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
            gap: '40px',
          }}
        >
          <Welcome />
          <ConnectCard />
        </Box>
        <InfoContainer />
        <InfoPane />
        <LendingDetails />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
