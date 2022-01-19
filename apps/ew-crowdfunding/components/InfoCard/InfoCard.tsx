/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './InfoCard.styles';

export interface InfoCardProps {
  title: string;
  type: string; // Can be kWh, %, million etc.
  text: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, type, text }: InfoCardProps) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Box className={classes.title}>
          <Typography variant='h3' fontWeight={'bold'} color='common.black'>
            {title}
          </Typography>
          <Typography variant='h5' fontWeight={'bold'} color='common.black'>
            {type}
          </Typography>
        </Box>
        <Typography mt={2}>{text}</Typography>
      </Paper>
      <div className={classes.border}></div>
    </div>
  );
};
