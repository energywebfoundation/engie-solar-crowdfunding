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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant='h1'>Crowdfund for Solar</Typography>
            <Typography variant='h3'>Decentralized financing for decentralized energy</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant='h5'>
              More than half of Sub-Saharan Africa lacks access to electricity. With this pilot platform, Energy Web and
              ENGIE Energy Access have partnered to accelerate access to clean energy for all by tapping into a new
              source of funding: crypto-based decentralized finance (DeFi).
            </Typography>
            <Typography variant='h5'>
              Crowdfund for Solar is an initial proof of concept leveraging DeFi to accelerate clean and affordable
              energy access for all.
            </Typography>
          </Box>
          <Link href='/wallet'>
            <a>
              <Button style={{ width: '200px' }} variant='contained'>
                Fund Now
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
