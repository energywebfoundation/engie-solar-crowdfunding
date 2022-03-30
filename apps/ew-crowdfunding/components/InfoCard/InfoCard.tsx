/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './InfoCard.styles';

export interface InfoCardProps {
  title: string;
  type?: string; // Can be kWh, %, million etc.
  text: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, type, text }: InfoCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.darkPaper}>
        <Box className={classes.title}>
          <Typography variant='h3' fontWeight={'bold'} color='common.white'>
            {title}
          </Typography>
          {type && (
            <Typography variant='h5' fontWeight={'bold'} color='common.white'>
              {type}
            </Typography>
          )}
        </Box>
        <Typography color='common.white' mt={2}>
          {text}
        </Typography>
      </Paper>
      <div className={classes.border}></div>
    </div>
  );
};
