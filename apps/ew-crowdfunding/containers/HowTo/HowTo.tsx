import { Box, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { AppContainer, ImageText } from '../../components';
import { theme } from '../../dsla-theme';
import { formatDate } from '../../utils';

export const HowTo = () => {
  const activateStakingDate = formatDate(new Date(process.env.NEXT_PUBLIC_ACTIVATE_STAKING_DATE));
  const closeStackingDate = formatDate(new Date(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE));

  const text = `This DeFi platform uses the open-source Energy Web technology stack and runs on the Energy Web Chain. Micro-investors can finance the installation of clean energy assets by staking their Energy Web Tokens (EWT), the native token of the Energy Web Chain. In this first proof of concept, the target goal is to collect $100,000 worth of EWT within ${activateStakingDate} and ${closeStackingDate}.`;
  return (
    <Paper style={{ background: theme.palette.primary.dark, paddingBottom: '80px', paddingTop: '30px' }}>
      <AppContainer darkBackground={true}>
        <ImageText imagePath='/Store2.png' title='How does this platform work?' text={text} gradientText={true} />
      </AppContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href='/wallet'>
          <a>
            <Button style={{ width: '200px' }} variant='contained' color='primary'>
              Fund solar
            </Button>
          </a>
        </Link>
      </Box>
    </Paper>
  );
};
