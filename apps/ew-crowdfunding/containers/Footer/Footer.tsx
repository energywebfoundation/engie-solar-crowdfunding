/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { SocialLinks } from '../../components';
import { useStyles } from './Footer.styles';

export const Footer: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <SocialLinks />
      <Box className={classes.wrapper}>
        <Typography color='common.white' style={{ fontWeight: 700 }} mr={2}>
          Powered by Lab.EnergyWeb
        </Typography>
        <img src='/EW_lab.png' alt='Lab icon' />
      </Box>
    </Paper>
  );
};
