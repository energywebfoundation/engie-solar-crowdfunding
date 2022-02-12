/* eslint-disable @next/next/no-img-element */
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
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
          <img src={icon} alt='Lock'></img>
        </Box>
        {children}
      </Box>
    </Paper>
  );
};
