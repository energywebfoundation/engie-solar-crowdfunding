import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { ConnectCard } from '../components';
import { Footer, InfoContainer, InfoPane, Welcome } from '../containers';
import { useStyles } from './index.styles';

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.backgroundImage}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          gap: '40px',
        }}
      >
        <Box className={classes.wrapper}>
          <Welcome />
          <ConnectCard />
        </Box>
        <InfoContainer />
        <InfoPane />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
