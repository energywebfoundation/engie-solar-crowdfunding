/* eslint-disable @next/next/no-img-element */
import { Paper, Container, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './Footer.styles';

export const Footer: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.wrapper}>
        <Typography>
          Powered by <strong>Lab.EnergyWeb</strong>
        </Typography>
        <img width={40} height={40} src='/LabLogo.png' alt='Lab icon' />
      </Box>
    </Paper>
  );
};
