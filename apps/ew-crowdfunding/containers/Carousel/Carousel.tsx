/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useStyles } from './Carousel.styles';
import Link from 'next/link';

export const Carousel: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.carousel}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '10px' }} mt={1}>
            <Link href='/'>
              <a>
                <img src='/EngieLogoWhite.png' alt='Lab icon' />
              </a>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.wrapper}>
        <Typography variant='h1'>Headline H1</Typography>
        <Typography variant='h5'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit
          auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus.
        </Typography>
        <Link href='/wallet'>
          <a>
            <Button style={{ width: '200px' }} variant='contained'>
              Wallet
            </Button>
          </a>
        </Link>
      </Box>
    </Box>
  );
};
