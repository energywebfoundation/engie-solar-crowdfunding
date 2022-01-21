/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography, Button, Divider, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { useConnectCardEffects } from './ConnectCard.effects';
import { useStyles } from './ConnectCard.styles';
import Link from 'next/link';

export const ConnectCard: FC = () => {
  const classes = useStyles();
  const { onConnect, authenticated, logout } = useConnectCardEffects();

  return (
    <Box className={classes.wrapper}>
      <div style={{ width: '100%' }}>
        {!authenticated ? (
          <Paper className={classes.paper}>
            <Box className={classes.title}>
              <Typography variant='h5'>My balance</Typography>
            </Box>
            <Divider />
            <Box className={classes.message}>
              <img width={100} height={100} src='/ConnectToWallet.svg' alt='Lock'></img>
              <Typography variant='h5'>You need to be connected to your wallet to see your current balance.</Typography>
              <Button onClick={onConnect} variant='contained'>
                Connect to wallet
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper className={classes.paper}>
            <Box className={classes.title}>
              <Typography variant='h5'>My reward</Typography>
            </Box>
            <Divider />
            <Box className={classes.message}>
              <img width={100} height={100} src='/Rewards.svg' alt='Lock'></img>
              <Typography variant='h5'>Swap tokens and claim rewards!</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <Button onClick={logout} variant='outlined'>
                  Disconnect from wallet
                </Button>
                <Link href='/#lendingApp'>
                  <a>
                    <Button style={{ width: '100%' }} variant='contained'>
                      Lending App
                    </Button>
                  </a>
                </Link>
              </Box>
            </Box>
          </Paper>
        )}
        <div className={classes.border}></div>
      </div>
    </Box>
  );
};
