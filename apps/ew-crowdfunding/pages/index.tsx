import { Container, Typography } from '@mui/material';
import { LoginComponent } from '../components';

export function Index() {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' align='center' color='primary'>
        Welcome ew-crowdfunding 👋
      </Typography>
      <LoginComponent />
    </Container>
  );
}

export default Index;
