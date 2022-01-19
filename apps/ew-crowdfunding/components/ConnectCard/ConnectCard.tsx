/* eslint-disable @next/next/no-img-element */
import { Container, Paper, Box, Typography, Button, Divider } from '@mui/material';
import { FC } from 'react';
import { useConnectCardEffects } from './ConnectCard.effects';
import { useStyles } from './ConnectCard.styles';

export const ConnectCard: FC = () => {
  const classes = useStyles();
  const { onConnect, address, logout } = useConnectCardEffects();

  return (
    <Box className={classes.wrapper}>
      {!address ? (
        <Paper className={classes.paper}>
          <Box className={classes.title}>
            <Typography variant='h4' color='common.black'>
              My balance
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.message}>
            <img width={100} height={100} src='/ConnectToWallet.svg' alt='Lock'></img>
            <Typography>You need to be connected to your wallet to see your current balance.</Typography>
            <Button onClick={onConnect} variant='contained'>
              Connect to wallet
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Box className={classes.title}>
            <Typography variant='h4' color='common.black'>
              My reward
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.message}>
            <img width={100} height={100} src='/Rewards.svg' alt='Lock'></img>
            <Typography>Swap tokens and claim rewards!</Typography>
            <Button onClick={logout} variant='outlined'>
              Disconnect from wallet
            </Button>
          </Box>
        </Paper>
      )}
      <div className={classes.border}></div>
    </Box>
  );
};
