import type { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import { LoginComponent } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          marginTop: 10
        }}
      >
        <Typography variant='h2' align='center' color='primary'>
          Welcome ew-crowdfunding 👋
        </Typography>
        <LoginComponent />
      </Container>
    </div>
  );
};

export default Home;
