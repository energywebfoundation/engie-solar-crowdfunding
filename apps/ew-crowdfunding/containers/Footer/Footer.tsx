/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography } from '@mui/material';
import { margin } from '@mui/system';
import { FC } from 'react';
import { SocialLinks } from '../../components';
import { useStyles } from './Footer.styles';

export const Footer: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <SocialLinks />
      <Box className={classes.wrapper}>
        <img src='/EW Lab Logo.png' alt='Lab icon' width={42}/>
        <Typography color='white' style={{ marginLeft: 12 }} mr={2}>
          <strong>LAB</strong> by Energy Web
        </Typography>
      </Box>
    </Paper>
  );
};
