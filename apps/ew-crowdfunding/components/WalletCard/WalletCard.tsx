/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './WalletCard.styles';

export interface WalletCardProps {
  icon: string;
  colorClass: string;
  step?: string;
}

export const WalletCard: FC<WalletCardProps> = ({ icon, colorClass, step, children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      <Box className={`${classes.title} ${colorClass}`}>
        <Typography variant='h5'>Your wallet</Typography>
        {step && <Typography variant='h5'>{step}</Typography>}
      </Box>
      <Box className={classes.content}>
        <Box className={`${classes.iconWrapper} ${colorClass}`}>
          <img width={60} height={60} src={icon} alt={icon}></img>
        </Box>
        {children}
      </Box>
    </Paper>
  );
};
