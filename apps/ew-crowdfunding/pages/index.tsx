import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { ConnectCard } from '../components';
import { Footer, InfoContainer, InfoPane, Welcome, Lending } from '../containers';
import { theme } from '../dsla-theme';
import { useDispatch } from 'react-redux';
import { getWeb3 } from '../redux-store';
import { useEffect } from 'react';
import { useDSLAModalsDispatch } from '../context';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const dispatchModals = useDSLAModalsDispatch();

  useEffect(() => {
    dispatch(getWeb3(dispatchModals));
  })

  return (
    <div className='backgroundImage'>
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
        <Lending />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
