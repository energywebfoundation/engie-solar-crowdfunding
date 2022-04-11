import { Box, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { AppContainer, ImageText } from '../../components';
import { theme } from '../../dsla-theme';
import { formatDate, formatUTCDate } from '../../utils';

export const HowTo = () => {
  const activateStakingDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_ACTIVATE_STAKING_DATE));
  const closeStackingDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE));
  const releaseRewardsDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_RELEASE_REWARDS_DATE));
  const finalStopDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_FULL_STOP_DATE));

  const text = `This DeFi platform uses the open-source Energy Web technology stack and runs on the Energy Web Chain. Micro-investors can finance the installation of clean energy assets by staking their Energy Web Tokens (EWT), the native token of the Energy Web Chain. In this first proof of concept, the target goal is to collect $100,000 worth of EWT between ${activateStakingDate} and ${closeStackingDate}. These funds will then be used by ENGIE Energy Access to finance new solar installations. Between ${releaseRewardsDate} and ${finalStopDate}, the participants will then withdraw their original principal and 10% rewards.`;
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
