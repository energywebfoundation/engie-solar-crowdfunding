/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useStyles } from './Carousel.styles';
import Link from 'next/link';
import { AppContainer, SocialLinks } from '../../components';

export const Carousel: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.carousel}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '10px' }} mt={1}>
            <Link href='/'>
              <a>
                <img className={classes.logo} src='/EeaLogoWhite.png' alt='EEA Logo White' />
              </a>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <AppContainer>
        <Box className={classes.wrapper}>
          <Typography variant='h1'>Solar Crowdfunding Platform</Typography>
          <Typography variant='h5'>
            Over x% of people living in sub-Saharan Africa don`t have access to electricity. ENGIE EnergyAccess (EEA)
            and Energy Web are partnering to deploy more solar to vulnerable populations by tapping in new sources of
            funding: crypto-based decentralized finance. This pilot platform is the initial proof of concept leveraging
            decentralized finance (DeFi) to accelerate clean and affordable energy access for all.
          </Typography>
          <Link href='/wallet'>
            <a>
              <Button style={{ width: '200px' }} variant='contained'>
                Fund solar
              </Button>
            </a>
          </Link>
        </Box>
        <Box className={classes.socialWrapper}>
          <SocialLinks />
        </Box>
      </AppContainer>
    </Box>
  );
};
