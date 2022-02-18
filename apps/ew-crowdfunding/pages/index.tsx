import type { NextPage } from 'next';
import { Button, Container } from '@mui/material';
import { theme } from '../dsla-theme';
import Link from 'next/link';
import { Navigation, Footer } from '../containers';

const Home: NextPage = () => {
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
        <Button variant='contained'>
          <Link href='/wallet'>
            <a>Wallet</a>
          </Link>
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
